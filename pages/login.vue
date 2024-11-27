<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
    <div class="w-full max-w-sm perspective">
      <div 
        class="relative w-full transition-transform duration-700 transform-style-3d"
        :class="{ 'rotate-y-180': authStore.isSignUpMode }"
      >
        <!-- Sign In Side -->
        <div 
          class="bg-white shadow-lg rounded-xl p-6 relative overflow-hidden backface-hidden"
          :class="{ 'invisible': authStore.isSignUpMode }"
        >
          <h2 class="text-2xl font-semibold mb-6 text-center text-gray-800">
            Sign In
          </h2>
          
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div class="space-y-2">
              <input 
                v-model="username" 
                type="text" 
                placeholder="Username" 
                required 
                class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all text-sm"
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
              class="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-800 transition-all duration-200 text-sm font-medium"
            >
              {{ authStore.isSignUpMode ? 'Sign Up' : 'Sign In' }}
            </button>
          </form>

          <div class="mt-6 text-center">
            <button 
              @click="authStore.toggleAuthMode()" 
              class="text-gray-600 hover:text-gray-800 text-xs font-medium transition-colors"
            >
              Need an account? Sign up
            </button>
          </div>

          <!-- Decorative elements -->
          <div class="absolute top-0 right-0 w-16 h-16 bg-gray-50 rounded-full -mr-8 -mt-8 opacity-50"></div>
          <div class="absolute bottom-0 left-0 w-12 h-12 bg-gray-100 rounded-full -ml-6 -mb-6 opacity-50"></div>
        </div>

        <!-- Sign Up Side -->
        <div 
          class="absolute inset-0 bg-white shadow-lg rounded-xl p-6 backface-hidden rotate-y-180"
          :class="{ 'invisible': !authStore.isSignUpMode }"
        >
          <h2 class="text-2xl font-semibold mb-6 text-center text-gray-800">
            Sign Up
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
              Sign Up
            </button>
          </form>

          <div class="mt-6 text-center">
            <button 
              @click="authStore.toggleAuthMode()" 
              class="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
            >
              Already have an account? Sign in
            </button>
          </div>

          <!-- Decorative elements -->
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

<style scoped>
.perspective {
  perspective: 1000px;
}

.transform-style-3d {
  transform-style: preserve-3d;
}

.backface-hidden {
  backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}
</style>
