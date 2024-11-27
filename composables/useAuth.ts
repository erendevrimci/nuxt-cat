import { useAuthStore } from '~/stores/auth'

export const useAuth = () => {
  const authStore = useAuthStore()

  const signOut = async () => {
    await authStore.logout()
  }

  return {
    signOut
  }
}
