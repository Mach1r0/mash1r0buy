import React from 'react'
import './navbar.css';
import { FaShoppingCart } from "react-icons/fa";
import { FaShoppingBasket } from "react-icons/fa";

export default function Navbar() {
  return (
    <div className={'ContainerNavbar'}>

    <div className={'navbarMain'}>
      <h1 className='title'> Mashiro Buy</h1>
      <div className="search-container">
        <input type="text" placeholder='Buscar produtos disponíveis' />
        <FaShoppingBasket className="search-icon" size={20} color={"#ffff"} />
      </div>
      <FaShoppingCart size={30} color={"white"} />
    </div>

    </div>
  )
}
