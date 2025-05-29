import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaUserLarge } from "react-icons/fa6";
import "../../css/MenuLogin.css";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../contextos/AuthProvider";

const MenuLogin = () => {
    const { t } = useTranslation("menuLogin");

    const { user, logout } = useAuth();
    const [menuVisible, setMenuVisible] = useState(false);
    const [color, setColor] = useState("white");

    const menuRef = useRef(null);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
        setColor(color === "white" ? "#DB1A9B" : "white");
    };

    const handleClickOutside = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setMenuVisible(false);
            setColor("white");
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLinkClick = () => {
        setMenuVisible(false);
        setColor("white");
    };

    return (
        <div className="menu-login" ref={menuRef}>
            <FaUserLarge color={color} fontSize="30px" onClick={toggleMenu} />

            {menuVisible && (
                <div className="hamburger-menu">
                    {!user ? (
                        <>
                            <Link to="/login" onClick={handleLinkClick}>{t("login")}</Link>
                            <Link to="/create-account" onClick={handleLinkClick}>{t("createAccount")}</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/profile" onClick={handleLinkClick}>{t("profile")}</Link>
                            <button onClick={() => { logout(); handleLinkClick(); }}>{t("logout")}</button>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default MenuLogin;
