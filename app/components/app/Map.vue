<script setup lang="ts">
import type { Activity } from '~~/types'
import type { LngLatBoundsLike } from 'maplibre-gl'
import { useMap } from '@indoorequal/vue-maplibre-gl'
import * as turf from '@turf/turf'

const config = useRuntimeConfig()
const bus = useEventBus()
const route = useRoute()
const mapRef = useMap()

const { data: activities } = await useFetch<Activity[]>('/api/activities')

const style =
  'https://api.maptiler.com/maps/019e2251-1abd-7d34-b750-9d36b8c36cfd/style.json?key=' + config.public.tiler_api_key

const center = { lon: 9.3355, lat: 46.7754 }
const zoom = 7.4

const layout = {
  'line-join': 'round',
  'line-cap': 'round',
} as const
const paint = {
  'line-color': '#0CBACD',
  'line-width': 2,
}

onMounted(() => bus.on('map-zoom-into-view', handleZoom))
onBeforeUnmount(() => bus.off('map-zoom-into-view', handleZoom))
const handleZoom = (payload: any) => {
  fitboundsmap(payload.id)
}

const handleClick = async (e: any) => {
  const stravaid = e.features[0].layer.id.split('_')[0]
  if (!stravaid) return

  fitboundsmap(stravaid)
  await navigateTo('/ride/' + stravaid)
}

const handleLoad = () => {
  if (route.name !== 'ride-id') return
  const stravaid = route.path.split('/')[2]
  if (stravaid) fitboundsmap(stravaid)
}

const fitboundsmap = (stravaid: string) => {
  const activity = activities.value?.find((elem) => elem.stravaid === parseInt(stravaid))

  if (!activity) return

  const bbox = turf.bbox(activity.geojson)
  let [minX, minY, maxX, maxY] = bbox
  minX = minX + 0.075 // offset for the sidebar
  maxX = maxX + 0.075
  const bounds = [
    [minX, minY], // SW corner
    [maxX, maxY], // NE corner
  ] as LngLatBoundsLike

  mapRef.map?.fitBounds(bounds, {
    padding: 120,
    maxZoom: 14,
    animate: true,
  })
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
    <MglNavigationControl position="top-left" />
    <MglAttributionControl position="bottom-left" :compact="true" />

    <mgl-geo-json-source
      v-for="activity in activities"
      :key="activity.stravaid + '_geojson'"
      :source-id="activity.stravaid + '_geojson'"
      :data="activity.geojson"
    >
      <mgl-line-layer :layer-id="activity.stravaid + '_geojson'" :layout="layout" :paint="paint" @click="handleClick" />
    </mgl-geo-json-source>
  </MglMap>
</template>
