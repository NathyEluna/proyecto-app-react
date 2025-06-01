import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaUserLarge } from "react-icons/fa6";
import "../../css/MenuLogin.css";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../contextos/AuthProvider";

const MenuLogin = () => {
    const { t } = useTranslation("menuLogin");

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

    const handleLogout = useCallback(async (e) => {
    e.preventDefault();
    try {
        await logout();
        setMenuVisible(false);
        setColor("white");
    } catch (error) {
        console.error('Logout failed:', error);
    };
    }, [logout, setMenuVisible, setColor]);

    
    return (
        <>
        
        <div className="menu-login">
            {/* Mostrar el icono de usuario */}
            <FaUserLarge color={color} fontSize="30px" onClick={toggleMenu} />

            {/* Menú hamburguesa */}
            {menuVisible && (
                <div className="hamburger-menu">
                    {!user ? (
                        <>
                            <Link className="" to="/login">{t("login")}</Link>
                            <Link className="" to="/create-account">{t("createAccount")}</Link>
                        </>
                    ) : (
                        <>
                            <Link className="" to="/profile">Profile</Link>
                            <button className="" onClick={handleLogout}>Logout</button>
                        </>
                    )}
                </div>
            )}
        </div>
        </>
    );
};

export default MenuLogin;