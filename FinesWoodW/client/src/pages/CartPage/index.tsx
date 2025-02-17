import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import CartService from "@/service/CartService";
import { useAuth } from "@/context/AuthContext";
import { NavBar } from "@/components/Navbar"; // Importe a Navbar

// Definição da interface CartItem
interface CartItem {
    id: number;
    name: string;
    price: number;
    imageUrl?: string;
    quantity: number;
}

export function CartPage() {
    const { user } = useAuth();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [subtotal, setSubtotal] = useState(0);
    const [loading, setLoading] = useState(true);

    if (!user) {
        console.error("❌ ERRO: Usuário não autenticado!");
        alert("Você precisa estar logado para adicionar ao carrinho.");
        return;
    }

    useEffect(() => {
        if (user?.id) {
            loadCart();
        }
    }, [user]);

    const loadCart = async () => {
        try {
            const response = await CartService.getCart(user.id);

            console.log("📦 Dados do carrinho recebidos:", response.data); // <- LOG PARA DEBUG

            if (response.status === 200) {
                setCartItems(response.data);
                calculateSubtotal(response.data);
            }
        } catch (error) {
            console.error("❌ Erro ao carregar o carrinho", error);
        }
    };

    const calculateSubtotal = (items: CartItem[]) => {
        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setSubtotal(total);
    };

    const handleQuantityChange = async (id: number, quantity: number) => {
        const updatedCart = cartItems.map(item =>
            item.id === id ? { ...item, quantity } : item
        );
        setCartItems(updatedCart);
        calculateSubtotal(updatedCart);

        try {
            await CartService.updateCart(user.id, id, quantity);
        } catch (error) {
            console.error("❌ Erro ao atualizar a quantidade:", error);
        }
    };

    const handleRemoveFromCart = async (id: number) => {
        try {
            await CartService.removeFromCart(user.id, id);
            setCartItems(prevItems => prevItems.filter(item => item.id !== id));
            calculateSubtotal(cartItems.filter(item => item.id !== id));
        } catch (error) {
            console.error("❌ Erro ao remover item do carrinho:", error);
        }
    };

    return (
        <>
            {/* Adicionando a Navbar */}
            <NavBar />

            <div className="cart-container">
                <h2>🛒 Seu Carrinho</h2>

                {loading ? (
                    <p>🔄 Carregando carrinho...</p>
                ) : cartItems.length === 0 ? (
                    <p className="empty-cart">😕 Seu carrinho está vazio.</p>
                ) : (
                    <>
                        <div className="cart-table">
                            <div className="cart-header">
                                <span>Produto</span>
                                <span>Preço</span>
                                <span>Quantidade</span>
                                <span>Subtotal</span>
                                <span>Ação</span>
                            </div>

                            {cartItems.map(item => (
                                <div className="cart-item" key={item.id}>
                                    <div className="product-info">
                                        <img src={item.imageUrl || "/src/assets/default_product.jpg"} alt={item.name} />
                                        <span>{item.name}</span>
                                    </div>
                                    <span>R$ {item.price.toFixed(2)}</span>
                                    <select
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                                    >
                                        {[1, 2, 3, 4, 5].map(qty => (
                                            <option key={qty} value={qty}>{qty}</option>
                                        ))}
                                    </select>
                                    <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
                                    <button className="btn-remove" onClick={() => handleRemoveFromCart(item.id)}>🗑️</button>
                                </div>
                            ))}
                        </div>

                        <div className="cart-actions">
                            <Link to="/products" className="btn">🛍️ Continuar Comprando</Link>
                        </div>

                        <div className="cart-summary">
                            <h3>Resumo</h3>
                            <div className="summary-details">
                                <p>Subtotal: <span>R$ {subtotal.toFixed(2)}</span></p>
                                <p>Frete: <span>🚚 Grátis</span></p>
                                <p className="total">Total: <span>R$ {subtotal.toFixed(2)}</span></p>
                            </div>
                            <button className="btn btn-checkout">💳 Finalizar Compra</button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
