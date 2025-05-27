import React from 'react'

import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [activeTab, setActiveTab] = useState('login');
  const navigate = useNavigate();

  // États pour les formulaires
  const [registerForm, setRegisterForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loginForm, setLoginForm] = useState({
    identifier: '',
    password: '',
  });

  // Gérer l'inscription
  const handleRegister = () => {
    const { username, email, password, confirmPassword } = registerForm;
    if (username && email && password === confirmPassword) {
      // Simule une inscription réussie
      alert('Inscription réussie ! Vous pouvez vous connecter.');
      setActiveTab('login'); // redirige vers onglet login
    } else {
      alert('Veuillez remplir tous les champs correctement.');
    }
  };

  // Gérer la connexion
  const handleLogin = () => {
    const { identifier, password } = loginForm;
    if (identifier && password) {
      // Simule une connexion réussie
        localStorage.setItem('user', JSON.stringify({ name: identifier }));
      
      navigate('./Shop.jsx'); // redirige vers accueil
    } else {
      alert('Identifiants invalides.');
    }
  };

  return (
    <div className="auth-page d-flex flex-column align-items-center justify-content-center">
      <div className="text-center mb-4">
        <div className="d-flex align-items-center justify-content-center">
          <img src="/images/logo.jpg" alt="logo" className="me-2" style={{ width: '70px' }} />
          <h2 className="fw-bold text-success m-0">Tookos</h2>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-3 d-flex justify-content-center">
        <button
          className={`btn btn-tab ${activeTab === 'register' ? 'active' : ''}`}
          onClick={() => setActiveTab('register')}
        >
          INSCRIPTION
        </button>
        <button
          className={`btn btn-tab ${activeTab === 'login' ? 'active' : ''}`}
          onClick={() => setActiveTab('login')}
        >
          CONNEXION
        </button>
      </div>

      {/* Form Container */}
      <div className="auth-card">
        {activeTab === 'register' ? (
          <>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Nom d’utilisateur"
              value={registerForm.username}
              onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
            />
            <input
              type="email"
              className="form-control mb-2"
              placeholder="Adresse email"
              value={registerForm.email}
              onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
            />
            <input
              type="password"
              className="form-control mb-2"
              placeholder="Mot de passe"
              value={registerForm.password}
              onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
            />
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Confirmer le mot de passe"
              value={registerForm.confirmPassword}
              onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
            />
            <button className="btn btn-success w-100 btn-hover" onClick={handleRegister}>
              S'INSCRIRE
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Nom d’utilisateur ou email"
              value={loginForm.identifier}
              onChange={(e) => setLoginForm({ ...loginForm, identifier: e.target.value })}
            />
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Mot de passe"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
            />
            <button className="btn btn-success w-100 btn-hover" onClick={handleLogin}>
              SE CONNECTER
            </button>
          </>
        )}
      </div>
    </div>
  );
};