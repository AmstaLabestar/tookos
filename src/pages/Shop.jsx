// export default function Shop() {
//   const produits = [
//     {
//       id: 1,
//       nom: "Maillot Real Madrid",
//       prix: 49.99,
//       image: "https://via.placeholder.com/200x200?text=Real+Madrid",
//     },
//     {
//       id: 2,
//       nom: "Maillot PSG",
//       prix: 44.99,
//       image: "https://via.placeholder.com/200x200?text=PSG",
//     },
//     // ajoute autant de produits que tu veux
//   ];

//   return (
//     <div className="container mt-4">
//       <h2>Boutique</h2>
//       <div className="row">
//         {produits.map((produit) => (
//           <div key={produit.id} className="col-md-4 mb-4">
//             <div className="card">
//               <img src={produit.image} className="card-img-top" alt={produit.nom} />
//               <div className="card-body">
//                 <h5 className="card-title">{produit.nom}</h5>
//                 <p className="card-text">{produit.prix} €</p>
//                 <button className="btn btn-primary">Ajouter au panier</button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }





import React, { useState, useEffect } from 'react';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/maillot.json')
      .then(res => res.json())
      .then(data => {
        setProducts(data.maillots);
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        const validCart = savedCart.filter(item => data.maillots.some(p => p.id === item.id));
        setCart(validCart);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erreur lors du chargement des maillots :", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, loading]);

  const addToCart = (productId) => {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
      setCart(cart.map(item => item.id === productId ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { id: productId, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const increaseQuantity = (productId) => {
    setCart(cart.map(item => item.id === productId ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const decreaseQuantity = (productId) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        if (item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          return null;
        }
      }
      return item;
    }).filter(item => item !== null));
  };

  const emptyCart = () => {
    setCart([]);
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Boutique</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card">
              <img src={product.image} className="card-img-top" alt={product.nom} />
              <div className="card-body">
                <h5 className="card-title">{product.nom}</h5>
                <p className="card-text">{product.prix.toFixed(2)} FCFA</p>
                <button className="btn btn-primary" onClick={() => addToCart(product.id)}>Ajouter au panier</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h3 className="mt-4 text-center">Panier ({cart.reduce((sum, item) => sum + item.quantity, 0)} articles)</h3>
      {cart.length === 0 ? (
        <p className="text-center">Votre panier est vide.</p>
      ) : (
        <div>
          {cart.map((item) => {
            const product = products.find(p => p.id === item.id);
            if (!product) return null;
            return (
              <div key={item.id} className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3 border-bottom pb-2">
                <span className="mb-2 mb-md-0">{product.nom}</span>
                <div className="d-flex align-items-center mb-2 mb-md-0">
                  <button className="btn btn-sm btn-secondary" onClick={() => decreaseQuantity(item.id)}>-</button>
                  <span className="mx-2">{item.quantity}</span>
                  <button className="btn btn-sm btn-secondary" onClick={() => increaseQuantity(item.id)}>+</button>
                </div>
                <span className="mb-2 mb-md-0">{(item.quantity * product.prix).toFixed(2)} FCFA</span>
                <button className="btn btn-sm btn-danger" onClick={() => removeFromCart(item.id)}>Retirer</button>
              </div>
            );
          })}
          <p className="text-end fw-bold fs-5">Total: {cart.reduce((sum, item) => {
            const product = products.find(p => p.id === item.id);
            return sum + (product ? item.quantity * product.prix : 0);
          }, 0).toFixed(2)} €</p>
          <div className="text-center">
                <button className="btn btn-warning" onClick={emptyCart}>Vider le panier</button>
           </div>
        </div>
      )}
    </div>
  );
}
