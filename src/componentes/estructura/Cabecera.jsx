import { useState } from "react";
import Navegador from "./Navegador.jsx";
import MenuLogin from "../menus/MenuLogin.jsx";
import "../../css/Cabecera.css";
import logo from "../../assets/img/MindEscape_Imagotipo.png";

const Cabecera = () => {
 const [menuAbierto, setMenuAbierto] = useState(false);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const cerrarMenu = () => {
    setMenuAbierto(false);
  };

  return (
    <header>
       <div className="contenedor-logo">
        <img src={logo} alt="MindEscape" />
      </div>

       {/* Menú normal para escritorio */}
      <nav className="navegador-escritorio">
        <Navegador />
        <MenuLogin />
      </nav>

      {/* Botón hamburguesa solo visible en móvil */}
      <button className="boton-hamburguesa" onClick={toggleMenu}>
        ☰
      </button>

      {/* Menú flotante para móvil */}
      {menuAbierto && (
        <div className="menu-flotante">
          <button className="cerrar-menu" onClick={cerrarMenu}>×</button>
          <Navegador />
          <MenuLogin />
        </div>
      )}
    </header>
  );
};

export default Cabecera;
