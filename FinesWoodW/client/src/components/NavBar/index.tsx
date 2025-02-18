import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import AuthService from "@/service/AuthService";
import "./index.css";

export function NavBar() {
  const navigate = useNavigate();

  const onClickLogout = () => {
    AuthService.logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">Produtos</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/address">Endereços</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/cart">Carrinho</NavLink>
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-danger" onClick={onClickLogout}>
                <i className="bi bi-box-arrow-right me-2"></i> Sair
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
