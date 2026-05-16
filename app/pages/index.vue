<script setup lang="ts">
import type { Activity } from '~~/types'

definePageMeta({
  middleware: 'auth',
  layout: 'map',
})

const bus = useEventBus()

const { data: activities, pending, error } = await useFetch<Activity[]>('/api/activities')

const handleClick = (id: number) => {
  bus.emit('map-zoom-into-view', { id })
}
</script>

<template>
  <AppSidebar>
    <div v-if="pending" class="flex h-full w-full items-center justify-center"><p>Loading...</p></div>
    <div v-else-if="error" class="flex h-full w-full flex-col items-center justify-center">
      <p>Couldn't load activities</p>
      <p class="text-center font-light text-gray-500">{{ error.data.message }}</p>
    </div>
    <div v-else-if="activities?.length === 0" class="flex h-full w-full flex-col items-center justify-center">
      <p>No activities yet</p>
      <p class="text-center font-light text-gray-500">
        We are either still processing your data, or we don't have permissions to view your activities on strava
      </p>
    </div>
    <ul v-else class="flex flex-col gap-3">
      <li v-for="activity in activities" :key="activity.stravaid">
        <NuxtLink
          :to="{ name: 'ride-id', params: { id: activity.stravaid } }"
          class="flex flex-col gap-1.5 rounded-lg bg-white p-4 hover:bg-slate-50"
          @click="handleClick(activity.stravaid)"
        >
          <h2 class="text-xl">{{ activity.name }}</h2>
          <div class="flex gap-3">
            <p class="flex items-center gap-1 text-base font-medium text-gray-500">
              <LucideCalendar :size="16" :strokeWidth="2.2" />
              <span>{{ new Date(activity.start_date).toLocaleDateString('de-CH', { weekday: undefined }) }}</span>
            </p>
            <p class="flex items-center gap-1 text-base font-medium text-gray-500">
              <LucideRoute :size="16" :strokeWidth="2.2" />
              <span
                >{{
                  (activity.distance / 1000).toLocaleString('de-CH', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  })
                }}km</span
              >
            </p>
            <p class="flex items-center gap-1 text-base font-medium text-gray-500">
              <LucideMountain :size="16" :strokeWidth="2.2" />
              <span
                >{{
                  activity.total_elevation_gain.toLocaleString('de-CH', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  })
                }}m</span
              >
            </p>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </AppSidebar>
</template>
