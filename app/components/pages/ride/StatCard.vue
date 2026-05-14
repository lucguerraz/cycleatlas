<script setup>
const props = defineProps(['name', 'icon'])
</script>

<template>
  <div class="flex flex-col items-center rounded-lg bg-white p-3">
    <p class="flex items-center gap-1 text-xs font-medium text-gray-500">
      <component :is="props.icon" :size="12" :strokeWidth="2.2"></component>
      <span> {{ props.name }} </span>
    </p>
    <p class="text-2xl">
      <slot />
    </p>
  </div>
</template>
