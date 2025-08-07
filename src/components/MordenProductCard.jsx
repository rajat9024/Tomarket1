import './MordenProductCard.css';

const StarRating = ({ rating}) => {
    const stars = [];
     for (let i = 0; i < 5; i++) {
        stars.push(
            <span key={i} style={{ color: i < rating ? '#ffcc00' : '#ccc' }}>
                &#9733; {/* Unicode star character */}
            </span>
            
        );
    }
    return <div className="morden-product-card-rating">{stars}</div>
}

const MordenProductCard = ({ product,onAddToCart }) => {
    const {
        id,
        name = 'Simple Cloths',
        price = '0.00',
        imageUrl = 'https://via.placeholder.com/250x300?text=Product+Image',
        rating = 4
    } = product;

       const handleAddToCartClick = () => {
        // Call the onAddToCart prop, passing the product data
        if (onAddToCart) {
            onAddToCart(product);
        }
        console.log(`Add to Cart clicked for product ID: ${id} from MordenProductCard.`);
        // You could add local feedback here if needed, e.g., a small "Added!" text
    };

    return (
        <div className="morden-product-card">
            <div className="morden-product-new-label">NEW</div>

            <div className="morden-product-image-container">
                <img src={imageUrl} alt={name} className='morden-product-image'/>
            </div>

            <div className="morden-product-details">
                <h3 className="morden-product-name">{name}</h3>
                <p className="morden-product-price">${parseFloat(price).toFixed(2)}</p>
                <StarRating rating={rating} />
               <button className="morden-add-to-cart-button" onClick={handleAddToCartClick}>
                    ADD TO CART
                </button>
            </div>
        </div>
    )
}

export default MordenProductCard;

