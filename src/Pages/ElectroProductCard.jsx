// src/components/ElectroProductCard.jsx
import React, { useState } from 'react';
// Import the CSS file for ElectroProductCard
import './ElectroProductCard.css'; // Assuming ElectroProductCard.css is in the root src folder or adjust path

// StarRating Component (reused from CraftProductCard)
const StarRating = ({ rating}) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        stars.push(
            <span key={i} style={{ color: i < rating ? '#ffcc00' : '#ccc' }}>
                &#9733; {/* Unicode star character */}
            </span>
        );
    }
    return <div className="electro-product-card-rating">{stars}</div>
}

// ElectroProductCard Component
const ElectroProductCard = ({product, onAddToCart, onDelete, onUpdate})=>{
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(product.name);
    const [editedPrice, setEditedPrice] = useState(product.price);
    const [editedRating, setEditedRating] = useState(product.rating);
    const [editedImage, setEditedImage] = useState(product.imageUrl);

    // Destructuring with default values
    const{
        id,
        name ='Electro Product',
        price ='0.00',
        imageUrl='',
        rating=4
    } = product;

    const handleAddToCartClick = () => {
        if (onAddToCart) {
            onAddToCart(product);
        }
        console.log(`Add to Cart clicked for Electro product ID: ${id}.`);
    };

    const handleSave = () => {
        onUpdate(product.id, {
            name: editedName,
            price: parseFloat(editedPrice),
            rating: parseFloat(editedRating),
            image: editedImage // Send back as 'image' for Firestore
        });
        setIsEditing(false);
    };

    return (
        <div className="electro-product-card">
            {isEditing ? (
                <div className="electro-product-edit-form">
                    <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        placeholder="Product Name"
                    />
                    <input
                        type="number"
                        step="0.01"
                        value={editedPrice}
                        onChange={(e) => setEditedPrice(e.target.value)}
                        placeholder="Price"
                    />
                    <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        value={editedRating}
                        onChange={(e) => setEditedRating(e.target.value)}
                        placeholder="Rating (0-5)"
                    />
                    <input
                        type="text"
                        value={editedImage}
                        onChange={(e) => setEditedImage(e.target.value)}
                        placeholder="Image URL"
                    />
                    <button onClick={handleSave} className="electro-edit-save-button">Save</button>
                    <button onClick={() => setIsEditing(false)} className="electro-edit-cancel-button">Cancel</button>
                </div>
            ) : (
                <>
                    <div className="electro-product-new-label">NEW</div>

                    <div className="electro-product-image-container">
                        <img
                            src={imageUrl}
                            alt={name}
                            className='electro-product-image'
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://placehold.co/600x400/CCCCCC/333333?text=Image+Not+Found`;
                            }}
                        />
                    </div>

                    <div className="electro-product-details">
                        <h3 className="electro-product-name">{name}</h3>
                        <p className="electro-product-price">${parseFloat(price).toFixed(2)}</p>
                        <StarRating rating={rating} />
                        <div className="electro-product-actions">
                            <button className="electro-add-to-cart-button" onClick={handleAddToCartClick}>
                                ADD TO CART
                            </button>
                            <button className="electro-edit-button" onClick={() => setIsEditing(true)}>
                                EDIT
                            </button>
                            <button className="electro-delete-button" onClick={() => onDelete(id)}>
                                DELETE
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
export default ElectroProductCard;
