import { useState } from "react";
import { Button, Card, FloatingLabel, Form, Spinner } from "react-bootstrap";
import { AuthRegister } from "../../services/AuthService";
import { handdleErrors } from "../../helpers";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
/**
 * Estado inicial
 */
const initialState = {
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
}

const Register = () => {
    const [loading, setLoading] = useState(false);
    const history = useNavigate();

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
            // Petición para registro
            const resp = await AuthRegister(data);

            // Respuesta de la petición
            const {success, message} = resp.data;

            // Si hay errores
            if(!success){
                throw message;
            }
            toast.success(message, { autoClose: 2000, pauseOnHover: false })
            setLoading(false);
            history('/login');
        } catch (error) {
            setLoading(false);
            handdleErrors(error, setError);
        }
        
    }

    return (
        <Card className="w-100" style={{ maxWidth:'500px', minWidth:'500px' }}>
            <Card.Body>
                <Card.Title>Registro</Card.Title>

                <Form onSubmit={handdleSubmit}>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Nombre"
                        className="mb-3"
                    >
                        <Form.Control name="name" onChange={handdleChange} value={data.name} type="text" placeholder="Nombre del usuario" />
                        <Form.Text className="text-danger">{error.name}</Form.Text>
                    </FloatingLabel>


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


                    <FloatingLabel
                        controlId="floatingInput"
                        label="Confirmar Contraseña"
                        className="mb-3"
                    >
                        <Form.Control name="password_confirmation" onChange={handdleChange} value={data.password_confirmation} type="password" placeholder="Vuelva a escribir la Contraseña" />
                        <Form.Text className="text-danger">{error.password_confirmation}</Form.Text>
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
                        
                        Guardar
                    </Button>

                </Form>

            </Card.Body>
        </Card>
    )
}


export default Register;