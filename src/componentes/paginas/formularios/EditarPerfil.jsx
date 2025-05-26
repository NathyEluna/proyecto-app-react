import { useState, useEffect } from "react";
import { supabase } from "../../../config/supabase.js";
import "../../../css/EditarPerfil.css";
import { useAuth } from "../../../contextos/AuthProvider";

const EditarPerfil = () => {
  const { user, saveProfile, updateCredentials } = useAuth();

  const [profile, setProfile] = useState(null);

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
        <h2>Edit Profile</h2>
        <form>
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" id="username" defaultValue={profile?.username} required onChange={(e) => updateCredentials(e)} />

          <label>Email:</label>
          <input type="email" name="email" id="email" value={user?.email} readOnly />


          <button className="btn-editar-perfil" onClick={saveProfile}>Update</button>
        </form>
      </div>
    </>
  );
};

export default EditarPerfil;