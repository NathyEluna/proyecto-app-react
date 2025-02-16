import { useState } from "react";

const API_URL = "http://localhost:8086/api"; //Ajusta la URL según corresponda.

export function useUser() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    //Conseguir perfil de usuario.
    const getUserProfile = async (id, token) => {
        //Si no hay ID o token, no se puede obtener el perfil.
        if (!id || !token || id === "undefined"){
            return null;
        };
        
        setLoading(true);

        try {
            //Enviar petición GET a la API para obtener el perfil del usuario.
            const response = await fetch(`${API_URL}/users/${id}`, {
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            //Obtener respuesta de la API.
            const data = await response.json();
            if (!response.ok){
                throw new Error(data.message || "Failed to fetch profile");
            };
            return data;

        }catch(error){
            setError(error.message);
            return null;

        }finally{
            setLoading(false);
        };
    };

    //Actualizar perfil de usuario.
    const updateUserProfile = async (id, updatedData, token) => {
        //Si no hay ID o token, no se puede actualizar el perfil
        if (!id || !token) return null;
        setLoading(true);

        try{
            //Enviar petición PUT a la API para actualizar el perfil del usuario.
            const response = await fetch(`${API_URL}/users/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(updatedData),
            });

            //Obtener respuesta de la API.
            const data = await response.json();
            if (!response.ok){
                throw new Error(data.message || "Failed to update profile");
            };
            return data;
        
        }catch(error){
            setError(error.message);
            return null;
        
        }finally{
            setLoading(false);

        };
    };

    //Retornar funciones y estados.
    return { getUserProfile, updateUserProfile, loading, error };
};