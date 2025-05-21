import { Link } from "react-router-dom";
import IniciarSesion from "./sesion/IniciarSesion.jsx";
import "../../css/Login.css";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation("login");
    //Aqui se muestra el formulario de inicio de sesion y el enlace para crear una cuenta.
    //En el futuro agregar el enlace de cambio de contraseña en el mismo div del crear cuenta.
  return (
    <div className="container-imagen">
      <div className="container-login">
        <IniciarSesion />

        <div className="container-enlaces-sesion">
          <Link className="" to="/create-account">{t('createAccount')}</Link>
        </div>
      </div> 
    </div>
  );
};

export default Login;