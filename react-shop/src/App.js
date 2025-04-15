import React from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Header from './components/Header';
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route,} from 'react-router-dom';
import ProductsPage from './components/ProductsPage';
import ProductDetails from './components/ProductDetails';
import AboutPage from "./components/AboutPage";
import HomePage from "./components/HomePage";
import ContactsPage from "./components/ContactsPage";

function App() {
    return (
        <Router>
            <div className="app-container">
                <Header/>

                <main className="container mt-4">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/products" element={<ProductsPage />} />
                        <Route path="/products/:id" element={<ProductDetails />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/contacts" element={<ContactsPage />} />
                    </Routes>
                </main>

                <Footer/>
            </div>
        </Router>
    );
}

export default App;
