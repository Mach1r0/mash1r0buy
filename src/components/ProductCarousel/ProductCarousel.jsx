import React, { useState, useRef, useEffect } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ProductCard from '../productCard/productCard';
import './ProductCarousel.css';

export default function ProductCarousel({ items, cart, addToCart, removeFromCart }) {
  const carouselRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setItemsPerPage(2);
      } else if (window.innerWidth <= 900) {
        setItemsPerPage(4);
      } else {
        setItemsPerPage(5);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const scroll = (direction) => {
    const newPage = direction === 'left' 
      ? Math.max(0, currentPage - 1)
      : Math.min(totalPages - 1, currentPage + 1);
    
    goToPage(newPage);
  };

  const goToPage = (pageIndex) => {
    if (carouselRef.current) {
      const cards = carouselRef.current.children;
      if (cards.length > 0) {
        const targetCardIndex = Math.min(pageIndex * itemsPerPage, items.length - 1);
        const targetCard = cards[targetCardIndex];
        
        if (targetCard) {
          const scrollLeft = targetCard.offsetLeft - carouselRef.current.offsetLeft;
          carouselRef.current.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
          });
        }
      }
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