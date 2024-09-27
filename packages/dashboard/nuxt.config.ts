// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir: 'src/',
  modules: [
    "@nuxt/ui"
  ],
  colorMode: {
    classSuffix: ''
  },
  nitro: {
    experimental: {
      openAPI: true,
      websocket: true
    },
  },
  compatibilityDate: "2024-07-10"
})