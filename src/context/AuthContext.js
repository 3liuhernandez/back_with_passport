import React, { createContext, useEffect, useReducer } from 'react'
import { AuthLogin, GetUserLogged, Logout } from '../services/AuthService';
import axios from 'axios';

/**
 * Variables globales 
 * [estados iniciales]
 */
const initialState = {
    isLogged: false,
    user: null,
    message: null
}

/**
 * Iniciar contexto con valores por defecto
 */
const AuthContext = createContext({
    ...initialState,
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
})

/**
 * Maneja los estados del usuario
 * 
 * @param {*} state 
 * @param {*} action 
 */
const reducer = (state, action) => {
    switch (action.type) {
        /**
         * Estado de sesión iniciada
         */
        case 'LOGIN': {
            const { user, message } = action.payload

            return {
                ...state,
                isLogged: true,
                user,
                message
            }
        }

        /**
         * estado de cierre de sesión
         */
        case 'LOGOUT': {
            return initialState;
        }

        default: {
            return { ...state }
        }
    }
}

/**
 * Guarda el token en localStorage
 * 
 * @param {*} accessToken 
 */
const setSession = (accessToken) => {
    if (accessToken) {
        localStorage.setItem('accessToken', accessToken)
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    } else {
        localStorage.removeItem('accessToken')
        delete axios.defaults.headers.common.Authorization
    }
}

/**
 * Provider del contexto Auth
 * 
 * @param {*} param0 
 */
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    /**
     * Realiza el login de un usuario
     * 
     * @param {*} email 
     * @param {*} password 
     */
    const login = async (email, password) => {
        // Hacemos la petición
        const response = await AuthLogin({
            email: email,
            password: password,
        });

        // Obtenemos los resultados
        const {success, message, body, user} = response.data;
    
        // Si hay error, lo lanzamos
        if(!success){
            throw message;
        }
            
        // Asignamos el token al localStorage
        setSession(body.access_token);

        // Cambiamos el estado del usuario
        dispatch({
            type: 'LOGIN',
            payload: {
                user,
                message
            },
        })
    }


    /**
     * Detectar el usuario conectado
     */
    useEffect(() => {

        (async () => {
            try{
                const accessToken = localStorage.getItem('accessToken')

                if(accessToken) {
                    const response = await GetUserLogged();
                    const { data } = response;
                    
                    // Cambiamos el estado del usuario
                    dispatch({
                        type: 'LOGIN',
                        payload: {
                            user: data,
                            message: null
                        }
                    })
                }
                
    
            }catch (error) {
                logout();
            }
        })()
    }, []);

    /**
     * Cierra la sesión del usuario
     */
    const logout = () => {
        Logout()
        setSession(null)
        dispatch({ type: 'LOGOUT' })
        
    }


    return (
        <AuthContext.Provider
            value={{
                ...state,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext