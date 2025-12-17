import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import { FaShoppingCart, FaShoppingBasket, FaHome, FaThLarge, FaTags, FaFire, FaDrumstickBite, FaCheese } from "react-icons/fa";
import CartModal from '../CartModal/CartModal';

export default function Navbar({ cart, products, addToCart, removeFromCart, removeItemCompletely, getTotalItems }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const totalItems = getTotalItems ? getTotalItems() : 0;

  return (
    <div className="ContainerNavbar">
      {/* Primeiro nível */}
      <div className="navbarMain">
        <Link to="/" className="navbar-logo-title">
          <FaShoppingBasket size={40} color="#e67e22" style={{ marginRight: 8 }} />
          <span className="navbar-store-title">Mashiro Buy</span>
        </Link>
        <div className="navbar-search-cart">
          <div className="navbar-search-area">
            <input className="search-input" type="text" placeholder="O que você procura?" />
            <span className="search-icon"><FaShoppingBasket size={18} /></span>
          </div>
          <button className="cart-btn" onClick={() => setIsCartOpen(true)}>
            <FaShoppingCart size={18} style={{ marginRight: 6 }} />
            Carrinho
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </button>
        </div>
      </div>

      <div className="navbar-categories">
        <Link to="/" className="cat-link"><FaHome /> Início</Link>
        <span className="cat-link"><FaThLarge /> Todas Categorias</span>
        <span className="cat-link"><FaTags /> Ofertas</span>
        <span className="cat-link"><FaFire /> Kit Churrasco</span>
        <span className="cat-link"><FaDrumstickBite /> Açougue / Aves / Peixaria</span>
        <span className="cat-link"><FaCheese /> Frios e Laticínios</span>
      </div>

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart || {}}
        products={products || []}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        removeItemCompletely={removeItemCompletely}
      />
    </div>
  );
}