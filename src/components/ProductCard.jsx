// src/components/ProductCard.jsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';

// Receive onAddToCart as a prop
const ProductCard = ({ product, onViewClick, onAddToCart }) => {
    return (
        <Card className="h-100 shadow-sm border-0 rounded">
            <Card.Img variant="top" src={product.imageUrl} alt={product.name} className="card-img-top" />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-bold fs-6 mb-2 text-truncate">{product.name}</Card.Title>
                <Card.Text className="text-muted small mb-3 flex-grow-1">
                    {product.description.length > 70 ? product.description.substring(0, 70) + '...' : product.description}
                </Card.Text>
                <div className="d-flex justify-content-between align-items-center mt-auto">
                    <span className="fw-bold text-primary">${product.price.toFixed(2)}</span>
                    <span className="text-warning small">
                        {'★'.repeat(Math.floor(product.rating))}
                        {'☆'.repeat(5 - Math.floor(product.rating))}
                        ({product.rating})
                    </span>
                </div>
            </Card.Body>
            <Card.Footer className="bg-white border-top-0 d-flex justify-content-between">
                <Button variant="outline-primary" size="sm" onClick={onViewClick}>
                    View
                </Button>
                {/* NEW: Add to Cart Button */}
                <Button
                    variant="success"
                    size="sm"
                    onClick={() => onAddToCart(product)} // Call onAddToCart with the product
                >
                    Add to Cart
                </Button>
            </Card.Footer>
        </Card>
    );
};

export default ProductCard;