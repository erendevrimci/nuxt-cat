<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
    <div class="w-full max-w-md">
      <div class="bg-white shadow-xl rounded-2xl p-8 relative overflow-hidden">
        <div class="relative z-10">
          <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">
            {{ authStore.isSignUpMode ? 'Create Account' : 'Welcome Back' }}
          </h2>
          
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div class="space-y-2">
              <input 
                v-model="username" 
                type="text" 
                placeholder="Username" 
                required 
                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <input 
                v-model="password" 
                type="password" 
                placeholder="Password" 
                required 
                class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            <div v-if="authStore.authError" 
                 class="text-red-500 text-sm p-3 bg-red-50 rounded-lg border border-red-100">
              {{ authStore.authError }}
            </div>

            <button 
              type="submit" 
              class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transform hover:scale-[1.02] transition-all duration-200"
            >
              {{ authStore.isSignUpMode ? 'Sign Up' : 'Sign In' }}
            </button>
          </form>

          <div class="mt-6 text-center">
            <button 
              @click="authStore.toggleAuthMode()" 
              class="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
            >
              {{ authStore.isSignUpMode 
                ? 'Already have an account? Sign in' 
                : 'Need an account? Sign up' }}
            </button>
          </div>
        </div>

        <!-- Decorative background elements -->
        <div class="absolute top-0 right-0 w-20 h-20 bg-blue-100 rounded-full -mr-10 -mt-10 opacity-50"></div>
        <div class="absolute bottom-0 left-0 w-16 h-16 bg-indigo-100 rounded-full -ml-8 -mb-8 opacity-50"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const authStore = useAuthStore()
const router = useRouter()

const handleSubmit = async () => {
  try {
    const success = authStore.isSignUpMode
      ? await authStore.signup(username.value, password.value)
      : await authStore.login(username.value, password.value)
    
    if (success && !authStore.isSignUpMode) {
      router.push('/dashboard')
    }
  } catch (e) {
    console.error('Auth error:', e)
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
