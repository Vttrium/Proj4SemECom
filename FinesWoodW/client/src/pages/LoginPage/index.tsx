import { ChangeEvent, useState } from "react";
import "./index.css";
import { IUserLogin } from "@/commons/interfaces.ts";
import { ButtonWithProgress } from "@/components/ButtonWithProgress";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export function LoginPage() {
    const [form, setForm] = useState<IUserLogin>({
        email: "",
        password: "",
    });
    const { login, logout } = useAuth()

    const [pendingApiCall, setPendingApiCall] = useState(false);
    const [apiError, setApiError] = useState(false);
    const [apiSuccess, setApiSuccess] = useState(false);
    const navigate = useNavigate();

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setForm((previousForm) => ({
            ...previousForm,
            [name]: value,
        }));
    };

    const onClickLogin = async () => {
        setPendingApiCall(true);
        setApiError(false);

        try {
            logout()
            const response = await login(form.email, form.password); // ✅ Usando login do AuthService

            if (response.status === 200) { // Verifica se o login foi bem-sucedido
                setApiSuccess(true);
                setTimeout(() => {
                    navigate("/"); // ✅ Redireciona para a homepage
                }, 2000);
            } else {
                setApiError(true);
            }
        } catch (error) {
            setApiError(true);
        } finally {
            setPendingApiCall(false);
        }
    };

    return (
        <main className="form-signup w-100 m-auto">
            <form>
                <div className="text-center d-flex justify-content-center">
                    <img src="/src/assets/logo.png" alt="FWW Logo" width="80" />
                </div>
                <div className="text-center">
                    <h1 className="h3 mb-3 fw-normal">Login</h1>
                </div>

                <div className="form-floating">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Informe seu email"
                        name="email"
                        id="email"
                        onChange={onChange}
                        value={form.email}
                    />
                    <label htmlFor="email">Informe seu email</label>
                </div>

                <div className="form-floating">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Informe sua senha"
                        name="password"
                        id="password"
                        onChange={onChange}
                        value={form.password}
                    />
                    <label htmlFor="password">Informe sua senha</label>
                </div>

                {apiError && <div className="alert alert-danger">Falha ao autenticar-se!</div>}
                {apiSuccess && <div className="alert alert-success">Usuário autenticado com sucesso!</div>}

                <div className="text-center">
                    <ButtonWithProgress
                        disabled={pendingApiCall}
                        pendingApiCall={pendingApiCall}
                        className="w-100 btn btn-lg btn-primary mb-3"
                        text="Login"
                        onClick={onClickLogin}
                    />
                    <button
                        className="w-100 btn btn-lg btn-secondary"
                        onClick={() => navigate("/")}
                    >
                        Ir para a Homepage
                    </button>
                </div>
            </form>
            <div className="text-center">
                Ainda não possui cadastro? 
                <Link className="link-primary" to="/signup"> Cadastrar-se</Link>
            </div>
        </main>
    );
}
