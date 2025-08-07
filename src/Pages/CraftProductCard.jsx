import './CraftProductCard.css';

// import React, { useState, useEffect } from 'react';
// // Importing React-Bootstrap components as per your original Craft.js
// import { Container, Row, Col } from "react-bootstrap";
// import './CraftProductCard.css';

// // StarRating Component (from your provided CraftProductCard.js)
// const StarRating = ({ rating}) => {
//     const stars = [];
//     for (let i = 0; i < 5; i++) {
//         stars.push(
//             <span key={i} style={{ color: i < rating ? '#ffcc00' : '#ccc' }}>
//                 &#9733; {/* Unicode star character */}
//             </span>
//         );
//     }
//     return <div className="craft-product-card-rating">{stars}</div>
// }

// // CraftProductCard Component (from your provided CraftProductCard.js)
// const CraftProductCard = ({product, onAddToCart})=>{
//     // Destructuring with default values as in your CraftProductCard.js
//     const{
//         id,
//         name ='Craft ',
//         price ='0.00',
//         imageUrl='', // This is now correctly populated from the API's 'image' field
//         rating=4
//     } = product;

//     const handleAddToCartClick = () => {
//         // Call the onAddToCart prop, passing the product data
//         if (onAddToCart) {
//             onAddToCart(product);
//         }
//         console.log(`Add to Cart clicked for product ID: ${id} from craftProductCard.`);
//     };

//     return (
//         <div className="craft-product-card">
//             <div className="craft-product-new-label">NEW</div>

//             <div className="craft-product-image-container">
//                 {/* Using imageUrl as expected by your CraftProductCard */}
//                 <img
//                     src={imageUrl}
//                     alt={name}
//                     className='craft-product-image'
//                     // Fallback for broken images
//                     onError={(e) => {
//                         e.target.onerror = null; // Prevent infinite loop
//                         e.target.src = `https://placehold.co/600x400/CCCCCC/333333?text=Image+Not+Found`;
//                     }}
//                 />
//             </div>

//             <div className="craft-product-details">
//                 <h3 className="craft-product-name">{name}</h3>
//                 <p className="craft-product-price">${parseFloat(price).toFixed(2)}</p>
//                 <StarRating rating={rating} />
//                 <button className="craft-add-to-cart-button" onClick={handleAddToCartClick}>
//                     ADD TO CART
//                 </button>
//             </div>
//         </div>
//     )
// }

// export default CraftProductCard;

// src/components/CraftProductCard.jsx
import React, { useState } from 'react';
// Import the CSS file for CraftProductCard
import './CraftProductCard.css';
// StarRating Component
const StarRating = ({ rating}) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
        stars.push(
            <span key={i} style={{ color: i < rating ? '#ffcc00' : '#ccc' }}>
                &#9733; {/* Unicode star character */}
            </span>
        );
    }
    return <div className="craft-product-card-rating">{stars}</div>
}

// CraftProductCard Component
const CraftProductCard = ({product, onAddToCart, onDelete, onUpdate})=>{
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(product.name);
    const [editedPrice, setEditedPrice] = useState(product.price);
    const [editedRating, setEditedRating] = useState(product.rating);
    const [editedImage, setEditedImage] = useState(product.imageUrl); // Use imageUrl as it's mapped

    // Destructuring with default values as in your CraftProductCard.js
    const{
        id,
        name ='Craft ',
        price ='0.00',
        imageUrl='', // This is now correctly populated from the API's 'image' field
        rating=4
    } = product;

    const handleAddToCartClick = () => {
        // Call the onAddToCart prop, passing the product data
        if (onAddToCart) {
            onAddToCart(product);
        }
        console.log(`Add to Cart clicked for product ID: ${id} from craftProductCard.`);
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
        <div className="craft-product-card">
            {isEditing ? (
                <div className="craft-product-edit-form">
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
                    <button onClick={handleSave} className="craft-edit-save-button">Save</button>
                    <button onClick={() => setIsEditing(false)} className="craft-edit-cancel-button">Cancel</button>
                </div>
            ) : (
                <>
                    <div className="craft-product-new-label">NEW</div>

                    <div className="craft-product-image-container">
                        <img
                            src={imageUrl}
                            alt={name}
                            className='craft-product-image'
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://placehold.co/600x400/CCCCCC/333333?text=Image+Not+Found`;
                            }}
                        />
                    </div>

                    <div className="craft-product-details">
                        <h3 className="craft-product-name">{name}</h3>
                        <p className="craft-product-price">${parseFloat(price).toFixed(2)}</p>
                        <StarRating rating={rating} />
                        <div className="craft-product-actions">
                            <button className="craft-add-to-cart-button" onClick={handleAddToCartClick}>
                                ADD TO CART
                            </button>
                            <button className="craft-edit-button" onClick={() => setIsEditing(true)}>
                                EDIT
                            </button>
                            <button className="craft-delete-button" onClick={() => onDelete(id)}>
                                DELETE
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
export default CraftProductCard;
