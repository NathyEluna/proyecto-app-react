import { useState } from "react";

const API_URL = "http://localhost:8086/api"; //Ajusta la URL según corresponda.

export function useAuth() {
    //Estados.
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    //Login.
    const login = async (username, password) => {
        setLoading(true);
        setError(null);

        try{
            //console.log("Sending login request with: ", { username, password });
            //Enviar petición POST a la API para iniciar sesión.
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            //Obtener respuesta de la API.
            const data = await response.json();
            //console.log("Login response: ", data);

            if(!response.ok){
                throw new Error(data.message || "Error trying to login.");
            };

            if(!data.user.id || !data.token){
                throw new Error(data.message || "No user ID or token returned from API.");
            };

            // Guardar token de acceso a la API en localStorage.
            localStorage.setItem("id", data.user.id);
            localStorage.setItem("token", data.token);

            return data;

        }catch(error){
            //console.error("Login error: ", error.message);
            setError(error.message);

        }finally{
            setLoading(false);

        };
    };

    //Registro.
    const register = async (username, email, password) => {
        setLoading(true);
        setError(null);

        try{
            //Enviar petición POST a la API para registrar un nuevo usuario.
            const response = await fetch(`${API_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            });

            //Obtener respuesta de la API.
            const data = await response.json();
            if (!response.ok){
                throw new Error(data.message || "Error while registering user.");
            };

            return data;

        }catch(error){
            setError(error.message);

        }finally{
            setLoading(false);

        };
    };

    //Logout.
    const logout = async () => {
        const token = localStorage.getItem("token");
        //Si no hay token, no hay sesión iniciada.
        if (!token) return;

        setLoading(true);

        try {
            //Enviar petición POST a la API para cerrar sesión.
            await fetch(`${API_URL}/logout`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
            });

            //Eliminar token de localStorage.
            localStorage.removeItem("token");

        }catch(error){
            setError(error.message);

        }finally{
            setLoading(false);
        };
    };

    //Obtener todos los usuarios.
    const getAllUsers = async () => {
        const token = localStorage.getItem("token");
        //Si no hay token, no hay sesión iniciada.
        if(!token) return [];

        try{
            //Enviar petición GET a la API para obtener todos los usuarios.
            const response = await fetch(`${API_URL}/users`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            //Obtener respuesta de la API.
            const data = await response.json();
            if (!response.ok){
                throw new Error(data.message || "Error while fetching users.");
            };
            return data;
        
        }catch(error){
            setError(error.message);
            return [];
        };
    };

    //Retornar funciones y estados.
    return { login, register, logout, getAllUsers, loading, error };
};