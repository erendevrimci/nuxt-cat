export class AuthRepository {
    async login(username: string, password: string) {
      // Simulate login API call with more robust validation
      return new Promise<{ success: boolean }>((resolve, reject) => {
        try {
          // More complex validation
          const isValid = 
            username.length >= 3 && 
            password.length >= 6 && 
            /[A-Z]/.test(password) && 
            /[0-9]/.test(password)

          setTimeout(() => {
            resolve({ success: isValid })
          }, 500)
        } catch (error) {
          reject(error)
        }
      })
    }
}
