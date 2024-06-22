import {useEffect, useState} from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {users} from "../components/api.jsx"
import {Alert, Button, Col, FloatingLabel, Form, Row} from "react-bootstrap";
import {useSession} from "../context/auth.jsx";
import {Link, useNavigate} from "react-router-dom";
import Container from "react-bootstrap/Container";


function Login() {
    const [rememberMe, setRememberMe] = useState(false);
    const [loginError, setLoginError] = useState('');
    const { login, user } = useSession();
    const navigate = useNavigate();

    const schema = z.object({
        email: z.string().email({ message: "Invalid email address" }),
        password: z.string().min(8, { message: 'Password must be 8 characters long' }),
    });

    useEffect(() => {
        if (user) {
            navigate("/dashboard");
        }
    }, [user, navigate]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${users}/login`, data);
            login(response.data.user, response.data.token);
            return navigate("/dashboard");

        } catch (error) {
            setLoginError(error.response.data);
        }
    };

    return (
            <Container className="my-5 mx-1">
                <Row xs={1} md={2} lg={3} className="justify-content-center align-items-center">
                    <Col className="border rounded p-lg-5 py-5">
                        <FloatingLabel controlId="email" label="Email address" className="mb-3">
                            <Form.Control type="email" placeholder="Enter your email address" {...register('email')} />
                            <span className="text-danger">{errors.email?.message}</span>
                        </FloatingLabel>
                        <FloatingLabel controlId="password" label="Password" className="mb-3">
                            <Form.Control type="password" placeholder="Enter your password" {...register('password')} />
                            <span className="text-danger">{errors.password?.message}</span>
                        </FloatingLabel>
                        <Row className="mb-3 justify-content-between">
                            <Col xs="auto">
                                <Form.Check aria-label="Remember me" label="Remember me" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                            </Col>
                            <Col xs="auto">
                                <a className="mx-2">Forgot password</a>
                            </Col>
                        </Row>
                        {loginError &&
                            <Alert variant="danger" className="text-center" dismissible={true}>{loginError}</Alert>} {/* Error message */}
                        <Button type="button" className="col-12 mb-3" onClick={handleSubmit(onSubmit)}> Sign in</Button>
                        <Col className="text-center">
                            <Link to="/register" style={{ textDecoration: 'none' }}>Create New Account</Link>
                        </Col>
                    </Col>
                </Row>
            </Container>
    );
}

export default Login;
