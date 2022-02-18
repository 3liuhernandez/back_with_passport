import { useContext } from "react";
import AuthContext from "../context/AuthContext";
/**
 * Hook del AuthContext
 * 
 * @returns Métodos y variables del AuthContext
 */
export const useAuth = () => useContext(AuthContext);

