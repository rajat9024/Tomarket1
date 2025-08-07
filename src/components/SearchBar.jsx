// src/components/SearchBar.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Form, FormControl, Button } from 'react-bootstrap';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <Container fluid className="bg-light py-4 border-bottom">
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <Form className="d-flex" onSubmit={handleSearch}>
                        <FormControl
                            type="search"
                            placeholder="Search within these results"
                            className="me-2 rounded-pill shadow-sm"
                            aria-label="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button variant="success" type="submit" className="rounded-pill px-4">Search</Button>
                    </Form>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col className="text-center text-muted">
                    <p className="mb-0"> Awesome BigCommerce Themes and Templates.</p>
                </Col>
            </Row>
        </Container>
    );
};

export default SearchBar;
