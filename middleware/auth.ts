export default defineNuxtRouteMiddleware((to, from) => {                      
  const { isAuthenticated } = useAuthStore()                                  
                                                                              
  if (!isAuthenticated && to.path !== '/login') {                             
    return navigateTo('/login')                                               
  }                                                                           
                                                                              
  if (isAuthenticated && to.path === '/login') {                              
    return navigateTo('/cats')                                                
  }                                                                           
})  