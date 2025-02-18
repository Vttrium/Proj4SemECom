import { useEffect, useState } from "react";
import { IProduct, ICategory } from "@/commons/interfaces";
import ProductService from "@/service/ProductService";
import CategoryService from "@/service/CategoryService";
import CartService from "@/service/CartService";
import { useAuth } from "@/context/AuthContext";
import { NavBar } from "@/components/Navbar";
import "./index.css";
import { Link } from "react-router-dom";

export function ProductListPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>(""); // Estado para o campo de busca
  const [apiError, setApiError] = useState(false);
  const [apiMessage, setApiMessage] = useState("");

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  useEffect(() => {
    if (apiMessage) {
      const timer = setTimeout(() => {
        setApiMessage("");
        setApiError(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [apiMessage]);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, selectedCategory, products]); // Atualiza a lista filtrada ao mudar os filtros

  const loadProducts = async () => {
    setApiError(false);
    setApiMessage("");

    const response = await ProductService.findAll();
    if (response.status === 200) {
      setProducts(response.data);
      setFilteredProducts(response.data);
    } else {
      setApiError(true);
      setApiMessage("Erro ao carregar os produtos");
      setProducts([]);
    }
  };

  const loadCategories = async () => {
    const response = await CategoryService.findAll();
    if (response.status === 200) {
      setCategories(response.data);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) =>
          product.category &&
          product.category.id !== undefined &&
          product.category.id.toString() === selectedCategory
      );
    }

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const handleAddToCart = async (productId?: number) => {
    if (!productId) {
      console.error("❌ ERRO: ID do produto é inválido!", productId);
      alert("Erro ao adicionar ao carrinho.");
      return;
    }

    if (!user) {
      console.error("❌ ERRO: Usuário não autenticado!");
      alert("Você precisa estar logado para adicionar ao carrinho.");
      return;
    }

    try {
      await CartService.addToCart(user.id, productId, 1);
      setApiMessage("✅ Produto adicionado ao carrinho!");
      setApiError(false);
    } catch (error) {
      console.error("❌ ERRO AO ADICIONAR AO CARRINHO:", error);
      setApiError(true);
      setApiMessage("Erro ao adicionar produto ao carrinho.");
    }
  };

  return (
    <>
      <NavBar />
      <main className="product-list-container">
        <h2 className="text-center">Lista de Produtos</h2>

        {apiMessage && (
          <div className={`alert ${apiError ? "alert-danger" : "alert-success"}`}>
            {apiMessage}
          </div>
        )}

        <div className="filter-container">
          <label htmlFor="searchInput">Buscar produto:</label>
          <input
            id="searchInput"
            type="text"
            placeholder="Digite o nome do produto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <label htmlFor="categoryFilter">Filtrar por categoria:</label>
          <select
            id="categoryFilter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Todas</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id?.toString()}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <Link to={`/product-detail/${product.id}`}>
                  <img src={product.urlImage || "/placeholder.jpg"} alt={product.name} />
                </Link>
                <h3>
                  <Link to={`/product-detail/${product.id}`}>{product.name}</Link>
                </h3>
                <p className="price">R$ {product.price.toFixed(2)}</p>
                <p className="category">{product.category?.name || "Sem categoria"}</p>

                <div className="actions">
                  <button className="add-to-cart-btn btn" onClick={() => handleAddToCart(product.id)}>
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-products">Nenhum produto encontrado.</p>
          )}
        </div>
      </main>
    </>
  );
}
