import { Link, useLocation } from "react-router-dom";
import IdiomaBoton from "../cambiarIdioma/idiomaBoton.jsx";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../contextos/AuthProvider.jsx";


const Navegador = () => {
  const { t } = useTranslation("navegador");
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  return (
    <nav className="container-navegador">
      <Link className={location.pathname === "/" ? "activo" : ""} to="/">{t("home")}</Link>
      {isAuthenticated ? <Link className={location.pathname === "/game-chat" ? "activo" : ""} to="/play">Game Chat</Link> :
        <Link className={location.pathname === "/login" ? "activo" : ""} to="/escape-rooms">Escape-Rooms</Link>}
      <Link className={location.pathname === "/contact-us" ? "activo" : ""} to="/contact-us">{t("contact")}</Link>
      <Link className={location.pathname === "/about-us" ? "activo" : ""} to="/about-us">{t("about")}</Link>
      
      <IdiomaBoton />

    </nav>
  );
};

export default Navegador;