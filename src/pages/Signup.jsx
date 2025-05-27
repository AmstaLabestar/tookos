import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.some(user => user.email === email)) {
      alert("Cet email est déjà utilisé !");
      return;
    }

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert("Inscription réussie !");
    navigate('/login');
  };

  return (
    <form onSubmit={handleSignup}>
      <h2>Inscription</h2>
      <input placeholder="Nom" value={name} onChange={e => setName(e.target.value)} required />
      <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input placeholder="Mot de passe" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">S'inscrire</button>
    </form>
  );
}
