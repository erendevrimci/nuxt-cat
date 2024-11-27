  // plugins/axios.ts
  export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig()
    
    nuxtApp.$axios.interceptors.request.use((request) => {
      if (request.url?.includes('/cats/search')) {
        request.headers['x-api-key'] = config.public.catApiKey
      }
      return request
    })
  })