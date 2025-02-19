import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Select, Spinner } from "@chakra-ui/react";
import ProductService from "@/service/ProductService";
import CartService from "@/service/CartService";
import { useAuth } from "@/context/AuthContext";
import { IProduct } from "@/commons/interfaces";
import "./index.css";

export function ProductDetailsPage() {
  const { id } = useParams();
  const { getUserId, isAuthenticated } = useAuth();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      loadProduct(parseInt(id));
    }
  }, [id]);

  const loadProduct = async (productId: number) => {
    const response = await ProductService.findById(productId);
    if (response.status === 200) {
      setProduct(response.data);
    }
    setLoading(false);
  };

  const handleAddToCart = async () => {
    if (!product || product.id === undefined) {
      alert("Erro ao adicionar produto ao carrinho.");
      return;
    }

    try {
      if (isAuthenticated) {
        // Usuário autenticado: Adiciona ao carrinho no servidor
        await CartService.addToCart(getUserId(), product.id, quantity);
      } else {
        // Usuário NÃO autenticado: Armazena no localStorage
        const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
        localCart.push({ productId: product.id, quantity });
        localStorage.setItem("cart", JSON.stringify(localCart));
      }

      alert("✅ Produto adicionado ao carrinho!");
    } catch (error) {
      console.error("❌ ERRO AO ADICIONAR AO CARRINHO:", error);
      alert("Erro ao adicionar produto ao carrinho.");
    }
  };

  if (loading) {
    return <Spinner size="xl" />;
  }

  if (!product) {
    return <p>Produto não encontrado.</p>;
  }

  return (
    <div>
      {/* ✅ Navbar */}
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
              <li className="nav-item"><Link className="nav-link" to="/categories">Categorias</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/cart">Carrinho</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/login">Sair</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* ✅ Detalhes do Produto */}
      <div className="product-details">
        <div className="image-section">
          <img src={product.urlImage} alt={product.name} className="product-image" />
        </div>
        <div className="info-section">
          <h1 className="product-title">{product.name}</h1>
          <p className="price">R$ {product.price.toFixed(2)}</p>
          <p className="product-description">{product.description}</p>
          <div className="actions">
            <Select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} className="quantity-select">
              {[1, 2, 3, 4, 5].map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </Select>
            <Button colorScheme="blue" className="add-to-cart-button" onClick={handleAddToCart}>
              Adicionar ao Carrinho
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
