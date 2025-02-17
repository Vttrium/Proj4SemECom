import {ChangeEvent, useState} from "react";
import './index.css';
import {IUserSignup} from "@/commons/interfaces.ts";
import AuthService from "@/service/AuthService";
import { ButtonWithProgress } from "@/components/ButtonWithProgress";
import { Link, useNavigate } from "react-router-dom";

export function UserSignupPage () {
    const [form, setForm] = useState<IUserSignup>({
        name: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [pendingApiCall, setPendingApiCall] = useState(false);
    const [apiError, setApiError] = useState(false);
    const [apiSuccess, setApiSuccess] = useState(false);
    const navigate = useNavigate();

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setForm( (previousForm) => {
            return {
                ...previousForm,
                [name]: value,
            }
        })

        setErrors( (previousForm) => {
            return {
                ...previousForm,
                [name]: undefined,
            }
        })
    }

    const onClickSignup = async () => {
        setPendingApiCall(true);
        setApiError(false);
        const response = await AuthService.signup(form);

        if (response.status === 200 || response.status === 201) {
            // setPendingApiCall(false);
            setApiSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } else {
            if (response.data.validationErrors) {
                setErrors(response.data.validationErrors);
            }
            setApiError(true);
            setPendingApiCall(false);
        }
    }

    return (
        <main className="form-signup w-100 m-auto">
            <form>
                <div className="text-center d-flex justify-content-center">
                    <img src="/src\assets/logo.png" alt="FWW Logo" width="80" />
                </div>
                <div className="text-center">
                    <h1 className="h3 mb-3 fw-normal">
                        Novo Usuário
                    </h1>
                </div>

                <div className="form-floating">
                    <input
                        type="text"
                        className={errors.name ? "form-control is-invalid" : "form-control"}
                        placeholder="Informe o seu nome"
                        name="name"
                        id="name"
                        onChange={onChange}
                        value={form.name}
                    />
                    <label htmlFor="name">Informe o seu nome</label>
                    {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                </div>

                <div className="form-floating">
                    <input
                        type="text"
                        className={errors.email ? "form-control is-invalid" : "form-control"}
                        placeholder="Informe o seu email"
                        name="email"
                        id="email"
                        onChange={onChange}
                        value={form.email}
                    />
                    <label htmlFor="email">Informe o seu email</label>
                    {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                </div>

                <div className="form-floating">
                    <input
                        type="password"
                        className={errors.password ? "form-control is-invalid" : "form-control"}
                        placeholder="Informe a sua senha"
                        name="password"
                        id="password"
                        onChange={onChange}
                        value={form.password}
                    />
                    <label htmlFor="password">Informe a sua senha</label>
                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                </div>
                {apiError && <div className="alert alert-danger">Falha ao autenticar-se!</div>}
                {apiSuccess && <div className="alert alert-success">Cadastro realizado com sucesso!</div>}
                <div className="text-center">
                    <ButtonWithProgress
                        disabled={pendingApiCall}
                        pendingApiCall={pendingApiCall}
                        className="w-100 btn btn-lg btn-primary mb-3"
                        text="Cadastrar"
                        onClick={onClickSignup} />
                </div>
            </form>
            <div className="text-center">
                Já possui cadastro?
                <Link className="link-primary" to="/login"> Login</Link>
            </div>
        </main>
    )
}