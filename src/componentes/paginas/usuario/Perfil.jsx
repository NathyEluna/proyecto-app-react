import { useContext } from "react";
import { Link } from "react-router-dom";
import { sesionContexto } from "../../../contextos/ProveedorSesion";
import "../../../css/Perfil.css";

const Perfil = () => {
    //Contexto.
    const { user } = useContext(sesionContexto);

    return (
        <div className="container-perfil">
            <h2>Profile</h2>
            {/* Implementar la visualización de la imagen de perfil del usuario para el proyecto final. */}
            {/*<img src={user?.profile_picture} alt="Profile Picture"/>*/}
            <p>Username:</p>
            <p>{user?.username}</p>
            
            <p><strong>Email:</strong></p>
            <p>{user?.email}</p>

            <Link to="/edit-profile">Edit Profile</Link>
        </div>
    );
};

export default Perfil;