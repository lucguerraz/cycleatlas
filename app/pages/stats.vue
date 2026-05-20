<script setup lang="ts">
import type { Stats } from '~~/types'
import { LucideRoute, LucideMountain, LucideTimer, LucideBike } from '@lucide/vue'

definePageMeta({
  middleware: 'auth',
  layout: 'map',
})

const statYear = ref('*')
const {
  data: stats,
  pending,
  error,
} = await useFetch<Stats>('/api/stats', {
  query: { y: statYear },
})
const { data: years, pending: ypending, error: yerror } = await useFetch('/api/stats/years')
</script>

<template>
  <AppSidebar>
    <div v-if="pending" class="flex h-full w-full items-center justify-center"><p>Loading...</p></div>
    <div v-else-if="error" class="flex h-full w-full flex-col items-center justify-center">
      <p>Couldn't load stats</p>
      <pre class="text-gray-500">{{ error.data.message }}</pre>
    </div>
    <div v-else class="flex h-full w-full flex-col gap-3">
      <select
        v-model="statYear"
        class="appearance-none rounded-lg bg-white bg-[left_0.5rem_center] bg-no-repeat px-2 py-1 pl-7 text-gray-500 outline-none ring-primary focus-visible:ring-2"
        style="
          background-image: url('data:image/svg+xml;utf8,<svg width=%2216%22 height=%2216%22 viewBox=%220 0 16 16%22 fill=%22none%22 xmlns=%22http://www.w3.org/2000/svg%22><path d=%22M4 6L8 10L12 6%22 stroke=%22%23999999%22 stroke-width=%221.5%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22/></svg>');
          background-size: 1rem 1rem;
        "
      >
        <option value="*">All time</option>
        <option value="loading" disabled v-if="ypending">Loading...</option>
        <option value="error" disabled v-else-if="yerror">Error loading years</option>
        <option v-else v-for="year in years" :value="year">{{ year }}</option>
      </select>
      <section>
        <h3 class="mb-1 text-2xl font-semibold">Total Stats</h3>
        <div class="grid grid-cols-2 gap-3">
          <PagesRideStatCard name="Distance" :icon="LucideRoute">
            {{
              ((stats?.distance || 0) / 1000)
                .toLocaleString('de-CH', {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })
                .replace("'", '’')
            }}km
          </PagesRideStatCard>
          <PagesRideStatCard name="Elevation" :icon="LucideMountain">
            {{
              stats?.elevation
                .toLocaleString('de-CH', {
                  maximumFractionDigits: 0,
                })
                .replace("'", '’')
            }}m
          </PagesRideStatCard>
          <PagesRideStatCard name="Moving time" :icon="LucideTimer">
            {{ Math.floor((stats?.moving_time || 0) / 3600) }}h
            {{ Math.floor(((stats?.moving_time || 0) % 3600) / 60) }}m
          </PagesRideStatCard>
          <PagesRideStatCard name="Rides" :icon="LucideBike">
            {{ stats?.ridecount }}
          </PagesRideStatCard>
        </div>
      </section>
      <section class="mt-2">
        <h3 class="mb-1 text-2xl font-semibold">Distance per Country/Region</h3>
        <ul class="flex flex-col gap-3">
          <PagesRideDistanceCard
            v-for="(country, countrycode) in stats?.countries"
            :country="country"
            :countrycode="countrycode"
            :totaldistance="stats?.distance"
          />
        </ul>
      </section>
      <PagesRideCreditCard>
        Activity data from
        {{
          new Intl.ListFormat('en-GB', {
            style: 'long',
            type: 'conjunction',
          }).format(stats?.sources || ['Strava'])
        }}
      </PagesRideCreditCard>
    </div>
  </AppSidebar>
</template>
