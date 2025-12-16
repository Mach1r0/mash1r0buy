import React, { useEffect, useState, useRef } from 'react';
import './secoes.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function Secoes() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState({});

  useEffect(() => {
    async function loadSections() {
      try {
        setLoading(true);
        const resp = await fetch('/api/layout?subdomain=supermercado');
        
        if (!resp.ok) {
          throw new Error(`HTTP error! status: ${resp.status}`);
        }
        
        const data = await resp.json();
        setSections(data.data?.collection_items || []);
      } catch (error) {
        console.error('Erro ao buscar seções:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    loadSections();
  }, []);

  const addToCart = (productId) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const removeFromCart = (productId) => {
    setCart(prev => {
      const newCount = (prev[productId] || 0) - 1;
      if (newCount <= 0) {
        const { [productId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [productId]: newCount };
    });
  };

  const ProductCarousel = ({ items }) => {
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
          {items.map((produto) => {
            const img = produto.images?.[0];
            const price = produto.prices?.[0]?.price || produto.price;
            const quantity = cart[produto.id] || 0;
            
            return (
              <div key={produto.id} className='product-card'>
                {img && (
                  <img
                    src={`https://ibassets.com.br/ib.item.image.medium/m-${img}`}
                    alt={produto.name}
                    className='product-image'
                  />
                )}
                <div className='product-info'>
                  <h3 className='product-name'>{produto.name}</h3>
                  <p className='product-description'>{produto.description}</p>
                  <p className='product-price'>R$ {price?.toFixed(2)}</p>
                </div>
                
                {quantity === 0 ? (
                  <button className='add-button' onClick={() => addToCart(produto.id)}>
                    Adicionar
                  </button>
                ) : (
                  <div className='counter-container'>
                    <button className='counter-btn' onClick={() => removeFromCart(produto.id)}>
                      <RemoveIcon fontSize="small" />
                    </button>
                    <span className='counter-value'>{quantity}</span>
                    <button className='counter-btn' onClick={() => addToCart(produto.id)}>
                      <AddIcon fontSize="small" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
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
  };

  if (loading) return <div className='loading'>Carregando...</div>;
  if (error) return <div className='error'>Erro: {error}</div>;

  return (
    <div className='secoes-container'>
      {sections.map((section) => (
        <div key={section.id} className='section'>
          <div className='section-header'>
            <h2 className='section-title'>{section.title}</h2>
            <a href="#" className='ver-mais-link'>Ver mais &gt;</a>
          </div>
          
          {section.items && section.items.length > 0 ? (
            <ProductCarousel items={section.items} />
          ) : (
            <p>Nenhum produto nesta seção</p>
          )}
        </div>
      ))}
    </div>
  );
}