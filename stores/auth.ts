// stores/auth.ts
import { defineStore } from 'pinia'
import { AuthRepository } from '~/repositories/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as { username: string } | null,
    isAuthenticated: false,
    loginError: null as string | null
  }),
  actions: {
    async login(username: string, password: string) {
      const authRepository = new AuthRepository()
      this.loginError = null

      try {
        const result = await authRepository.login(username, password)
        
        if (result.success) {
          this.user = { username }
          this.isAuthenticated = true
          return true
        } else {
          this.loginError = 'Invalid username or password'
          return false
        }
      } catch (error) {
        this.loginError = 'An error occurred during login'
        console.error('Login error:', error)
        return false
      }
    },
    logout() {
      this.user = null
      this.isAuthenticated = false
      this.loginError = null
    }
  },
  persist: true
})
