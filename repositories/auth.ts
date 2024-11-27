export class AuthRepository {
    async login(username: string, password: string) {
      // Simulate login API call with demo credentials
      return new Promise<{ success: boolean }>((resolve, reject) => {
        try {
          const isValid = 
            username === 'demo' && 
            password === 'Demo123!'

          setTimeout(() => {
            resolve({ success: isValid })
          }, 500)
        } catch (error) {
          reject(error)
        }
      })
    }
}
