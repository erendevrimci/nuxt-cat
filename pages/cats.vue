<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 space-y-6 border border-blue-100">
      <div class="text-center">
        <h1 class="text-3xl font-extrabold text-blue-900 mb-4">Kitty Randomizer</h1>
        <p class="text-gray-600 mb-6">Discover adorable cats with a single click!</p>
      </div>

      <div class="flex flex-col items-center space-y-4">
        <button 
          @click="fetchCat" 
          :disabled="catStore.loading"
          class="w-full py-3 bg-blue-600 text-white rounded-lg 
                 hover:bg-blue-700 transition-colors duration-300 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 
                 disabled:opacity-50 disabled:cursor-not-allowed 
                 flex items-center justify-center space-x-2"
        >
          <span v-if="catStore.loading">Loading...</span>
          <span v-else>Fetch Random Cat</span>
        </button>

        <div 
          v-if="catStore.currentCatImage" 
          class="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-md"
        >
          <img 
            :src="catStore.currentCatImage" 
            alt="Random Cat" 
            class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        <p 
          v-if="catStore.error" 
          class="text-red-500 text-sm text-center"
        >
          {{ catStore.error }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})

const catStore = useCatStore()

const fetchCat = async () => {
  try {
    await catStore.fetchCatImage()
  } catch (error) {
    console.error('Cat fetch error:', error)
  }
}
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

img {
  animation: fadeIn 0.5s ease-out;
}
</style>
