import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";
import { NavBar } from "@/components/NavBar";
import "./index.css";

interface OrderItem {
  id: number;
  productId: number;
  quantity: number;
  productName?: string; // Adicionado para exibir o nome do produto
}

interface ShippingAddress {
  id: number;
  cep: string;
}

interface Order {
  id: number;
  payMethod: string;
  status: string;
  total: number;
  userId: number;
  shipAddressId: number;
  orderItems: OrderItem[];
  shippingAddress?: ShippingAddress;
}

export function UserOrdersPage() {
  const { getUserId, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchOrders = async () => {
      setLoading(true);
      try {
        // Buscar os pedidos do usuário
        const response = await api.get<Order[]>(`http://localhost:8080/orders/user/${getUserId()}`);
        const ordersWithDetails = await Promise.all(
          response.data.map(async (order) => {
            try {
              // Buscar endereço de envio
              const addressResponse = await api.get<ShippingAddress>(
                `http://localhost:8080/address/${order.shipAddressId}`
              );

              // Buscar detalhes dos produtos
              const orderItemsWithNames = await Promise.all(
                order.orderItems.map(async (item) => {
                  try {
                    const productResponse = await api.get<{ name: string }>(
                      `http://localhost:8080/products/${item.productId}`
                    );
                    return { ...item, productName: productResponse.data.name };
                  } catch (error) {
                    console.error(`❌ Erro ao buscar produto ${item.productId}:`, error);
                    return { ...item, productName: "Produto não encontrado" };
                  }
                })
              );

              return {
                ...order,
                shippingAddress: addressResponse.data,
                orderItems: orderItemsWithNames,
              };
            } catch (error) {
              console.error(`❌ Erro ao carregar detalhes do pedido #${order.id}:`, error);
              return {
                ...order,
                shippingAddress: { id: order.shipAddressId, cep: "Desconhecido" },
                orderItems: order.orderItems.map((item) => ({
                  ...item,
                  productName: "Produto não encontrado",
                })),
              };
            }
          })
        );

        setOrders(ordersWithDetails);
      } catch (error) {
        console.error("❌ Erro ao carregar pedidos:", error);
        setError("Erro ao carregar seus pedidos.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
      <NavBar />
      <div className="orders-container">
        <h2>Meus Pedidos</h2>

        {loading ? (
          <p>Carregando...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : orders.length === 0 ? (
          <p>Você ainda não tem pedidos.</p>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <h3>Pedido #{order.id}</h3>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Pagamento:</strong> {order.payMethod}</p>
                <p><strong>Total:</strong> R$ {order.total.toFixed(2)}</p>
                <p><strong>CEP do envio:</strong> {order.shippingAddress?.cep || "Não informado"}</p>
                <p><strong>Itens:</strong></p>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.id}>{item.productName} - Quantidade: {item.quantity}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
