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
    public: {
      tiler_api_key: process.env.NUXT_PUBLIC_TILER_API_KEY,
    },
  },
  modules: [
    '@nuxtjs/google-fonts',
    '@nuxtjs/tailwindcss',
    'nuxt-auth-utils',
    'nuxt-mongoose',
    'nuxt-maplibre',
    'nuxt-lucide-icons',
    'nuxt-processor',
  ],
})
