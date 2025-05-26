import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

export default function Header() {
  return (
    <Navbar bg="light" variant="success" expand="lg" color="success">
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
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Accueil</Nav.Link>
            <Nav.Link as={Link} to="/shop">Boutique</Nav.Link>
            <Nav.Link as={Link} to="/cart">Panier</Nav.Link>
            <Nav.Link as={Link} to="/login">Connexion</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
