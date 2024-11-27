export class AuthRepository {
    async login(username: string, password: string) {
      // Simulate login API call
      return new Promise<{ success: boolean }>((resolve) => {
        // Fake validation logic
        const isValid = username.length > 0 && password.length > 0
        setTimeout(() => {
          resolve({ success: isValid })
        }, 500)
      })
    }
  }
