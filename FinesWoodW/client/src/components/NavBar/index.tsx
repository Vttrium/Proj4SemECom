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
    <div className="bg-light shadow-sm mb-2">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light">
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <img src={logo} width="60" alt="Logo" className="me-2" />
            <span className="font-weight-bold">E-Shop</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "nav-link active text-primary" : "nav-link"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/categories"
                  className={({ isActive }) =>
                    isActive ? "nav-link active text-primary" : "nav-link"
                  }
                >
                  Categorias
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    isActive ? "nav-link active text-primary" : "nav-link"
                  }
                >
                  Produtos
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/products-v2"
                  className={({ isActive }) =>
                    isActive ? "nav-link active text-primary" : "nav-link"
                  }
                >
                  Produtos V2
                </NavLink>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-outline-danger"
                  onClick={onClickLogout}
                >
                  <i className="bi bi-box-arrow-right me-2"></i> Sair
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
