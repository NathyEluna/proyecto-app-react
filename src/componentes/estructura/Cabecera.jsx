import Navegador from "./Navegador.jsx";

const Cabecera = () => {
  return (
    <header>
        <div className="contenedor-logo">
            <h1>Logo</h1>
        </div>
        <Navegador/>
        <div className="contenedor-login">
            <h2>Login</h2>
        </div>
    </header>
  );
};

export default Cabecera;