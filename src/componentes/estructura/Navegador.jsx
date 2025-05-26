import { Link, useLocation } from "react-router-dom";
import { useSession } from "../../contextos/SessionProvider";


const Navegador = () => {
  const location = useLocation();
  const { session } = useSession();

  return (
    <nav className="container-navegador">
      <Link className={location.pathname === "/" ? "activo" : ""} to="/">Home</Link>
      {session ? <Link className={location.pathname === "/game-chat" ? "activo" : ""} to="/play">Game Chat</Link> :
        <Link className={location.pathname === "/login" ? "activo" : ""} to="/escape-rooms">Escape-Rooms</Link>}
      <Link className={location.pathname === "/contact-us" ? "activo" : ""} to="/contact-us">Contact Us</Link>
      <Link className={location.pathname === "/about-us" ? "activo" : ""} to="/about-us">About Us</Link>

    </nav>
  );
};

export default Navegador;