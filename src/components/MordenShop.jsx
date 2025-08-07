import React from 'react'
import { Container,Row, Col } from 'react-bootstrap';
import MordenProductCard from './MordenProductCard';
import './MordenShop.css';


const MordenShopProduct = [
    {
        id:'1',
        name:'Broderie anglaise dress Blue',
        price:60.00,
        imageUrl: 'https://image.hm.com/assets/hm/49/e4/49e49474edda773cb9196cd54949e42d32241866.jpg?imwidth=1260',
        rating: 5
    },
    {
        id:'2',
        name:'FABCLUB Printed Fit & Flare Dress For Women',
        price:40.00,
        imageUrl: 'https://th.bing.com/th?id=OPAC.ynLnhs%2b2MAqwMQ474C474&w=592&h=550&o=5&dpr=1.5&pid=21.1',
        rating: 5
    },

{
    id:'3',
    name:'ANANDITA Fit & Flare Dress With Bracelet Sleeves For Women (Green, L)',
    price:45.00,
    imageUrl: 'https://th.bing.com/th/id/OPAC.mBRkYicThltrTg474C474?w=592&h=550&o=5&dpr=1.5&pid=21.1',
    rating: 5
},
{
    id:'4',
    name:'BIBA Womens Black Cotton Printed Festive A-Line Suit Set | Size - 42 | Black',
    price:58.00,
    imageUrl: 'https://th.bing.com/th?id=OPAC.iSZ%2bFrGHFk9v4w474C474&w=592&h=550&o=5&dpr=1.5&pid=21.1',
    rating: 5
},
{
    id:'5',
    name:'Balloon-sleeved satin dress',
    price:66.00,
    imageUrl: 'https://image.hm.com/assets/hm/10/1c/101c04ac438166b2a63b66813adec989daa1ea97.jpg?imwidth=1260',
    rating: 5
},
{
    id:'6',
    name:'Ribbed flared-skirt dress',
    price:49.00,
    imageUrl: 'https://image.hm.com/assets/hm/00/e8/00e811f8b12b2078645fd049927f6a3c5c6874ef.jpg?imwidth=1260',
    rating: 5
},
];

const MordenShop = ({ onAddToCart }) => {
    return (
        <Container fluid className="modern-shop-page mt-4 px-4">
            <h2 className="text-center mb-4">Welcome to Modern Shop - Our Fashion Collection</h2>
            <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                {MordenShopProduct.map(product => (
                    <Col key={product.id}>
                        <MordenProductCard
                            product={product}
                            onAddToCart={onAddToCart} // Pass the onAddToCart prop down
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default MordenShop;