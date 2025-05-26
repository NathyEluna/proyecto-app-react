import { useState, useContext } from "react";
import "../../../css/CrearCuenta.css";
import { useAuth } from "../../../contextos/AuthProvider";

const CrearCuenta = () => {
    // Contexto.
    const { registerUser, updateCredentials, credentials } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password, username } = credentials;
        await registerUser(email, password, username);

        console.log("Account created successfully with username:", username, "and email:", email, "and password:", password);
    };


    return (
        <>
                <div className="container-imagen">
                    <div className="container-registro">
                        <h1>Create Account</h1>
                        <form>
                            <label htmlFor="username">Username:</label>
                            <input type="text" id="username" name="username" placeholder="Username" required onChange={(e) => updateCredentials(e)} />

                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" placeholder="email@example.com" required onChange={(e) => updateCredentials(e)} />

                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" name="password" placeholder="********" required onChange={(e) => updateCredentials(e)} />

                            <button className="btn-sesion" onClick={handleSubmit}>Create Account</button>
                        </form>
                    </div>
                </div>
        </>
    );
};

export default CrearCuenta;