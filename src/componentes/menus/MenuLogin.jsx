import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { sesionContexto } from "../../contextos/ProveedorSesion.jsx";
import { FaUserLarge } from "react-icons/fa6";

const MenuLogin = () => {
    // Contexto.
    const { user, manejarLogout } = useContext(sesionContexto);
    // Estado para el menú hamburguesa.
    const [menuVisible, setMenuVisible] = useState(false);

    // Función para alternar la visibilidad del menú.
    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    
    return (
        <div className="menu-login">
            {/* Mostrar el icono de usuario */}
            <FaUserLarge color="blue" fontSize="30px" onClick={toggleMenu} />

            {/* Menú hamburguesa */}
            {menuVisible && (
                <div className="hamburger-menu">
                    {!user ? (
                        <>
                            <Link className="" to="/login">Login</Link>
                            <Link className="" to="/create-account">Create an Account</Link>
                        </>
                    ) : (
                        <>
                            <Link className="" to="/profile">Profile</Link>
                            <button className="" onClick={manejarLogout}>Logout</button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default MenuLogin;