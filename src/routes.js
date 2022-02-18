import { Routes, Route} from 'react-router-dom';


// Páginas
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';


/**
 * Listado de rutas
 */
const AllRoutes = () => {
    return (
        <Routes>
            <Route exact path="/" name="Home" element={<Home />}/>
            <Route exact path="/login" name="Login" element={<Login />}/>
            <Route exact path="/register" name="Register" element={<Register />}/>
            
           
            <Route path="*" element={<div>404 Page not found</div>} />
        </Routes>
    );
}

export default AllRoutes;