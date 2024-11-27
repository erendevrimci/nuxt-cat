// repositories/cat.ts
import type { AxiosInstance } from 'axios'

interface CatImage {
  url: string
}

export class CatRepository {
    async getCatImage() {
        const { $axios } = useNuxtApp() as { $axios: AxiosInstance }
        const { data } = await $axios.get<CatImage[]>('/api/cats/search')
        return data[0].url
    }
}
