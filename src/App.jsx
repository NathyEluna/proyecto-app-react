import './App.css';
import Cabecera from './componentes/estructura/Cabecera.jsx';
import Contenido from './componentes/estructura/Contenido.jsx';
import Rutas from './componentes/Rutas.jsx';
import Pie from './componentes/estructura/Pie.jsx';
import AuthProvider from './contextos/AuthProvider.jsx';
import SessionProvider from './contextos/SessionProvider.jsx';
import ChatProvider from './contextos/ChatProvider.jsx';

function App() {
  return (
    <AuthProvider>
      <SessionProvider>
        <Cabecera />
        <Contenido>
          <ChatProvider>
            <Rutas />
          </ChatProvider>
        </Contenido>
        <Pie />
      </SessionProvider>
    </AuthProvider>
  );
};

export default App;