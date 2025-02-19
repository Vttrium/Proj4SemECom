import { createContext, useContext, useState, ReactNode } from "react";
import AuthService from "@/service/AuthService.ts";
import CartService from "@/service/CartService";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const isAuthenticated = AuthService.isAuthenticated();

  const login = async (email: string, password: string) => {
    try {
      const response = await AuthService.login({ email, password });
      if (response.status === 200) {
        const userData = response.data.user;
        setUser(userData);

        // 🔄 Se houver um carrinho local, mesclar com o backend
        const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
        if (localCart.length > 0) {
          await CartService.mergeLocalCart(userData.id);
          localStorage.removeItem("cart");
        }
      } else {
        throw new Error("Falha no login. Verifique suas credenciais.");
      }
    } catch (error) {
      console.error("❌ Erro ao fazer login:", error);
      throw error;
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
