<script setup>
const { loggedIn, user, session, clear, openInPopup } = useUserSession()
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />

    <div v-if="loggedIn">
      <h1>Welcome {{ user.name }}!</h1>
      <p>Logged in since {{ session.loggedInAt }}</p>
      <button @click="clear">Logout</button>
    </div>
    <div v-else>
      <h1>Not logged in</h1>
      <a href="/api/auth/strava">Login with Strava</a>
    </div>

    <NuxtWelcome />
  </div>
</template>
