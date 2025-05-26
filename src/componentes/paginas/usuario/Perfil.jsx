import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../../css/Perfil.css";
import { useAuth } from "../../../contextos/AuthProvider";
import { supabase } from "../../../config/supabase.js";

const Perfil = () => {
    //Contexto.
    const { user } = useAuth();
    
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
        <div className="container-perfil">
            <h2>Profile</h2>
            {profile?.avatar_url && (
                <img src={profile?.avatar_url} alt="Avatar" className="avatar" />
            )}
            <p><strong>Username:</strong></p>
            <p>{profile?.username}</p>

            <p><strong>Email:</strong></p>
            <p>{user?.email}</p>

            <Link to="/edit-profile">Edit Profile</Link>
        </div>
    );
};

export default Perfil;