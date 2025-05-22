import { Link, useLocation } from "react-router-dom";
import IdiomaBoton from "../cambiarIdioma/idiomaBoton.jsx";
import { useTranslation } from "react-i18next";

const Navegador = () => {
  const { t } = useTranslation("navegador");
  const location = useLocation();

  return (
    <nav className="container-navegador">
      <Link className={location.pathname === "/" ? "activo" : ""} to="/">{t("home")}</Link>
      <Link className={location.pathname === "/contact-us" ? "activo" : ""} to="/contact-us">{t("contact")}</Link>
      <Link className={location.pathname === "/about-us" ? "activo" : ""} to="/about-us">{t("about")}</Link>

      <IdiomaBoton />

    </nav>
  );
};

export default Navegador;

{/*Link para mostrar todos los usuarios, faltaria criar el listado de usuarios.*/}
      {/*<Link className="" to="/usuarios">Users</Link>*/}