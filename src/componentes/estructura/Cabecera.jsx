import { useState, useEffect, useRef } from "react";
import Navegador from "./Navegador.jsx";
import MenuLogin from "../menus/MenuLogin.jsx";
import "../../css/Cabecera.css";
import logo from "../../assets/img/MindEscape_Imagotipo.png";

const Cabecera = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const menuRef = useRef(null); // Referencia al contenedor del menú

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  // Cierra el menú si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        cerrarMenu();
      }
    };

    if (menuAbierto) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuAbierto]);

  return (
    <header>
      <div className="contenedor-logo">
        <img src={logo} alt="MindEscape" />
      </div>

      <nav className="navegador-escritorio">
        <Navegador />
        <MenuLogin />
      </nav>

      <button className="boton-hamburguesa" onClick={toggleMenu}>
        ☰
      </button>

      {menuAbierto && (
        <div className="menu-flotante" ref={menuRef} onClick={cerrarMenu}>
          <button className="cerrar-menu" onClick={cerrarMenu}>×</button>
          {/* Agrega onClick a los enlaces dentro de Navegador/MenuLogin o aquí mismo */}
          <div onClick={(e) => e.stopPropagation()}>
            <Navegador cerrarMenu={cerrarMenu} />
            <MenuLogin cerrarMenu={cerrarMenu} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Cabecera;
