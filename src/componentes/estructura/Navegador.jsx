import { Link } from "react-router-dom";


const Navegador = () => {
  

  return (
    <nav className="container-navegador">
      <Link className="" to="/">Home</Link>
      <Link className="" to="/contact-us">Contact Us</Link>
      <Link className="" to="/about-us">About Us</Link>
      
    </nav>
  );
};

export default Navegador;

{/*Link para mostrar todos los usuarios, faltaria criar el listado de usuarios.*/}
      {/*<Link className="" to="/usuarios">Users</Link>*/}