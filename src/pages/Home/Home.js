import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
const Home = () => {
    const { user, isLogged, logout } = useAuth();

    return (
        <Card>
            <Card.Body>
                {isLogged && (
                    <>
                        <h1>{user.name}</h1>
                        <button type="button" onClick={() => logout() }>Logout</button>
                    </>
                )}
                

                <Link className="btn btn-primary" to="/login">Login</Link>
                &nbsp;
                <Link className="btn btn-warning" to="/register">Registro</Link>
            </Card.Body>
        </Card>
    )
}


export default Home;