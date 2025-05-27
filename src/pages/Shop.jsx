// import React, { useState, useEffect } from 'react';
// import ProductCard from '../components/ProductCard';
// import CartSummary from '../components/CartSummary';
// import OrderModal from '../components/OrderModal';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import { toast } from 'react-toastify';

// export default function Shop() {
//   const [products, setProducts] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // États pour la commande
//   const [orderName, setOrderName] = useState("");
//   const [orderAddress, setOrderAddress] = useState("");
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     fetch('/maillot.json')
//       .then(res => res.json())
//       .then(data => {
//         setProducts(data.maillots);
//         const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
//         const validCart = savedCart.filter(item =>
//           data.maillots.some(p => p.id === item.id)
//         );
//         setCart(validCart);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error("Erreur lors du chargement des maillots :", error);
//         setLoading(false);
//       });
//   }, []);

//   useEffect(() => {
//     if (!loading) {
//       localStorage.setItem('cart', JSON.stringify(cart));
//     }
//   }, [cart, loading]);

//   const addToCart = (productId) => {
//     const product = products.find(p => p.id === productId);
//     const existingItem = cart.find(item => item.id === productId);
//     const quantityInCart = existingItem ? existingItem.quantity : 0;

//     if (quantityInCart >= product.stock) {
//       alert("Stock insuffisant !");
//       return;
//     }

//     if (existingItem) {
//       setCart(cart.map(item =>
//         item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
//       ));
//     } else {
//       setCart([...cart, { id: productId, quantity: 1 }]);
//     }
//   };

//   const updateQuantity = (productId, delta) => {
//     const product = products.find(p => p.id === productId);
//     const item = cart.find(i => i.id === productId);
//     if (!item) return;

//     const newQuantity = item.quantity + delta;
//     if (newQuantity < 1) {
//       setCart(cart.filter(i => i.id !== productId));
//     } else if (newQuantity <= product.stock) {
//       setCart(cart.map(i =>
//         i.id === productId ? { ...i, quantity: newQuantity } : i
//       ));
//     }
//   };

//   const removeFromCart = (productId) => {
//     setCart(cart.filter(item => item.id !== productId));
//   };

//   const emptyCart = () => {
//     setCart([]);
//   };

// const generatePDFInvoice = () => {
//   const doc = new jsPDF();
//   const date = new Date().toLocaleString();

//   doc.setFontSize(16);
//   doc.text("Facture de commande", 14, 15);
//   doc.setFontSize(12);
//   doc.text(`Nom : ${orderName}`, 14, 25);
//   doc.text(`Adresse : ${orderAddress}`, 14, 32);
//   doc.text(`Date : ${date}`, 14, 39);

//   let y = 50; // Position de départ pour les lignes produits
//   doc.text("Produits :", 14, y);
//   y += 10;

//   cart.forEach(item => {
//     const product = products.find(p => p.id === item.id);
//     if (!product) return;
//     doc.text(
//       `${product.nom} - ${item.quantity} x ${product.prix} FCFA = ${(item.quantity * product.prix).toFixed(2)} FCFA`,
//       14,
//       y
//     );
//     y += 8;
//   });

//   const total = cart.reduce((sum, item) => {
//     const product = products.find(p => p.id === item.id);
//     return sum + (product ? item.quantity * product.prix : 0);
//   }, 0);

//   y += 10;
//   doc.setFontSize(14);
//   doc.text(`Total à payer : ${total.toFixed(2)} FCFA`, 14, y);

//   doc.save("facture_commande.pdf");
// };


//   const handleOrderSubmit = (e) => {
//     e.preventDefault();
//     console.log("✔️ handleOrderSubmit appelé");

//     if (!orderName || !orderAddress) {
//   toast.error("Veuillez remplir tous les champs.");
//   return;
// }


//     generatePDFInvoice();
//     setShowModal(false);
//     emptyCart();
//     toast.success("Commande passée avec succès !");
//   };

//   if (loading) return <div>Chargement...</div>;

//   return (
//     <div className="container mt-4">
//       <h2>Boutique</h2>
//       <div className="row">
//         {products.map((product) => (
//           <ProductCard key={product.id} product={product} addToCart={addToCart} />
//         ))}
//       </div>

//       <CartSummary
//   cart={cart}
//   products={products}
//   updateQuantity={updateQuantity}
//   removeFromCart={removeFromCart}
//   emptyCart={emptyCart}
//   onOrderClick={() => setShowModal(true)} // <-- Ici on l’ajoute
// />


      
// <OrderModal
//   show={showModal}
//   onClose={() => setShowModal(false)}
//   orderName={orderName}
//   setOrderName={setOrderName}
//   orderAddress={orderAddress}
//   setOrderAddress={setOrderAddress}
//   handleOrderSubmit={handleOrderSubmit}
// />

//     </div>
//   );
// }

















 








 