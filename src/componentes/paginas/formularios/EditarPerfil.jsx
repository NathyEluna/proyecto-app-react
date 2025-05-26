import { useState, useEffect } from "react";
import { supabase } from "../../../config/supabase.js";
import "../../../css/EditarPerfil.css";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../contextos/AuthProvider";


const EditarPerfil = () => {
  //Contexto de autenticación.
  const { user, saveProfile, updateCredentials } = useAuth();
  //Hook de traducción.
  const { t } = useTranslation("editarPerfil");
  //Estado para almacenar el perfil del usuario.
  const [profile, setProfile] = useState(null);

  //Efecto para cargar el perfil del usuario al montar el componente.
  useEffect(() => {
    const loadProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) console.error(error);
      else setProfile(data);
    };

    if (user) loadProfile();
  }, [user]);

  return (
    <>
      <div className="container-editar">
        <h2>{t('title')}</h2>
        <form>
          <label htmlFor="username">{t('labelUsername')}</label>
          <input type="text" name="username" id="username" defaultValue={profile?.username} required onChange={(e) => updateCredentials(e)} />

          <label>{t('labelEmail')}</label>
          <input type="email" name="email" id="email" value={user?.email} readOnly />


          <button className="btn-editar-perfil" onClick={saveProfile}>{t('buttonUpdate')}</button>
        </form>
      </div>
    </>
  );
};

export default EditarPerfil;