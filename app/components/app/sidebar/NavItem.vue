<script setup>
const props = defineProps(['to'])
</script>

<template>
  <li
    class="relative inline-block w-1/2 before:absolute before:-left-6 before:bottom-0 before:h-6 before:w-6 before:bg-offwhite before:bg-opacity-55 before:backdrop-blur-sm before:[mask-image:radial-gradient(circle_at_top_left,transparent_70%,black_71%)] before:[mask-size:_100%_100%] after:absolute after:-right-6 after:bottom-0 after:h-6 after:w-6 after:bg-offwhite after:bg-opacity-55 after:backdrop-blur-sm after:[mask-image:radial-gradient(circle_at_top_right,transparent_70%,black_71%)] after:[mask-size:_100%_100%] first:before:content-none last:after:content-none has-[:not(.active)]:before:content-none has-[:not(.active)]:after:content-none"
  >
    <NuxtLink
      class="inline-block w-full rounded-t-xl p-4 text-center text-lg font-medium text-gray-500"
      activeClass="active bg-offwhite bg-opacity-55 backdrop-blur-sm !text-black"
      :to="props.to"
    >
      <slot />
    </NuxtLink>
  </li>
</template>
