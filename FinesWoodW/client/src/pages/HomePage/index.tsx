import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductService from "@/service/ProductService";
import CartService from "@/service/CartService";
import { useAuth } from "@/context/AuthContext";
import "./index.css";
import banner1 from "@/assets/banner1.jpg";
import banner2 from "@/assets/banner2.jpg";
import banner3 from "@/assets/banner3.jpg";
import defaultProduct from "@/assets/default_product.jpg";
import { IProduct } from "@/commons/interfaces.ts";

export function HomePage() {
  const { user } = useAuth();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [apiError, setApiError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const response = await ProductService.findAll();
    if (response.status == 200) {
      setProducts(response.data);
      setApiError("");
    } else {
      setApiError("Erro ao carregar os produtos.");
    }
  };

  const nextSlide = () => {
    if (products.length > 0) {
      setCurrentIndex((prevIndex) =>
        prevIndex + itemsPerPage >= products.length ? 0 : prevIndex + itemsPerPage
      );
    }
  };

  const prevSlide = () => {
    if (products.length > 0) {
      setCurrentIndex((prevIndex) =>
        prevIndex - itemsPerPage < 0
          ? products.length - (products.length % itemsPerPage || itemsPerPage)
          : prevIndex - itemsPerPage
      );
    }
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

    console.log("✅ Adicionando ao carrinho:", { userId: user.id, productId, quantity: 1 });

    try {
      await CartService.addToCart(user.id, productId, 1);
      alert("✅ Produto adicionado ao carrinho!");
    } catch (error) {
      console.error("❌ ERRO AO ADICIONAR AO CARRINHO:", error);
      alert("Erro ao adicionar produto ao carrinho.");
    }
  };

  return (
    <div>
      {/* Barra de Navegação */}
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src="/src/assets/logo.png" alt="Logo" className="logo" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/products">Produtos</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/address">Endereços</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/cart">Carrinho</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/login">Sair</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Banner Principal com Carrossel */}
      <div className="banner-container">
        <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={banner1} className="d-block w-100" alt="Banner 1" />
            </div>
            <div className="carousel-item">
              <img src={banner2} className="d-block w-100" alt="Banner 2" />
            </div>
            <div className="carousel-item">
              <img src={banner3} className="d-block w-100" alt="Banner 3" />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      </div>

      {/* Lista de Produtos com Carrossel */}
      <div className="products-container">
        <h2 className="text-center">Produtos em Destaque</h2>
        {apiError && <p className="error-message">{apiError}</p>}
        <div className="products-carousel">
          <button className="carousel-btn left" onClick={prevSlide}>‹</button>
          <div className="products-list">
            {products.slice(currentIndex, currentIndex + itemsPerPage).map((product) => (
              <div key={product.id} className="product-card">
                {/* ✅ Redirecionando corretamente para "ProductDetailsPage" */}
                <Link to={`/product-detail/${product.id}`}>
                  <img
                    src={product.urlImage && product.urlImage.trim() !== "" ? product.urlImage : defaultProduct}
                    alt={product.name}
                  />
                </Link>
                <h5>
                  <Link to={`/product-detail/${product.id}`}>{product.name}</Link>
                </h5>
                <p className="price">R$ {product.price.toFixed(2)}</p>
                <button onClick={() => handleAddToCart(product.id)}>Adicionar ao Carrinho</button>
              </div>
            ))}
          </div>
          <button className="carousel-btn right" onClick={nextSlide}>›</button>
        </div>
      </div>

      {/* Rodapé */}
      <footer>
        <p>&copy; 2025 FWW Loja Teste. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
