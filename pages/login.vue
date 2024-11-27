<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <div class="w-full max-w-md bg-white shadow-md rounded-lg p-8">
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
      <div class="mb-4 p-4 bg-blue-50 rounded-md text-sm">
        <p class="font-semibold mb-2">Demo Credentials:</p>
        <p>Username: demo</p>
        <p>Password: Demo123!</p>
      </div>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <input 
          v-model="username" 
          type="text" 
          placeholder="Username" 
          required 
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input 
          v-model="password" 
          type="password" 
          placeholder="Password" 
          required 
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div v-if="error" class="text-red-500 text-sm mb-4">{{ error }}</div>
        <button 
          type="submit" 
          class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const error = ref('')
const authStore = useAuthStore()
const router = useRouter()

const handleLogin = async () => {
  try {
    error.value = ''
    const success = await authStore.login(username.value, password.value)
    if (success) {
      router.push('/dashboard')
    } else {
      error.value = 'Invalid credentials. Please use the demo credentials shown above.'
    }
  } catch (e) {
    error.value = 'An error occurred during login.'
  }
}

// Redirect if already logged in
onMounted(() => {
  if (authStore.isAuthenticated) {
    router.push('/dashboard')
  }
})

// Prevent authenticated users from accessing login page
definePageMeta({
  middleware: ['guest']
})
</script>
