import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { sesionContexto } from "../../contextos/ProveedorSesion.jsx";
import { FaUserLarge } from "react-icons/fa6";
import "../../css/MenuLogin.css";
import { useTranslation } from "react-i18next";



const MenuLogin = () => {
    const { t } = useTranslation("menuLogin");

    // Contexto.
    const { user, manejarLogout } = useContext(sesionContexto);
    // Estado para el menú hamburguesa.
    const [menuVisible, setMenuVisible] = useState(false);
    const [color, setColor] = useState("white");

    

    // Función para alternar la visibilidad del menú.
    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
        setColor(color === "white" ? "#DB1A9B" : "white");
    };

    
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
                            <Link className="" to="/profile">{t("profile")}</Link>
                            <button className="" onClick={manejarLogout}>{t("logout")}</button>
                        </>
                    )}
                </div>
            )}
        </div>
        </>
    );
};

export default MenuLogin;