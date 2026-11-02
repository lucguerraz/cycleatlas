<script setup>
definePageMeta({
  middleware: 'setup',
})
</script>

<template>
  <main
    class="flex h-screen items-center justify-center bg-[linear-gradient(to_bottom,rgba(255,255,255,0.1),rgba(255,255,255,0.3)),url(/background.jpg)] bg-cover"
  >
    <section
      class="flex w-[26vw] min-w-80 flex-col gap-6 rounded-xl bg-offwhite bg-opacity-55 p-6 drop-shadow-xl backdrop-blur-sm"
    >
      <h1 class="text-center text-2xl font-semibold">Complete account setup</h1>
      <div class="flex flex-col gap-4">
        <p>
          To complete you account setup, please enter you personal Garmin API key below. You can obtain an API key in
          your
          <NuxtLink
            to="https://connect.garmin.com/app/settings/personalApiToken"
            :external="true"
            target="_blank"
            rel="nofollow"
            class="text-[color-mix(in_oklch,theme(colors.primary)_90%,black)] hover:text-primary"
          >
            Garmin Connect settings.
          </NuxtLink>
        </p>
        <PagesSetupForm />
      </div>
    </section>
  </main>
</template>
