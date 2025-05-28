
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Form, FormControl, Button, Dropdown } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";



export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Simule un état connecté / non connecté
  const [user, setUser] = useState(() => {
  const savedUser = localStorage.getItem("user");
  return savedUser ? JSON.parse(savedUser) : null;
});
 // null = non connecté, ou {name: "Daoda"} connecté

  // Pour tester,  la connexion temporairement :
  // const [user, setUser] = useState({ name: "Daoda Kabore" });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Envoie vers la page boutique avec paramètre de recherche dans URL
    navigate(`/shop?search=${encodeURIComponent(searchTerm)}`);
  };

  const handleLogout = () => {
  localStorage.removeItem("user");
  setUser(null);
};

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src="/images/logo.jpg"
            alt="Tookos"
            height="40"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-between">
          {/* Barre de recherche */}
          <Form className="d-flex mx-auto" onSubmit={handleSearchSubmit} style={{ maxWidth: '400px', width: '100%' }}>
            <FormControl
              type="search"
              placeholder="Rechercher un produit..."
              className="me-2"
              aria-label="Recherche"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-success" type="submit">Rechercher</Button>
          </Form>

          {/* Navigation classique */}
          <Nav className="align-items-center">
            <Nav.Link as={Link} to="/">Accueil</Nav.Link>
            <Nav.Link as={Link} to="/shop">Boutique</Nav.Link>
            <Nav.Link as={Link} to="/cart">Panier</Nav.Link>

            {/* Connexion ou menu utilisateur */}
            {!user ? (
              <Nav.Link as={Link} to="/login" className="d-flex align-items-center">
                <FaUserCircle size={20} className="me-1" />
                Connexion
              </Nav.Link>
            ) : (
              <Dropdown align="end">
                <Dropdown.Toggle variant="light" id="dropdown-user" className="d-flex align-items-center">
                  <FaUserCircle size={24} className="me-2" />
                  {user.name}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/profile">Profil</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Déconnexion</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
