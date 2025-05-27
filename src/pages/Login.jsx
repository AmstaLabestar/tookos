import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      localStorage.setItem("user", JSON.stringify(foundUser));
      navigate("/shop");
    } else {
      alert("Identifiants incorrects.");
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "500px" }}>
      <Card className="p-4 shadow-sm">
        <h3 className="mb-4 text-center">Connexion</h3>
        <p className="text-center mt-3">
  Pas encore de compte ? <Link to="/register">Créer un compte</Link>
</p>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="success" type="submit" className="w-100">
            Se connecter
          </Button>
        </Form>
      </Card>
    </Container>
  );
}
