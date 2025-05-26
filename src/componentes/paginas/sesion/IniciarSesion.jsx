import { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../contextos/AuthProvider";

const IniciarSesion = () => {
    const { t } = useTranslation("login");
    // Contexto.
    const { loginWithPassword, loading, updateCredentials } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await loginWithPassword(email, password);
    };

    return (
        <>
            <div className="container-sesion">
                <form>
                    <h1>{t('title')}</h1>
                    <label htmlFor="email">{t("labelEmail")}</label>
                    <input type="email" name="email" id="email" placeholder={t("placeholderEmail")} onChange={(e) => updateCredentials(e)} />

                    <label htmlFor="password">{t("labelPassword")}</label>
                    <input type="password" name="password" id="password" placeholder={t("placeholderPassword")} onChange={(e) => updateCredentials(e)} />

                    <button className="btn-sesion" onClick={handleSubmit}>{t("buttonSignIn")}</button>
                    {/*logica del error*/}
                </form>
            </div>
        </>
    );
};

export default IniciarSesion;