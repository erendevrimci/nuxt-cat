  // plugins/axios.ts
import axios from 'axios'
import { defineNuxtPlugin, useRuntimeConfig } from 'nuxt/app'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  
  const axiosInstance = axios.create()
  
  axiosInstance.interceptors.request.use((request) => {
    if (request.url?.includes('/cats/search')) {
      request.headers['x-api-key'] = config.public.catApiKey
    }
    return request
  })

  return {
    provide: {
      axios: axiosInstance
    }
  }
})
