import axios from 'axios';
import { API_URL } from '../constants';

/**
 * Método para registrar
 */
export const AuthRegister = (data) => {
    let form = new FormData();
    for(let i in data) {
        form.append(i, data[i]);
    }
    return axios.post(API_URL + 'register', form);
}

/**
 * Logeo de usuario
 */
export const AuthLogin = (data) => {
    let form = new FormData();
    form.append('email', data.email);
    form.append('password', data.password);
    return axios.post(API_URL + 'login', form);
}

/**
 * Obtiene la usuario logeado
 */
export const GetUserLogged = () => {
    return axios.get(API_URL + 'user');
}


/**
 * Cierra la sesión de un usuario
 */
export const Logout = () => {
    return axios.post(API_URL + 'logout');
}