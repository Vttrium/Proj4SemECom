import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartService from "@/service/CartService";
import ProductService from "@/service/ProductService";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/axios";
import { IProduct } from "@/commons/interfaces";
import "./index.css";
import { NavBar } from "@/components/NavBar";

interface CartItem {
  id?: number;
  userId?: number;
  productId: number;
  quantity: number;
}

interface Address {
  id: number;
  cep: string;
}

export function OrderPage() {
  const { getUserId, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [productDetails, setProductDetails] = useState<Record<number, IProduct>>({});
  const [payMethod, setPayMethod] = useState("Credit Card");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Carrega os endereços do usuário.
   */
  useEffect(() => {
    const fetchAddresses = async () => {
      if (!isAuthenticated) return;
      try {
        const response = await api.get<Address[]>(`http://localhost:8080/address/user/${getUserId()}`);
        setAddresses(response.data);
        if (response.data.length > 0) {
          setSelectedAddressId(response.data[0].id); // Seleciona o primeiro endereço por padrão
        }
      } catch (error) {
        console.error("Erro ao carregar endereços:", error);
        setError("Erro ao carregar os endereços.");
      }
    };

    fetchAddresses();
  }, []);

  /**
   * Carrega os itens do carrinho e os detalhes dos produtos.
   */
  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const userId = getUserId() || null;
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

        // Calcular o total do pedido
        const orderTotal = cart.reduce(
          (acc, item) => acc + (productData[item.productId]?.price || 0) * item.quantity,
          0
        );
        setTotal(orderTotal);
      } catch (error) {
        console.error("Erro ao carregar o carrinho:", error);
        setError("Erro ao carregar os itens do pedido.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [isAuthenticated]);

  /**
   * Envia o pedido para o backend e limpa o carrinho.
   */
  const handlePlaceOrder = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
  
    if (!selectedAddressId) {
      alert("Selecione um endereço para o envio.");
      return;
    }
  
    const orderItems = cartItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));
  
    const orderData = {
      payMethod,
      status: "Pending",
      userId: getUserId(),
      shipAddressId: selectedAddressId,
      total,
      orderItems,
    };
  
    try {
      setLoading(true);
      await api.post("http://localhost:8080/orders/escape", orderData);
      alert("✅ Pedido realizado com sucesso!");
  
      // 🔥 Esvazia o carrinho corretamente
      await CartService.clearCart(getUserId() ?? null);
      setCartItems([]);
      localStorage.removeItem("cart");
  
      // ✅ Redireciona para a tela de pedidos do usuário
      navigate(`/orders/user/${getUserId()}`);
    } catch (error) {
      console.error("❌ Erro ao criar pedido:", error);
      setError("Erro ao processar o pedido. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };  

  return (
    <>
      <NavBar />
      <div className="order-container">
        <h2>Finalizar Pedido</h2>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <p>Carregando...</p>
        ) : cartItems.length === 0 ? (
          <p>Seu carrinho está vazio.</p>
        ) : (
          <>
            <div className="order-section">
              <label>Método de Pagamento:</label>
              <select value={payMethod} onChange={(e) => setPayMethod(e.target.value)}>
                <option value="Credit Card">Cartão de Crédito</option>
                <option value="Pix">Pix</option>
                <option value="Boleto">Boleto</option>
              </select>
            </div>

            <div className="order-section">
              <label>Endereço de Entrega:</label>
              <select value={selectedAddressId || ""} onChange={(e) => setSelectedAddressId(Number(e.target.value))}>
                {addresses.map((address) => (
                  <option key={address.id} value={address.id}>
                    CEP: {address.cep}
                  </option>
                ))}
              </select>
            </div>

            <div className="order-section">
              <h3>Itens do Pedido:</h3>
              <ul>
                {cartItems.map((item) => (
                  <li key={item.productId}>
                    {productDetails[item.productId]?.name} - Quantidade: {item.quantity}
                  </li>
                ))}
              </ul>
            </div>

            <div className="order-summary">
              <h3>Total: R$ {total.toFixed(2)}</h3>
            </div>

            <button className="order-btn" onClick={handlePlaceOrder} disabled={loading}>
              {loading ? "Processando..." : "Confirmar Pedido"}
            </button>
          </>
        )}
      </div>
    </>
  );
}
