// stores/auth.ts
import { defineStore } from 'pinia'
import { AuthRepository } from '~/repositories/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as { username: string } | null,
    isAuthenticated: false,
    authError: null as string | null,
    isSignUpMode: false
  }),
  actions: {
    async login(username: string, password: string) {
      const authRepository = new AuthRepository()
      this.authError = null

      try {
        const result = await authRepository.login(username, password)
        
        if (result.success) {
          this.user = { username }
          this.isAuthenticated = true
          return true
        } else {
          this.authError = 'Invalid credentials. Please check your username and password.'
          return false
        }
      } catch (error) {
        this.authError = 'An error occurred during login'
        console.error('Login error:', error)
        return false
      }
    },
    async signup(username: string, password: string) {
      this.authError = null
      // Simulated signup - in reality, this would call the backend
      if (username && password) {
        // Simulate successful signup
        this.authError = null
        this.isSignUpMode = false
        // Show demo credentials message after "successful" signup
        setTimeout(() => {
          this.authError = 'Account created! For this demo, please use demo/Demo123! to sign in.'
        }, 500) // Small delay to allow animation to complete
        return true
      }
      return false
    },
    logout() {
      this.user = null
      this.isAuthenticated = false
      this.authError = null
      this.isSignUpMode = false
    },
    toggleAuthMode() {
      this.isSignUpMode = !this.isSignUpMode
      this.authError = null
    }
  },
  persist: true
})
