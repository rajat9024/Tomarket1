
// src/Pages/Craft.jsx
/* global __app_id */
import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import {
    collection,
    onSnapshot,
    addDoc,
    doc,
    updateDoc,
    deleteDoc,
} from 'firebase/firestore';

// Import the CraftProductCard component
import CraftProductCard from '../Pages/CraftProductCard'; // Corrected path
// Import the CSS file for Craft component
import './Craft.css'; 

const Craft = ({ db, auth, userId, onAddToCart }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State for new product form
    const [newName, setNewName] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [newImage, setNewImage] = useState('');
    const [newRating, setNewRating] = useState('');

    // Reference to the Firestore collection
    const craftCollectionRef = useRef(null);

    useEffect(() => {
        if (!db || !userId) return;

        // Define the collection path for public data
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
        const collectionPath = `artifacts/${appId}/public/data/craft_items`;
        craftCollectionRef.current = collection(db, collectionPath);

        // Set up real-time listener for the craft items collection
        const unsubscribe = onSnapshot(craftCollectionRef.current, (snapshot) => {
            const fetchedProducts = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id, // Firestore document ID
                    ...data,
                    imageUrl: data.image // Map 'image' from Firestore to 'imageUrl' for CraftProductCard
                };
            });
            setProducts(fetchedProducts);
            setLoading(false);
        }, (err) => {
            console.error("Error fetching real-time data:", err);
            setError(err.message);
            setLoading(false);
        });

        // Cleanup subscription on component unmount
        return () => unsubscribe();
    }, [db, userId]); // Re-run effect if db or userId changes

    const handleAddProduct = async (e) => {
        e.preventDefault();
        // Using a custom message box instead of alert()
        if (!newName || !newPrice || !newImage || !newRating) {
            console.warn('Please fill in all fields to add a product.');
            // Implement a custom modal or toast notification here for user feedback
            return;
        }

        try {
            await addDoc(craftCollectionRef.current, {
                name: newName,
                price: parseFloat(newPrice),
                image: newImage, // Store as 'image' in Firestore
                rating: parseFloat(newRating),
                craftsman: userId, // Associate with the user who added it
                createdAt: new Date() // Add a timestamp
            });
            // Clear form fields after successful addition
            setNewName('');
            setNewPrice('');
            setNewImage('');
            setNewRating('');
            console.log("Product added successfully!");
        } catch (e) {
            console.error("Error adding document: ", e);
            setError("Failed to add product: " + e.message);
        }
    };

    const handleDeleteProduct = async (productId) => {
        // Using a custom modal/message box instead of window.confirm()
        const confirmDelete = window.confirm("Are you sure you want to delete this product?"); // Replace with custom modal in production
        if (confirmDelete) {
            try {
                await deleteDoc(doc(db, craftCollectionRef.current.path, productId));
                alert("Document successfully deleted!");
            } catch (e) {
                console.error("Error removing document: ", e);
                setError("Failed to delete product: " + e.message);
            }
        }
    };

    const handleUpdateProduct = async (productId, updatedFields) => {
        try {
            await updateDoc(doc(db, craftCollectionRef.current.path, productId), updatedFields);
            alert("Document successfully updated!");
        } catch (e) {
            console.error("Error updating document: ", e);
            setError("Failed to update product: " + e.message);
        }
    };


    if (loading) {
        return (
            <div className="text-center mt-4">
                <h2 className="text-xl font-medium text-gray-700">Loading craft products...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center mt-4 text-danger">
                <h2 className="text-xl font-medium text-red-600">Error fetching products: {error}</h2>
            </div>
        );
    }

    return (
        <Container fluid className="Craft-page mt-4 px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Real-time Craft Collection</h2>

            {/* Add New Product Form */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-2xl mx-auto">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">Add New Craft Product</h3>
                <form onSubmit={handleAddProduct} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Product Name"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="number"
                        step="0.01"
                        placeholder="Price"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Image URL (e.g., https://placehold.co/600x400)"
                        value={newImage}
                        onChange={(e) => setNewImage(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        placeholder="Rating (0-5)"
                        value={newRating}
                        onChange={(e) => setNewRating(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Add Product
                    </button>
                </form>
            </div>

            {/* Craft Products Grid */}
            <Row xs={1} sm={2} md={3} lg={4} className="g-6">
                {products.map(product => (
                    <Col key={product.id}>
                        <CraftProductCard
                            product={product}
                            onAddToCart={onAddToCart}
                            onDelete={handleDeleteProduct}
                            onUpdate={handleUpdateProduct}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Craft;
