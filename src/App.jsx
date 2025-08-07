
// src/App.jsx
// Removed /* global */ comments as we are now providing a default config
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Badge, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

// Firebase Imports
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Import components
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ProductCard from './components/ProductCard';
import SignInPage from './components/SignInPage';
import CodePage from './components/CodePage';
import VideoPage from './components/VideoPage';
import BeauticaCosmeticsListingPage from './components/BeauticaCosmeticsListingPage';
import MordenShop from './components/MordenShop';
import Craft from './Pages/Craft'; // Your Craft component
import CartPage from './components/CartPage';
import Electro from './Pages/Electro';

// Import mock data and helper functions
import { mockProducts, getUniqueCategories } from './data/mockProducts';

// Get unique categories and subcategories from mock data
const { categories, subCategories } = getUniqueCategories(mockProducts);

const App = () => {
    // --- Firebase States ---
    const [db, setDb] = useState(null);
    const [auth, setAuth] = useState(null);
    const [firebaseUserId, setFirebaseUserId] = useState(null);
    const [isFirebaseAuthReady, setIsFirebaseAuthReady] = useState(false);

    // Your existing states
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState(mockProducts);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSubCategories, setSelectedSubCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy] = useState('best-sellers');
    const [cartItems, setCartItems] = useState([]);

    const navigate = useNavigate();

    // --- Firebase Initialization and Authentication Effect ---
    useEffect(() => {
        try {
            // --- IMPORTANT: REPLACE THESE WITH YOUR ACTUAL FIREBASE PROJECT CONFIGURATION ---
            // You can find this in your Firebase project console -> Project settings -> Your apps -> Web app
            const firebaseConfig = {
        apiKey: "AIzaSyD_RepSkgMzXOCByC__8V-QAIFbCrPzXzM",
        authDomain: "craftproduct.firebaseapp.com",
        projectId: "craftproduct",
        storageBucket: "craftproduct.firebasestorage.app",
        messagingSenderId: "559421075127",
        appId: "1:559421075127:web:42fdc0b279d5dd076da732",
        measurementId: "G-51EWXCP7YM",
      };

            const app = initializeApp(firebaseConfig);
            const firestoreDb = getFirestore(app);
            const firebaseAuth = getAuth(app);

            setDb(firestoreDb);
            setAuth(firebaseAuth);

            const unsubscribeAuth = onAuthStateChanged(firebaseAuth, async (user) => {
                if (user) {
                    setFirebaseUserId(user.uid);
                    setIsLoggedIn(true);
                    setIsFirebaseAuthReady(true);
                } else {
                    try {
                        // Attempt anonymous sign-in
                        await signInAnonymously(firebaseAuth);
                    } catch (error) {
                        console.error("Error signing in anonymously:", error);
                        // Specific error handling for auth/configuration-not-found
                        if (error.code === 'auth/configuration-not-found') {
                            console.error("Firebase Auth configuration not found. Did you enable Anonymous Authentication in your Firebase project?");
                        }
                        setIsLoggedIn(false);
                        setIsFirebaseAuthReady(true);
                    }
                }
            });

            return () => unsubscribeAuth();
        } catch (error) {
            console.error("Failed to initialize Firebase:", error);
            setIsFirebaseAuthReady(true);
        }
    }, []);

    useEffect(() => {
        if (isLoggedIn) {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        }
    }, [cartItems, isLoggedIn]);


    // Effect to re-filter products whenever filters or sort order change (for main page)
    useEffect(() => {
        if (window.location.pathname === '/') {
            let currentProducts = [...mockProducts];

            if (searchTerm) {
                currentProducts = currentProducts.filter(product =>
                    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.description.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            if (selectedCategories.length > 0) {
                currentProducts = currentProducts.filter(product =>
                    selectedCategories.includes(product.category)
                );
            }

            if (selectedSubCategories.length > 0) {
                currentProducts = currentProducts.filter(product =>
                    selectedSubCategories.includes(product.subCategory)
                );
            }

            switch (sortBy) {
                case 'best-sellers':
                case 'newest':
                    currentProducts.sort((a, b) => b.id - a.id);
                    break;
                case 'best-rated':
                    currentProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                    break;
                case 'trending':
                    currentProducts.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                case 'price-asc':
                    currentProducts.sort((a, b) => a.price - b.price);
                    break;
                case 'price-desc':
                    currentProducts.sort((a, b) => b.price - a.price);
                    break;
                default:
                    break;
            }
            setFilteredProducts(currentProducts);
        } else {
            setFilteredProducts([]);
        }
    }, [selectedCategories, selectedSubCategories, searchTerm, sortBy, navigate]);

    const handleCategoryToggle = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
        if (selectedCategories.includes(category)) {
            setSelectedSubCategories(prev => prev.filter(sc => !subCategories[category]?.includes(sc)));
        }
    };

    const handleSubCategoryToggle = (subCategory) => {
        setSelectedSubCategories(prev =>
            prev.includes(subCategory)
                ? prev.filter(sc => sc !== subCategory)
                : [...prev, subCategory]
        );
    };

    const handleClearFilters = () => {
        setSelectedCategories([]);
        setSelectedSubCategories([]);
        setSearchTerm('');
    };

    const handleSignInSuccess = () => {
        navigate('/');
    };

    const handleSignOut = async () => {
        if (auth) {
            try {
                await auth.signOut();
                console.log("User signed out from Firebase.");
            } catch (error) {
                console.error("Error signing out from Firebase:", error);
            }
        }
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('cartItems');
        setCartItems([]);
        navigate('/signin');
    };

    const handleThemeCardViewClick = (productName) => {
        if (productName === 'Beautica - Health & Beauty') {
            navigate('/beautica');
        } else if (productName === 'Modern Shop - Fashion Store') {
            navigate('/modern-shop');
        } else if (productName === 'Crafty - Handmade Goods') {
            navigate('/crafty');
        }
         else if (productName === 'Electro - Electronics Store') {
            navigate('/Electro');
        }
        else {
            console.log(`Viewing details for theme: ${productName}.`);
        }
    };

    const handleAddToCart = (product, quantity = 1) => {
        console.log("--- App.jsx: handleAddToCart CALLED ---");
        console.log("App.jsx: Product received for adding:", product);
        console.log("App.jsx: Product ID received:", product?.id);

        setCartItems(prevItems => {
            console.log("App.jsx: Current cart items (prevItems) BEFORE update:", prevItems);

            if (!product || product.id === undefined || product.id === null) {
                console.error("App.jsx: Error! Product or product.id is missing or invalid.", { product });
                console.warn("Could not add item to cart: Product data is incomplete.");
                return prevItems;
            }

            const existingItemIndex = prevItems.findIndex(item => {
                const existingId = String(item.product?.id);
                const newId = String(product.id);

                console.log(`App.jsx: Comparing existing cart item ID '${existingId}' (type: ${typeof existingId}) with new product ID '${newId}' (type: ${typeof newId})`);
                return existingId === newId;
            });

            if (existingItemIndex > -1) {
                console.log("App.jsx: Product already in cart. Updating quantity.");
                const newItems = [...prevItems];
                newItems[existingItemIndex] = {
                    ...newItems[existingItemIndex],
                    quantity: newItems[existingItemIndex].quantity + quantity
                };
                console.log("App.jsx: Cart after quantity update:", newItems);
                return newItems;
            } else {
                console.log("App.jsx: Product not in cart. Adding as new item.");
                return [...prevItems, { product, quantity }];
            }
        });
       alert(`${product.name} added to cart!`);
        
    };

    const handleRemoveFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => String(item.product.id) !== String(productId)));
    };

    const handleUpdateCartQuantity = (productId, newQuantity) => {
        if (newQuantity <= 0) {
            handleRemoveFromCart(productId);
            return;
        }
        setCartItems(prevItems =>
            prevItems.map(item =>
                String(item.product.id) === String(productId)
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    // Show loading/authentication status
    if (!isFirebaseAuthReady) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p className="text-lg text-gray-700">Initializing app and authenticating...</p>
            </div>
        );
    }

    // If Firebase auth is ready but user is not logged in (e.g., anonymous sign-in failed or explicitly signed out)
    if (!isLoggedIn) {
        return <SignInPage onSignInSuccess={handleSignInSuccess} />;
    }

    return (
        <div className="App">
            <Header onSignOut={handleSignOut} cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} />

            <Routes>
                <Route path="/" element={
                    <>
                        <SearchBar onSearch={setSearchTerm} />
                        <Container fluid className="mt-4 px-4">
                            <Row>
                                <Col md={3} lg={2} className="mb-4">
                                    <div className="bg-white p-3 rounded shadow-sm">
                                        <h5 className="mb-3">Filter & Refine</h5>
                                        <hr />
                                        <div className="mb-3">
                                            <h6 className="fw-bold mb-2">Category</h6>
                                            <Nav className="flex-column">
                                                <Nav.Link
                                                    href="#"
                                                    className={`d-flex justify-content-between align-items-center ${selectedCategories.length === 0 ? 'text-primary fw-bold' : 'text-muted'}`}
                                                    onClick={handleClearFilters}
                                                >
                                                    All categories
                                                    <Badge bg="secondary" className="ms-2">{mockProducts.length}</Badge>
                                                </Nav.Link>
                                                {categories.map(category => (
                                                    <div key={category}>
                                                        <Nav.Link
                                                            href="#"
                                                            className={`d-flex justify-content-between align-items-center ${selectedCategories.includes(category) ? 'text-primary fw-bold' : 'text-muted'}`}
                                                            onClick={() => handleCategoryToggle(category)}
                                                        >
                                                            {category}
                                                            <Badge bg="secondary" className="ms-2">
                                                                {mockProducts.filter(p => p.category === category).length}
                                                            </Badge>
                                                        </Nav.Link>
                                                        {selectedCategories.includes(category) && subCategories[category] && (
                                                            <div className="ms-3">
                                                                {subCategories[category].map(subCat => (
                                                                    <Nav.Link
                                                                        key={subCat}
                                                                        href="#"
                                                                        className={`d-flex justify-content-between align-items-center small ${selectedSubCategories.includes(subCat) ? 'text-success fw-bold' : 'text-muted'}`}
                                                                        onClick={() => handleSubCategoryToggle(subCat)}
                                                                    >
                                                                        {subCat}
                                                                        <Badge bg="light" text="dark" className="ms-2">
                                                                            {mockProducts.filter(p => p.category === category && p.subCategory === subCat).length}
                                                                        </Badge>
                                                                    </Nav.Link>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </Nav>
                                        </div>
                                    </div>
                                </Col>

                                <Col md={9} lg={10}>
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <div className="text-muted small">
                                            {filteredProducts.length} items in {selectedCategories.length > 0 ? selectedCategories.join(', ') : 'All Categories'}
                                            {selectedSubCategories.length > 0 && ` / ${selectedSubCategories.join(', ')}`}
                                            {searchTerm && ` for "${searchTerm}"`}
                                        </div>
                                        {/* <div className="d-flex align-items-center">
                                            <Button variant="outline-secondary" size="sm" className="me-2 d-none d-md-block">
                                                <i className="bi bi-grid-fill"></i>
                                            </Button>
                                            <Button variant="outline-secondary" size="sm" className="me-3 d-none d-md-block">
                                                <i className="bi bi-list"></i>
                                            </Button>

                                            <Dropdown onSelect={(eventKey) => setSortBy(eventKey)}>
                                                <Dropdown.Toggle variant="outline-secondary" id="dropdown-sort-by" size="sm" className="rounded-pill">
                                                    {sortBy === 'best-sellers' && 'Best sellers'}
                                                    {sortBy === 'newest' && 'Newest'}
                                                    {sortBy === 'best-rated' && 'Best rated'}
                                                    {sortBy === 'trending' && 'Trending'}
                                                    {sortBy === 'price-asc' && 'Price: Low to High'}
                                                    {sortBy === 'price-desc' && 'Price: High to Low'}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu align="end">
                                                    <Dropdown.Item eventKey="best-sellers">Best sellers</Dropdown.Item>
                                                    <Dropdown.Item eventKey="newest">Newest</Dropdown.Item>
                                                    <Dropdown.Item eventKey="best-rated">Best rated</Dropdown.Item>
                                                    <Dropdown.Item eventKey="trending">Trending</Dropdown.Item>
                                                    <Dropdown.Divider />
                                                    <Dropdown.Item eventKey="price-asc">Price: Low to High</Dropdown.Item>
                                                    <Dropdown.Item eventKey="price-desc">Price: High to Low</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div> */}
                                    </div>

                                    <Row xs={1} sm={2} md={2} lg={3} xl={4} className="g-4">
                                        {filteredProducts.length > 0 ? (
                                            filteredProducts.map(product => (
                                                <Col key={product.id}>
                                                    <ProductCard
                                                        product={product}
                                                        onViewClick={() => handleThemeCardViewClick(product.name)}
                                                        onAddToCart={handleAddToCart}
                                                    />
                                                </Col>
                                            ))
                                        ) : (
                                            <Col xs={12}>
                                                <p className="text-center text-muted fs-5 mt-5">No products found matching your criteria.</p>
                                            </Col>
                                        )}
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </>
                } />

                <Route path="/code" element={<CodePage />} />
                <Route path="/video" element={<VideoPage />} />
                <Route path="/beautica" element={<BeauticaCosmeticsListingPage onAddToCart={handleAddToCart} />} />
                <Route path="/modern-shop" element={<MordenShop onAddToCart={handleAddToCart} />} />

                {/* Pass Firebase props to Craft component */}
                <Route
                    path="/crafty"
                    element={db && auth && firebaseUserId ? (
                            <Craft db={db} auth={auth} userId={firebaseUserId} onAddToCart={handleAddToCart}/>
                        ) : (
                            <div className="flex justify-center items-center h-64">
                                <p className="text-lg text-red-600">Loading Craft page...</p>
                            </div>
                        )
                    }
                />
                <Route
                    path="/electro"
                    element={
                        db && auth && firebaseUserId ? (
                            <Electro
                                db={db}
                                auth={auth}
                                userId={firebaseUserId}
                                onAddToCart={handleAddToCart}
                            />
                        ) : (
                            <div className="flex justify-center items-center h-64">
                                <p className="text-lg text-red-600">Loading Electro page...</p>
                            </div>
                        )
                    }
                />
                <Route
                    path="/cart"
                    element={
                        <CartPage
                            cartItems={cartItems}
                            onRemoveFromCart={handleRemoveFromCart}
                            onUpdateCartQuantity={handleUpdateCartQuantity}
                        />
                    }
                />

                <Route path="*" element={<h2 className="text-center mt-5">404 - Page Not Found</h2>} />
            </Routes>

            <footer className="bg-light text-center text-muted py-3 mt-5 border-top">
                <Container>
                    <p className="mb-0">&copy; 2025 EnvatoMarket Clone. All rights reserved.</p>
                </Container>
            </footer>
        </div>
    );
};

const AppWithRouter = () => (
    <Router>
        <App />
    </Router>
);

export default AppWithRouter;
 