import React from 'react'
import Carrossel from '../components/carrosselBanner/carrosselBanner'
import Secoes from '../components/secoes/secoes'
import CarroseMiniBanner from '../components/carroselMiniBanner/carrosseMiniBanner'
import '../css/home.css';

export default function Home({ cart, addToCart, removeFromCart, setCartProducts }) {
  return (
    <div className='home-container'>
      <Carrossel />
      <CarroseMiniBanner />
      <Secoes 
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        setCartProducts={setCartProducts}
      />
    </div>
  )
}