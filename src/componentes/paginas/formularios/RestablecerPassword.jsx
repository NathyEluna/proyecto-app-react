import { useContext, useEffect } from "react";
import { sesionContexto } from "../contextos/ProveedorSesion.jsx";
import Errores from "../Errores.jsx";
import { useTranslation } from "react-i18next";

const RestablecerPassword = () => {
    const { t } = useTranslation("restablecerPassword");

    const { restablecerPassword, actualizarDatos, errorUsuario, limpiarError } = useContext(sesionContexto);
    
    useEffect(() => {
      limpiarError();
    }, []);
  return (
    <div className="contenedor-login">
      <div className="contenedor-sesion">
        <h2>{t("title")}</h2>
        <label htmlFor="email">{t("emailLabel")}:</label>
        <input type="email" name="email" id="email-3" placeholder={t("emailPlaceholder")} onChange={(e) => actualizarDatos(e)}/>
        
        <button className="crear-btn" onClick={restablecerPassword}>{t("resetButton")}</button>
        {errorUsuario && <Errores>{errorUsuario}</Errores>}
      </div>
    </div>
  );
};

export default RestablecerPassword;