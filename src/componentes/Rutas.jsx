import { Routes, Route } from 'react-router-dom';
import Inicio from './paginas/Inicio.jsx';
import Login from './paginas/Login.jsx';
import CrearCuenta from './paginas/formularios/CrearCuenta.jsx';
import Perfil from './paginas/usuario/Perfil.jsx';
import Contacto from './paginas/Contacto.jsx';
import Nosotros from './paginas/Nosotros.jsx';
import Error from './paginas/Error.jsx';
import EditarPerfil from './paginas/formularios/EditarPerfil.jsx';
import Chat from './paginas/chat/Chat.jsx';
import RoomSelection from './paginas/escape-rooms/RoomSelection.jsx';
import RestablecerPassword from './paginas/formularios/RestablecerPassword.jsx';
import CambiarPassword from './paginas/formularios/CambiarPassword.jsx';

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
            <Route path='/escape-rooms' element={<RoomSelection />} />
            <Route path="/play" element={<Chat />} />
            <Route path='/restablecer-password' element={<RestablecerPassword/>}/>
            <Route path='/change-password' element={<CambiarPassword/>}/>
            <Route path="*" element={<Error />} />
        </Routes>
    );
};

export default Rutas;