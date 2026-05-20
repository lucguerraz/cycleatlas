<template>
  <p class="mt-auto justify-self-end pt-2 text-right text-xs text-gray-400">
    <NuxtLink to="https://www.strava.com/" :external="true" target="_blank" class="hover:underline">
      <slot>Activity data from Strava</slot>
    </NuxtLink>
  </p>
</template>
