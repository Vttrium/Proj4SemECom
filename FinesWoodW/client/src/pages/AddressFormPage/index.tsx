import { useState, ChangeEvent, FormEvent } from "react";
import axiosInstance from "@/lib/axios";
import { useAuth } from "@/context/AuthContext";

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
  const { user } = useAuth();
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post<AddressResponse>("/address", {
        ...form,
        userId: user?.id,
      });

      setAddress(response.data);
    } catch (err) {
      setError("Erro ao cadastrar endereço. Verifique os dados e tente novamente.");
    } finally {
      setLoading(false);
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
          <label>Número</label>
          <input type="text" name="number" value={form.number} onChange={handleChange} className="form-control" required />
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
          <p><strong>Complemento:</strong> {address.complement || "Nenhum"}</p>
          <p><strong>Logradouro:</strong> {address.logradouro}</p>
          <p><strong>User ID:</strong> {address.userId}</p>
        </div>
      )}
    </div>
  );
}
