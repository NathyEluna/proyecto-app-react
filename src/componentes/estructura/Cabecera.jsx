import Navegador from "./Navegador.jsx";
import MenuLogin from "../menus/MenuLogin.jsx";

const Cabecera = () => {
  

  return (
    <header>
      <div className="contenedor-logo">
        <h1>Logo</h1>
      </div>
      
      <Navegador />

      <MenuLogin />
    </header>
  );
};

export default Cabecera;