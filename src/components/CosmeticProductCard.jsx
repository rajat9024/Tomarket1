// src/components/CosmeticProductCard.jsx
import React from 'react';
import './CosmeticProductCard.css'; // Link to its specific CSS

// Helper for Star Rating
const StarRating = ({ rating }) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        stars.push(
            <span key={i} style={{ color: i < rating ? '#ffcc00' : '#ccc' }}>
                &#9733; {/* Unicode star character */}
            </span>
        );
    }
    return <div className="cosmetic-product-card-rating">{stars}</div>;
};

const CosmeticProductCard = ({ product, onAddToCart }) => {
    // Destructure product properties, providing defaults for safety
    const {
        id,
        name = 'Sample Makeup, Skincare And Perfumes For Sale',
        price = '0.00',
        imageUrl = 'https://via.placeholder.com/250x300?text=Product+Image', // Placeholder image
     
        rating = 4 // Example rating
    } = product;

    const handleAddToCartClick = () => {
        if(onAddToCart){
            onAddToCart(product);
        }
        console.log(`Add to cart clicked for product ID : ${id} from cosmeticproductCard.`)
    };

    return (
        <div className="cosmetic-product-card">
            {/* "NEW" label */}
            <div className="cosmetic-product-new-label">NEW</div>

            <div className="cosmetic-product-image-container">
                <img src={imageUrl} alt={name} className="cosmetic-product-image" />
                {/* Quick View Overlay - visible on hover */}
                
            </div>

            <div className="cosmetic-product-details">
                {/* <p className="cosmetic-product-availability">{availability}</p> */}
                <h3 className="cosmetic-product-name">{name}</h3>
                <p className="cosmetic-product-price">${parseFloat(price).toFixed(2)}</p>
                <StarRating rating={rating} />
                <button className="cosmetic-add-to-cart-button" onClick={handleAddToCartClick}>
                    ADD TO CART
                </button>
            </div>
        </div>
    );
};

export default CosmeticProductCard;