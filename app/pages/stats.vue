<script setup lang="ts">
import type { Stats } from '~~/types'
import { LucideRoute, LucideMountain, LucideTimer, LucideBike } from '@lucide/vue'

import countriesData from '@/assets/dictionaries/countries.json'
import regionsCH from '@/assets/dictionaries/regions/ch.json'
import regionsFR from '@/assets/dictionaries/regions/fr.json'
const countries = countriesData as { [key: string]: string }
const regions = {
  CH: regionsCH,
  FR: regionsFR,
} as { [key: string]: { [key: string]: string } }

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
    <div v-else class="flex flex-col gap-6">
      <select
        v-model="statYear"
        class="ring-primary appearance-none rounded-lg bg-white bg-[left_0.5rem_center] bg-no-repeat px-2 py-1 pl-7 text-gray-500 outline-none focus-visible:ring-2"
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
              ((stats?.distance || 0) / 1000).toLocaleString('de-CH', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })
            }}km
          </PagesRideStatCard>
          <PagesRideStatCard name="Elevation" :icon="LucideMountain">
            {{
              stats?.elevation.toLocaleString('de-CH', {
                maximumFractionDigits: 0,
              })
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
          <li v-for="(country, countrycode) in stats?.countries" class="rounded-lg bg-white p-4 pb-6">
            <p class="flex items-center justify-between">
              <span class="text-2xl">
                {{ countries[countrycode] }}
              </span>
              <span class="text-base text-gray-500">
                {{
                  (country.distance / 1000).toLocaleString('de-CH', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 2,
                  })
                }}km
              </span>
            </p>
            <div class="h-2 w-full rounded-md bg-black bg-opacity-5">
              <span
                class="bg-primary block h-2 rounded-md"
                :style="'width: ' + (country.distance / (stats?.distance || 0)) * 100 + '%'"
              ></span>
            </div>
            <ul class="mt-3 flex flex-col gap-2">
              <li v-for="(region, regioncode) in country.regions">
                <p class="flex items-center justify-between">
                  <span class="text-lg">
                    {{ regions[countrycode]?.[regioncode] }}
                  </span>
                  <span class="text-sm text-gray-500">
                    {{
                      (region.distance / 1000).toLocaleString('de-CH', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      })
                    }}km</span
                  >
                </p>
                <div class="h-1.5 w-full rounded-md bg-black bg-opacity-5">
                  <span
                    class="bg-primary block h-1.5 rounded-md"
                    :style="'width: ' + (region.distance / country.distance) * 100 + '%'"
                  ></span>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </section>
    </div>
  </AppSidebar>
</template>
