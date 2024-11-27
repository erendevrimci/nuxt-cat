// stores/cat.ts
import { defineStore } from 'pinia'
import type { AxiosInstance } from 'axios'

interface CatImage {
  url: string
}

export const useCatStore = defineStore('cat', {
  state: () => ({
    currentCatImage: '' as string,
    loading: false
  }),
  actions: {
    async fetchCatImage() {
      this.loading = true
      try {
        const { $axios } = useNuxtApp() as { $axios: AxiosInstance }
        const { data } = await $axios.get<CatImage[]>('/api/cats')
        this.currentCatImage = data[0].url
      } catch (error) {
        console.error('Failed to fetch cat image:', error)
      } finally {
        this.loading = false
      }
    }
  }
})
