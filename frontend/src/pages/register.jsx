import { useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {users} from "../components/api.jsx"
import {Alert, Button, Col, FloatingLabel, Form, Row} from "react-bootstrap";
import {Bounce, toast, ToastContainer} from "react-toastify";
import Container from "react-bootstrap/Container";
import {Link, useNavigate} from "react-router-dom";

function Register() {
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();

    const schema = z.object({
        name: z.string().min(3, { message: 'Name Required' }),
        email: z.string().email({ message: "Invalid email address" }),
        password: z.string().min(8, { message: 'Password must be 8 characters long' }),
    });

    const {register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            await axios.post(`${users}/register`, data);
            toast.success('User Account Created Successfully! Please Log in', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            reset();
            setTimeout(() => {
                navigate("/");
            }, 3000);

        } catch (error) {
            setLoginError(error.response.data);
        }
    };

    return (
        <Container className="my-5 mx-1">
            <ToastContainer/>
            <Row xs={1} md={2} lg={3} className="justify-content-center align-items-center">
                <Col className="border rounded p-lg-5 py-5">
                    <FloatingLabel controlId="name" label="Name" className="mb-3">
                        <Form.Control type="name" placeholder="Enter your Name" {...register('name')} />
                        <span className="text-danger">{errors.name?.message}</span>
                    </FloatingLabel>
                    <FloatingLabel controlId="email" label="Email address" className="mb-3">
                        <Form.Control type="email" placeholder="Enter your email address" {...register('email')} />
                        <span className="text-danger">{errors.email?.message}</span>
                    </FloatingLabel>
                    <FloatingLabel controlId="password" label="Password" className="mb-3">
                        <Form.Control type="password" placeholder="Enter your password" {...register('password')} />
                        <span className="text-danger">{errors.password?.message}</span>
                    </FloatingLabel>
                    {loginError &&
                        <Alert variant="danger" className="text-center" dismissible={true}>{loginError}</Alert>} {/* Error message */}
                    <Button type="button" className="col-12 mb-3" onClick={handleSubmit(onSubmit)}> Sign Up</Button>
                    <Col className="text-center">
                        <Link to="/login" style={{ textDecoration: 'none' }}>Already Have an account?</Link>
                    </Col>
                </Col>
            </Row>
        </Container>
    );
}

export default Register;
