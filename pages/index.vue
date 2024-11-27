<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Welcome to the Cat App</h1>
    <div class="flex flex-col items-center space-y-4">
      <p>Click the button to fetch a random cat image!</p>
      <button 
        @click="fetchCat" 
        :disabled="catStore.loading"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {{ catStore.loading ? 'Loading...' : 'Fetch Cat' }}
      </button>
      
      <div v-if="catStore.currentCatImage" class="mt-4">
        <img 
          :src="catStore.currentCatImage" 
          alt="Random Cat" 
          class="max-w-full h-auto rounded-lg shadow-md"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const catStore = useCatStore()

const fetchCat = () => {
  catStore.fetchCatImage()
}
</script>
