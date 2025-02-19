import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartService from "@/service/CartService";
import ProductService from "@/service/ProductService";
import { useAuth } from "@/context/AuthContext";
import { IProduct } from "@/commons/interfaces";
import "./index.css";
import { NavBar } from "@/components/Navbar";


interface CartItem {
  id?: number;
  userId?: number;
  productId: number;
  quantity: number;
}

export function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [productDetails, setProductDetails] = useState<Record<number, IProduct>>({});
  const [loading, setLoading] = useState(true);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  /**
   * Carrega os itens do carrinho e os detalhes dos produtos.
   */
  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const userId = user?.id || null;
        const cart = await CartService.getCart(userId);
        setCartItems(cart);

        // Buscar detalhes dos produtos
        const productData: Record<number, IProduct> = {};
        for (const item of cart) {
          if (!productDetails[item.productId]) {
            const response = await ProductService.findById(item.productId);
            if (response.status === 200) {
              productData[item.productId] = response.data;
            }
          }
        }
        setProductDetails((prev) => ({ ...prev, ...productData }));
      } catch (error) {
        console.error("Erro ao carregar o carrinho:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user, isAuthenticated]);

  /**
   * Atualiza os itens do carrinho.
   */
  const handleCartUpdate = async () => {
    try {
      const userId = user?.id || null;
      const updatedCart = await CartService.getCart(userId);
      setCartItems(updatedCart);
    } catch (error) {
      console.error("Erro ao atualizar carrinho:", error);
    }
  };

  /**
   * Remove um item do carrinho.
   */
  const handleRemoveItem = async (cartId: number, productId: number) => {
    try {
      await CartService.removeFromCart(cartId, productId, user?.id || null);
      handleCartUpdate();
    } catch (error) {
      console.error("Erro ao remover item do carrinho:", error);
    }
  };

  /**
   * Atualiza a quantidade de um item no carrinho.
   */
  const handleQuantityChange = async (cartId: number, productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(cartId, productId);
      return;
    }
    try {
      await CartService.updateCart(cartId, productId, newQuantity, user?.id || null);
      handleCartUpdate();
    } catch (error) {
      console.error("Erro ao atualizar quantidade do item:", error);
    }
  };

  /**
   * Finaliza a compra, exigindo login se necessário.
   */
  const handleCheckout = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      await CartService.mergeLocalCart(user!.id);
      navigate("/orders/escape");
    } catch (error) {
      console.error("Erro ao finalizar compra:", error);
    }
  };

  return (
    <>
      <NavBar /> {/* Navbar sempre visível no topo */}
      <div className="cart-page">
        <h1>Seu Carrinho</h1>
        {loading ? (
          <p>Carregando...</p>
        ) : cartItems.length === 0 ? (
          <p>Seu carrinho está vazio.</p>
        ) : (
          <>
            <table className="cart-items">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Preço</th>
                  <th>Quantidade</th>
                  <th>Subtotal</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => {
                  const product = productDetails[item.productId];
    
                  console.log(item);
                  return (
                    <tr key={item.id} className="cart-item">
                      <td>
                        {product ? (
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <img src={product.urlImage} alt={product.name} className="product-image" />
                            <span className="product-info">{product.name}</span>
                          </div>
                        ) : (
                          "Carregando..."
                        )}
                      </td>
                      <td>R$ {product?.price.toFixed(2)}</td>
                      <td>
                        <div className="quantity-control">
                          <button onClick={() => handleQuantityChange(item.id!, item.productId, item.quantity - 1)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => handleQuantityChange(item.id!, item.productId, item.quantity + 1)}>+</button>
                        </div>
                      </td>
                      <td>R$ {(product?.price * item.quantity).toFixed(2)}</td>
                      <td>
                        <button onClick={() => handleRemoveItem(item.id!, item.productId)} className="remove-button">
                          Remover
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
  
            <div className="cart-summary">
              <p>Subtotal: R$ {cartItems.reduce((acc, item) => acc + (productDetails[item.productId]?.price || 0) * item.quantity, 0).toFixed(2)}</p>
              <p>Frete: Grátis</p>
              <p>Total: R$ {cartItems.reduce((acc, item) => acc + (productDetails[item.productId]?.price || 0) * item.quantity, 0).toFixed(2)}</p>
              <button onClick={handleCheckout} className="checkout-button" disabled={cartItems.length === 0}>
                Finalizar Compra
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );    
}
