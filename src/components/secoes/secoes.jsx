import React, { useEffect, useState, useRef } from 'react';
import './secoes.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function Secoes() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const ProductCarousel = ({ items }) => {
    const carouselRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(items.length / itemsPerPage);

    const scroll = (direction) => {
      if (carouselRef.current) {
        const cardWidth = 150;
        const gap = 20;
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
        const cardWidth = 150;
        const gap = 20;
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
            
            return (
              <div key={produto.id} className='product-card'>
                {img && (
                  <img
                    src={`https://ibassets.com.br/ib.item.image.medium/m-${img}`}
                    alt={produto.name}
                    className='product-image'
                  />
                )}
                <div className='products'>
                  <h3 className='product-name'>{produto.name}</h3>
                  <p className='product-description'>{produto.description}</p>
                  <p className='product-price'>R$ {price?.toFixed(2)}</p>
                  <button className='add-button'>Adicionar</button>
                </div>
              </div>
            );
          })}
        </div>

        <button className={`arrow-left ${currentPage === 0 ? 'inactive' : ''}`} onClick={() => scroll('left')}>
          <ArrowBackIosIcon />
        </button>

        <button className={`arrow-right ${currentPage === totalPages - 1 ? 'inactive' : ''}`} onClick={() => scroll('right')}>
          <ArrowForwardIosIcon />
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
          <h2 className='section-title'>{section.title}</h2>
          
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