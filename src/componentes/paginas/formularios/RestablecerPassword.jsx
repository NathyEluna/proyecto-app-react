import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../contextos/AuthProvider";
import "../../../css/RestablecerPassword.css";

const RestablecerPassword = () => {
    const { t } = useTranslation("restablecerPassword");
    const { 
        resetPassword, 
        updateCredentials, 
        authError, 
        clearError, 
    } = useAuth();
    
    useEffect(() => {
        clearError();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await resetPassword();
    };

    return (
        <div className="contenedor-login">
            <div className="contenedor-sesion">
                <h2>{t("title")}</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">{t("emailLabel")}</label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        placeholder={t("emailPlaceholder")} 
                        onChange={updateCredentials}
                        required
                    />
                    
                    <button 
                        type="submit" 
                        className="crear-btn"
                    >{t("resetButton")}</button>
                    
                    {authError && <p className="error-message">{authError}</p>}
                </form>
            </div>
        </div>
    );
};

export default RestablecerPassword;