// stores/auth.ts
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as { username: string } | null,
    isAuthenticated: false
  }),
  actions: {
    login(username: string, password: string) {
      // Simulate backend login
      if (username && password) {
        this.user = { username }
        this.isAuthenticated = true
        return true
      }
      return false
    },
    logout() {
      this.user = null
      this.isAuthenticated = false
    }
  }
})