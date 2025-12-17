import React, { useState, useRef } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ProductCard from '../productCard/productCard';
import './ProductCarousel.css';

export default function ProductCarousel({ items, cart, addToCart, removeFromCart }) {
  const carouselRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const cardWidth = 170;
      const gap = 15;
      const scrollAmount = (cardWidth + gap) * itemsPerPage;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      
      if (direction === 'left') {
        setCurrentPage(Math.max(0, currentPage - 1));
      } else {
        setCurrentPage(Math.min(totalPages - 1, currentPage + 1));
      }
    }
  };

  const goToPage = (pageIndex) => {
    if (carouselRef.current) {
      const cardWidth = 170;
      const gap = 15;
      const scrollAmount = pageIndex * (cardWidth + gap) * itemsPerPage;
      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
      setCurrentPage(pageIndex);
    }
  };

  return (
    <div className='carousel-wrapper'>
      <div className='products-grid' ref={carouselRef}>
        {items.map((produto) => (
          <ProductCard
            key={produto.id}
            produto={produto}
            quantity={cart[produto.id] || 0}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        ))}
      </div>

      <button className={`arrow-left ${currentPage === 0 ? 'inactive' : ''}`} onClick={() => scroll('left')}>
        <ArrowBackIosIcon fontSize="small" />
      </button>

      <button className={`arrow-right ${currentPage === totalPages - 1 ? 'inactive' : ''}`} onClick={() => scroll('right')}>
        <ArrowForwardIosIcon fontSize="small" />
      </button>
      
      <div className='dots-container'>
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentPage ? 'active' : ''}`}
            onClick={() => goToPage(index)}
          />
        ))}
      </div>
    </div>
  );
}