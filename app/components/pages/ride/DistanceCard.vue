<script setup lang="ts">
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

const props = defineProps(['country', 'countrycode', 'totaldistance'])
</script>

<template>
  <li class="rounded-lg bg-white p-4 pb-6">
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
        :style="'width: ' + (country.distance / (totaldistance || 0)) * 100 + '%'"
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
</template>
