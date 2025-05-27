import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

export default function Home({ user }) {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/maillot.json')
      .then(res => res.json())
      .then(data => setProducts(data.maillots))
      .catch(err => console.error(err));
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Catalogue</h2>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {products.map(prod => (
          <Col key={prod.id}>
            <Card className="h-100">
              <Card.Img variant="top" src={prod.image} />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{prod.nom}</Card.Title>
                <Card.Text>{prod.prix} FCFA</Card.Text>
                <div className="mt-auto">
                  {user ? (
                    <Button as={Link} to={`/product/${prod.id}`} variant="primary" className="w-100">
                      Voir le produit
                    </Button>
                  ) : (
                    <Button variant="outline-primary" className="w-100" onClick={() => navigate('/login')}>
                      Se connecter pour voir
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
