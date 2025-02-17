import axios from "axios";

const API_BASE_URL = "https://localhost:8080"; // Ajuste conforme necessário

const ProductService = {
  getProducts: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      throw error;
    }
  },
};

export default ProductService;
