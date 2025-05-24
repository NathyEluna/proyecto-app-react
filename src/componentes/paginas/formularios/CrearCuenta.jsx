import { useState, useContext } from "react";
import { sesionContexto } from "../../../contextos/ProveedorSesion.jsx";
import "../../../css/CrearCuenta.css";
import { useTranslation } from "react-i18next";

const CrearCuenta = () => {
    const { t } = useTranslation("crearCuenta");
    // Contexto.
    const { manejarRegistro, loading } = useContext(sesionContexto);
    // Estados para los inputs.
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Manejar el cambio de los inputs.
    const manejarCambioUsername = (e) => setUsername(e.target.value);
    const manejarCambioEmail = (e) => setEmail(e.target.value);
    const manejarCambioPassword = (e) => setPassword(e.target.value);

    // Manejar el click en el botón de registro.
    const manejarClick = (e) => {
        e.preventDefault();
        manejarRegistro(username, email, password);
    };

    return (
        <>
            {loading ? <p>{t('loading')}</p> 
            : (
                <div className="container-imagen">
                    <div className="container-registro">
                        <h1>{t('title')}</h1>
                        <form>
                            <label htmlFor="username">{t('labelUsername')}</label>
                            <input type="text" id="username" name="username" placeholder={t("placeholderUsername")} required onChange={manejarCambioUsername} />

                            <label htmlFor="email">{t('labelEmail')}</label>
                            <input type="email" id="email" name="email" placeholder={t("placeholderEmail")} required onChange={manejarCambioEmail} />

                            <label htmlFor="password">{t('labelPassword')}</label>
                            <input type="password" id="password" name="password" placeholder={t("placeholderPassword")} required onChange={manejarCambioPassword} />

                            <button className="btn-sesion" onClick={manejarClick}>{t('buttonCreateAccount')}</button>
                        </form>
                    </div>

                </div>
            )}
        </>
    );
};

export default CrearCuenta;