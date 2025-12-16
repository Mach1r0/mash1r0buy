import React from 'react'
import Carrossel from '../components/carrosselBanner/carrosselBanner'
import Secoes from '../components/secoes/secoes'
import MiniBanner from '../components/carroselMiniBanner/carrosseMiniBanner'
import '../css/home.css';

export default function Home() {
  return (
    <div className='home-container'>
      <Carrossel />
      <MiniBanner />
      <Secoes />
    </div>
  )
}