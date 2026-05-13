<script setup>
definePageMeta({
  middleware: 'login',
})
</script>

<template>
  <h1>Login</h1>
  <a href="/api/auth/strava">Login with Strava</a>
</template>
