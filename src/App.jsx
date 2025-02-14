import './App.css';
import Cabecera from './componentes/estructura/Cabecera.jsx';
import Contenido from './componentes/estructura/Contenido.jsx';
import Rutas from './componentes/estructura/Rutas.jsx';
import Pie from './componentes/estructura/Pie.jsx';

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
