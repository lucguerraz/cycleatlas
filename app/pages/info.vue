<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'map',
})
</script>

<template>
  <AppSidebar>
    <div class="flex flex-col gap-5">
      <section>
        <h3 class="mb-1 text-2xl font-semibold">CycleAtlas</h3>
        <p>
          CycleAtlas is a small app to visualize all your past cycling rides, show the roads you've already frequented
          and places you've explored on two wheels. It also tracks what dictances you've cycled in each country and for
          Austria, Switzerland, Germany, France and Italy even in which regions.
        </p>
      </section>
      <section>
        <h3 class="mb-1 text-2xl font-semibold">What data do we store?</h3>
        <p>
          When you login via Strava we process all your activities, tracking distances in countries and regions using
          the GPS data provided by Strava. We then save data related to the activity (such as title, time, distance,
          elevation gain, speed, cadence, time, watts, heartrate and GPS) to our database. The data is only ever used to
          be shown to you when you are logged in. To delete all your data from our servers, you can
          <NuxtLink
            to="https://www.strava.com/settings/apps"
            :external="true"
            target="_blank"
            rel="nofollow"
            class="text-[color-mix(in_oklch,theme(colors.primary)_90%,black)] hover:text-primary"
          >
            revoke the CycleAtlas App from your Strava Account
          </NuxtLink>
        </p>
      </section>
      <section>
        <h3 class="mb-1 text-2xl font-semibold">GeoData Sources</h3>
        <p class="flex flex-col items-start gap-1">
          To track distances per country and regions we use geodata from these sources
          <NuxtLink
            to="https://github.com/nvkelso/natural-earth-vector/"
            :external="true"
            target="_blank"
            rel="nofollow"
            class="text-[color-mix(in_oklch,theme(colors.primary)_90%,black)] hover:text-primary"
          >
            GeoData Countries via Natural Earth Vector
          </NuxtLink>
          <NuxtLink
            to="https://github.com/ginseng666/GeoJSON-TopoJSON-Austria/"
            :external="true"
            target="_blank"
            rel="nofollow"
            class="text-[color-mix(in_oklch,theme(colors.primary)_90%,black)] hover:text-primary"
          >
            GeoData Regions Austria via Flooh Perlot and Statistik Austria
          </NuxtLink>
          <NuxtLink
            to="https://labs.karavia.ch/swiss-boundaries-geojson/"
            :external="true"
            target="_blank"
            rel="nofollow"
            class="text-[color-mix(in_oklch,theme(colors.primary)_90%,black)] hover:text-primary"
          >
            GeoData Regions Switzerland (swissBOUNDARIES3D) via rkaravia and Swiss Federal Office of Topography
          </NuxtLink>
          <NuxtLink
            to="https://github.com/isellsoap/deutschlandGeoJSON/"
            :external="true"
            target="_blank"
            rel="nofollow"
            class="text-[color-mix(in_oklch,theme(colors.primary)_90%,black)] hover:text-primary"
          >
            GeoData Regions Germany via isellsoap and GIS-DATA
          </NuxtLink>
          <NuxtLink
            to="https://github.com/gregoiredavid/france-geojson/"
            :external="true"
            target="_blank"
            rel="nofollow"
            class="text-[color-mix(in_oklch,theme(colors.primary)_90%,black)] hover:text-primary"
          >
            GeoData Regions France via Gregoire David and IGN/Admin Express COG
          </NuxtLink>
          <NuxtLink
            to="https://github.com/openpolis/geojson-italy/"
            :external="true"
            target="_blank"
            rel="nofollow"
            class="text-[color-mix(in_oklch,theme(colors.primary)_90%,black)] hover:text-primary"
          >
            GeoData Regions Italy via Openpolis and ISTAT
          </NuxtLink>
        </p>
      </section>
    </div>
  </AppSidebar>
</template>
