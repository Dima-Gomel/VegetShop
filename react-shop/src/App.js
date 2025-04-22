import React from 'react';
import {BrowserRouter as Router, Routes, Route,} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './index.css';
import Header from './components/Header';
import Footer from "./components/Footer";
import ProductsPage from './components/ProductsPage';
import ProductDetails from './components/ProductDetails';
import AboutPage from "./components/AboutPage";
import HomePage from "./components/HomePage";
import ContactsPage from "./components/ContactsPage";
import {AuthProvider} from "./context/AuthContext";
import {CartProvider} from "./components/CartContext";
import CartPage from "./components/CartPage";
import CheckoutPage from "./components/CheckoutPage";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminOrdersPage from "./components/Admin/AdminOrdersPage";
import AdminProductsPage from "./components/Admin/AdminProductsPage";
import AdminRoute from "./components/Admin/AdminRoute";
import {Navigate} from 'react-router-dom';
import LoginPage from "./components/LoginPage";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminUsersPage from "./components/Admin/AdminUsersPage";


function App() {
    return (
        <Router>
            <AuthProvider>
                <CartProvider>
                    <Header/>
                    <main className="container mt-4">
                        <Routes>
                            <Route path="*" element={<Navigate to="/" replace />} />
                            <Route path="/" element={<HomePage/>}/>
                            <Route path="/login" element={<LoginPage/>}/>
                            <Route path="/products" element={<ProductsPage/>}/>
                            <Route path="/products/:id" element={<ProductDetails/>}/>
                            <Route path="/about" element={<AboutPage/>}/>
                            <Route path="/contacts" element={<ContactsPage/>}/>
                            <Route path="/cart" element={<CartPage/>}/>
                            <Route path="/checkout" element={<CheckoutPage/>}/>
                            <Route path="/admin" element={<AdminRoute><AdminLayout/></AdminRoute>}>
                                <Route index element={<Navigate to="dashboard" replace/>}/>
                                <Route path="dashboard" element={<AdminDashboard/>}/>
                                <Route path="orders" element={<AdminOrdersPage/>}/>
                                <Route path="products" element={<AdminProductsPage/>}/>
                                <Route path="users" element={<AdminUsersPage/>}/>
                            </Route>
                        </Routes>
                    </main>
                    <Footer/>
                </CartProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
