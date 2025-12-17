import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProduto } from '../api/api';
import ProductCarousel from '../components/ProductCarousel/ProductCarousel';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import '../css/produto.css';

export default function Produto({ cart, addToCart, removeFromCart, setCartProducts }) {
  const { slug } = useParams(); 
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    async function fetchProduct() {
      const response = await fetchProduto(slug);
      const productData = response.data.data[0];
      setProduct(productData);
      
      if (setCartProducts && productData) {
        setCartProducts(prev => {
          const exists = prev.some(p => p.id === productData.id);
          if (!exists) {
            return [...prev, productData];
          }
          return prev;
        });
      }
    }
    fetchProduct();
  }, [slug]);

  if (!product) return <div className="loading">Carregando...</div>;

  const priceData = product.prices?.[0];
  const price = priceData?.price || product.price;
  const promoPrice = priceData?.promo_price;
  const hasPromo = promoPrice && promoPrice < price;

  let discountPercent = 0;
  if (hasPromo) {
    discountPercent = Math.round(((price - promoPrice) / price) * 100);
  }

  const hasPromoFreeDelivery = priceData?.promo_free_delivery != null;

  const stockBalance = product.stock_infos?.stock_balance ?? priceData?.qtd_stock ?? 0;
  const isOutOfStock = product.available_stock === false || stockBalance <= 0;

  const descriptionParts = product.description?.split('<br><br>') || [];
  const mainDescription = descriptionParts[0]?.replace(/<br>/g, ' ').trim() || '';
  const ingredients = descriptionParts.slice(1).join('\n').replace(/<br>/g, '\n').trim() || '';

  const variationItems = product.variation_items || [];
  const hasVariations = variationItems.length > 0;

  const quantity = cart[product.id] || 0;

  const mainSubcategory = product.main_subcategory;
  const categoryTitle = mainSubcategory?.category_id?.title || '';
  const subcategoryTitle = mainSubcategory?.title || '';

  return (
    <div className="produto-detalhe-container">
      {(categoryTitle || subcategoryTitle) && (
        <div className="produto-breadcrumb">
          <span>{categoryTitle}</span>
          {categoryTitle && subcategoryTitle && <span className="breadcrumb-separator">/</span>}
          <span>{subcategoryTitle}</span>
          <span className="breadcrumb-separator">-</span>
          <span className="breadcrumb-brand">{product.brand}</span>
        </div>
      )}

      <div className="produto-detalhe-main">
        <div className="produto-imagem-container">
          {product.images && product.images.length > 1 && (
            <div className="produto-thumbnails">
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={`https://ibassets.com.br/ib.item.image.small/s-${img}`}
                  alt={`${product.name} - ${idx + 1}`}
                  className={`produto-thumbnail ${selectedImage === idx ? 'active' : ''}`}
                  onClick={() => setSelectedImage(idx)}
                />
              ))}
            </div>
          )}
          <div className="produto-imagem-principal">
            {product.images && product.images[selectedImage] && (
              <img
                src={`https://ibassets.com.br/ib.item.image.large/l-${product.images[selectedImage]}`}
                alt={product.name}
                className='product-image-big'
              />
            )}
          </div>
        </div>

        <div className="produto-info">
          <h1 className="produto-nome">{product.name}</h1>
          <p className="produto-marca">Marca: <span>{product.brand}</span></p>
          
          <div className="produto-badges">
            {hasPromo && (
              <span className="badge-desconto">{discountPercent}% OFF</span>
            )}
            {hasPromoFreeDelivery && !isOutOfStock && (
              <span className="badge-frete">Frete Grátis</span>
            )}
          </div>

          <div className="produto-preco-container">
            {hasPromo ? (
              <>
                <div className="produto-preco-linha">
                  <span className="produto-preco-original">R$ {price?.toFixed(2)}</span>
                  <span className="produto-desconto-tag">-{discountPercent}%</span>
                </div>
                <span className="produto-preco-promo">R$ {promoPrice?.toFixed(2)}</span>
              </>
            ) : (
              <span className="produto-preco-normal">R$ {price?.toFixed(2)}</span>
            )}
          </div>

          <div className="produto-cart-actions">
            {quantity === 0 ? (
              <button
                className="produto-add-carrinho"
                disabled={isOutOfStock}
                onClick={() => addToCart(product.id)}
              >
                {isOutOfStock ? 'Indisponível' : 'Adicionar ao Carrinho'}
              </button>
            ) : (
              <div className="produto-counter-container">
                <button className="produto-counter-btn" onClick={() => removeFromCart(product.id)}>
                  <RemoveIcon fontSize="small" />
                </button>
                <span className="produto-counter-value">{quantity}</span>
                <button className="produto-counter-btn" onClick={() => addToCart(product.id)}>
                  <AddIcon fontSize="small" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="produto-especificacoes">
        <h3>Descrição do produto</h3>
        <div className="especificacoes-content">
          {mainDescription && (
            <p className="especificacao-descricao">{mainDescription}</p>
          )}
          {ingredients && (
            <div className="especificacao-item">
              <strong>Ingredientes:</strong>
              <p>{ingredients}</p>
            </div>
          )}
        </div>
      </div>

      <div className="produto-aviso">
        <p>
          Informações sobre o produto ou embalagem apresentada pode não ser atual ou completo.
          Sempre consulte o produto físico para as informações mais precisas e avisos.
          Para obter informações adicionais, entre em contato com o revendedor ou fabricante.
        </p>
      </div>

      {hasVariations && (
        <div className="produto-relacionados">
          <h3>Produtos Relacionados</h3>
          <ProductCarousel
            items={variationItems}
            cart={cart}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        </div>
      )}
    </div>
  );
}