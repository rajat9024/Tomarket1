// src/Pages/Electro.jsx
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

// Import the ElectroProductCard component
import ElectroProductCard from '../Pages/ElectroProductCard'; 
import './Electro.css'; 

const Electro = ({ db, userId, onAddToCart }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State for new product form
    const [newName, setNewName] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [newImage, setNewImage] = useState('');
    const [newRating, setNewRating] = useState('');

    // Reference to the Firestore collection
    const electroCollectionRef = useRef(null);

    useEffect(() => {
        if (!db || !userId) return;

        // Define the collection path for public data for ELECTRO items
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
        const collectionPath = `artifacts/${appId}/public/data/electro_items`; // NEW COLLECTION NAME
        electroCollectionRef.current = collection(db, collectionPath);

        // Set up real-time listener for the electro items collection
        const unsubscribe = onSnapshot(electroCollectionRef.current, (snapshot) => {
            const fetchedProducts = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id, // Firestore document ID
                    ...data,
                    imageUrl: data.image // Map 'image' from Firestore to 'imageUrl' for ElectroProductCard
                };
            });
            setProducts(fetchedProducts);
            setLoading(false);
        }, (err) => {
            console.error("Error fetching real-time Electro data:", err);
            setError(err.message);
            setLoading(false);
        });

        // Cleanup subscription on component unmount
        return () => unsubscribe();
    }, [db, userId]); // Re-run effect if db or userId changes

    const handleAddProduct = async (e) => {
        e.preventDefault();
        if (!newName || !newPrice || !newImage || !newRating) {
            alert('Please fill in all fields to add an Electro product.');
            return;
        }

        try {
            await addDoc(electroCollectionRef.current, {
                name: newName,
                price: parseFloat(newPrice),
                image: newImage, // Store as 'image' in Firestore
                rating: parseFloat(newRating),
                addedBy: userId, // Associate with the user who added it
                createdAt: new Date() // Add a timestamp
            });
            // Clear form fields after successful addition
            setNewName('');
            setNewPrice('');
            setNewImage('');
            setNewRating('');
            alert("Electro product added successfully!");
        } catch (e) {
            console.error("Error adding Electro document: ", e);
            setError("Failed to add Electro product: " + e.message);
        }
    };

    const handleDeleteProduct = async (productId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this Electro product?");
        if (confirmDelete) {
            try {
                await deleteDoc(doc(db, electroCollectionRef.current.path, productId));
                alert("Electro document successfully deleted!");
            } catch (e) {
                console.error("Error removing Electro document: ", e);
                setError("Failed to delete Electro product: " + e.message);
            }
        }
    };

    const handleUpdateProduct = async (productId, updatedFields) => {
        try {
            await updateDoc(doc(db, electroCollectionRef.current.path, productId), updatedFields);
            alert("Electro document successfully updated!");
        } catch (e) {
            console.error("Error updating Electro document: ", e);
            setError("Failed to update Electro product: " + e.message);
        }
    };


    if (loading) {
        return (
            <div className="text-center mt-4">
                <h2 className="text-xl font-medium text-gray-700">Loading Electro products...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center mt-4 text-danger">
                <h2 className="text-xl font-medium text-red-600">Error fetching Electro products: {error}</h2>
            </div>
        );
    }

    return (
        <Container fluid className="Electro-page mt-4 px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Real-time Electro Collection</h2>

            {/* Add New Electro Product Form */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-2xl mx-auto">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">Add New Electro Product</h3>
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

            {/* Electro Products Grid */}
            <Row xs={1} sm={2} md={3} lg={4} className="g-6">
                {products.map(product => (
                    <Col key={product.id}>
                        <ElectroProductCard
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

export default Electro;
