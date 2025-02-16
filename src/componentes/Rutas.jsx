import { Routes, Route } from 'react-router-dom';
import Inicio from './paginas/Inicio.jsx';
import Login from './paginas/Login.jsx';
import CrearCuenta from './paginas/formularios/CrearCuenta.jsx';
import Perfil from './paginas/usuario/Perfil.jsx';
import Contacto from './paginas/Contacto.jsx';
import Nosotros from './paginas/Nosotros.jsx';
import Error from './paginas/Error.jsx';
//Se estuver rojo no borrar, es para que funcione el import, el mio aparece en rojo
//porque react esta diciendo que esta abierto en la carpeta Formularios con F mayuscula(mentira).
import EditarPerfil from './paginas/formularios/EditarPerfil.jsx';

const Rutas = () => {
    return (
        <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/login" element={<Login />}/>
            <Route path="/create-account" element={<CrearCuenta />} />
            <Route path="/profile" element={<Perfil />} />
            <Route path="/edit-profile" element={<EditarPerfil/>} />
            <Route path="/contact-us" element={<Contacto />} />
            <Route path="/about-us" element={<Nosotros />} />
            {/*<Route path="/users" element={<ListadoUsuarios />} />*/}
            <Route path="*" element={<Error />} />
        </Routes>
    );
};

export default Rutas;