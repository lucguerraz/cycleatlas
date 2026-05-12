// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    oauth: {
      strava: {
        scope: 'read,activity:read_all',
      },
    },
    session: {
      cookie: {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax' as const,
      },
    },
  },
  modules: ['@nuxtjs/google-fonts', '@nuxtjs/tailwindcss', 'nuxt-auth-utils'],
})
