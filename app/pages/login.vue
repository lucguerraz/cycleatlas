<script setup>
definePageMeta({
  middleware: 'login',
})
</script>

<template>
  <main
    class="flex h-screen items-center justify-center bg-[linear-gradient(to_bottom,rgba(255,255,255,0.1),rgba(255,255,255,0.3)),url(/background.jpg)] bg-cover"
  >
    <section
      class="flex w-[26vw] min-w-80 flex-col gap-6 rounded-xl bg-offwhite bg-opacity-55 p-6 drop-shadow-xl backdrop-blur-sm"
    >
      <h1 class="text-center text-2xl font-semibold">Login to CycleAtlas</h1>
      <div class="flex flex-col gap-4">
        <PagesLoginForm />
        <div class="my-2 flex items-center gap-4">
          <span class="block h-[1px] w-full bg-gray-500"></span>
          <p class="text-gray-500">or</p>
          <span class="block h-[1px] w-full bg-gray-500"></span>
        </div>
        <NuxtLink
          to="/api/auth/demo"
          :external="true"
          class="flex h-12 items-center justify-center overflow-hidden rounded-lg bg-gray-200 text-lg font-medium"
        >
          View Demo
        </NuxtLink>
      </div>
    </section>
  </main>
</template>
