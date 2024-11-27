// stores/cat.ts
import { defineStore } from 'pinia'
import type { AxiosInstance } from 'axios'

interface CatImage {
  id: string
  url: string
  width: number
  height: number
}

export const useCatStore = defineStore('cat', {
  state: () => ({
    currentCatImage: '' as string,
    loading: false,
    error: null as string | null
  }),
  actions: {
    async fetchCatImage() {
      this.loading = true
      this.error = null

      try {
        const { $axios } = useNuxtApp() as { $axios: AxiosInstance }
        const { data } = await $axios.get<CatImage[]>('/api/cats')
        
        if (data.length === 0) {
          throw new Error('No cat images found')
        }

        this.currentCatImage = data[0].url
      } catch (error: unknown) {
        const errorMessage = error instanceof Error 
          ? error.message 
          : 'An unexpected error occurred'
        
        this.error = errorMessage
        console.error('Failed to fetch cat image:', error)
      } finally {
        this.loading = false
      }
    }
  }
})
