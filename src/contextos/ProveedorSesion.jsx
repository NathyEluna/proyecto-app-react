import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.jsx';
import { useUser } from '../hooks/useUser.jsx';

const sesionContexto = createContext();

const ProveedorSesion = ({ children }) => {
  const navigate = useNavigate();
  //Estados.
  const [user, setUser] = useState(null);
  //Hooks.
  const { login, register, logout, getAllUsers, loading, error } = useAuth();
  const { getUserProfile, updateUserProfile } = useUser();

  //Funciones.

  //Manejar el registro de un usuario.
  const manejarLogin = async (username, password) => {
    //Llamar a la función login del hook useAuth.
    const data = await login(username, password);


    //Si hay datos, guardar el ID en localStorage y obtener el perfil del usuario.
    if (data) {
      //Guardar el ID y token en localStorage.
      localStorage.setItem("token", data.token);
      localStorage.setItem("id", data.user.id);

      //Obtener el perfil del usuario.
      try {
        const profile = await getUserProfile(data.user.id, data.token);

        if (profile) {
          setUser(profile);
          navigate('/');
        };
      } catch (error) {
        console.error("⚠️ Error fetching profile:", error);
      }
    };
  };

  //Manejar el registro de un usuario.
  const manejarRegistro = async (username, email, password) => {
    const data = await register(username, email, password);
    //Si hay datos, guardar el ID y token en localStorage y obtener el perfil del usuario.
    if (data && data.user.id) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("id", data.user.id);

      //Obtener el perfil del usuario.
      const profile = await getUserProfile(data.user.id, data.token);
      if (profile) {
        setUser(profile);
        navigate('/login');
      }
    } else {
      console.error("Error: No user ID returned from API");
    };
  };

  //Manejar la actualización del perfil de usuario.
  const manejarUpdateProfile = async (updatedData) => {
    //Si no hay usuario, no se puede actualizar el perfil.
    if (!user) return;

    //Obtener el token de localStorage.
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");

    //Llamar a la función updateUserProfile del hook useUser.
    const updatedUser = await updateUserProfile(id, updatedData, token);

    //Si se actualizó el perfil, actualizar el estado.
    if (updatedUser) {
      setUser(updatedUser);
      navigate('/profile');
    };
  };

  //Manejar el cierre de sesión.
  const manejarLogout = () => {
    logout();
    setUser(null);

    //Limpiar localStorage.
    localStorage.removeItem("token");
    localStorage.removeItem("id");

    navigate('/login');
  };


  useEffect(() => {

    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");

    if (token && id && token !== "undefined" && id !== "undefined") {
      getUserProfile(id, token).then((profile) => {
        if (profile) {
          setUser(profile);
        };
      });
    };
  }, []);


  const datosExportar = {
    //Estados.
    user,
    loading,
    error,
    //Funciones.
    manejarRegistro,
    manejarLogin,
    manejarLogout,
    manejarUpdateProfile
  };

  return (
    <sesionContexto.Provider value={datosExportar}>
      {children}
    </sesionContexto.Provider >
  );
};

export { sesionContexto };
export default ProveedorSesion;