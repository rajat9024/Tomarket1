// src/components/BeauticaCosmeticsListingPage.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CosmeticProductCard from './CosmeticProductCard'; // Import the new cosmetic card
import './BeauticaCosmeticsListingPage.css'; // CSS for this page's layout

// Mock data for the cosmetic products (as seen in your second image)
const beauticaCosmeticProducts = [
    {
        id: 'beautica_cos_prod_20',
        name: 'Amazing Cosmetics Smooth Creme Concealer & Foundation Duo',
        price: '76.00',
        imageUrl: 'https://th.bing.com/th/id/OPAC.FMcXBQArNVEAXg474C474?w=160&h=220&rs=1&r=0&o=5&dpr=1.5&pid=21.1',
       
        rating: 5
    },
    {
        id: 'beautica_cos_prod_19',
        name: 'Bellapierre Cosmetics Compact Mineral Blush',
        price: '76.00',
        imageUrl: 'https://th.bing.com/th/id/OPAC.2OU4rvESdIvBeQ474C474?w=200&h=220&rs=1&r=0&o=5&dpr=1.5&pid=21.1',
      
        rating: 4
    },
    {
        id: 'beautica_cos_prod_18',
        name: 'Lancome Lip Idole Butterglow Lip Balm - 21 Shade Throwing Beige',
        price: '66.00',
        imageUrl: 'https://th.bing.com/th/id/OPAC.UKqanoYgLXy1MQ474C474?w=195&h=220&rs=1&r=0&o=5&dpr=1.5&pid=21.1',
       
        rating: 3
    },
    {
        id: 'beautica_cos_prod_17',
        name: 'GrandeBrow Fill Volumizing Brow Gel',
        price: '46.00',
        imageUrl: 'https://th.bing.com/th?id=OPAC.K%2bGymfQwE3e9Nw474C474&w=160&h=220&rs=1&r=0&o=5&dpr=1.5&pid=21.1',
       
        rating: 4
    },
    // Add more mock cosmetic products if you want to fill out the grid more
    {
        id: 'beautica_cos_prod_extra1',
        name: 'Deluxe Eyeshadow Palette',
        price: '85.00',
        imageUrl: 'https://th.bing.com/th/id/OPAC.URFuoowk5tZ9sA474C474?w=160&h=220&rs=1&r=0&o=5&dpr=1.5&pid=21.1',
        availability: 'IN STOCK',
        rating: 5
    },
    {
        id: 'beautica_cos_prod_extra2',
        name: 'Bellapierre Cosmetics Glowing Palette6x Illuminator',
        price: '55.00',
        imageUrl: 'https://th.bing.com/th/id/OPAC.CygqwlBFRSO1Qw474C474?w=165&h=220&rs=1&r=0&o=5&dpr=1.5&pid=21.1',
        availability: 'LOW STOCK',
        rating: 4
    },
];

const BeauticaCosmeticsListingPage = ({onAddToCart}) => {
    return (
        <div className="beautica-cosmetics-page">
           
            {/* Main content area with product grid */}
            <Container fluid className="mt-4 px-4">
                <Row className="g-4 justify-content-center"> 
                    {beauticaCosmeticProducts.map(product => (
                        <Col key={product.id} xs={12} sm={6} md={4} lg={3} xl={3}> 
                            <CosmeticProductCard product={product}
                            onAddToCart={onAddToCart} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default BeauticaCosmeticsListingPage;