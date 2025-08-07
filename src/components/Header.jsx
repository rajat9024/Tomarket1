// src/components/Header.jsx
import React from 'react';
import { Navbar, Container, Nav, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Receive cartItemCount as a prop
const Header = ({ onSignOut, cartItemCount }) => {
  

    const handleSignOutClick = () => {
        onSignOut();
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
            <Container>
                <Navbar.Brand as={Link} to="/">EnvatoMarket</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center"> {/* Added align-items-center for vertical alignment */}
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/code">Code</Nav.Link>
                        <Nav.Link as={Link} to="/video">Video</Nav.Link>

                        {/* NEW: Cart Icon with Badge */}
                        <Nav.Link as={Link} to="/cart" className="position-relative me-3">
                            <i className="bi bi-cart fs-5"></i> {/* Bootstrap Icons cart icon */}
                            {cartItemCount > 0 && (
                                <Badge>
                                    {cartItemCount}
                                </Badge>)}
                        </Nav.Link>

                        <Button variant="outline-light" onClick={handleSignOutClick} className="ms-3">
                            Sign Out
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;