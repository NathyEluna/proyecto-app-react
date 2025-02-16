import { useState, useContext } from "react";
import { sesionContexto } from "../../../contextos/ProveedorSesion.jsx";

const IniciarSesion = () => {
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
            {loading ? <p>Loading...</p> 
            : (
                <div className="container-sesion">
                    <form>
                        <h1>Login</h1>
                        <label htmlFor="email">Username:</label>
                        <input type="email" name="email" id="email" placeholder="Username" onChange={manejarCambioEmail} />
                        
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" id="password" placeholder="********" onChange={manejarCambioPassword} />
                        
                        <button className="btn-sesion" onClick={manejarClick}>Sign In</button>
                        {/*logica del error*/}
                    </form>
                </div>
            )}
        </>
    );
};

export default IniciarSesion;