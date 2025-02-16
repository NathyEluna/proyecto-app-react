import { useState, useContext } from "react";
import { sesionContexto } from "../../../contextos/ProveedorSesion.jsx";

const CrearCuenta = () => {
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
            {loading ? <p>Loading...</p> 
            : (
                <div className="container-registro">
                    <h1>Create Account</h1>
                    <form>
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" placeholder="Username" required onChange={manejarCambioUsername} />

                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" placeholder="email@example.com" required onChange={manejarCambioEmail} />

                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" placeholder="********" required onChange={manejarCambioPassword} />

                        <button className="" onClick={manejarClick}>Create Account</button>
                    </form>
                </div>
            )}
        </>
    );
};

export default CrearCuenta;