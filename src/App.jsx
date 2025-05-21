import './App.css';
import Cabecera from './componentes/estructura/Cabecera.jsx';
import Contenido from './componentes/estructura/Contenido.jsx';
import Rutas from './componentes/Rutas.jsx';
import Pie from './componentes/estructura/Pie.jsx';
import ProveedorSesion from './contextos/ProveedorSesion.jsx';
import "./i18n/i18n.js";

function App() {
  return (
    <ProveedorSesion>
      <Cabecera/>
      <Contenido>
        <Rutas/>
      </Contenido>
      <Pie/>
    </ProveedorSesion>
  );
};

export default App;
