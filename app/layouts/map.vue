<script setup lang="ts">
provideEventBus()
</script>

<template>
  <div class="h-screen w-screen bg-gray-100">
    <div>
      <ClientOnly>
        <AppMap />
        <template #fallback>
          <span class="sr-only">Loading map...</span>
        </template>
      </ClientOnly>
      <div
        class="h-screen w-screen overflow-hidden after:relative after:-left-[250vw] after:block after:h-screen after:w-[600vw] after:animate-loaderpulse after:bg-gradient-to-r after:from-gray-100 after:via-[color-mix(in_oklch,theme(colors.gray.100)_80%,black)] after:via-0% after:to-gray-100"
      ></div>
    </div>
    <AppProgress />
    <AppLogo />
    <slot />
  </div>
</template>
