import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartService from "@/service/CartService";
import ProductService from "@/service/ProductService";
import { useAuth } from "@/context/AuthContext";
import { IProduct } from "@/commons/interfaces.ts"

interface CartItem {
  id?: number;
  userId?: number;
  productId: number;
  quantity: number;
}

const CartPage = () => {
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
        const productData: Record<number, Product> = {};
        for (const item of cart) {
          if (!productDetails[item.productId]) {
            const product = await ProductService.getProductById(item.productId);
            productData[item.productId] = product;
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
  const handleRemoveItem = async (cartItemId: number) => {
    try {
      await CartService.removeFromCart(cartItemId);
      handleCartUpdate();
    } catch (error) {
      console.error("Erro ao remover item do carrinho:", error);
    }
  };

  /**
   * Atualiza a quantidade de um item no carrinho.
   */
  const handleQuantityChange = async (cartItemId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    try {
      await CartService.updateCart(cartItemId, newQuantity);
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
      setCartItems([]); // Limpa o carrinho na tela
      alert("Compra finalizada com sucesso!");
    } catch (error) {
      console.error("Erro ao finalizar compra:", error);
    }
  };

  return (
    <div className="cart-page">
      <h1>Seu Carrinho</h1>
      {loading ? (
        <p>Carregando...</p>
      ) : cartItems.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => {
            const product = productDetails[item.productId];

            return (
              <div key={item.productId} className="cart-item">
                {product ? (
                  <>
                    <img src={product.image} alt={product.name} className="product-image" />
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <p>Preço: R$ {product.price.toFixed(2)}</p>
                      <div className="quantity-control">
                        <button onClick={() => handleQuantityChange(item.id!, item.quantity - 1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => handleQuantityChange(item.id!, item.quantity + 1)}>+</button>
                      </div>
                      <button onClick={() => handleRemoveItem(item.id!)} className="remove-button">
                        Remover
                      </button>
                    </div>
                  </>
                ) : (
                  <p>Carregando detalhes do produto...</p>
                )}
              </div>
            );
          })}
        </div>
      )}
      <button onClick={handleCheckout} disabled={cartItems.length === 0}>
        Finalizar Compra
      </button>
    </div>
  );
};

export default CartPage;
