import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import './productCard.css';
import { Link } from 'react-router-dom';

export default function ProductCard({ produto, quantity, addToCart, removeFromCart }) {
  const img = produto.images?.[0];
  const priceData = produto.prices?.[0];
  const price = priceData?.price || produto.price;
  const promoPrice = priceData?.promo_price;
  const hasPromo = promoPrice && promoPrice < price;
  
  const stockBalance = produto.stock_infos?.stock_balance ?? priceData?.qtd_stock ?? 0;
  const isOutOfStock = produto.available_stock === false || stockBalance <= 0;
  
  const hasPromoFreeDelivery = priceData?.promo_free_delivery != null;
  const hasFreeShipping = hasPromoFreeDelivery && !isOutOfStock;
  
  const cleanDescription = produto.description?.split('<br>')[0]?.trim() || produto.description;
  
  let discountPercent = 0;
  if (hasPromo) {
    discountPercent = Math.round(((price - promoPrice) / price) * 100);
  }

  return (
    <div className='product-card'>
      <Link
        to={`/produto/${produto.slug || produto.id}`}
        className="product-link"
        style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
      >
        {hasPromo && <div className='oferta-badge'>Oferta</div>}
        {hasFreeShipping && <div className='free-shipping-badge'>Frete Grátis</div>}
        {isOutOfStock && (
          <div className='sold-out-overlay'>
            <span className='sold-out-text'>Esgotado</span>
          </div>
        )}
        {img && (
          <img
            src={`https://ibassets.com.br/ib.item.image.medium/m-${img}`}
            alt={produto.name}
            className='product-image'
          />
        )}
        <div className='product-info'>
          <h3 className='product-name'>{produto.name}</h3>
          <p className='product-description'>{cleanDescription}</p>
          {hasPromo ? (
            <div className='price-container'>
              <div className='price-row'>
                <span className='discount-badge'>-{discountPercent}%</span>
                <span className='original-price'>R$ {price?.toFixed(2)}</span>
              </div>
              <span className='promo-price'>R$ {promoPrice?.toFixed(2)}</span>
            </div>
          ) : (
            <p className='product-price'>R$ {price?.toFixed(2)}</p>
          )}
        </div>
      </Link>
      {quantity === 0 ? (
        <button 
          className='add-button' 
          onClick={() => addToCart(produto.id)}
          disabled={isOutOfStock}
          style={isOutOfStock ? { backgroundColor: '#ccc', cursor: 'not-allowed' } : {}}
        >
          {isOutOfStock ? 'Indisponível' : 'Adicionar ao carrinho'}
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
}