import { useState, useContext } from "react";
import { sesionContexto } from "../../../contextos/ProveedorSesion.jsx";
import "../../../css/EditarPerfil.css";
import { useTranslation } from "react-i18next";


const EditarPerfil = () => {
    const { t } = useTranslation("editarPerfil");

    //Contexto.
    const { user, manejarUpdateProfile, loading } = useContext(sesionContexto);
    //Estado para el formulario.
    const [formData, setFormData] = useState({
        username: user?.username,
        email: user?.email,
        password: user?.password,
    });

    //Funciones.
    const manejarCambio = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const manejarSubmit = async (e) => {
      e.preventDefault();
      await manejarUpdateProfile(formData);
      
    };
  
    return (
      <div className="container-editar">
        <h2>{t('title')}</h2>
        <form onSubmit={manejarSubmit}>
            <label htmlFor="username">{t('labelUsername')}:</label>
            <input type="text" name="username" id="username" value={formData.username} onChange={manejarCambio} required />

            <label>{t('labelEmail')}:</label>
            <input type="email" name="email" id="email" value={formData.email} onChange={manejarCambio} required />
          
            <label>{t('labelPassword')}:</label>
            <input type="password" name="password" id="password" value={formData.password} onChange={manejarCambio} required />

            <button className="btn-editar-perfil" type="submit">{t('buttonUpdate')}</button>
        </form>
      </div>
    );
};

export default EditarPerfil;