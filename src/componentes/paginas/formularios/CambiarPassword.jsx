import { useContext, useEffect } from 'react';
import { sesionContexto } from '../contextos/ProveedorSesion.jsx';
import Errores from '../Errores.jsx';
import "../../css/login.css";
import { useTranslation } from "react-i18next";

const CambiarPassword = () => {
  const { t } = useTranslation("cambiarPassword");
    const { actualizarDatos, cambiarPassword, errorUsuario, limpiarError } = useContext(sesionContexto);

    useEffect(() => {
      limpiarError();
    }, []);
  return (
    <div className='contenedor-login'>
        <div className='contenedor-sesion'>
            <h2>{t("title")}</h2>

            <label htmlFor="new-pass">{t("newPasswordLabel")}:</label>
            <input type="password" name="password" id="new-pass" placeholder="********" onChange={(e) => actualizarDatos(e)}/>
        
            <button className="crear-btn" onClick={cambiarPassword}>{t("changePasswordButton")}</button>
            {errorUsuario && <Errores>{errorUsuario}</Errores>}
        </div>
    </div>
  );
};

export default CambiarPassword;