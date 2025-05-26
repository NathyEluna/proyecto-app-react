import { useAuth } from "../../../contextos/AuthProvider";

const IniciarSesion = () => {
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
                        <h1>Login</h1>
                        <label htmlFor="email">Username:</label>
                        <input type="email" name="email" id="email" placeholder="Username" onChange={(e) => updateCredentials(e)} />
                        
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" id="password" placeholder="********" onChange={(e) => updateCredentials(e)} />
                        
                        <button className="btn-sesion" onClick={handleSubmit}>Sign In</button>
                        {/*logica del error*/}
                    </form>
                </div>
        </>
    );
};

export default IniciarSesion;