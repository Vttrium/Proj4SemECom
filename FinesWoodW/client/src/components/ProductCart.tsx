import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import CartService from "@/service/CartService.ts";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
}

export function ProductCard({ id, name, price, imageUrl }: ProductCardProps) {
  const authContext = useContext(AuthContext); // Pegamos o contexto
  const user = authContext?.user; // Aplicamos optional chaining para evitar erro

  const handleAddToCart = async () => {
    if (!user) {
      alert("Você precisa estar logado para adicionar ao carrinho.");
      return;
    }

    try {
      await CartService.addToCart(user.id, id, 1);
      alert("Produto adicionado ao carrinho!");
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho", error);
    }
  };

  return (
    <div className="product-card">
      <img src={imageUrl || "/src/assets/default_product.jpg"} alt={name} />
      <h5>{name}</h5>
      <p className="price">R$ {price.toFixed(2)}</p>
      <button onClick={handleAddToCart}>Adicionar ao Carrinho</button>
    </div>
  );
}
