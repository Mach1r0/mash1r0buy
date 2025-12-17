import React from 'react'
import { fetchMiniBanners } from '../../api/api';
import { useEffect, useState } from 'react';
import './carrosselMininBanner.css';

export default function CarroseMiniBanner() {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    async function loadBanners() {
      try {
        const bannersData = await fetchMiniBanners();
        setBanners(bannersData);
      } catch (error) {
        console.error('Erro ao carregar banners:', error);
      }
    }

    loadBanners();
  }, []);

  if (banners.length === 0) return null;

  return (
    <div className='mini-banners-wrapper'>
      <div className='mini-banners-container'>
        {banners.slice(0, 3).map((banner) => (
          <div key={banner.id} className='mini-banner-item'>
            <img 
              src={`https://ibassets.com.br/ib.store.banner/bnr-${banner.image}`}
              alt={banner.title}
              className='mini-banner-image'
            />
          </div>
        ))}
      </div>
    </div>
  )
}