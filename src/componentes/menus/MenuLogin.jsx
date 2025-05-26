import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUserLarge } from "react-icons/fa6";
import { useAuth } from "../../contextos/AuthProvider";

const MenuLogin = () => {
    // Contexto.
    const { user, logout } = useAuth();
    // Estado para el menú hamburguesa.
    const [menuVisible, setMenuVisible] = useState(false);
    const [color, setColor] = useState("white");

    

    // Función para alternar la visibilidad del menú.
    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
        setColor(color === "white" ? "#DB1A9B" : "white");
    };

    
    return (
        <div className="menu-login">
            {/* Mostrar el icono de usuario */}
            <FaUserLarge color={color} fontSize="30px" onClick={toggleMenu} />

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
                            <button className="" onClick={logout}>Logout</button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default MenuLogin;