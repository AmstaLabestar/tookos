import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./components/About";
import Header from "./components/Header";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProtectedRoute from './components/ProtectedRoute';
import "./App.css"

export default function App() {

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [user]);


  return (
    <>
      <Header/>
      <Routes>
         <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
                <Route
          path="/shop"
          element={
            <ProtectedRoute user={user}>
              <Shop />
            </ProtectedRoute>
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProtectedRoute user={user}>
              <ProductDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute user={user}>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute user={user}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<h1>Page non trouvée</h1>} />
      </Routes>
    </>
  );
}
