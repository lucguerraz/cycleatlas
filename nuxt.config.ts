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
    stravaWebhook: {
      verifyToken: '',
      signingSecret: '',
      subscriptionId: '',
    },
  },
  vite: {
    server: {
      allowedHosts: [],
    },
  },
  googleFonts: {
    families: {
      Inter: '300..600',
    },
    preload: true,
    display: 'swap',
  },
  app: {
    head: {
      title: 'CycleAtlas',
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', sizes: '16x16 32x32 64x64', href: '/favicon.ico' },
        { rel: 'shortcut icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32.png' },
        { rel: 'icon', type: 'image/png', sizes: '64x64', href: '/favicon-64.png' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96.png' },
        { rel: 'icon', type: 'image/png', sizes: '128x128', href: '/favicon-128.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicon-192.png' },
        { rel: 'apple-touch-icon', sizes: '120x120', href: '/favicon-120.png' },
        { rel: 'apple-touch-icon', sizes: '152x152', href: '/favicon-180.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon-180.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicon-192.png' },
        { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/favicon-512.png' },

        { rel: 'manifest', href: '/manifest.json' },
      ],
      meta: [
        { name: 'theme-color', content: '#0CBACD' },
        { name: 'msapplication-TileColor', content: '#ffffff' },
      ],
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
