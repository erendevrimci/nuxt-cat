// stores/cat.ts
import { defineStore } from 'pinia'

export const useCatStore = defineStore('cat', {
  state: () => ({
    currentCatImage: '' as string,
    loading: false
  }),
  actions: {
    async fetchCatImage() {
      this.loading = true
      try {
        const { data } = await useNuxtApp().$axios.get('/api/cats')
        this.currentCatImage = data[0].url
      } catch (error) {
        console.error('Failed to fetch cat image:', error)
      } finally {
        this.loading = false
      }
    }
  }
})