import { ClickOutsidePlugin } from 'vue3-click-outside-directive'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(ClickOutsidePlugin)
})
