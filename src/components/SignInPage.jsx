// src/components/SignInPage.jsx
import React, { useState } from 'react';
import { Container, Card, Form, Button} from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css'; // For social media icons

const SignInPage = ({ onSignInSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the email/password to your backend for authentication.
        // For this example, we'll just simulate a successful sign-in.
        console.log('Attempting sign-in with:', { email, password });
        // Simulate success
        if (onSignInSuccess) {
            onSignInSuccess();
        }
    };

    return (
        <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            <Card className="p-4 shadow-lg rounded-lg" style={{ maxWidth: '450px', width: '100%' }}>
                <Card.Body>
                    {/* Envato Logo */}
                    <div className="text-center mb-4">
                        {/* Replace with actual Envato logo image if available, or use text */}
                        <h2 className="fw-bold text-success mb-3">
                            <i className="bi bi-envira me-2"></i>envato
                        </h2>
                    </div>

                    <h4 className="text-center mb-4 text-dark">Great to have you back!</h4>

                    {/* Social Login Buttons */}
                    <div className="d-grid gap-2 mb-4">
                        <Button variant="outline-secondary" className="d-flex align-items-center justify-content-center py-2 rounded-pill">
                            <i className="bi bi-google me-2 fs-5"></i> Continue with Google
                        </Button>
                        <Button variant="outline-secondary" className="d-flex align-items-center justify-content-center py-2 rounded-pill">
                            <i className="bi bi-apple me-2 fs-5"></i> Continue with Apple
                        </Button>
                        <Button variant="outline-secondary" className="d-flex align-items-center justify-content-center py-2 rounded-pill">
                            <i className="bi bi-facebook me-2 fs-5"></i> Continue with Facebook
                        </Button>
                    </div>

                    <div className="text-center text-muted small mb-4">
                        Or sign in with your Envato account
                    </div>

                    {/* Email/Username and Password Form */}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <div className="d-flex justify-content-between align-items-center mb-1">
                                <Form.Label className="mb-0">Username or Email</Form.Label>
                                <a href="#" className="text-decoration-none small text-primary">Remind me</a>
                            </div>
                            <Form.Control
                                type="email" // Or 'text' for username
                                placeholder=""
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="rounded-pill"
                            />
                        </Form.Group>

                        <Form.Group className="mb-4" controlId="formBasicPassword">
                            <div className="d-flex justify-content-between align-items-center mb-1">
                                <Form.Label className="mb-0">Password</Form.Label>
                                <a href="#" className="text-decoration-none small text-primary">Forgot</a>
                            </div>
                            <Form.Control
                                type="password"
                                placeholder=""
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="rounded-pill"
                            />
                        </Form.Group>

                        <div className="d-grid gap-2">
                            <Button variant="success" type="submit" className="py-2 rounded-pill fw-bold">
                                Sign in
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default SignInPage;
