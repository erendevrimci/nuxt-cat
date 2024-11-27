<template>
  <div class="min-h-screen flex items-center justify-center bg-white p-4 relative">
    <!-- Floating Messages -->
    <div 
      v-if="authStore.signUpMessage" 
      class="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
    >
      <p 
        class="text-3xl font-light text-gray-800 whitespace-nowrap typewriter"
        :class="{ 'fast-typewriter': authStore.showDemoCredentials }"
      >
        {{ authStore.signUpMessage }}
      </p>
    </div>
    <!-- Welcome Section -->
    <div v-if="!showAuthCard" class="text-center space-y-6">
      <h1 class="text-4xl font-light text-gray-800">Welcome to KittyMizer</h1>
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
              class="w-full relative py-2 rounded-lg text-sm font-medium overflow-hidden group"
            >
              <span class="relative z-10 text-white">
                {{ authStore.isSignUpMode ? 'Sign Up' : 'Time for Some Kitty Magic! 🎩✨' }}
              </span>
              <div class="absolute inset-0 bg-black"></div>
              <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div class="absolute inset-0 bg-[radial-gradient(circle,rgba(147,51,234,0.8)_0%,transparent_70%)] 
                            animate-ink-diffuse"></div>
                <div class="absolute inset-0 bg-[radial-gradient(circle,rgba(236,72,153,0.7)_0%,transparent_70%)] 
                            animate-ink-diffuse-delayed"></div>
                <div class="absolute inset-0 bg-[radial-gradient(circle,rgba(99,102,241,0.6)_0%,transparent_70%)] 
                            animate-ink-diffuse-third"></div>
              </div>
            </button>
          </form>

          <div class="mt-6 text-center">
            <p class="text-sm text-gray-600">
              Psst! First time here? 
              <button 
                @click="authStore.toggleAuthMode()" 
                class="text-purple-600 hover:text-purple-800 font-medium transition-all duration-300
                       hover:glow-purple-sm relative group inline-block"
              >
                Sign up
                <span class="absolute bottom-0 left-0 w-full h-0.5 bg-purple-600 scale-x-0 
                           group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
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
          <h2 class="text-2xl font-semibold text-gray-800 text-center mb-4">
            Hear'em, Purrring already!
          </h2>
          
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div class="space-y-2">
              <div class="relative">
                <input 
                  v-if="!authStore.showDemoCredentials"
                  v-model="username" 
                  type="text" 
                  placeholder="Username"
                  required 
                  class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <div 
                  v-else
                  class="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 cursor-pointer"
                  @click="copyToClipboard('demo')"
                >
                  demo
                </div>
              </div>
              <div class="relative">
                <input 
                  v-if="!authStore.showDemoCredentials"
                  v-model="password" 
                  type="password" 
                  placeholder="Password"
                  required 
                  class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <div 
                  v-else
                  class="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 cursor-pointer"
                  @click="copyToClipboard('Demo123!')"
                >
                  Demo123!
                </div>
              </div>
              <div v-if="authStore.showDemoCredentials" class="text-xs text-gray-500 text-center mt-2">
                Click to copy the credentials
              </div>
            </div>

            <div v-if="authStore.authError" 
                 class="text-red-500 text-sm p-3 bg-red-50 rounded-lg border border-red-100">
              {{ authStore.authError }}
            </div>

            <div class="flex space-x-4">
              <button 
                v-if="!authStore.showDemoCredentials"
                type="submit" 
                class="flex-1 px-6 py-2 text-white rounded-lg transition-all duration-500 text-sm relative overflow-hidden button-click"
              >
                <span class="relative z-10">Done!</span>
                <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-600 transition-all duration-500"></div>
              </button>
              
              <button 
                v-else
                @click="copyToClipboard('demo\nDemo123!')"
                class="flex-1 px-6 py-2 text-white rounded-lg transition-all duration-500 text-sm relative overflow-hidden button-click"
              >
                <span class="relative z-10 opacity-0 animate-fade-in-slow">Copy Credentials</span>
                <div class="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-100 transition-colors duration-500"></div>
              </button>
              
              <button 
                @click="() => {
                  const creds = authStore.toggleAuthMode()
                  if (creds) {
                    username.value = creds.username
                    password.value = creds.password
                  }
                }" 
                class="flex-1 px-6 py-2 bg-gray-50 text-blue-600 rounded-lg hover:bg-gray-100 transition-all duration-200 text-sm
                       hover:glow-blue-sm"
              >   
                <p class="text-sm text-gray-600"> Flip back to</p>
                Sign In
              </button>
            </div>
          </form>

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

const copyToClipboard = async (text: string, type: 'username' | 'password' | 'both' = 'both') => {
  try {
    await navigator.clipboard.writeText(text)
    if (type === 'username') {
      authStore.$patch({ copiedCredentials: { ...authStore.copiedCredentials, username: text } })
    } else if (type === 'password') {
      authStore.$patch({ copiedCredentials: { ...authStore.copiedCredentials, password: text } })
    } else {
      const [username, password] = text.split('\n')
      authStore.$patch({ copiedCredentials: { username, password } })
    }
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

const handleSubmit = async () => {
  try {
    if (authStore.isSignUpMode) {
      const result = await authStore.signup(username.value, password.value)
      if (result && typeof result === 'object' && !result.preventRedirect) {
        username.value = result.username
        password.value = result.password
      }
    } else {
      const success = await authStore.login(username.value, password.value)
      if (success) {
        router.push('/dashboard')
      }
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
@keyframes typewriter {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}

.typewriter {
  overflow: hidden;
  white-space: nowrap;
  animation: 
    typewriter 2s steps(40, end);
}

.fast-typewriter {
  animation: 
    typewriter 0.7s steps(30, end);
    
}

/* Only apply fadeOut to the first message during signup */
.typewriter:not(.fast-typewriter) {
  animation: 
    typewriter 2s steps(40),
    fadeOut 1s ease-out 3s forwards;
}
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


.hover\:glow-purple-sm:hover {
  filter: drop-shadow(0 0 0.5rem theme('colors.purple.300'));
}

.hover\:glow-blue-sm:hover {
  filter: drop-shadow(0 0 0.5rem theme('colors.blue.300'));
}

.group:hover .group-hover\:scale-x-100 {
  transform: scaleX(1);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

.animate-fade-in-slow {
  animation: fadeIn 2s ease-out forwards;
}

.button-click {
  &:active {
    .absolute {
      background: #374151 !important; /* gray-700 */
      transition: background 2s ease-out;
    }
  }
}

@keyframes inkDiffuse {
  0% {
    transform: scale(0.3) translate(0, 0);
    opacity: 0;
  }
  50% {
    opacity: 0.8;
    transform: scale(2) translate(10px, -5px);
  }
  100% {
    transform: scale(3) translate(20px, -10px);
    opacity: 0;
  }
}

@keyframes inkDiffuseDelayed {
  0% {
    transform: scale(0.3) translate(0, 0);
    opacity: 0;
  }
  50% {
    opacity: 0.7;
    transform: scale(2) translate(-10px, 5px);
  }
  100% {
    transform: scale(3) translate(-20px, 10px);
    opacity: 0;
  }
}

@keyframes inkDiffuseThird {
  0% {
    transform: scale(0.3) translate(0, 0);
    opacity: 0;
  }
  50% {
    opacity: 0.6;
    transform: scale(2) translate(5px, 10px);
  }
  100% {
    transform: scale(3) translate(10px, 20px);
    opacity: 0;
  }
}

.animate-ink-diffuse {
  animation: inkDiffuse 2.5s ease-out infinite;
}

.animate-ink-diffuse-delayed {
  animation: inkDiffuseDelayed 2.5s ease-out infinite;
  animation-delay: 0.8s;
}

.animate-ink-diffuse-third {
  animation: inkDiffuseThird 2.5s ease-out infinite;
  animation-delay: 1.6s;
}
</style>
