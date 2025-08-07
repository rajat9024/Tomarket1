// src/components/CartPage.jsx
import React from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CartPage = ({ cartItems, onRemoveFromCart, onUpdateCartQuantity }) => {
    const calculateTotalPrice = () => {
        // Ensure price is a number for calculation
        return cartItems.reduce((acc, item) => acc + (Number(item.product.price) * item.quantity), 0);
    };

    if (cartItems.length === 0) {
        return (
            <Container className="mt-5 text-center">
                <h2>Your Cart is Empty</h2>
                <p>Looks like you haven't added anything to your cart yet.</p>
                <Link to="/" className="btn btn-primary mt-3">Start Shopping</Link>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <h2 className="mb-4">Your Shopping Cart</h2>
            <Row>
                <Col md={8}>
                    {cartItems.map(item => (
                        <Card key={item.product.id} className="mb-3 shadow-sm border-0">
                            <Card.Body>
                                <Row className="align-items-center">
                                    <Col xs={3} md={2}>
                                        <img
                                            src={item.product.imageUrl}
                                            alt={item.product.name}
                                            className="img-fluid rounded"
                                            style={{ maxWidth: '80px' }}
                                        />
                                    </Col>
                                    <Col xs={9} md={5}>
                                        <h5 className="mb-1">{item.product.name}</h5>
                                        {/* FIX 1: Convert price to number before toFixed */}
                                        <p className="text-muted mb-0 small">${Number(item.product.price).toFixed(2)} each</p>
                                    </Col>
                                    <Col xs={6} md={3} className="mt-2 mt-md-0">
                                        <InputGroup size="sm">
                                            <Button
                                                variant="outline-secondary"
                                                onClick={() => onUpdateCartQuantity(item.product.id, item.quantity - 1)}
                                            >
                                                -
                                            </Button>
                                            <Form.Control
                                                type="number"
                                                value={item.quantity}
                                                onChange={(e) => onUpdateCartQuantity(item.product.id, parseInt(e.target.value) || 0)}
                                                className="text-center"
                                                min="1"
                                                style={{ maxWidth: '60px' }}
                                            />
                                            <Button
                                                variant="outline-secondary"
                                                onClick={() => onUpdateCartQuantity(item.product.id, item.quantity + 1)}
                                            >
                                                +
                                            </Button>
                                        </InputGroup>
                                    </Col>
                                    <Col xs={6} md={2} className="text-end mt-2 mt-md-0">
                                        {/* FIX 2: Convert price to number for total calculation and then toFixed */}
                                        <h5 className="mb-0">${(Number(item.product.price) * item.quantity).toFixed(2)}</h5>
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            className="mt-1"
                                            onClick={() => onRemoveFromCart(item.product.id)}
                                        >
                                            Remove
                                        </Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    ))}
                </Col>
                <Col md={4}>
                    <Card className="shadow-sm border-0">
                        <Card.Body>
                            <Card.Title>Order Summary</Card.Title>
                            <hr />
                            <div className="d-flex justify-content-between mb-2">
                                <span>Items ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})</span>
                                <span>${calculateTotalPrice().toFixed(2)}</span>
                            </div>
                            <div className="d-flex justify-content-between fw-bold mb-3">
                                <span>Total:</span>
                                <span>${calculateTotalPrice().toFixed(2)}</span>
                            </div>
                            <Button variant="primary" className="w-100">Proceed to Checkout</Button>
                            <Link to="/" className="btn btn-outline-secondary w-100 mt-2">Continue Shopping</Link>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CartPage;