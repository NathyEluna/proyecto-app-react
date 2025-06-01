import { Link, useLocation } from "react-router-dom";
import IdiomaBoton from "../cambiarIdioma/idiomaBoton.jsx";
import { useTranslation } from "react-i18next";
<<<<<<< HEAD
import { useAuth } from "../../contextos/AuthProvider.jsx";
import { useSession } from "../../contextos/SessionProvider.jsx";

const Navegador = () => {
=======
import { useSession } from "../../contextos/SessionProvider";

const Navegador = ({ cerrarMenu }) => {
>>>>>>> 8df2243e738153fcb75318b1ce7a388993a6d342
  const { t } = useTranslation("navegador");
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { hasActiveSession } = useSession();

  return (
    <nav className="container-navegador">
<<<<<<< HEAD
      <Link className={location.pathname === "/" ? "activo" : ""} to="/">{t("home")}</Link>
      
      {isAuthenticated ? (
        // If authenticated, show both Escape Rooms and Game Chat (if there's an active session)
        <>
          <Link 
            className={location.pathname === "/escape-rooms" ? "activo" : ""} 
            to="/escape-rooms"
          >
            Escape-Rooms
          </Link>
          {hasActiveSession() && (
            <Link 
              className={location.pathname === "/play" ? "activo" : ""} 
              to="/play"
            >
              Game Chat
            </Link>
          )}
        </>
      ) : (
        // If not authenticated, show Escape Rooms (which will require login)
        <Link 
          className={location.pathname === "/escape-rooms" ? "activo" : ""} 
          to="/escape-rooms"
=======
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
>>>>>>> 8df2243e738153fcb75318b1ce7a388993a6d342
        >
          Escape-Rooms
        </Link>
      )}
<<<<<<< HEAD
      
      <Link className={location.pathname === "/contact-us" ? "activo" : ""} to="/contact-us">{t("contact")}</Link>
      <Link className={location.pathname === "/about-us" ? "activo" : ""} to="/about-us">{t("about")}</Link>
      
=======

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
>>>>>>> 8df2243e738153fcb75318b1ce7a388993a6d342
      <IdiomaBoton />
    </nav>
  );
};

export default Navegador;
