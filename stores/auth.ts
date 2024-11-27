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
    showDemoCredentials: false,
    hasShownMessage: false,
    messageState: 'initial' as 'initial' | 'first' | 'second',
    copiedCredentials: { username: 'demo', password: 'Demo123!' }
  }),
  actions: {
    toggleAuthMode() {
      this.isSignUpMode = !this.isSignUpMode
      this.authError = null
      
      // If flipping back to sign in and we have copied credentials, keep them
      if (!this.isSignUpMode && this.copiedCredentials.username) {
        return this.copiedCredentials
      }
      return null
    },
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
      
      if (this.messageState === 'initial') {
        this.signUpMessage = "Seems like cutie kitties are in need of a quick sign up! 🐱"
        this.messageState = 'first'
        this.hasShownMessage = true
      }
      
      if (username && password) {
        // When "Done!" is clicked, immediately show second message
        this.showDemoCredentials = true
        if (this.messageState === 'first') {
          this.signUpMessage = "Oh, forgot to tell you, this is just a test! Please use the credentials below to sign in 😊"
          this.messageState = 'second'
        }
        // Return credentials without authenticating
        return { username: 'demo', password: 'Demo123!', preventRedirect: true }
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
      
      // If flipping back to sign in and we have copied credentials, keep them
      if (!this.isSignUpMode && this.copiedCredentials.username) {
        return this.copiedCredentials
      }
      return null
    }
  },
  persist: true
})
