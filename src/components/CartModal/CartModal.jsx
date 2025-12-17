import React from 'react';
import { FaTimes, FaTrash } from 'react-icons/fa';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import './CartModal.css';

export default function CartModal({ isOpen, onClose, cart, products, addToCart, removeFromCart, removeItemCompletely }) {
  if (!isOpen) return null;

  // Calcula o total
  const cartItems = Object.entries(cart).map(([productId, quantity]) => {
    const product = products.find(p => p.id === productId);
    if (!product) return null;
    
    const priceData = product.prices?.[0];
    const price = priceData?.promo_price || priceData?.price || product.price;
    
    return {
      id: productId,
      product,
      quantity,
      price,
      total: price * quantity
    };
  }).filter(Boolean);

  const totalCompra = cartItems.reduce((sum, item) => sum + item.total, 0);
  const totalItens = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <div className="cart-overlay" onClick={onClose} />
      
      <div className="cart-modal">
        <div className="cart-header">
          <button className="cart-close-btn" onClick={onClose}>
            <FaTimes size={20} />
          </button>
          <h2>Meu carrinho</h2>
          <button className="cart-clear-btn" onClick={() => cartItems.forEach(item => removeItemCompletely(item.id))}>
            Limpar
          </button>
        </div>

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <p>Seu carrinho está vazio</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img 
                  src={`https://ibassets.com.br/ib.item.image.small/s-${item.product.images?.[0]}`}
                  alt={item.product.name}
                  className="cart-item-image"
                />
                <div className="cart-item-info">
                  <p className="cart-item-name">{item.product.name}</p>
                  <p className="cart-item-price">R$ {item.price?.toFixed(2)}</p>
                </div>
                <button 
                  className="cart-item-remove"
                  onClick={() => removeItemCompletely(item.id)}
                >
                  <FaTrash size={14} />
                </button>
                <div className="cart-item-quantity">
                  <button 
                    className="qty-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <RemoveIcon fontSize="small" />
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button 
                    className="qty-btn qty-btn-add"
                    onClick={() => addToCart(item.id)}
                  >
                    <AddIcon fontSize="small" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <button className="cart-checkout-btn">
            Finalizar compra
            <span className="cart-total">R$ {totalCompra.toFixed(2)}</span>
          </button>
        </div>
      </div>
    </>
  );
}
