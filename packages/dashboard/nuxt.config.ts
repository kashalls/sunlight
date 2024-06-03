// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir: 'src/',
  modules: ['nuxt-icon', "@nuxtjs/tailwindcss", "shadcn-nuxt", "@nuxtjs/color-mode"],
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './src/components/ui'
  },
  colorMode: {
    classSuffix: ''
  },
  nitro: {
    experimental: {
      websocket: true
    }
  }
})