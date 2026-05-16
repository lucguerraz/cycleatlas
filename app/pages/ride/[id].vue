<script setup lang="ts">
import type { Activity } from '~~/types'
import { LucideRoute, LucideMountain, LucideTimer, LucideGauge, LucideZap, LucideHeart } from '@lucide/vue'

import countriesData from '@/assets/dictionaries/countries.json'
import regionsAT from '@/assets/dictionaries/regions/at.json'
import regionsCH from '@/assets/dictionaries/regions/ch.json'
import regionsDE from '@/assets/dictionaries/regions/de.json'
import regionsFR from '@/assets/dictionaries/regions/fr.json'
import regionsIT from '@/assets/dictionaries/regions/it.json'
const countries = countriesData as { [key: string]: string }
const regions = {
  AT: regionsAT,
  CH: regionsCH,
  DE: regionsDE,
  FR: regionsFR,
  IT: regionsIT,
} as { [key: string]: { [key: string]: string } }

definePageMeta({
  middleware: 'auth',
  layout: 'map',
})

const route = useRoute()
const id = computed(() => route.params.id)
const {
  data: activity,
  pending,
  error,
} = await useFetch<Activity>(`/api/activities/${id.value}?fields=metadata,teritorydata`)
</script>

<template>
  <AppSidebar>
    <div v-if="pending" class="flex h-full w-full items-center justify-center"><p>Loading...</p></div>
    <div v-else-if="error" class="flex h-full w-full flex-col items-center justify-center">
      <p>Couldn't load activity</p>
      <pre class="text-gray-500">{{ error.data.message }}</pre>
    </div>
    <div v-else class="flex flex-col gap-6 overflow-scroll">
      <section>
        <h2 class="mb-1 text-3xl font-semibold">{{ activity?.name }}</h2>
        <div class="flex gap-3">
          <p class="flex items-center gap-1 text-base font-medium text-gray-500">
            <LucideCalendar :size="16" :strokeWidth="2.2" />
            <span>{{
              new Date(activity?.start_date || 0).toLocaleDateString('en-CH', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            }}</span>
          </p>
          <p class="flex items-center gap-1 text-base font-medium text-gray-500">
            <LucideExternalLink :size="16" :strokeWidth="2.2" />
            <NuxtLink :to="'https://strava.com/activities/' + activity?.stravaid" :external="true" target="_blank">
              View on Strava
            </NuxtLink>
          </p>
        </div>
      </section>
      <section>
        <h3 class="mb-1 text-2xl font-semibold">Ride Stats</h3>
        <div class="grid grid-cols-2 gap-3">
          <PagesRideStatCard name="Distance" :icon="LucideRoute">
            {{
              ((activity?.distance || 0) / 1000)
                .toLocaleString('de-CH', {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })
                .replace("'", '’')
            }}km
          </PagesRideStatCard>
          <PagesRideStatCard name="Elevation" :icon="LucideMountain">
            {{
              activity?.total_elevation_gain
                .toLocaleString('de-CH', {
                  maximumFractionDigits: 0,
                })
                .replace("'", '’')
            }}m
          </PagesRideStatCard>
          <PagesRideStatCard name="Moving time" :icon="LucideTimer">
            {{ Math.floor((activity?.moving_time || 0) / 3600) }}h
            {{ Math.floor(((activity?.moving_time || 0) % 3600) / 60) }}m
          </PagesRideStatCard>
          <PagesRideStatCard name="Avg. Speed" :icon="LucideGauge">
            {{
              ((activity?.average_speed || 0) * 3.6)
                .toLocaleString('de-CH', {
                  maximumFractionDigits: 1,
                })
                .replace("'", '’')
            }}km/h
          </PagesRideStatCard>
          <PagesRideStatCard name="Avg. Power" :icon="LucideZap">
            {{
              activity?.average_watts
                .toLocaleString('de-CH', {
                  maximumFractionDigits: 0,
                })
                .replace("'", '’')
            }}w
          </PagesRideStatCard>
          <PagesRideStatCard name="Avg. Heartrate" :icon="LucideHeart">
            {{
              activity?.average_heartrate
                .toLocaleString('de-CH', {
                  maximumFractionDigits: 0,
                })
                .replace("'", '’')
            }}bpm
          </PagesRideStatCard>
        </div>
      </section>
      <section class="mt-2">
        <h3 class="mb-1 text-2xl font-semibold">Distance per Country/Region</h3>
        <ul class="flex flex-col gap-3">
          <li v-for="(country, countrycode) in activity?.countries" class="rounded-lg bg-white p-4 pb-6">
            <p class="flex items-center justify-between">
              <span class="text-2xl">
                {{ countries[countrycode] }}
              </span>
              <span class="text-base text-gray-500">
                {{
                  (country.distance / 1000)
                    .toLocaleString('de-CH', {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                    })
                    .replace("'", '’')
                }}km
              </span>
            </p>
            <div class="h-2 w-full rounded-md bg-black bg-opacity-5">
              <span
                class="block h-2 rounded-md bg-primary"
                :style="'width: ' + (country.distance / (activity?.distance || 0)) * 100 + '%'"
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
                      (region.distance / 1000)
                        .toLocaleString('de-CH', {
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 2,
                        })
                        .replace("'", '’')
                    }}km</span
                  >
                </p>
                <div class="h-1.5 w-full rounded-md bg-black bg-opacity-5">
                  <span
                    class="block h-1.5 rounded-md bg-primary"
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
