import { useEffect, useState } from "react";
import {api} from "@/lib/axios.ts" // ✅ Importando AuthService
import { useAuth } from "@/context/AuthContext";

interface Address {
  id: number;
  cep: string;
  state: string;
  city: string;
  complement: string | null;
  logradouro: string;
  number: string;
}

export function AddressListPage() {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAddresses = async () => {
      if (!user) return;

      setLoading(true);
      setError(null);

      try {
        const response = await api.get<Address[]>(`/address/user/${user.id}`); // ✅ Usando AuthService.api
        setAddresses(response.data);
      } catch (err) {
        setError("Erro ao carregar endereços.");
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [user]);

  return (
    <div className="container">
      <h1>Meus Endereços</h1>

      {loading && <p>Carregando...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && addresses.length === 0 && <p>Você não possui endereços cadastrados.</p>}

      <div className="list-group">
        {addresses.map((address) => (
          <div key={address.id} className="list-group-item">
            <p><strong>CEP:</strong> {address.cep}</p>
            <p><strong>Estado:</strong> {address.state}</p>
            <p><strong>Cidade:</strong> {address.city}</p>
            <p><strong>Logradouro:</strong> {address.logradouro}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
