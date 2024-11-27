// repositories/cat.ts
import type { AxiosResponse } from 'axios'

interface CatImage {
  url: string
}

export class CatRepository {
    async getCatImage() {
        const { data } = await useNuxtApp().$axios.get<CatImage[]>('/api/cats/search')
        return data[0].url
    }
}
