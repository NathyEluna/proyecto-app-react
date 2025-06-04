import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../../css/Perfil.css";
import { useAuth } from "../../../contextos/AuthProvider";
import { supabase } from "../../../config/supabase.js";
import { useTranslation } from "react-i18next";

const Perfil = () => {
    //Contexto.
    const { user } = useAuth();
    const { t } = useTranslation("editarPerfil");
    
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
        <div className="container-bg-perfil">
            <div className="container-perfil">
                <h2>{t('title2')}</h2>
                
                <div className="profile-avatar">
                    {profile?.avatar_url ? (
                        <img src={profile.avatar_url} alt="Avatar" className="avatar" />
                    ) : (
                        <div className="avatar-placeholder">
                            {profile?.username?.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>

                <div className="perfil-input border mb-3 mt-3 border-2 rounded-lg p-3 w-50 mx-auto text-center text-xl">
                    <p className="border-b-1 border-gray-200 w-50 text-center mx-auto mb-2"><strong>{t('labelUsername')}</strong></p>
                    <p>{profile?.username}</p>
                </div>

                <div className="perfil-input border mb-3 mt-3 border-2 rounded-lg p-3 w-50 mx-auto text-center text-xl">
                    <p className="border-b-1 border-gray-200 w-50 text-center mx-auto mb-2"><strong>{t('labelEmail')}</strong></p>
                    <p>{user?.email}</p>
                </div>

                <Link to="/edit-profile">{t('editButton')}</Link>
            </div>
        </div>
    );
};

export default Perfil;