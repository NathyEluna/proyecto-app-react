import { useTranslation } from "react-i18next";
import { useAuth } from "../../../contextos/AuthProvider";

const IniciarSesion = () => {
    const { t } = useTranslation("login");
    const { loginWithPassword, authError, updateCredentials } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await loginWithPassword();
    };

    return (
        <div className="container-sesion">
            <form onSubmit={handleSubmit}>
                <h1>{t('title')}</h1>
                <label htmlFor="email">{t("labelEmail")}</label>
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    placeholder={t("placeholderEmail")} 
                    onChange={updateCredentials} 
                />

                <label htmlFor="password">{t("labelPassword")}</label>
                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder={t("placeholderPassword")} 
                    onChange={updateCredentials} 
                />

                <button type="submit" className="btn-sesion">
                    {t("buttonSignIn")}
                </button>
                
                {authError && <p className="error-message">{authError}</p>}
            </form>
        </div>
    );
};

export default IniciarSesion;