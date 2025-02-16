import { Link } from "react-router-dom";
import IniciarSesion from "./sesion/IniciarSesion.jsx";

const Login = () => {
    //Aqui se muestra el formulario de inicio de sesion y el enlace para crear una cuenta.
    //En el futuro agregar el enlace de cambio de contraseña en el mismo div del crear cuenta.
  return (
    <div className="container-login">
      <IniciarSesion />

      <div className="container-enlaces-sesion">
        <Link className="" to="/create-account">Don't have an account? Create one here!</Link>
      </div>
    </div>
  );
};

export default Login;