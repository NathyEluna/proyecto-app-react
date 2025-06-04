import { useState, useContext } from "react";
import "../../../css/CrearCuenta.css";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../contextos/AuthProvider";

const CrearCuenta = () => {
    const { t } = useTranslation("crearCuenta");
    // Contexto.
    const { registerUser, updateCredentials, credentials, authError } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password, username } = credentials;
        await registerUser(email, password, username);

    };

    return (
        <>
            <div className="container-imagen">
                <div className="container-registro">
                    <h1>{t('title')}</h1>
                    <form>
                        <label htmlFor="username">{t('labelUsername')}</label>
                        <input type="text" id="username" name="username" placeholder={t("placeholderUsername")} required onChange={(e) => updateCredentials(e)} />

                        <label htmlFor="email">{t('labelEmail')}</label>
                        <input type="email" id="email" name="email" placeholder={t("placeholderEmail")} required onChange={(e) => updateCredentials(e)} />

                            <label htmlFor="password">{t('labelPassword')}</label>
                            <input type="password" id="password" name="password" placeholder={t("placeholderPassword")} required onChange={(e) => updateCredentials(e)} />
                            <small className="password-requirements">
                                {t('passwordRequirements')}
                            </small>

                        <button className="btn-sesion" onClick={handleSubmit}>{t('buttonCreateAccount')}</button>
                        {authError && <p className="error-message">{authError}</p>}
                    </form>
                </div>
            </div>
        </>
    );
};

export default CrearCuenta;