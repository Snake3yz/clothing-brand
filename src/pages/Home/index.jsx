import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getFeaturedProducts,
  getNewArrivals,
  getCollections,
  getLookbook,
  getProductById
} from '@/services/productService';
import { ProductCard, QuickViewModal } from '@/components/common';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { useWishlist } from '@/context/WishlistContext';
import { getAssetUrl } from '@/utils/assetUrl';
import {
  ArrowRight,
  Sparkles,
  Shield,
  Compass,
  Scissors,
  Star,
  Heart,
  Plus,
  Check,
  Eye,
  ArrowUpRight,
  Zap,
  ShoppingBag,
  RotateCcw,
  CheckCircle2,
  Tag,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

// Hero Spotlight Product Showcase items (cycleable in the floating card)
const HERO_SPOTLIGHTS = [
  {
    id: 'prod-kayoo-tee',
    title: 'KAYOO Starburst "Rock-On" Heavyweight Tee',
    price: 28,
    compareAtPrice: 38,
    image: getAssetUrl('/products/kayoo-tee-duo.jpeg'),
    badge: 'FLAGSHIP ICON',
    category: 'Heavyweight Streetwear',
    specs: '320GSM Combed Cotton • Pitch Black',
    link: '/product/prod-kayoo-tee'
  },
  {
    id: 'prod-kayoo-jersey',
    title: 'KAYOO Official Jersey — "King of Hanuman"',
    price: 11.49,
    compareAtPrice: 15.0,
    image: getAssetUrl('/products/kayoo-jersey-hanuman.jpeg'),
    badge: 'OFFICIAL DROP',
    category: 'Performance Sportswear',
    specs: 'Khmer Kbach Motif • Micro-Mesh',
    link: '/product/prod-kayoo-jersey'
  },
  {
    id: 'prod-kayoo-joggers',
    title: 'KAYOO Pure-Chalk Heavyweight Street Joggers',
    price: 38,
    compareAtPrice: 48,
    image: getAssetUrl('/products/IMG_90E839521ACA-13.jpeg'),
    badge: 'KAYOO STREET BOTTOMS',
    category: 'Heavyweight Fleece',
    specs: '380GSM Dense Terry • Chalk White',
    link: '/product/prod-kayoo-joggers'
  }
];

// Model Perspectives for Hero visual
const HERO_PERSPECTIVES = [
  {
    id: 'stairs',
    label: '01 / Architectural Stairs',
    image: getAssetUrl('/products/kayoo-tee-stairs-portrait.jpeg'),
    alt: 'KAYOO Signature Oversized Tee on modern stairs',
    subtitle: 'Urban Silhouette'
  },
  {
    id: 'mirror',
    label: '02 / Mirror Duality',
    image: getAssetUrl('/products/kayoo-tee-mirror.jpeg'),
    alt: 'KAYOO Front & Back Starburst Graphic Duality',
    subtitle: 'Gallery Promenade'
  },
  {
    id: 'temple',
    label: '03 / Angkor Heritage',
    image: getAssetUrl('/products/kayoo-tee-temple.jpeg'),
    alt: 'Angkor Wat Ancient Sanctuary Steps Campaign',
    subtitle: 'Siem Reap Sanctuary'
  }
];

export default function Home() {
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');
  const [collections, setCollections] = useState([]);
  const [lookbookLooks, setLookbookLooks] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [activeLookIndex, setActiveLookIndex] = useState(0);

  // Hero interactive states
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const [heroPerspectiveIndex, setHeroPerspectiveIndex] = useState(0);
  const [cardAddedAnim, setCardAddedAnim] = useState(false);

  // Newsletter state
  const [emailInput, setEmailInput] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  useEffect(() => {
    async function loadData() {
      const [feat, col, looks, arrivals] = await Promise.all([
        getFeaturedProducts(12),
        getCollections(),
        getLookbook(),
        getNewArrivals('all', 8)
      ]);
      setFeaturedProducts(feat);
      setCollections(col);
      setLookbookLooks(looks);
      setNewArrivals(arrivals);
    }
    loadData();

    const handleUpdate = () => loadData();
    window.addEventListener('kayoo:products_updated', handleUpdate);
    return () => window.removeEventListener('kayoo:products_updated', handleUpdate);
  }, []);

  const currentSpotlight = HERO_SPOTLIGHTS[spotlightIndex];
  const currentHeroVisual = HERO_PERSPECTIVES[heroPerspectiveIndex];
  const featuredLook = lookbookLooks[activeLookIndex] || lookbookLooks[0];

  // Quick add from the hero spotlight card
  const handleSpotlightQuickAdd = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const fullProd = await getProductById(currentSpotlight.id);
    if (fullProd) {
      const defaultColor = fullProd.colors?.[0]?.name || 'Standard';
      const defaultSize = fullProd.sizes?.find((s) => s.stock > 0)?.size || 'M';
      addToCart(fullProd, defaultSize, defaultColor, 1);
      setCardAddedAnim(true);
      setTimeout(() => setCardAddedAnim(false), 1200);
      addToast(`Added "${currentSpotlight.title}" (${defaultSize}) to shopping bag`, 'success');
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      addToast('Please provide a valid email address.', 'error');
      return;
    }
    setNewsletterSubscribed(true);
    addToast('Welcome to the KAYOO Circle. Use code "KAYOO10" for 10% off your first order.', 'success');
  };

  // Filter products by selected category
  const filteredProducts = featuredProducts.filter((p) => {
    if (activeCategoryFilter === 'all') return true;
    if (activeCategoryFilter === 'tops') return p.category === 'tops';
    if (activeCategoryFilter === 'trousers') return p.category === 'trousers';
    if (activeCategoryFilter === 'accessories') return p.category === 'accessories';
    return true;
  });

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', overflow: 'hidden' }}>
      {/* =========================================================================
          1. REDESIGNED EDITORIAL HERO SECTION (Inspired by High-Fashion Reference)
          ========================================================================= */}
      <section className="editorial-hero-wrapper">
        <div className="editorial-hero-canvas">
          {/* Ambient Warm Glow */}
          <div className="editorial-hero-ambient" />

          <div className="editorial-hero-grid">
            {/* LEFT COLUMN: Badge, Editorial Headline, and Floating Spotlight Card */}
            <div style={{ position: 'relative', zIndex: 3, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
              <div>
                {/* Refined Pill Badge */}
                <div className="editorial-badge-pill">
                  <Sparkles size={13} color="#997838" />
                  <span>2026 Core Drop • Khmer Streetwear Archive</span>
                </div>

                {/* Editorial High-Contrast Headline (Inspired by reference) */}
                <h1 className="editorial-hero-title">
                  Sculptural Form,
                  <br />
                  <span className="italic-flair">Raw Streetwear Soul.</span>
                </h1>
              </div>

              {/* Floating Spotlight Product Card (Anchored at lower-left just like reference) */}
              <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
                <div className="editorial-spotlight-card">
                  {/* Card Header with category & mini switcher */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--text-tertiary)', fontWeight: 700 }}>
                      {currentSpotlight.category}
                    </span>
                    {/* Switcher Arrows */}
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setSpotlightIndex((prev) => (prev === 0 ? HERO_SPOTLIGHTS.length - 1 : prev - 1));
                        }}
                        style={{ padding: '2px 4px', color: 'var(--text-secondary)' }}
                        aria-label="Previous spotlight piece"
                        title="Previous piece"
                      >
                        <ChevronLeft size={13} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setSpotlightIndex((prev) => (prev === HERO_SPOTLIGHTS.length - 1 ? 0 : prev + 1));
                        }}
                        style={{ padding: '2px 4px', color: 'var(--text-secondary)' }}
                        aria-label="Next spotlight piece"
                        title="Next piece"
                      >
                        <ChevronRight size={13} />
                      </button>
                    </div>
                  </div>

                  {/* Product Title */}
                  <Link
                    to={currentSpotlight.link}
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      lineHeight: 1.3,
                      color: 'var(--text-primary)',
                      textDecoration: 'none'
                    }}
                  >
                    {currentSpotlight.title}
                  </Link>

                  {/* Price Tag with discount */}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginTop: 4 }}>
                    <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#111113' }}>
                      ${typeof currentSpotlight.price === 'number' ? currentSpotlight.price.toFixed(2) : currentSpotlight.price}
                    </span>
                    {currentSpotlight.compareAtPrice && (
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', textDecoration: 'line-through' }}>
                        ${typeof currentSpotlight.compareAtPrice === 'number' ? currentSpotlight.compareAtPrice.toFixed(2) : currentSpotlight.compareAtPrice}
                      </span>
                    )}
                  </div>

                  {/* Product Cutout Frame */}
                  <div className="spotlight-media-box">
                    <img
                      src={currentSpotlight.image}
                      alt={currentSpotlight.title}
                      className="spotlight-media-img"
                    />

                    {/* Interactive '+' Quick Add Button (Matches Reference) */}
                    <button
                      className="spotlight-add-btn"
                      onClick={handleSpotlightQuickAdd}
                      aria-label={`Quick add ${currentSpotlight.title} to bag`}
                      title="Quick add to shopping bag"
                    >
                      {cardAddedAnim ? <Check size={18} color="#34D399" /> : <Plus size={18} />}
                    </button>
                  </div>

                  {/* Card Footer Caption */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>
                      {currentSpotlight.specs}
                    </span>
                    <Link
                      to={currentSpotlight.link}
                      style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-gold-dark)', display: 'inline-flex', alignItems: 'center', gap: 2 }}
                    >
                      Inspect <ArrowUpRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Large Model Visual, Social Proof Stack, & Supporting Narrative (Clean & Unblocked) */}
            <div className="editorial-hero-right-col">
              <div className="editorial-model-container">
                {/* Main Framed Editorial Visual - Completely Unobstructed */}
                <div className="editorial-model-frame">
                  <img
                    src={currentHeroVisual.image}
                    alt={currentHeroVisual.alt}
                    loading="eager"
                  />
                </div>

                {/* Floating Social Proof Stack (Overlapping Avatars + 60k Badge) */}
                <div className="editorial-social-proof">
                  <div className="avatar-stack">
                    <img
                      src={getAssetUrl('/products/kayoo-tee-stairs.jpeg')}
                      alt="Customer 1"
                      className="avatar-stack-item"
                    />
                    <img
                      src={getAssetUrl('/products/kayoo-tee-car-front.jpeg')}
                      alt="Customer 2"
                      className="avatar-stack-item"
                    />
                    <img
                      src={getAssetUrl('/products/kayoo-tee-stairs-portrait.jpeg')}
                      alt="Customer 3"
                      className="avatar-stack-item"
                    />
                    <div className="avatar-stack-count">60k</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#111113', lineHeight: 1.1 }}>
                      2,400+ Collectors
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-tertiary)' }}>
                      ★ 4.9 Global Rating
                    </div>
                  </div>
                </div>

                {/* Perspective Selector Pills (Allows user to toggle model view right in hero) */}
                <div className="editorial-perspectives-nav">
                  {HERO_PERSPECTIVES.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => setHeroPerspectiveIndex(idx)}
                      className={`editorial-perspective-pill ${heroPerspectiveIndex === idx ? 'active' : ''}`}
                    >
                      {item.subtitle}
                    </button>
                  ))}
                </div>
              </div>

              {/* Supporting Narrative & Dual Actions (Placed CLEANLY BELOW the photo on the warm canvas - NO overlapping box!) */}
              <div className="editorial-hero-narrative-bar">
                <p className="editorial-hero-narrative-text">
                  Conceived at the crossroads of ancient Angkorian stone architecture and modern oversized streetwear. 320GSM custom-milled combed cotton crafted for enduring drape and authentic youth energy.
                </p>
                <div className="editorial-hero-buttons">
                  <Link to="/shop" className="editorial-btn-primary">
                    Shop Collection <ArrowRight size={14} />
                  </Link>
                  <Link to="/lookbook" className="editorial-btn-secondary">
                    Runway Lookbook
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. MINIMALIST BRAND ESSENCE & VALUE PILLARS STRIP
          ========================================================================= */}
      <section style={{ borderBottom: '1px solid var(--border-subtle)', padding: '24px 0', backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
              gap: 24,
              alignItems: 'center'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: '#F6F3EE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Scissors size={16} color="var(--accent-gold-dark)" />
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>320GSM Combed Cotton</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-tertiary)' }}>Shape-retaining heavy boxy drape</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: '#F6F3EE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={16} color="var(--accent-gold-dark)" />
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>Angkorian Youth Heritage</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-tertiary)' }}>Authentic Cambodian street archive</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: '#F6F3EE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Shield size={16} color="var(--accent-gold-dark)" />
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>Silkscreen Permanence</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-tertiary)' }}>160°C cured crack-resistant ink</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: '#F6F3EE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Compass size={16} color="var(--accent-gold-dark)" />
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>Global Express Courier</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-tertiary)' }}>Complimentary delivery on $150+</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. CURATED CAPSULE SHOWCASE (Bestsellers & Real Drops)
          ========================================================================= */}
      <section className="section">
        <div className="container">
          {/* Section Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36, flexWrap: 'wrap', gap: 20 }}>
            <div>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--accent-gold-dark)', fontWeight: 700 }}>
                Curated KAYOO Archive
              </span>
              <h2 style={{ fontFamily: 'var(--font-editorial)', fontSize: 'clamp(2rem, 3.6vw, 2.8rem)', fontWeight: 500, marginTop: 4 }}>
                Featured Creations & Iconic Drops
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', backgroundColor: '#F1ECE3', padding: 4, borderRadius: 'var(--radius-pill)' }}>
              {[
                { id: 'all', label: 'All Pieces' },
                { id: 'tops', label: 'Tops & Tees' },
                { id: 'trousers', label: 'Pants & Bottoms' },
                { id: 'accessories', label: 'Caps & Headwear' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategoryFilter(tab.id)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    backgroundColor: activeCategoryFilter === tab.id ? '#121214' : 'transparent',
                    color: activeCategoryFilter === tab.id ? '#FFFFFF' : 'var(--text-secondary)',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid (4 Columns) */}
          <div className="product-grid-4">
            {filteredProducts.slice(0, 8).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>

          {/* View All CTA */}
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link to="/shop" className="editorial-btn-secondary" style={{ padding: '14px 32px' }}>
              Explore All KAYOO Pieces <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. EDITORIAL CRAFTSMANSHIP SPOTLIGHT: ANATOMY OF THE 320GSM HEAVYWEIGHT
          ========================================================================= */}
      <section style={{ backgroundColor: '#F8F5F0', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', padding: '90px 0' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.1fr 1fr',
              gap: 64,
              alignItems: 'center'
            }}
            className="editorial-split-grid"
          >
            {/* Left: Detail Photograph of Flatlay & Silkscreen */}
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  width: '100%',
                  aspectRatio: '4 / 3.8',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 48px -10px rgba(40, 30, 20, 0.1)',
                  backgroundColor: '#ECE6DC'
                }}
              >
                <img
                  src={getAssetUrl('/products/kayoo-tee-flatlay.jpeg')}
                  alt="KAYOO Starburst Tee Flatlay and Silkscreen Detail"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Floating Material Gauge Card */}
              <div
                style={{
                  position: 'absolute',
                  bottom: -24,
                  right: -20,
                  backgroundColor: '#FFFFFF',
                  padding: '18px 22px',
                  borderRadius: '16px',
                  boxShadow: '0 16px 36px rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(220, 214, 203, 0.6)'
                }}
                className="desktop-only"
              >
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--accent-gold-dark)', fontWeight: 700 }}>
                  MATERIAL BENCHMARK
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.6rem', color: '#111113', lineHeight: 1.1, marginTop: 4 }}>
                  320 GSM
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: 2 }}>
                  2.4x heavier than standard commercial cotton
                </div>
              </div>
            </div>

            {/* Right: Technical Breakdown */}
            <div>
              <span className="editorial-badge-pill">
                <Scissors size={13} color="#997838" />
                <span>Textile Architecture</span>
              </span>

              <h2 style={{ fontFamily: 'var(--font-editorial)', fontSize: 'clamp(2rem, 3.8vw, 3rem)', fontWeight: 500, lineHeight: 1.15, marginBottom: 20 }}>
                Engineered for Permanence & Fluid Geometry
              </h2>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: 1.7, marginBottom: 32 }}>
                Every garment begins with uncompromised yarn selection. The KAYOO signature silhouette balances monumental dropped shoulders with a drape that resists warping, shrinking, or sagging across decades.
              </p>

              {/* Feature Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginBottom: 36 }}>
                <div style={{ backgroundColor: '#FFFFFF', padding: '16px 18px', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#111113', marginBottom: 4 }}>
                    3.5cm Anti-Bacon Collar
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', lineHeight: 1.5 }}>
                    Double-ribbed herringbone neckline tape prevents bacon-neck wrinkling.
                  </div>
                </div>

                <div style={{ backgroundColor: '#FFFFFF', padding: '16px 18px', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#111113', marginBottom: 4 }}>
                    160°C Thermocure Print
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', lineHeight: 1.5 }}>
                    Elastic plastisol formula expands with the weave, ensuring zero cracking.
                  </div>
                </div>

                <div style={{ backgroundColor: '#FFFFFF', padding: '16px 18px', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#111113', marginBottom: 4 }}>
                    Pre-Shrunk Cold Wash
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', lineHeight: 1.5 }}>
                    Pre-laundered with mineral washes so the fit remains exact from day one.
                  </div>
                </div>

                <div style={{ backgroundColor: '#FFFFFF', padding: '16px 18px', borderRadius: '14px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#111113', marginBottom: 4 }}>
                    Cultural Kbach Crest
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', lineHeight: 1.5 }}>
                    Ancient Angkorian decorative patterns translated into modern street art.
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 14 }}>
                <Link to="/product/prod-kayoo-tee" className="editorial-btn-primary">
                  Inspect Flagship Tee ($28.00) <ArrowRight size={14} />
                </Link>
                <Link to="/about" className="editorial-btn-secondary">
                  Our Manifesto
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. INTERACTIVE RUNWAY LOOKBOOK PREVIEW
          ========================================================================= */}
      {featuredLook && (
        <section className="section">
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 36, flexWrap: 'wrap', gap: 20 }}>
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--accent-gold-dark)', fontWeight: 700 }}>
                  Visual Dialogue
                </span>
                <h2 style={{ fontFamily: 'var(--font-editorial)', fontSize: 'clamp(2rem, 3.6vw, 2.8rem)', fontWeight: 500, marginTop: 4 }}>
                  Editorial Lookbook in Motion
                </h2>
              </div>
              <Link to="/lookbook" className="editorial-btn-secondary">
                View All Runway Looks <ArrowRight size={14} />
              </Link>
            </div>

            {/* Lookbook Feature Card with Interactive Pins */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.25fr 1fr',
                gap: 56,
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                borderRadius: '24px',
                padding: '36px',
                border: '1px solid var(--border-subtle)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.03)'
              }}
              className="editorial-split-grid"
            >
              {/* Left: Editorial Image with Hotspot Pins */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '4 / 3.6',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  backgroundColor: '#161619'
                }}
              >
                <img
                  src={featuredLook.editorialImage}
                  alt={featuredLook.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />

                {/* Hotspot Pins */}
                {featuredLook.pins?.map((pin, i) => (
                  <div
                    key={i}
                    className="lookbook-pin"
                    style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                    title={`${pin.label} (${pin.price})`}
                  >
                    <span>{i + 1}</span>
                  </div>
                ))}

                <div
                  style={{
                    position: 'absolute',
                    bottom: 16,
                    left: 16,
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    backdropFilter: 'blur(8px)',
                    color: '#FFF',
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.75rem',
                    fontWeight: 600
                  }}
                >
                  📍 {featuredLook.location}
                </div>
              </div>

              {/* Right: Lookbook Details & Tagged Items */}
              <div>
                <span className="editorial-badge-pill" style={{ marginBottom: 12 }}>
                  {featuredLook.season}
                </span>

                <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.8rem', fontWeight: 600, marginBottom: 12 }}>
                  {featuredLook.title}
                </h3>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: 24 }}>
                  Captured on location at {featuredLook.location} by {featuredLook.photographer}. Tap the pinned coordinates to inspect each handcrafted garment.
                </p>

                {/* Pieces list in this look */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
                  {featuredLook.pins?.map((pin, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 18px',
                        backgroundColor: '#F8F6F2',
                        borderRadius: '12px',
                        border: '1px solid var(--border-subtle)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span
                          style={{
                            width: 22,
                            height: 22,
                            borderRadius: '50%',
                            backgroundColor: '#121214',
                            color: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.72rem',
                            fontWeight: 700
                          }}
                        >
                          {i + 1}
                        </span>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>{pin.label}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{pin.price} USD</div>
                        </div>
                      </div>

                      <Link to={`/product/${pin.productId}`} className="editorial-btn-secondary" style={{ padding: '6px 14px', fontSize: '0.75rem' }}>
                        View Piece <ArrowRight size={12} />
                      </Link>
                    </div>
                  ))}
                </div>

                <Link to="/lookbook" className="editorial-btn-primary">
                  Explore Full Lookbook <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          6. VERIFIED CLIENT TESTIMONIALS (Editorial Minimal Quotes)
          ========================================================================= */}
      <section style={{ backgroundColor: '#F8F5F0', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--accent-gold-dark)', fontWeight: 700 }}>
              Collector Voices
            </span>
            <h2 style={{ fontFamily: 'var(--font-editorial)', fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', fontWeight: 500, marginTop: 4 }}>
              Praise from Global Collectors
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 24
            }}
          >
            {[
              {
                quote: "The 320GSM cotton holds that perfect boxy drape without sagging. The back starburst print gets stopped everywhere on the street in Phnom Penh and Siem Reap. Collar doesn't bacon after months of washing.",
                author: "Vireak K.",
                location: "Siem Reap, Cambodia",
                verified: true,
                rating: 5,
                piece: "KAYOO Starburst Heavyweight Tee"
              },
              {
                quote: "The King of Hanuman jersey is a wearable masterpiece. The traditional Khmer stone kbach motif sublimated into the black mesh is so refined. High performance on and off the field.",
                author: "Chan Dara",
                location: "Phnom Penh",
                verified: true,
                rating: 5,
                piece: "King of Hanuman Jersey"
              },
              {
                quote: "The 380GSM chalk white joggers stack so cleanly over my sneakers. Thick fleece, not see-through, and supreme comfort.",
                author: "Rothana M.",
                location: "Phnom Penh, Cambodia",
                verified: true,
                rating: 5,
                piece: "Pure-Chalk Heavyweight Joggers"
              }
            ].map((rev, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '32px 28px',
                  borderRadius: '20px',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: '0 8px 24px rgba(40, 30, 20, 0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="#C5A059" color="#C5A059" />
                    ))}
                  </div>
                  <p style={{ fontSize: '0.92rem', color: '#2B2A27', lineHeight: 1.65, fontStyle: 'italic', marginBottom: 24 }}>
                    "{rev.quote}"
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#111113' }}>{rev.author}</div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-tertiary)' }}>{rev.location}</div>
                  </div>
                  <span className="badge badge-gold" style={{ fontSize: '0.68rem' }}>VERIFIED BUYER</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. VIP KAYOO SYNDICATE NEWSLETTER & EXCLUSIVE DROPS
          ========================================================================= */}
      <section style={{ padding: '90px 0', backgroundColor: '#FFFFFF' }}>
        <div className="container-narrow">
          <div
            style={{
              backgroundColor: '#121214',
              borderRadius: '28px',
              padding: '60px 48px',
              color: '#FFFFFF',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Subtle background ambient circles */}
            <div
              style={{
                position: 'absolute',
                top: '-30%',
                left: '-10%',
                width: '350px',
                height: '350px',
                background: 'radial-gradient(circle, rgba(197, 160, 89, 0.15) 0%, transparent 70%)',
                pointerEvents: 'none'
              }}
            />

            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--accent-gold-light)', fontWeight: 700 }}>
              Private Client Register
            </span>

            <h2 style={{ fontFamily: 'var(--font-editorial)', color: '#FFFFFF', fontSize: 'clamp(2rem, 3.8vw, 3rem)', fontWeight: 500, margin: '12px 0 16px' }}>
              Join the KAYOO Streetwear Syndicate
            </h2>

            <p style={{ color: '#B5B3AD', fontSize: '0.95rem', maxWidth: '540px', margin: '0 auto 32px', lineHeight: 1.6 }}>
              Receive private invitations to numbered limited capsule drops, behind-the-scenes campaign photography, and 10% off your inaugural creation.
            </p>

            {newsletterSubscribed ? (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  padding: '14px 24px',
                  borderRadius: 'var(--radius-pill)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <CheckCircle2 size={18} color="#34D399" />
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                  You are registered. Use code <strong style={{ color: 'var(--accent-gold-light)' }}>KAYOO10</strong> at checkout for 10% off.
                </span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', gap: 10, maxWidth: '480px', margin: '0 auto', flexWrap: 'wrap' }}>
                <input
                  type="email"
                  placeholder="Enter your personal email..."
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  style={{
                    flex: 1,
                    minWidth: '240px',
                    padding: '14px 20px',
                    borderRadius: 'var(--radius-pill)',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    color: '#FFFFFF',
                    fontSize: '0.9rem'
                  }}
                  required
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: '#FFFFFF',
                    color: '#121214',
                    fontWeight: 700,
                    padding: '14px 26px',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.88rem',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                >
                  Join Archive
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
}
