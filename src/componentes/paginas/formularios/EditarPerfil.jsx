import { useState } from "react";
import { sesionContexto } from "../../../contextos/ProveedorSesion.jsx";

const EditarPerfil = () => {
    //Contexto.
    const { user, updateProfile } = useContext(sesionContexto);
    //Estado para el formulario.
    const [formData, setFormData] = useState({
        username: user?.username || "",
        email: user?.email || "",
        password: user?.password || "",
    });
  
    //Funciones.
    const manejarCambio = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const manejarSubmit = async (e) => {
      e.preventDefault();
      await updateProfile(formData);
      
    };
  
    return (
      <div className="container-editar">
        <h2>Edit Profile</h2>
        <form onSubmit={manejarSubmit}>
            <label htmlFor="username">Username:</label>
            <input type="text" name="username" id="username" value={formData.username} onChange={manejarCambio} required />

            <label>Email:</label>
            <input type="email" name="email" id="email" value={formData.email} onChange={manejarCambio} required />
          
            <label>Password:</label>
            <input type="password" name="password" id="password" value={formData.password} onChange={manejarCambio} required />

            <button type="submit">Update</button>
        </form>
      </div>
    );
};

export default EditarPerfil;