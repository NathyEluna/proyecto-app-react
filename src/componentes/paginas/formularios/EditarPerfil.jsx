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
  const [uploading, setUploading] = useState(false);

  //Función para subir el avatar del usuario.
  const uploadAvatar = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error(t('noFileSelected'));
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}-${Math.random()}.${fileExt}`;

      //Upload image.
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file,
          {
            cacheControl: '3600',
            upsert: true
          }
        );

      if (uploadError) throw uploadError;

      //Get public URL.
      const { data: urlData } = await supabase.storage
        .from('avatars')
        .createSignedUrl(filePath, 31536000);

      //Update profile.
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: urlData.signedUrl })
        .eq('id', user.id);

      if (updateError) throw updateError;

      //Update local state.
      setProfile({
        ...profile,
        avatar_url: urlData.signedUrl
      });

    } catch (error) {
      console.error('Error uploading avatar:', error);
    } finally {
      setUploading(false);
    };
  };

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
      <div className="container-bg-editar">
        <div className="container-editar">
          <h2>{t('title')}</h2>

          <div className="avatar-section">
            {profile?.avatar_url ? (
              <img 
                src={profile.avatar_url} 
                alt="Avatar" 
                className="avatar"
              />
            ) : (
              <div className="avatar-placeholder">
                {profile?.username?.charAt(0).toUpperCase()}
              </div>
            )}
            
            <div className="avatar-upload">
              <label className="avatar-button" htmlFor="avatar">
                {uploading ? t("uploading") : t("changeAvatar")}
              </label>
              <input
                type="file"
                id="avatar"
                accept="image/*"
                onChange={uploadAvatar}
                disabled={uploading}
                style={{ display: 'none' }}
              />
            </div>
          </div>

          <form>
            <label htmlFor="username">{t('labelUsername')}</label>
            <input type="text" name="username" id="username" defaultValue={profile?.username} required onChange={(e) => updateCredentials(e)} />

            <label>{t('labelEmail')}</label>
            <input type="email" name="email" id="email" value={user?.email} readOnly />

            <button className="btn-editar-perfil" onClick={saveProfile}>{t('buttonUpdate')}</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditarPerfil;