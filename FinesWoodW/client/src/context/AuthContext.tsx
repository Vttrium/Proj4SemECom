import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axiosInstance from "@/lib/axios";
import CartService from "@/service/CartService";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  // Carregar usuário autenticado ao iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post("/auth/login", { email, password });
      const userData = response.data;

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      // 🔄 Se houver um carrinho local, enviar para o backend
      const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
      if (localCart.length > 0) {
        await CartService.mergeLocalCart(userData.id);
        localStorage.removeItem("cart"); // Limpa o carrinho local após a fusão
      }
    } catch (error) {
      console.error("❌ Erro ao fazer login:", error);
      throw new Error("Falha no login. Verifique suas credenciais.");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
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
