import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Gallery from './pages/Gallery';
import Images from './pages/Images';
import Videos from './pages/Videos';
import Upload from './pages/Upload';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <CartProvider>
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Gallery />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/images" element={<Images />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </div>
    </AuthProvider>
    </CartProvider>
  );
}

export default App;