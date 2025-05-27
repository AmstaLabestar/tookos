import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
  }, []);

  const handleQuantityChange = (id, quantity) => {
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.prix * item.quantity, 0);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Votre Panier</h2>
      {cartItems.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          {cartItems.map(item => (
            <Card className="mb-3" key={item.id}>
              <Card.Body>
                <Row className="align-items-center">
                  <Col md={2}>
                    <img src={item.image} alt={item.nom} className="img-fluid" />
                  </Col>
                  <Col md={3}><strong>{item.nom}</strong></Col>
                  <Col md={2}>{item.prix} FCFA</Col>
                  <Col md={2}>
                    <Form.Control
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={e => handleQuantityChange(item.id, parseInt(e.target.value))}
                    />
                  </Col>
                  <Col md={2}>{item.prix * item.quantity} FCFA</Col>
                  <Col md={1}>
                    <Button variant="danger" size="sm" onClick={() => handleRemove(item.id)}>Supprimer</Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
          <h4 className="text-end mt-4">Total : {totalPrice} FCFA</h4>
          <div className="text-end">
            <Button variant="success" onClick={() => alert('Achat finalisé !')}>
              Finaliser l’achat
            </Button>
          </div>
        </>
      )}
    </Container>
  );
}
