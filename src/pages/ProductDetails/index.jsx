import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  getProductById,
  getRelatedProducts,
  getProductReviews,
  submitProductReview
} from '@/services/productService';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';
import Interactive3DViewer from './components/Interactive3DViewer';
import { SizeGuideModal, ProductCard, QuickViewModal } from '@/components/common';
import {
  Star,
  Heart,
  ShoppingBag,
  Zap,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronDown,
  Ruler,
  Rotate3D,
  Image as ImageIcon,
  MessageSquare,
  ArrowRight,
  Check
} from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToast } = useToast();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Gallery & View state
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState('gallery'); // 'gallery' | '3d'
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Modals & Accordions
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [writeReviewOpen, setWriteReviewOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [openAccordion, setOpenAccordion] = useState('description');

  // Review Form state
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewFit, setNewReviewFit] = useState('True to size.');

  useEffect(() => {
    async function loadProductData() {
      setLoading(true);
      window.scrollTo(0, 0);
      const prod = await getProductById(id);
      if (prod) {
        setProduct(prod);
        setSelectedColor(prod.colors?.[0]?.name || 'Standard');
        const defaultSize = prod.sizes?.find((s) => s.stock > 0)?.size || prod.sizes?.[0]?.size || 'M';
        setSelectedSize(defaultSize);
        setActiveImageIndex(0);
        setViewMode('gallery');

        const [rel, rev] = await Promise.all([
          getRelatedProducts(prod.id, 4),
          getProductReviews(prod.id)
        ]);
        setRelatedProducts(rel);
        setReviews(rev);
      }
      setLoading(false);
    }
    loadProductData();
  }, [id]);

  if (loading) {
    return (
      <div className="section" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--text-tertiary)', fontSize: '1.1rem' }}>Presenting KAYOO piece...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="section text-center">
        <h2>Piece Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', margin: '16px 0 24px' }}>
          The requested creation may have retired to our private archive.
        </p>
        <Link to="/shop" className="btn btn-primary">
          Return to Shop
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const currentSizeObj = product.sizes?.find((s) => s.size === selectedSize);
  const isOutOfStock = currentSizeObj?.stock === 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedSize, selectedColor, quantity);
    addToast(`Added "${product.name}" (${selectedSize}, ${selectedColor}) to shopping bag`, 'success');
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, selectedSize, selectedColor, quantity);
    navigate('/checkout');
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product.id);
    if (!isFavorited) {
      addToast(`Added "${product.name}" to your wishlist`, 'success');
    } else {
      addToast(`Removed "${product.name}" from your wishlist`, 'info');
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newReviewTitle || !newReviewComment) {
      addToast('Please complete all review fields.', 'error');
      return;
    }
    const created = await submitProductReview(product.id, {
      author: newReviewAuthor || 'KAYOO Collector',
      rating: newReviewRating,
      title: newReviewTitle,
      comment: newReviewComment,
      fitFeedback: newReviewFit
    });
    setReviews([created, ...reviews]);
    setWriteReviewOpen(false);
    setNewReviewTitle('');
    setNewReviewComment('');
    addToast('Thank you for contributing your verified review.', 'success');
  };

  return (
    <div className="section-sm">
      <div className="container">
        {/* Breadcrumb Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 24 }}>
          <Link to="/" style={{ color: 'inherit' }}>Home</Link>
          <span>/</span>
          <Link to="/shop" style={{ color: 'inherit' }}>Shop</Link>
          <span>/</span>
          <Link to={`/shop?category=${product.category}`} style={{ color: 'inherit' }}>{product.category}</Link>
          <span>/</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{product.name}</span>
        </div>

        {/* Dual-Column Product Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.15fr 1fr',
            gap: 56,
            alignItems: 'flex-start'
          }}
          className="product-details-grid"
        >
          {/* LEFT: Image Gallery & 3D Visualizer */}
          <div style={{ position: 'sticky', top: '100px' }}>
            {/* View Mode Toggle (High-Res Photos vs 360° Studio Visualizer) */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ display: 'flex', gap: 8, backgroundColor: 'var(--bg-secondary)', padding: 4, borderRadius: 'var(--radius-pill)' }}>
                <button
                  onClick={() => setViewMode('gallery')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    backgroundColor: viewMode === 'gallery' ? 'var(--bg-dark)' : 'transparent',
                    color: viewMode === 'gallery' ? '#FFFFFF' : 'var(--text-secondary)'
                  }}
                >
                  <ImageIcon size={14} /> Studio Photos
                </button>
                <button
                  onClick={() => setViewMode('3d')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    backgroundColor: viewMode === '3d' ? 'var(--bg-dark)' : 'transparent',
                    color: viewMode === '3d' ? '#FFFFFF' : 'var(--text-secondary)'
                  }}
                >
                  <Rotate3D size={14} color={viewMode === '3d' ? 'var(--accent-gold-light)' : 'inherit'} />
                  360° Visualizer
                </button>
              </div>

              <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-tertiary)' }}>
                SKU: {product.sku}
              </span>
            </div>

            {/* View Mode Content */}
            {viewMode === '3d' ? (
              <Interactive3DViewer product={product} />
            ) : (
              <div>
                {/* Main Large Visual */}
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '3 / 4',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    backgroundColor: 'var(--bg-secondary)',
                    marginBottom: 16,
                    position: 'relative'
                  }}
                >
                  <img
                    src={product.images?.[activeImageIndex] || product.images?.[0]}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />

                  {/* Wishlist Heart on Media */}
                  <button
                    onClick={handleToggleWishlist}
                    className={`product-card-wishlist ${isFavorited ? 'active' : ''}`}
                    style={{ top: 16, right: 16 }}
                    aria-label="Save to wishlist"
                  >
                    <Heart size={20} fill={isFavorited ? '#B91C1C' : 'none'} color={isFavorited ? '#B91C1C' : 'currentColor'} />
                  </button>
                </div>

                {/* Thumbnail Rail */}
                {product.images && product.images.length > 1 && (
                  <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 6 }}>
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        style={{
                          width: 80,
                          height: 104,
                          borderRadius: 'var(--radius-xs)',
                          overflow: 'hidden',
                          flexShrink: 0,
                          border: activeImageIndex === idx ? '2px solid var(--text-primary)' : '1px solid var(--border-medium)',
                          opacity: activeImageIndex === idx ? 1 : 0.6,
                          transition: 'opacity 0.2s ease, border-color 0.2s ease'
                        }}
                      >
                        <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* RIGHT: Product Information, Purchase Controls & Accordions */}
          <div>
            {/* Badges & Collection Link */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              {product.badge && (
                <span className="badge badge-dark">{product.badge}</span>
              )}
              {product.isSale && (
                <span className="badge badge-sale">ARCHIVE SALE</span>
              )}
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-tertiary)' }}>
                {product.gender} • {product.category}
              </span>
            </div>

            {/* Title */}
            <h1 style={{ fontSize: 'clamp(2rem, 3.2vw, 2.8rem)', lineHeight: 1.15, marginBottom: 14 }}>
              {product.name}
            </h1>

            {/* Price & Reviews */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  ${product.price} USD
                </span>
                {product.compareAtPrice && (
                  <span style={{ fontSize: '1.3rem', textDecoration: 'line-through', color: 'var(--text-tertiary)' }}>
                    ${product.compareAtPrice}
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem' }}>
                <div style={{ display: 'flex', color: 'var(--accent-gold)' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={15}
                      fill={i < Math.floor(product.rating) ? 'var(--accent-gold)' : 'none'}
                    />
                  ))}
                </div>
                <strong>{product.rating}</strong>
                <a href="#reviews" style={{ color: 'var(--text-secondary)', textDecoration: 'underline' }}>
                  ({reviews.length} reviews)
                </a>
              </div>
            </div>

            {/* Summary */}
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 28 }}>
              {product.summary || product.description}
            </p>

            <div style={{ height: 1, backgroundColor: 'var(--border-subtle)', marginBottom: 28 }} />

            {/* Color Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
                  Color: <span style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>{selectedColor}</span>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: '50%',
                        backgroundColor: c.hex,
                        border: selectedColor === c.name ? '3px solid var(--text-primary)' : '1px solid rgba(0,0,0,0.15)',
                        boxShadow: selectedColor === c.name ? '0 0 0 3px #FFFFFF' : 'none',
                        cursor: 'pointer'
                      }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector with Size Guide Trigger */}
            {product.sizes && product.sizes.length > 0 && (
              <div style={{ marginBottom: 28 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Select Size
                  </div>
                  <button
                    onClick={() => setSizeGuideOpen(true)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      fontSize: '0.78rem',
                      color: 'var(--text-primary)',
                      textDecoration: 'underline',
                      fontWeight: 600
                    }}
                  >
                    <Ruler size={13} /> Sizing Chart
                  </button>
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
                          padding: '10px 20px',
                          minWidth: 54,
                          borderRadius: 'var(--radius-pill)',
                          border: isSelected ? '1.5px solid var(--text-primary)' : '1px solid var(--border-medium)',
                          backgroundColor: isSelected ? 'var(--bg-dark)' : '#FFFFFF',
                          color: isSelected ? '#FFFFFF' : isUnavailable ? 'var(--border-medium)' : 'var(--text-primary)',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          textDecoration: isUnavailable ? 'line-through' : 'none',
                          cursor: isUnavailable ? 'not-allowed' : 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        {s.size}
                      </button>
                    );
                  })}
                </div>

                {/* Stock Warning Badge */}
                {currentSizeObj && (
                  <div style={{ fontSize: '0.78rem', marginTop: 10, color: currentSizeObj.stock <= 2 ? '#B91C1C' : 'var(--text-secondary)' }}>
                    {currentSizeObj.stock === 0 ? (
                      'This size is currently sold out. Reserve via private concierge.'
                    ) : currentSizeObj.stock <= 2 ? (
                      `Urgent: Only ${currentSizeObj.stock} pieces remaining in stock.`
                    ) : (
                      'In stock — ready for dispatch in 24 hours.'
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Quantity Stepper & Add to Bag / Buy Now */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
              <div style={{ display: 'flex', gap: 12 }}>
                {/* Quantity Stepper */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-pill)',
                    padding: '4px 12px',
                    height: 52
                  }}
                >
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{ padding: '0 8px', fontSize: '1.2rem', fontWeight: 600 }}
                  >
                    -
                  </button>
                  <span style={{ width: 32, textAlign: 'center', fontWeight: 700, fontSize: '0.95rem' }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(currentSizeObj?.stock || 10, quantity + 1))}
                    style={{ padding: '0 8px', fontSize: '1.2rem', fontWeight: 600 }}
                  >
                    +
                  </button>
                </div>

                {/* Primary Add to Cart */}
                <button
                  className="btn btn-primary"
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  style={{ flex: 1, height: 52, opacity: isOutOfStock ? 0.6 : 1 }}
                >
                  <ShoppingBag size={18} />
                  {isOutOfStock ? 'Sold Out' : 'Add to Shopping Bag'}
                </button>
              </div>

              {/* Instant Buy Now Button */}
              <button
                className="btn btn-gold"
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                style={{ width: '100%', height: 48 }}
              >
                <Zap size={16} /> Instant Checkout with Express Courier
              </button>
            </div>

            {/* Reassurance Badges */}
            <div
              style={{
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-sm)',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                marginBottom: 36
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Truck size={16} color="var(--accent-gold)" />
                <span>
                  <strong>Complimentary Express Courier:</strong> Delivery in 2–3 business days.
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <RotateCcw size={16} color="var(--accent-gold)" />
                <span>
                  <strong>30-Day Complimentary Returns:</strong> Prepaid labels included in every parcel.
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <ShieldCheck size={16} color="var(--accent-gold)" />
                <span>
                  <strong>Generational Craftsmanship:</strong> Lifetime complimentary seam repair.
                </span>
              </div>
            </div>

            {/* Collapsible Accordions per Spec */}
            <div style={{ borderTop: '1px solid var(--border-subtle)' }}>
              {[
                {
                  id: 'description',
                  title: 'Description & Silhouettes',
                  content: product.description
                },
                {
                  id: 'materials',
                  title: 'Materials & Textile Provenance',
                  content: product.materials
                },
                {
                  id: 'care',
                  title: 'Garment Longevity & Care',
                  content: product.care
                },
                {
                  id: 'shipping',
                  title: 'Courier Shipping & Global Returns',
                  content:
                    'All orders are dispatched from our KAYOO Studio within 24 hours. Shipped with signature holographic authenticity hangtag and protective dust bag.'
                }
              ].map((acc) => (
                <div key={acc.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                  <button
                    onClick={() => setOpenAccordion(openAccordion === acc.id ? '' : acc.id)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '18px 0',
                      textAlign: 'left',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase'
                    }}
                  >
                    <span>{acc.title}</span>
                    <ChevronDown
                      size={16}
                      style={{
                        transform: openAccordion === acc.id ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.2s ease'
                      }}
                    />
                  </button>
                  {openAccordion === acc.id && (
                    <div style={{ paddingBottom: 20, fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                      {acc.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <section id="reviews" style={{ marginTop: 80, paddingTop: 40, borderTop: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent-gold-dark)', fontWeight: 700 }}>
                Verified Feedback
              </span>
              <h2 style={{ marginTop: 4 }}>Client Testimonials ({reviews.length})</h2>
            </div>
            <button
              onClick={() => setWriteReviewOpen(true)}
              className="btn btn-secondary btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              <MessageSquare size={14} /> Write a KAYOO Review
            </button>
          </div>

          {/* Reviews List */}
          {reviews.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '48px 24px',
                backgroundColor: '#FFFFFF',
                border: '1px dashed var(--border-subtle)',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)', marginBottom: 16 }}>
                No reviews have been penned for this creation yet. Be the first to share your experience with KAYOO.
              </p>
              <button
                onClick={() => setWriteReviewOpen(true)}
                className="btn btn-secondary btn-sm"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                <MessageSquare size={14} /> Pen First Review
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  style={{
                    padding: '24px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div>
                      <div style={{ display: 'flex', color: 'var(--accent-gold)', marginBottom: 4 }}>
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill={i < (Number(rev.rating) || 5) ? 'var(--accent-gold)' : 'none'} />
                        ))}
                      </div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{rev.title}</div>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{rev.date}</span>
                  </div>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 14 }}>
                    "{rev.comment}"
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: 'var(--text-tertiary)', borderTop: '1px solid var(--border-subtle)', paddingTop: 10 }}>
                    <span>{rev.author} • Verified Buyer</span>
                    <span style={{ color: 'var(--accent-emerald)' }}>Fit: {rev.fitFeedback}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Complete The Look / Related Products */}
        {relatedProducts.length > 0 && (
          <section style={{ marginTop: 80 }}>
            <div style={{ marginBottom: 32 }}>
              <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent-gold-dark)', fontWeight: 700 }}>
                Curated Harmony
              </span>
              <h2 style={{ marginTop: 4 }}>Complete The Silhouette</h2>
            </div>
            <div className="product-grid-4">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onQuickView={(prod) => setQuickViewProduct(prod)}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Sizing Guide Modal */}
      <SizeGuideModal isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />

      {/* Write Review Modal */}
      {writeReviewOpen && (
        <>
          <div className="drawer-backdrop" onClick={() => setWriteReviewOpen(false)} />
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '92%',
              maxWidth: '520px',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-modal)',
              zIndex: 1300,
              padding: '32px',
              animation: 'fadeIn 0.2s ease'
            }}
          >
            <h3 style={{ marginBottom: 8 }}>Share Your Experience</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: 20 }}>
              Reviewing "{product.name}". Your commentary guides fellow patrons.
            </p>

            <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label className="form-label">Your Name</label>
                <input
                  type="text"
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  placeholder="e.g. Marcella S."
                  className="form-input"
                  required
                />
              </div>

              <div>
                <label className="form-label">Rating</label>
                <div style={{ display: 'flex', gap: 6, cursor: 'pointer' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewReviewRating(star)}
                      style={{ color: star <= newReviewRating ? 'var(--accent-gold)' : 'var(--border-medium)', padding: 4 }}
                    >
                      <Star size={24} fill={star <= newReviewRating ? 'var(--accent-gold)' : 'none'} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="form-label">Review Headline</label>
                <input
                  type="text"
                  value={newReviewTitle}
                  onChange={(e) => setNewReviewTitle(e.target.value)}
                  placeholder="e.g. Unbelievable texture and structural drape"
                  className="form-input"
                  required
                />
              </div>

              <div>
                <label className="form-label">Written Feedback</label>
                <textarea
                  rows={3}
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="Describe the fabric hand, fit on shoulders, and longevity..."
                  className="form-textarea"
                  required
                />
              </div>

              <div>
                <label className="form-label">Fit Assessment</label>
                <select
                  value={newReviewFit}
                  onChange={(e) => setNewReviewFit(e.target.value)}
                  className="form-select"
                >
                  <option value="True to size.">True to size</option>
                  <option value="Runs slightly relaxed / oversized.">Runs relaxed / oversized</option>
                  <option value="Runs slightly slim.">Runs slightly slim</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                <button
                  type="button"
                  onClick={() => setWriteReviewOpen(false)}
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}

      <style>{`
        @media (max-width: 900px) {
          .product-details-grid {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
        }
      `}</style>
    </div>
  );
}
