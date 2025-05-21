import { useState, useContext } from "react";
import { sesionContexto } from "../../../contextos/ProveedorSesion.jsx";
import { useTranslation } from "react-i18next";

const IniciarSesion = () => {
    const { t } = useTranslation("login");
    // Contexto.
    const { manejarLogin, loading } = useContext(sesionContexto);
    // Estados para los inputs.
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Manejar el cambio de los inputs.
    const manejarCambioEmail = (e) => setEmail(e.target.value);
    const manejarCambioPassword = (e) => setPassword(e.target.value);

    // Manejar el click en el botón de login.
    const manejarClick = (e) => {
        e.preventDefault();
        manejarLogin(email, password);
    };

    return (
        <>
            {loading ? <p>{t('loading')}</p> 
            : (
                <div className="container-sesion">
                    <form>
                        <h1>{t('title')}</h1>
                        <label htmlFor="email">{t("labelEmail")}</label>
                        <input type="email" name="email" id="email" placeholder={t("placeholderEmail")} onChange={manejarCambioEmail} />
                        
                        <label htmlFor="password">{t("labelPassword")}</label>
                        <input type="password" name="password" id="password" placeholder={t("placeholderPassword")} onChange={manejarCambioPassword} />
                        
                        <button className="btn-sesion" onClick={manejarClick}>{t("buttonSignIn")}</button>
                        {/*logica del error*/}
                    </form>
                </div>
            )}
        </>
    );
};

export default IniciarSesion;