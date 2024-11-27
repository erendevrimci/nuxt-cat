// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    ['@pinia/nuxt', {
      autoImports: ['defineStore', 'storeToRefs']
    }]
  ],
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
  },
  compatibilityDate: '2024-11-27',
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    }
  }
})
