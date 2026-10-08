import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { getAssetUrl } from '@/utils/assetUrl';

export default function ProductCard({ product, onQuickView }) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToast } = useToast();

  const isFavorited = isInWishlist(product.id);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    if (!isFavorited) {
      addToast(`Added "${product.name}" to your wishlist`, 'success');
    } else {
      addToast(`Removed "${product.name}" from your wishlist`, 'info');
    }
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Add default first available size and color
    const defaultColor = product.colors?.[0]?.name || 'Standard';
    const availableSize = product.sizes?.find((s) => s.stock > 0)?.size || product.sizes?.[0]?.size || 'M';
    addToCart(product, availableSize, defaultColor, 1);
    addToast(`Added "${product.name}" (${availableSize}) to shopping bag`, 'success');
  };

  const primaryImage = getAssetUrl(product.images?.[0] || '');
  const secondaryImage = getAssetUrl(product.images?.[1] || primaryImage);

  return (
    <div className="product-card">
      {/* Media Box with Image Hover Reveal */}
      <div className="product-card-media">
        <Link to={`/product/${product.id}`} aria-label={`View ${product.name}`}>
          <img
            src={primaryImage}
            alt={product.name}
            loading="lazy"
            className="product-card-img"
          />
          {secondaryImage && (
            <img
              src={secondaryImage}
              alt={`${product.name} alternate view`}
              loading="lazy"
              className="product-card-img-secondary"
            />
          )}
        </Link>

        {/* Badges */}
        <div className="product-card-badges">
          {product.badge && (
            <span
              className={`badge ${
                product.badge.includes('SALE')
                  ? 'badge-sale'
                  : product.badge.includes('NEW')
                  ? 'badge-dark'
                  : 'badge-gold'
              }`}
            >
              {product.badge}
            </span>
          )}
          {product.isSale && !product.badge?.includes('SALE') && (
            <span className="badge badge-sale">SALE</span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          className={`product-card-wishlist ${isFavorited ? 'active' : ''}`}
          onClick={handleWishlistToggle}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
          title={isFavorited ? 'Remove from Wishlist' : 'Save to Wishlist'}
        >
          <Heart size={18} fill={isFavorited ? '#B91C1C' : 'none'} color={isFavorited ? '#B91C1C' : 'currentColor'} />
        </button>

        {/* Quick Action Buttons (Hover Reveal) */}
        <div className="product-card-quick-actions">
          <button
            className="btn btn-white btn-sm"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView?.(product);
            }}
            style={{ flex: 1, padding: '10px 14px' }}
            title="Quick view details"
          >
            <Eye size={14} /> Quick View
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={handleQuickAdd}
            style={{ flex: 1, padding: '10px 14px' }}
            title="Add to shopping bag"
          >
            <ShoppingBag size={14} /> Add
          </button>
        </div>
      </div>

      {/* Product Details Info */}
      <div className="product-card-info">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span className="product-card-category">{product.gender} • {product.category}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
            <Star size={12} fill="var(--accent-gold)" color="var(--accent-gold)" />
            <span>{product.rating}</span>
          </div>
        </div>

        <Link to={`/product/${product.id}`} className="product-card-title">
          {product.name}
        </Link>

        {/* Pricing */}
        <div className="product-card-pricing">
          <span className="product-card-price">${product.price}</span>
          {product.compareAtPrice && (
            <span className="product-card-compare-price">${product.compareAtPrice}</span>
          )}
        </div>

        {/* Color Swatch Dots */}
        {product.colors && product.colors.length > 0 && (
          <div className="product-card-colors">
            {product.colors.map((c) => (
              <span
                key={c.name}
                className="color-swatch-dot"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
            <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', marginLeft: 4 }}>
              {product.colors.length} {product.colors.length === 1 ? 'color' : 'colors'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
