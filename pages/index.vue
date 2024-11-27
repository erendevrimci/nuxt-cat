<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 space-y-6 border border-blue-100">
      <div class="text-center">
        <h1 class="text-3xl font-extrabold text-blue-900 mb-4">Welcome to Kitty Randomizer</h1>
        <p class="text-gray-600 mb-6">Your daily dose of cat cuteness!</p>
      </div>

      <!-- Show login form when showLogin is true -->
      <div v-if="showLogin" class="space-y-4">
        <div class="space-y-2">
          <input
            v-model="username"
            type="text"
            placeholder="Username"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <p v-if="authStore.loginError" class="text-red-500 text-sm text-center">
          {{ authStore.loginError }}
        </p>

        <button
          @click="handleLogin"
          :disabled="isLoading"
          class="w-full py-3 bg-blue-600 text-white rounded-lg 
                 hover:bg-blue-700 transition-colors duration-300 
                 focus:outline-none focus:ring-2 focus:ring-blue-500
                 disabled:opacity-50"
        >
          {{ isLoading ? 'Signing in...' : 'Sign In' }}
        </button>

        <button
          @click="showLogin = false"
          class="w-full text-sm text-gray-600 hover:text-gray-800"
        >
          Back to Welcome
        </button>

        <div class="text-xs text-center text-gray-500 mt-4">
          Demo credentials: demo / Demo123!
        </div>
      </div>

      <!-- Show welcome content when not showing login -->
      <div v-else class="flex flex-col items-center space-y-4">
        <div class="w-full text-center">
          <button 
            @click="showLogin = true"
            class="inline-block w-full py-3 bg-blue-600 text-white rounded-lg 
                   hover:bg-blue-700 transition-colors duration-300 
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign In to Start
          </button>
          
          <div class="mt-4 text-sm text-gray-600">
            <p>Sign in to explore amazing cat pictures!</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
const router = useRouter()

const showLogin = ref(false)
const username = ref('')
const password = ref('')
const isLoading = ref(false)

// Redirect to cats if already authenticated
watchEffect(() => {
  if (authStore.isAuthenticated) {
    router.push('/cats')
  }
})

async function handleLogin() {
  if (!username.value || !password.value) {
    authStore.loginError = 'Please enter both username and password'
    return
  }

  isLoading.value = true
  try {
    const success = await authStore.login(username.value, password.value)
    if (success) {
      router.push('/cats')
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fade-in {
  animation: fadeIn 0.5s ease-out;
}
</style>
