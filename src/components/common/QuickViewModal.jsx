import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { X, Star, ShoppingBag, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { getAssetUrl } from '@/utils/assetUrl';

export default function QuickViewModal({ product, onClose }) {
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0]?.name || 'Standard'
  );
  const [selectedSize, setSelectedSize] = useState(
    product.sizes?.find((s) => s.stock > 0)?.size || product.sizes?.[0]?.size || 'M'
  );
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) return null;

  const currentSizeObj = product.sizes?.find((s) => s.size === selectedSize);
  const isOutOfStock = currentSizeObj?.stock === 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedSize, selectedColor, quantity);
    addToast(`Added "${product.name}" (${selectedSize}, ${selectedColor}) to shopping bag`, 'success');
    onClose();
  };

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} />
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '92%',
          maxWidth: '920px',
          maxHeight: 'min(90vh, 90dvh)',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-modal)',
          zIndex: 1200,
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          animation: 'fadeIn 0.25s ease'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 10,
            width: 36,
            height: 36,
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '32px'
          }}
          className="quickview-grid"
        >
          {/* Left: Gallery */}
          <div className="quickview-left" style={{ padding: 'clamp(16px, 3vw, 24px)' }}>
            <div
              style={{
                width: '100%',
                aspectRatio: '3 / 4',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                backgroundColor: 'var(--bg-secondary)',
                marginBottom: '12px'
              }}
            >
              <img
                src={getAssetUrl(product.images?.[activeImageIndex] || product.images?.[0])}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div style={{ display: 'flex', gap: '8px' }}>
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    style={{
                      width: '60px',
                      height: '75px',
                      borderRadius: 'var(--radius-xs)',
                      overflow: 'hidden',
                      border: activeImageIndex === idx ? '2px solid var(--text-primary)' : '1px solid var(--border-medium)',
                      opacity: activeImageIndex === idx ? 1 : 0.6
                    }}
                  >
                    <img src={getAssetUrl(img)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Garment Information & Controls */}
          <div className="quickview-right" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span className="badge badge-dark">{product.gender}</span>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-tertiary)', letterSpacing: '0.08em' }}>
                  SKU: {product.sku}
                </span>
              </div>

              <h2 style={{ fontSize: '1.6rem', marginBottom: 10, lineHeight: 1.2 }}>{product.name}</h2>

              {/* Price & Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    ${product.price}
                  </span>
                  {product.compareAtPrice && (
                    <span style={{ fontSize: '1.1rem', textDecoration: 'line-through', color: 'var(--text-tertiary)' }}>
                      ${product.compareAtPrice}
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  <Star size={14} fill="var(--accent-gold)" color="var(--accent-gold)" />
                  <strong>{product.rating}</strong>
                  <span>({product.reviewCount} customer reviews)</span>
                </div>
              </div>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 20 }}>
                {product.summary || product.description}
              </p>

              {/* Color Swatch Selector */}
              {product.colors && product.colors.length > 0 && (
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
                    Color: <span style={{ fontWeight: 400, color: 'var(--text-secondary)' }}>{selectedColor}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          backgroundColor: c.hex,
                          border: selectedColor === c.name ? '3px solid var(--text-primary)' : '1px solid rgba(0,0,0,0.2)',
                          boxShadow: selectedColor === c.name ? '0 0 0 2px #FFF' : 'none',
                          cursor: 'pointer'
                        }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.sizes && product.sizes.length > 0 && (
                <div style={{ marginBottom: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Size
                    </div>
                    {currentSizeObj && (
                      <span style={{ fontSize: '0.75rem', color: currentSizeObj.stock <= 2 ? '#B91C1C' : 'var(--text-tertiary)' }}>
                        {currentSizeObj.stock === 0
                          ? 'Out of stock'
                          : currentSizeObj.stock <= 2
                          ? `Only ${currentSizeObj.stock} left in stock`
                          : 'In stock'}
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {product.sizes.map((s) => {
                      const isUnavailable = s.stock === 0;
                      const isSelected = selectedSize === s.size;
                      return (
                        <button
                          key={s.size}
                          onClick={() => setSelectedSize(s.size)}
                          disabled={isUnavailable}
                          style={{
                            padding: '8px 16px',
                            minWidth: 46,
                            borderRadius: 'var(--radius-pill)',
                            border: isSelected ? '1.5px solid var(--text-primary)' : '1px solid var(--border-medium)',
                            backgroundColor: isSelected ? 'var(--bg-dark)' : '#FFFFFF',
                            color: isSelected ? '#FFFFFF' : isUnavailable ? 'var(--border-medium)' : 'var(--text-primary)',
                            fontSize: '0.82rem',
                            fontWeight: 600,
                            textDecoration: isUnavailable ? 'line-through' : 'none',
                            cursor: isUnavailable ? 'not-allowed' : 'pointer'
                          }}
                        >
                          {s.size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Add to Bag */}
              <div className="quickview-actions" style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-pill)',
                    padding: '4px 10px',
                    height: 48
                  }}
                >
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{ padding: '0 8px', fontSize: '1.1rem', fontWeight: 600 }}
                  >
                    -
                  </button>
                  <span style={{ width: 28, textAlign: 'center', fontWeight: 600, fontSize: '0.9rem' }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(currentSizeObj?.stock || 10, quantity + 1))}
                    style={{ padding: '0 8px', fontSize: '1.1rem', fontWeight: 600 }}
                  >
                    +
                  </button>
                </div>

                <button
                  className="btn btn-primary"
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  style={{
                    flex: 1,
                    minWidth: '180px',
                    height: 48,
                    opacity: isOutOfStock ? 0.6 : 1,
                    cursor: isOutOfStock ? 'not-allowed' : 'pointer'
                  }}
                >
                  <ShoppingBag size={16} />
                  {isOutOfStock ? 'Out of Stock' : 'Add to Shopping Bag'}
                </button>
              </div>
            </div>

            {/* Bottom Link to Full Product Page */}
            <div className="quickview-footer" style={{ paddingTop: 16, borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <ShieldCheck size={14} color="var(--accent-gold)" /> Authenticity & lifetime seam repair guaranteed
              </span>
              <Link
                to={`/product/${product.id}`}
                onClick={onClose}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)'
                }}
              >
                View Full Creation Details <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .quickview-right {
          padding: 32px 32px 32px 0;
        }
        @media (max-width: 768px) {
          .quickview-grid {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }
          .quickview-left {
            padding: 20px 20px 10px 20px !important;
          }
          .quickview-right {
            padding: 10px 20px 24px 20px !important;
          }
        }
        @media (max-width: 480px) {
          .quickview-actions {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .quickview-actions > div {
            justify-content: center !important;
          }
        }
      `}</style>
    </>
  );
}
