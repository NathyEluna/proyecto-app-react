import { useEffect } from 'react';
import { useAuth } from '../../../contextos/AuthProvider';
import { useTranslation } from "react-i18next";
import "../../../css/RestablecerPassword.css";

const CambiarPassword = () => {
  const { t } = useTranslation("cambiarPassword");
  const { 
    updateCredentials, 
    changePassword, 
    authError, 
    clearError,
    loading 
  } = useAuth();

  useEffect(() => {
    clearError();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await changePassword();
  };

  return (
    <div className='contenedor-login'>
      <div className='contenedor-sesion'>
        <h2>{t("title")}</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="password">{t("newPasswordLabel")}</label>
          <input 
            type="password" 
            name="password" 
            id="password" 
            placeholder="********" 
            onChange={updateCredentials}
            required
          />
      
          <button 
            type="submit" 
            className="crear-btn"
            disabled={loading}
          >
            {loading ? t("loading") : t("changePasswordButton")}
          </button>

          {authError && <p className="error-message">{authError}</p>}
        </form>
      </div>
    </div>
  );
};

export default CambiarPassword;