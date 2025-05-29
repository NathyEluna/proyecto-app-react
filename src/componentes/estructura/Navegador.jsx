import { Link, useLocation } from "react-router-dom";
import IdiomaBoton from "../cambiarIdioma/idiomaBoton.jsx";
import { useTranslation } from "react-i18next";
import { useSession } from "../../contextos/SessionProvider";

const Navegador = ({ cerrarMenu }) => {
  const { t } = useTranslation("navegador");
  const location = useLocation();
  const { session } = useSession();

  return (
    <nav className="container-navegador">
      <Link
        className={location.pathname === "/" ? "activo" : ""}
        to="/"
        onClick={cerrarMenu}
      >
        {t("home")}
      </Link>

      {session ? (
        <Link
          className={location.pathname === "/game-chat" ? "activo" : ""}
          to="/play"
          onClick={cerrarMenu}
        >
          Game Chat
        </Link>
      ) : (
        <Link
          className={location.pathname === "/login" ? "activo" : ""}
          to="/escape-rooms"
          onClick={cerrarMenu}
        >
          Escape-Rooms
        </Link>
      )}

      <Link
        className={location.pathname === "/contact-us" ? "activo" : ""}
        to="/contact-us"
        onClick={cerrarMenu}
      >
        {t("contact")}
      </Link>

      <Link
        className={location.pathname === "/about-us" ? "activo" : ""}
        to="/about-us"
        onClick={cerrarMenu}
      >
        {t("about")}
      </Link>

      {/* Este botón no necesita cerrar el menú */}
      <IdiomaBoton />
    </nav>
  );
};

export default Navegador;
