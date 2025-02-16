import { Link, useLocation } from "react-router-dom";


const Navegador = () => {
  const location = useLocation();

  return (
    <nav className="container-navegador">
      <Link className={location.pathname === "/" ? "activo" : ""} to="/">Home</Link>
      <Link className={location.pathname === "/contact-us" ? "activo" : ""} to="/contact-us">Contact Us</Link>
      <Link className={location.pathname === "/about-us" ? "activo" : ""} to="/about-us">About Us</Link>
      
    </nav>
  );
};

export default Navegador;

{/*Link para mostrar todos los usuarios, faltaria criar el listado de usuarios.*/}
      {/*<Link className="" to="/usuarios">Users</Link>*/}