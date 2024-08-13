// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir: 'src/',
  modules: [
    "shadcn-nuxt",
    "@nuxt/ui"
  ],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './src/components/uia'
  },
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