import Navegador from "./Navegador.jsx";
import MenuLogin from "../menus/MenuLogin.jsx";
import "../../css/Cabecera.css";
import logo from "../../assets/img/MindEscape_Imagotipo.png";

const Cabecera = () => {
  

  return (
    <header>
      <div className="contenedor-logo">
        <img src={logo} alt="MindEscape" />
      </div>
      
      <Navegador />

      <MenuLogin />
      
    </header>
  );
};

export default Cabecera;