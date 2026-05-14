<script setup lang="ts">
provideEventBus()
</script>

<template>
  <ClientOnly fallback-tag="span" fallback="Loading map..."> <AppMap /> </ClientOnly>
  <slot />
</template>
