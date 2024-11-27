<template>
  <div class="min-h-screen flex items-center justify-center bg-white p-4">
    <!-- Welcome Section -->
    <div v-if="!showAuthCard" class="text-center space-y-6">
      <h1 class="text-4xl font-light text-gray-800">Welcome to Kitty Randomizer</h1>
      <p class="text-gray-600">Your daily dose of cat cuteness!</p>
      <button 
        @click="showAuthCard = true"
        class="relative px-8 py-3 text-sm font-medium text-gray-800 border border-gray-300 rounded-lg 
               hover:border-transparent transition-all duration-300 overflow-hidden group"
      >
        <span class="relative z-10">Sign In to Start</span>
        <div class="absolute inset-0 -z-0 bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                    animate-gradient-x"></div>
      </button>
    </div>

    <!-- Auth Card -->
    <div v-else class="w-full max-w-sm perspective">
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

            <div v-if="authStore.authError && !authStore.isSignUpMode" 
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
            <p class="text-sm text-gray-600">
              Need an account? 
              <button 
                @click="authStore.toggleAuthMode()" 
                class="text-purple-600 hover:text-purple-800 font-medium transition-all duration-300
                       hover:glow-purple-sm"
              >
                Sign up
              </button>
            </p>
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
            <div class="text-sm">
              <span class="text-gray-600">Already have an account?</span>
              <button 
                @click="authStore.toggleAuthMode()" 
                class="ml-1 text-blue-600 hover:text-blue-800 font-medium transition-all duration-300
                       hover:glow-blue-sm relative group"
              >
                Flip back to Sign In
                <span class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 scale-x-0 
                           group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </button>
            </div>
          </div>

          <!-- Decorative elements -->
          <div class="absolute top-0 right-0 w-20 h-20 bg-blue-100 rounded-full -mr-10 -mt-10 opacity-50"></div>
          <div class="absolute bottom-0 left-0 w-16 h-16 bg-indigo-100 rounded-full -ml-8 -mb-8 opacity-50"></div>
        </div>
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
const showAuthCard = ref(false)
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

@keyframes gradient-x {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.animate-gradient-x {
  animation: gradient-x 3s linear infinite;
  background-size: 200% 100%;
}

.hover\:glow-purple-sm:hover {
  filter: drop-shadow(0 0 0.5rem theme('colors.purple.300'));
}
</style>
