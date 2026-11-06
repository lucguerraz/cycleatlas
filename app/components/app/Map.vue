<script setup lang="ts">
import type { Activity } from '~~/types'
import type { LngLatBoundsLike } from 'maplibre-gl'
import { useMap } from '@indoorequal/vue-maplibre-gl'
import { bbox } from '@turf/turf'
import style from '@/assets/map/style.json'

const bus = useEventBus()
const route = useRoute()
const mapRef = useMap()

const antsLayerRef = ref('')

const { data: activities } = await useFetch<Activity[]>('/api/activities?fields=metadata,geodata')

const center = { lon: 16.3355, lat: 46.7754 }
const zoom = 4
const windowWidth = window.innerWidth

const layout = {
  'line-join': 'round',
  'line-cap': 'round',
} as const
const paint = {
  'line-color': '#0CBACD',
  'line-width': 2,
}

watch(
  () => route.name,
  (newName, oldName) => {
    if (['index', 'stats', 'info'].includes(newName as string)) {
      if (antsLayerRef.value != '' && mapRef.map?.getLayer(antsLayerRef.value)) {
        mapRef.map?.removeLayer(antsLayerRef.value)
      }
      fitBoundsAll()
    }
    if (['index', 'ride-id', 'info'].includes(newName as string)) {
      resetHideNonSelectedYearRides()
      if (['index', 'info'].includes(newName as string)) {
        fitBoundsAll()
      }
    }
  }
)

onMounted(() => {
  bus.on('map-zoom-into-view', handleZoom)
  bus.on('map-hide-non-selected-tracks', hideNonSelectedYearRides)
})
onBeforeUnmount(() => {
  bus.off('map-zoom-into-view', handleZoom)
  bus.off('map-hide-non-selected-tracks', hideNonSelectedYearRides)
})
const handleZoom = (payload: any) => {
  fitBoundsActivity(payload.id)
}

const handleClick = async (e: any) => {
  const garminid = e.features[0].layer.id.split('_')[0]
  if (!garminid) return

  fitBoundsActivity(garminid)
  await navigateTo('/ride/' + garminid)
}

const handleLoad = () => {
  if (route.name === 'ride-id') {
    const garminid = route.path.split('/')[2]
    if (garminid) fitBoundsActivity(garminid)
    return
  }

  fitBoundsAll()
}

const fitBoundsAll = () => {
  const allFeatures = activities.value?.reduce(
    (prev, activity) => {
      prev.features.push((activity.geojson as any).features[0])
      return prev
    },
    {
      type: 'FeatureCollection',
      features: [],
    } as { type: string; features: Array<object> }
  ) as GeoJSON.GeoJSON

  fitBoundsMap(allFeatures)
}

const animateAnts = (frameTime: number, garminid: number, dashArraySequence: number[][], step: number) => {
  if (!mapRef.map?.getLayer(garminid + '_geojson_line_ants')) return

  const newStep = Math.floor((frameTime / 100) % dashArraySequence.length)

  if (step != newStep) {
    mapRef.map?.setPaintProperty(garminid + '_geojson_line_ants', 'line-dasharray', dashArraySequence[newStep])
  }
  requestAnimationFrame((frameTime) => animateAnts(frameTime, garminid, dashArraySequence, newStep))
}

const initAnts = (garminid: string) => {
  // https://docs.mapbox.com/mapbox-gl-js/example/animate-ant-path/
  const dashArraySequence = [
    [0, 8, 6],
    [1, 8, 5],
    [2, 8, 4],
    [3, 8, 3],
    [4, 8, 2],
    [5, 8, 1],
    [6, 8, 0],
    [0, 1, 6, 7],
    [0, 2, 6, 6],
    [0, 3, 6, 5],
    [0, 4, 6, 4],
    [0, 5, 6, 3],
    [0, 6, 6, 2],
    [0, 7, 6, 1],
  ]

  if (antsLayerRef.value != '' && mapRef.map?.getLayer(antsLayerRef.value)) {
    mapRef.map?.removeLayer(antsLayerRef.value)
  }

  mapRef.map?.addLayer({
    id: garminid + '_geojson_line_ants',
    type: 'line',
    source: garminid + '_geojson',
    paint: {
      'line-color': '#ffffff',
      'line-width': 1,
      'line-dasharray': dashArraySequence[0],
    },
  })
  requestAnimationFrame((frameTime) => animateAnts(frameTime, parseInt(garminid), dashArraySequence, 0))
  antsLayerRef.value = garminid + '_geojson_line_ants'
}

const fitBoundsActivity = (garminid: string) => {
  const activity = activities.value?.find((elem) => elem.garminid === parseInt(garminid))

  if (!activity) return

  if (mapRef.map?.getSource(garminid + '_geojson')) {
    initAnts(garminid)
  } else {
    const antsInterval = setInterval(() => {
      if (mapRef.map?.getSource(garminid + '_geojson')) {
        initAnts(garminid)
        clearInterval(antsInterval)
      }
    }, 1000)
  }

  fitBoundsMap(activity.geojson)
}

const fitBoundsMap = (geojson: GeoJSON.GeoJSON) => {
  const trackbbox = bbox(geojson)

  const bounds = [
    [trackbbox[0], trackbbox[1]], // SW corner
    [trackbbox[2], trackbbox[3]], // NE corner
  ] as LngLatBoundsLike

  mapRef.map?.fitBounds(bounds, {
    padding:
      document.documentElement.clientWidth >= 640
        ? {
            top: document.documentElement.clientWidth / 15,
            bottom: document.documentElement.clientWidth / 15,
            left: document.documentElement.clientWidth / 15,
            right:
              document.documentElement.clientWidth / (document.documentElement.clientWidth >= 1024 ? 3.8461538462 : 2) +
              (document.documentElement.clientWidth >= 1024 ? 24 : 0) +
              document.documentElement.clientWidth / 18,
          }
        : {
            top: document.documentElement.clientHeight / 15,
            bottom: document.documentElement.clientHeight / 2 + 12 + document.documentElement.clientHeight / 18,
            left: document.documentElement.clientHeight / 15,
            right: document.documentElement.clientHeight / 15,
          },
    maxZoom: 14,
    animate: true,
  })
}

const resetHideNonSelectedYearRides = () => {
  activities.value?.forEach((activity) => {
    if (!mapRef.map?.getLayer(activity.garminid + '_geojson_line')) return
    mapRef.map?.setPaintProperty(activity.garminid + '_geojson_line', 'line-color', '#0CBACD')
  })
}
const hideNonSelectedYearRides = (selectedYear: string) => {
  resetHideNonSelectedYearRides()

  if (selectedYear === '*') return

  const rejectedActivities = activities.value?.filter((activity) => !activity.start_date.includes(selectedYear))
  rejectedActivities?.forEach((activity) => {
    if (!mapRef.map?.getLayer(activity.garminid + '_geojson_line')) return
    mapRef.map?.setPaintProperty(activity.garminid + '_geojson_line', 'line-color', 'transparent')
  })

  const selectedActivitesFeatures = activities.value
    ?.filter((activity) => activity.start_date.includes(selectedYear))
    .reduce(
      (prev, activity) => {
        prev.features.push((activity.geojson as any).features[0])
        return prev
      },
      {
        type: 'FeatureCollection',
        features: [],
      } as { type: string; features: Array<object> }
    ) as GeoJSON.GeoJSON

  fitBoundsMap(selectedActivitesFeatures)
}
</script>

<template>
  <MglMap
    :map-style="style"
    :center="center"
    :zoom="zoom"
    height="100vh"
    width="100vw"
    :attributionControl="false"
    @map:load="handleLoad"
  >
    <MglAttributionControl :position="windowWidth >= 640 ? 'bottom-left' : 'bottom-right'" :compact="true" />
    <MglNavigationControl :position="windowWidth >= 640 ? 'bottom-left' : 'top-right'" />

    <mgl-geo-json-source
      v-for="activity in activities"
      :key="activity.garminid + '_geojson'"
      :source-id="activity.garminid + '_geojson'"
      :data="activity.geojson"
    >
      <mgl-line-layer
        :layer-id="activity.garminid + '_geojson_line'"
        :layout="layout"
        :paint="paint"
        @click="handleClick"
      />
    </mgl-geo-json-source>
  </MglMap>
</template>
