import React, { useEffect, useState } from 'react';
import './secoes.css';
import { fetchLayoutData } from '../../api/api';
import ProductCarousel from '../ProductCarousel/ProductCarousel';

export default function Secoes({ cart, addToCart, removeFromCart, setCartProducts }) {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadSections() {
      try {
        setLoading(true);
        const { sections: sectionsData, promo } = await fetchLayoutData();
        
        const updatedSections = [...sectionsData];
        if (promo.length > 0) {
          const ofertasSection = {
            id: 'ofertas-section',
            title: 'Ofertas',
            items: promo
          };
          updatedSections.unshift(ofertasSection);
        }
        
        setSections(updatedSections);
        
        // Coleta todos os produtos de todas as seções para o carrinho
        const allProducts = updatedSections.flatMap(section => section.items || []);
        if (setCartProducts) {
          setCartProducts(allProducts);
        }
      } catch (error) {
        console.error('Erro ao buscar seções:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    loadSections();
  }, []);

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
            <ProductCarousel 
              items={section.items}
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          ) : (
            <p>Nenhum produto nesta seção</p>
          )}
        </div>
      ))}
    </div>
  );
}