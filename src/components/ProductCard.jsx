import React from 'react';

export default function ProductCard({ product, addToCart }) {
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card">
        <img src={product.image} className="card-img-top" alt={product.nom} />
        <div className="card-body">
          <h5 className="card-title">{product.nom}</h5>
          <p className="card-text">{product.prix.toFixed(2)} FCFA</p>
          <p className="card-text">Stock : {product.stock}</p>
          <button className="btn btn-primary" onClick={() => addToCart(product.id)}>Ajouter au panier</button>
        </div>
      </div>
    </div>
  );
}
