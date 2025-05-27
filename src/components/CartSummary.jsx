import React from 'react';

export default function CartSummary({ cart, products, updateQuantity, removeFromCart, emptyCart, onOrderClick }) {

  const total = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + (product ? item.quantity * product.prix : 0);
  }, 0);

  return (
    <div>
      <h3 className="mt-4 text-center">Panier ({cart.reduce((s, i) => s + i.quantity, 0)} articles)</h3>
      {cart.length === 0 ? (
        <p className="text-center">Votre panier est vide.</p>
      ) : (
        <div>
          {cart.map(item => {
            const product = products.find(p => p.id === item.id);
            if (!product) return null;
            return (
              <div key={item.id} className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3 border-bottom pb-2">
                <span>{product.nom}</span>
                <div className="d-flex align-items-center">
                  <button className="btn btn-sm btn-secondary" onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span className="mx-2">{item.quantity}</span>
                  <button className="btn btn-sm btn-secondary" onClick={() => updateQuantity(item.id, 1)} disabled={item.quantity >= product.stock}>+</button>
                </div>
                <span>{(item.quantity * product.prix).toFixed(2)} FCFA</span>
                <button className="btn btn-sm btn-danger" onClick={() => removeFromCart(item.id)}>Retirer</button>
              </div>
            );
          })}
          <p className="text-end fw-bold fs-5">Total: {total.toFixed(2)} FCFA</p>
          <div className="text-center">
            <button className="btn btn-warning me-2" onClick={emptyCart}>Vider le panier</button>

            <button className="btn btn-primary mt-3" onClick={onOrderClick} >
  Commander
</button>
            {/* <button className="btn btn-success" data-bs-toggle="modal" data-bs-target="#orderModal">Commander</button> */}
            
          </div>
        </div>
      )}
    </div>
  );
}
