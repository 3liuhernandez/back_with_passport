import { toast } from 'react-toastify';
/**
 * Maneja los errores de validación
 * 
 * @param {*} error 
 * @param {*} setError 
 */
export const handdleErrors = (error, setError) => {
    if(typeof error === 'object'){
        for(let i in error) {
            setError({
                ...error,
                [i]: error[i][0]
            });
        }
    }else{
        toast.error(error, { autoClose: 2000, pauseOnHover: false })
    }
}