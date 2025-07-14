import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Carrinho from "./Carrinho";

const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          SkyLink
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
              >
                Início
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/produtos"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
              >
                Produtos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
              >
                Sobre
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/plans"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
              >
                Planos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
              >
                Contato
              </NavLink>
            </li>
            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/favoritos"
                    className={({ isActive }) =>
                      "nav-link" + (isActive ? " active" : "")
                    }
                  >
                    Favoritos
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    Admin
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/admin/categorias">
                        Gerenciar Categorias
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/admin/produtos">
                        Gerenciar Produtos
                      </Link>
                    </li>
                  </ul>
                </li>
              </>
            )}
          </ul>

          <div className="d-flex align-items-center gap-3">
            {isAuthenticated ? (
              <>
                <Carrinho />
                <div className="dropdown">
                  <button
                    className="btn btn-outline-light dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    <i className="bi bi-person-circle me-2"></i>
                    {user?.nome}
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="/favoritos">
                        <i className="bi bi-heart me-2"></i>
                        Favoritos
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right me-2"></i>
                        Sair
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <div className="d-flex gap-2">
                <Link to="/login" className="btn btn-outline-light">
                  Entrar
                </Link>
                <Link to="/registro" className="btn btn-primary">
                  Cadastrar
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
