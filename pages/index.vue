<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 space-y-6 border border-blue-100">
      <div class="text-center">
        <h1 class="text-3xl font-extrabold text-blue-900 mb-4">Welcome to Kitty Randomizer</h1>
        <p class="text-gray-600 mb-6">Your daily dose of cat cuteness!</p>
      </div>

      <div class="flex flex-col items-center space-y-4">
        <!-- Placeholder for authentication status -->
        <div class="w-full text-center">
          <NuxtLink 
            to="/cats"
            class="inline-block w-full py-3 bg-blue-600 text-white rounded-lg 
                   hover:bg-blue-700 transition-colors duration-300 
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Start Exploring Cats
          </NuxtLink>
          
          <div class="mt-4 text-sm text-gray-600">
            <p>Sign in to save your favorite cats!</p>
            <!-- Placeholder for auth buttons -->
            <div class="mt-2 space-x-4">
              <button class="text-blue-600 hover:text-blue-800">Sign In</button>
              <span class="text-gray-400">|</span>
              <button class="text-blue-600 hover:text-blue-800">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Authentication logic will be added here
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
