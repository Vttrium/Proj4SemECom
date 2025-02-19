import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/axios"; // ✅ Certifique-se de que esta importação está correta
interface AddressRequest {
  state: string;
  city: string;
  street: string;
  number: string;
  logradouro: string;
  cep: string;
}

interface AddressResponse {
  id: number;
  cep: string;
  state: string;
  city: string;
  complement: string | null;
  logradouro: string;
  userId: number;
}

export function AddressPage() {
  const [form, setForm] = useState<AddressRequest>({
    state: "",
    city: "",
    street: "",
    number: "",
    logradouro: "",
    cep: "",
  });

  const [address, setAddress] = useState<AddressResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<{ id: number } | null>(null);

  const navigate = useNavigate();

  // Obtém o usuário autenticado de forma segura
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Erro ao recuperar usuário:", e);
      }
    }
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await api.post<AddressResponse>("/address", {
        ...form,
        userId: user?.id, // Usa o ID do usuário autenticado
      });

      setAddress(response.data);
    } catch (err) {
      setError("Erro ao cadastrar endereço. Verifique os dados e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleRedirect = () => {
    if (user?.id) {
      navigate(`/address/user/${user.id}`);
    }
  };

  return (
    <div className="container">
      <h1>Cadastro de Endereço</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>CEP</label>
          <input type="text" name="cep" value={form.cep} onChange={handleChange} className="form-control" required />
        </div>

        <div className="form-group">
          <label>Estado</label>
          <input type="text" name="state" value={form.state} onChange={handleChange} className="form-control" required />
        </div>

        <div className="form-group">
          <label>Cidade</label>
          <input type="text" name="city" value={form.city} onChange={handleChange} className="form-control" required />
        </div>

        <div className="form-group">
          <label>Rua</label>
          <input type="text" name="street" value={form.street} onChange={handleChange} className="form-control" required />
        </div>

        <div className="form-group">
          <label>Logradouro</label>
          <input type="text" name="logradouro" value={form.logradouro} onChange={handleChange} className="form-control" required />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar Endereço"}
        </button>
      </form>

      {error && <div className="alert alert-danger mt-3">{error}</div>}

      {address && (
        <div className="mt-4">
          <h2>Endereço Cadastrado</h2>
          <p><strong>ID:</strong> {address.id}</p>
          <p><strong>CEP:</strong> {address.cep}</p>
          <p><strong>Estado:</strong> {address.state}</p>
          <p><strong>Cidade:</strong> {address.city}</p>
          <p><strong>Logradouro:</strong> {address.logradouro}</p>
          <p><strong>User ID:</strong> {address.userId}</p>
        </div>
      )}

      {user?.id && (
        <button onClick={handleRedirect} className="btn btn-secondary mt-3">
          Endereços cadastrados
        </button>
      )}
    </div>
  );
}
