import React from 'react'
import { fetchBanners } from '../../api/api';
import { useEffect, useState } from 'react';
 import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './carrossel.css';

export default function Carrossel() {
  const [banners, setBanners] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    async function loadBanners() {
      try {
        const bannersData = await fetchBanners();
        console.log('bannersData length:', bannersData.length);
        setBanners(bannersData);
      } catch (error) {
        console.error('Erro ao carregar banners:', error);
      }
    }

    loadBanners();
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  }

  return (
    <div className='carousel-wrapper'>
      <div className='carousel-container'>
        <button className='arrow arrow-left' onClick={prevSlide}>
          <ArrowBackIosIcon />
        </button>
        <div className='container-images' style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {banners.map((banner) => (
            <img 
              key={banner.id} 
              src={`https://ibassets.com.br/ib.store.banner/bnr-${banner.image}`}
              alt={banner.title}
              className='banner-image'
            />
          ))}
        </div>
        
        <button className='arrow arrow-right' onClick={nextSlide}>
          <ArrowForwardIosIcon />
        </button>
      </div>
      
      <div className='dots-container'>
        {banners.map((_, index) => (
          <button 
            key={index}
            className={`dot ${currentSlide === index ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}  
      </div>
    </div>
  )
}