import { createContext, useContext, useEffect, useState } from 'react'
import AuthService from '@/service/AuthService.ts'

interface AuthContextProps {
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<ResponseValues>
  logout: () => void
  getUserId: () => number | null
}

interface ResponseValues {
  status: number
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    AuthService.isAuthenticated(),
  )

  useEffect(() => {
    setIsAuthenticated(AuthService.isAuthenticated())
  }, [])

  const login = async (email: string, password: string) => {
    const response: ResponseValues = await AuthService.login({ email, password })

    if (response.status === 200) {
      setIsAuthenticated(true)
    }

    return response
  }

  const logout = () => {
    AuthService.logout()
    setIsAuthenticated(false)
  }

  const getUserId = () => {
    const storedUser = localStorage.getItem('user')
    const userId = storedUser ? JSON.parse(storedUser).id : null 

    return userId
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, getUserId }}>
      {children}
    </AuthContext.Provider>
  )
}
 
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}