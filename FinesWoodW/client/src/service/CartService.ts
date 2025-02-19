import { api } from "@/lib/axios";

interface CartItem {
  id?: number; // ID opcional (somente para usuários autenticados)
  userId?: number; // Pode ser null para usuários não autenticados
  productId: number;
  quantity: number;
}

class CartService {
  private static LOCAL_CART_KEY = "cart";

  /**
   * Obtém o carrinho do usuário autenticado ou do localStorage
   */
  static async getCart(userId: number | null): Promise<CartItem[]> {
    if (userId) {
      const response = await api.get<CartItem[]>(`/cart/${userId}`);
      return response.data;
    }

    return JSON.parse(localStorage.getItem(this.LOCAL_CART_KEY) || "[]");
  }

  /**
   * Adiciona um item ao carrinho local ou na API
   */
  static async addToCart(userId: number | null, productId: number, quantity: number) {
    if (userId) {
      return api.post<CartItem>("/cart/add", { userId, productId, quantity });
    }

    const localCart: CartItem[] = JSON.parse(localStorage.getItem(this.LOCAL_CART_KEY) || "[]");
    const existingItem = localCart.find((item) => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      localCart.push({ productId, quantity });
    }

    localStorage.setItem(this.LOCAL_CART_KEY, JSON.stringify(localCart));
  }

  /**
   * Atualiza a quantidade de um item no carrinho local ou na API
   */
  static async updateCart(cartId: number | null, productId: number, quantity: number, userId: number | null) {
    if (userId && cartId) {
      return api.put(`/cart/update/${cartId}`, quantity, {
        headers: { "Content-Type": "application/json" },
      });
    }

    const localCart: CartItem[] = JSON.parse(localStorage.getItem(this.LOCAL_CART_KEY) || "[]");
    const item = localCart.find((item) => item.productId === productId);

    if (item) {
      item.quantity = quantity;
      localStorage.setItem(this.LOCAL_CART_KEY, JSON.stringify(localCart));
    }
  }

  static async clearCart(userId: number | null) {
    if (userId) {
      await api.delete(`/cart/clear/${userId}`);
    }
  }  

  /**
   * Remove um item do carrinho local ou na API
   */
  static async removeFromCart(cartId: number, productId: number | null, userId: number | null) {
    if (userId && cartId) {
      return api.delete(`/cart/remove/${cartId}`);
    }

    const localCart: CartItem[] = JSON.parse(localStorage.getItem(this.LOCAL_CART_KEY) || "[]");
    const updatedCart = localCart.filter((item) => item.productId !== productId);
    localStorage.setItem(this.LOCAL_CART_KEY, JSON.stringify(updatedCart));
  }

  /**
   * Mescla o carrinho local com o do usuário autenticado após login
   */
  static async mergeLocalCart(userId: number) {
    const localCart: CartItem[] = JSON.parse(localStorage.getItem(this.LOCAL_CART_KEY) || "[]");

    if (localCart.length > 0) {
      await api.post(`/cart/merge/${userId}`, localCart);
      localStorage.removeItem(this.LOCAL_CART_KEY);
    }
  }
}

export default CartService;
