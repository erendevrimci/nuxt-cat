// stores/auth.ts
import { defineStore } from 'pinia'
import { AuthRepository } from '../repositories/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as { username: string } | null,
    isAuthenticated: false,
    authError: null as string | null,
    isSignUpMode: false,
    signUpMessage: '',
    showDemoCredentials: false
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
      this.signUpMessage = ""
      
      this.signUpMessage = "Seems like cutie kitties are in need of a quick sign up! 🐱"
      
      if (username && password) {
        // When "Done!" is clicked, immediately show second message
        this.showDemoCredentials = true
        this.signUpMessage = "Oh, forgot to tell you, this is just a test! Please use the credentials below to sign in 😊"
        // Replace form values with demo credentials
        return { username: 'demo', password: 'Demo123!' }
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
