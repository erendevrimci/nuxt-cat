// repositories/cat.ts
export class CatRepository {
    async getCatImage() {
        const { data } = await useNuxtApp().$axios.get('/api/cats/search')
        return data[0].url
    }
}