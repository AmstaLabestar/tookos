// import React from 'react';

// export default function OrderModal({ orderName, setOrderName, orderAddress, setOrderAddress, handleOrderSubmit }) {
//   return (
//     <div className="modal fade" id="orderModal" tabIndex="-1" aria-labelledby="orderModalLabel" aria-hidden="true">
//       <div className="modal-dialog">
//         <div className="modal-content">
//           <form onSubmit={handleOrderSubmit}>
//             <div className="modal-header">
//               <h5 className="modal-title" id="orderModalLabel">Finaliser la commande</h5>
//               <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//             </div>
//             <div className="modal-body">
//               <div className="mb-3">
//                 <label className="form-label">Nom complet</label>
//                 <input type="text" className="form-control" required value={orderName} onChange={(e) => setOrderName(e.target.value)} />
//               </div>
//               <div className="mb-3">
//                 <label className="form-label">Adresse de livraison</label>
//                 <textarea className="form-control" required rows="3" value={orderAddress} onChange={(e) => setOrderAddress(e.target.value)} />
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
//               <button type="submit" className="btn btn-success">Valider la commande</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }



import React from 'react';

export default function OrderModal({
  show,
  onClose,
  orderName,
  setOrderName,
  orderAddress,
  setOrderAddress,
  handleOrderSubmit
}) {
  if (!show) return null;

  return (
    <div className="modal d-block bg-dark bg-opacity-50" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <form onSubmit={handleOrderSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Finaliser la commande</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Nom complet</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  value={orderName}
                  onChange={(e) => setOrderName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Adresse de livraison</label>
                <textarea
                  className="form-control"
                  required
                  rows="3"
                  value={orderAddress}
                  onChange={(e) => setOrderAddress(e.target.value)}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Annuler
              </button>
              <button type="submit" className="btn btn-success">
                Valider la commande
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
