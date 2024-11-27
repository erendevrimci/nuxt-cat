// nuxt.config.ts
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss'
  ],
  pinia: {
    autoImports: [
      'defineStore',
      'storeToRefs'
    ]
  },
  imports: {
    dirs: ['./stores']
  },
  tailwindcss: {
    configPath: '~/tailwind.config.ts'
  },
  runtimeConfig: {
    public: {
      catApiKey: process.env.CAT_API_KEY
    }
  },
  nitro: {
    routeRules: {
      '/api/cats': { proxy: 'https://api.thecatapi.com/v1/images/search' }
    }
  }
})