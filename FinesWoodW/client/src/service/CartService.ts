import axios from "axios";

const API_URL = "http://localhost:8080/cart";

const CartService = {
  async addToCart(userId: number, productId: number, quantity: number) {
    const token = localStorage.getItem("token");
    return axios.post(
      `${API_URL}/add`,
      { userId, productId, quantity },
      {
        headers: {
          Authorization: `Bearer ${token ? JSON.parse(token) : ""}`,
        },
      }
    );
  },

  async getCart(userId: number) {
    const token = localStorage.getItem("token");
    return axios.get(`${API_URL}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token ? JSON.parse(token) : ""}`,
      },
    });
  },

  async updateCart(userId: number, productId: number, quantity: number) {
    const token = localStorage.getItem("token");
    return axios.put(
      `${API_URL}/update`,
      { userId, productId, quantity },
      {
        headers: {
          Authorization: `Bearer ${token ? JSON.parse(token) : ""}`,
        },
      }
    );
  },

  async removeFromCart(userId: number, productId: number) {
    const token = localStorage.getItem("token");
    return axios.delete(`${API_URL}/remove/${userId}/${productId}`, {
      headers: {
        Authorization: `Bearer ${token ? JSON.parse(token) : ""}`,
      },
    });
  },
};

export default CartService;
