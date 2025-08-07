// src/components/CodePage.jsx
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css'; // For icons

// Mock data for the Code section categories
const codeCategories = [
    {
        name: 'WordPress',
        description: 'Thousands of WordPress plugins',
        items: [
            { id: 1, title: 'Slider Revolution 6', subtitle: 'The #1 Selling WordPress Builder', icon: 'bi-wordpress', imageUrl: 'https://placehold.co/300x200/F0F8FF/000000?text=WP+Slider' }
        ]
    },
    {
        name: 'PHP Scripts',
        description: 'Thousands of PHP Scripts',
        items: [
            { id: 2, title: 'Foodtigo - Food Delivery', subtitle: 'Cloud Version now available', icon: 'bi-filetype-php', imageUrl: 'https://placehold.co/300x200/F5F5DC/000000?text=PHP+Food' }
        ]
    },
    {
        name: 'Mobile',
        description: 'Mobile app templates, games and more',
        items: [
            { id: 3, title: 'RocketWeb - Mobile App Builder', subtitle: 'Convert any website to Android & iOS app', icon: 'bi-phone', imageUrl: 'https://placehold.co/300x200/FFE4E1/000000?text=Mobile+App' }
        ]
    },
    {
        name: 'HTML 5',
        description: 'Thousands of HTML 5 templates',
        items: [
            { id: 4, title: 'VideoPro - Video Production', subtitle: 'HTML Video Player Template', icon: 'bi-filetype-html', imageUrl: 'https://placehold.co/300x200/E0FFFF/000000?text=HTML5+Video' }
        ]
    },
    {
        name: 'Javascript',
        description: 'Large range of Javascript code and add-ons',
        items: [
            { id: 5, title: 'LiveSmart - Video Chat', subtitle: 'Video & Audio Chat Solution', icon: 'bi-filetype-js', imageUrl: 'https://placehold.co/300x200/F0FFF0/000000?text=JS+Chat' }
        ]
    },
    {
        name: 'Plugins',
        description: 'Online store plugins, code and scripts',
        items: [
            { id: 6, title: 'Visual Composer', subtitle: '#1 Page Builder for WordPress', icon: 'bi-puzzle', imageUrl: 'https://placehold.co/300x200/FFF0F5/000000?text=Plugin+Builder' }
        ]
    },
];

const CodePage = () => {
    return (
        <Container fluid className="py-5 bg-light">
            <Row className="justify-content-center mb-5">
                <Col xs={12} className="text-center">
                    <h2 className="fw-bold text-dark mb-4">Explore Code & Scripts</h2>
                    <p className="lead text-muted">Discover thousands of plugins, scripts, and templates for your projects.</p>
                    <Button variant="success" className="rounded-pill px-4 py-2">Let's create</Button>
                </Col>
            </Row>

            <Row className="g-4 px-4">
                {codeCategories.map(category => (
                    <Col key={category.name} xs={12} sm={6} lg={4}>
                        <Card className="h-100 shadow-sm rounded-lg border-0">
                            <Card.Body className="p-4">
                                <div className="d-flex align-items-center mb-3">
                                    {/* Icon Placeholder - you can use real icons or SVGs here */}
                                    <div className="bg-success-subtle text-success p-2 rounded-circle me-3 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                        <i className={`bi ${category.items[0]?.icon || 'bi-code'} fs-4`}></i>
                                    </div>
                                    <div>
                                        <Card.Title className="h5 mb-0 text-dark">{category.name}</Card.Title>
                                        <Card.Text className="text-muted small">{category.description}</Card.Text>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <a href="#" className="text-decoration-none small text-primary">Newest</a>
                                    <a href="#" className="text-decoration-none small text-primary">Bestsellers</a>
                                </div>
                                {category.items.map(item => (
                                    <Card key={item.id} className="mb-3 border-0 shadow-sm">
                                        <Row className="g-0">
                                            <Col xs={4}>
                                                <Card.Img src={item.imageUrl} alt={item.title} className="rounded-start object-cover h-100" />
                                            </Col>
                                            <Col xs={8}>
                                                <Card.Body className="p-2">
                                                    <Card.Title className="h6 mb-1 text-truncate">{item.title}</Card.Title>
                                                    <Card.Text className="small text-muted mb-0">{item.subtitle}</Card.Text>

                                                </Card.Body>
                                            </Col>
                                        </Row>
                                    </Card>
                                ))}
                                <Button variant="link" className="text-decoration-none text-success mt-2 p-0">
                                    View all {category.name.toLowerCase()} <i className="bi bi-arrow-right"></i>
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Row className="justify-content-center mt-5">
                <Col xs={12} className="text-center">
                    <Button variant="success" className="rounded-pill px-5 py-3 fs-5">View all categories</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default CodePage;
