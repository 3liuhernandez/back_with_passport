import { useState } from "react";
import { Button, Card, FloatingLabel, Form, Spinner } from "react-bootstrap";
import { handdleErrors } from "../../helpers";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

/**
 * Estado inicial
 */
const initialState = {
    email: '',
    password: ''
}

const Login = () => {
    const [loading, setLoading] = useState(false);
    const history = useNavigate();
    const { login, message } = useAuth();

    // Errores
    const [error, setError] = useState(initialState)
    // data del formulario
    const [data, setData] = useState(initialState);

    /**
     * Detectamos cambios en los campos del formulario
     * 
     * @param {*} e : Evento
     */
    const handdleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        })
    } 

    /**
     * Registro de usuario
     * 
     * @param {*} event 
     */
    const handdleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(initialState);

        try {
            // Petición para iniciar sesión
            await login(data.email, data.password);

            setLoading(false);

            toast.success(message, { autoClose: 2000, pauseOnHover: false })
            history('/');
        } catch (error) {
            setLoading(false);
            handdleErrors(error, setError);
        }
        
    }

    return (
        <Card className="w-100" style={{ maxWidth:'500px', minWidth:'500px' }}>
            <Card.Body>
                <Card.Title>Login</Card.Title>

                <Form onSubmit={handdleSubmit}>


                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email"
                        className="mb-3"
                    >
                        <Form.Control name="email" onChange={handdleChange} value={data.email} type="text" placeholder="Correo electrónico" />
                        <Form.Text className="text-danger">{error.email}</Form.Text>
                    </FloatingLabel>


                    <FloatingLabel
                        controlId="floatingInput"
                        label="Contraseña"
                        className="mb-3"
                    >
                        <Form.Control name="password" onChange={handdleChange} value={data.password} type="password" placeholder="Contraseña" />

                        <Form.Text className="text-danger">{error.password}</Form.Text>
                    </FloatingLabel>


                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading && (
                            <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                        )}
                        
                        Iniciar sesión
                    </Button>

                </Form>

            </Card.Body>
        </Card>
    )
}


export default Login;