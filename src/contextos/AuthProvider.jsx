import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../config/supabase.js";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    //Variables.
    const navigate = useNavigate();
    const location = useLocation();

    //Initial state for credentials.
    const initialCredentials = { email: "", password: "", username: "" };
    //State variables for authentication.
    const [credentials, setCredentials] = useState(initialCredentials);
    const [user, setUser] = useState(null);
    const [authError, setAuthError] = useState("");
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    //Functions.

    //Update credentials for login or registration.
    //This function is used to update the credentials state when the user types in the input fields.
    const updateCredentials = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    //Register a new user.
    //This function is used to register a new user with the email and password provided in the credentials state.
    const registerUser = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase.auth.signUp({
                email: credentials.email,
                password: credentials.password,
            });

            if (error) throw error;

            const userId = data.user?.id;

            if (userId) {
                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert({
                        id: userId,
                        username: credentials.username,
                    });

                if (profileError) throw profileError;
            };

            setAuthError(`Check your email (${credentials.email}) to verify your account.`);
        } catch (error) {
            setAuthError(error.message);
        } finally {
            setLoading(false);
        };
    };

    //Login with email and password.
    //This function is used to log in the user with the email and password provided in the credentials state.
    const loginWithPassword = async () => {
        setLoading(true);
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: credentials.email,
                password: credentials.password,
            });

            if (error) throw error;

            navigate("/");
        } catch (error) {
            setAuthError(error.message);
        } finally {
            setLoading(false);
        };
    };

    //Logout the user.
    //This function is used to log out the user.
    const logout = async () => {
        setLoading(true);
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;

            setUser(null);
            setIsAuthenticated(false);

            navigate("/login");
        } catch (error) {
            setAuthError(error.message);
        } finally {
            setLoading(false);
        };
    };

    //Fetch the current user.
    //This function is used to fetch the current user from Supabase.
    const fetchCurrentUser = async () => {
        setLoading(true);
        try {
            setAuthError("");
            const { data, error } = await supabase.auth.getUser();
            if (error) throw error;

            setUser(data.user);
        } catch (error) {
            setAuthError(error.message);
        } finally {
            setLoading(false);
        };
    };

    //Reset password.
    //This function is used to reset the password for the user with the email provided in the credentials state.
    const resetPassword = async () => {
        setLoading(true);
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(credentials.email, {
                redirectTo: "https://mindescape-seven.vercel.app//change-password",
            });

            if (error) throw error;

            setAuthError("A password reset email has been sent.");
        } catch (error) {
            setAuthError(error.message);
        } finally {
            setLoading(false);
        };
    };

    //Change password.
    //This function is used to change the password for the current user.
    const changePassword = async () => {
        setLoading(true);
        try {
            const { error } = await supabase.auth.updateUser({
                password: credentials.password,
            });

            if (error) throw error;

            await fetchCurrentUser();
            navigate("/");
        } catch (error) {
            setAuthError(error.message);
        } finally {
            setLoading(false);
        };
    };

    const saveProfile = async (e) => {
        e.preventDefault();

        try {
            const { error } = await supabase.from('profiles')
                .update({
                    username: credentials.username,
                })
                .eq('id', user.id);

            navigate("/profile")

            if (error) {
                throw error;
            }
        } catch (error) {
            setAuthError(error.message);
        } finally {
            setLoading(false);
        }
    };


    //Clear error message.
    const clearError = () => setAuthError("");

    //Effect to check authentication state.
    useEffect(() => {
        clearError();
        const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                //Check if the user is trying to access the change password page.
                if (location.pathname !== "/change-password") {
                    navigate("/");
                }
                setIsAuthenticated(true);
                fetchCurrentUser();
                clearError();
            } else {
                navigate("/login");
                setIsAuthenticated(false);
                clearError();
            };
        });

        return () => subscription?.subscription?.unsubscribe?.();//Just in case.
    }, []);

    const exportData = {
        user,
        authError,
        isAuthenticated,
        registerUser,
        loginWithPassword,
        logout,
        updateCredentials,
        resetPassword,
        fetchCurrentUser,
        changePassword,
        clearError,
        loading,
        credentials,
        saveProfile,
    };

    return <AuthContext.Provider value={exportData}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
