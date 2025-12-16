import React from 'react'
import Carrossel from '../components/carrosselBanner/carrosselBanner'
import Secoes from '../components/secoes/secoes'
import '../css/home.css';

export default function Home() {
  return (
    <div className='home-container'>
      <Carrossel />
      <Secoes />
    </div>
  )
}