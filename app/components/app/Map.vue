<script setup lang="ts">
const config = useRuntimeConfig()

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
</script>

<template>
  <MglMap :map-style="style" :center="center" :zoom="zoom" height="100vh" width="100vw" :attributionControl="false">
    <MglNavigationControl position="top-left" />
    <MglAttributionControl position="bottom-left" :compact="true" />
  </MglMap>
</template>
