import { Link, useLocation } from "react-router-dom";
import IdiomaBoton from "../cambiarIdioma/idiomaBoton.jsx";
import { useTranslation } from "react-i18next";
import { useSession } from "../../contextos/SessionProvider";
import { useAuth } from "../../contextos/AuthProvider.jsx";

const Navegador = ({ cerrarMenu }) => {
  const { t } = useTranslation("navegador");
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { hasActiveSession } = useSession();

  return (
    <nav className="container-navegador">
      <Link className={location.pathname === "/" ? "activo" : ""} to="/">{t("home")}</Link>
      
      {isAuthenticated ? (
        // If authenticated, show both Escape Rooms and Game Chat (if there's an active session)
        <>
          <Link 
            className={location.pathname === "/escape-rooms" ? "activo" : ""} 
            to="/escape-rooms" onClick={cerrarMenu}
          >
            Escape-Rooms
          </Link>
          {hasActiveSession() && (
            <Link 
              className={location.pathname === "/play" ? "activo" : ""} 
              to="/play" onClick={cerrarMenu}
            >
              Game Chat
            </Link>
          )}
        </>
      ) : (
        // If not authenticated, show Escape Rooms (which will require login)
        <Link 
          className={location.pathname === "/escape-rooms" ? "activo" : ""} 
          to="/escape-rooms" onClick={cerrarMenu}
        >
          Escape-Rooms
        </Link>
      )}
      
      <Link className={location.pathname === "/contact-us" ? "activo" : ""} to="/contact-us" onClick={cerrarMenu}>{t("contact")}</Link>
      <Link className={location.pathname === "/about-us" ? "activo" : ""} to="/about-us" onClick={cerrarMenu}>{t("about")}</Link>
      
      <IdiomaBoton />
    </nav>
  );
};

export default Navegador;
