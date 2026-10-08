import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Tag
} from 'lucide-react';

export default function Navbar({ onOpenSearch }) {
  const { totalItemsCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { isAuthenticated, user } = useAuth();
  const { addToast } = useToast();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setShopDropdownOpen(false);
  }, [location.pathname]);

  const copyPromo = () => {
    navigator.clipboard?.writeText('KAYOO10');
    addToast('Promo code "KAYOO10" copied to clipboard! (10% Off)', 'success');
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="announcement-bar">
        <span>COMPLIMENTARY WORLDWIDE COURIER DELIVERY ON ORDERS OVER $50</span>
        <span style={{ opacity: 0.4 }}>•</span>
        <button
          onClick={copyPromo}
          style={{
            color: 'var(--accent-gold-light)',
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            textDecoration: 'underline',
            fontSize: '0.72rem'
          }}
          title="Click to copy promo code"
        >
          <Tag size={12} />
          USE CODE "KAYOO10" FOR 10% OFF
        </button>
      </div>

      {/* Main Navbar */}
      <header
        className="navbar"
        style={{
          boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.05)' : 'none',
          backgroundColor: isScrolled ? 'rgba(250, 249, 246, 0.95)' : 'rgba(250, 249, 246, 0.85)'
        }}
      >
        <div className="container" style={{ height: '100%' }}>
          <div className="navbar-inner">
            {/* Left: Mobile Menu Toggle & Desktop Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <button
                className="nav-icon-btn mobile-only"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open mobile menu"
                style={{ display: 'none' }}
              >
                <Menu size={22} />
              </button>

              <Link to="/" className="nav-logo" aria-label="KAYOO Home">
                <svg width="26" height="26" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="100" height="100" rx="16" fill="#121214"/>
                  <path d="M50 14 L58 38 L86 38 L64 54 L72 82 L50 66 L28 82 L36 54 L14 38 L42 38 Z" fill="#9D4EDD"/>
                  <circle cx="50" cy="50" r="14" fill="#FFFFFF"/>
                </svg>
                <span className="nav-logo-text">KAYOO</span>
                <span style={{ fontSize: '0.62rem', letterSpacing: '0.18em', color: 'var(--text-tertiary)', marginLeft: -2, fontWeight: 800 }}>
                  STUDIO
                </span>
              </Link>
            </div>

            {/* Middle: Desktop Navigation Links with Mega Dropdown */}
            <nav className="nav-links desktop-only" style={{ position: 'relative' }}>
              <div
                style={{ position: 'relative' }}
                onMouseEnter={() => setShopDropdownOpen(true)}
                onMouseLeave={() => setShopDropdownOpen(false)}
              >
                <NavLink
                  to="/shop"
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}
                >
                  Shop
                  <ChevronDown
                    size={14}
                    style={{
                      transform: shopDropdownOpen ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s ease'
                    }}
                  />
                </NavLink>

                {/* Shop Mega Dropdown */}
                {shopDropdownOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '-100px',
                      width: '680px',
                      backgroundColor: '#FFFFFF',
                      borderRadius: 'var(--radius-md)',
                      boxShadow: 'var(--shadow-modal)',
                      border: '1px solid var(--border-subtle)',
                      padding: '28px',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr) 1.2fr',
                      gap: '24px',
                      zIndex: 1000,
                      animation: 'fadeIn 0.2s ease'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-tertiary)', marginBottom: 12 }}>
                        Gender & Focus
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <Link to="/shop?category=all" className="dropdown-link">All Creations</Link>
                        <Link to="/shop?gender=men" className="dropdown-link">Men's Streetwear</Link>
                        <Link to="/shop?gender=women" className="dropdown-link">Women's Streetwear</Link>
                        <Link to="/shop?gender=unisex" className="dropdown-link">Unisex Silhouettes</Link>
                        <Link to="/shop?category=sale" className="dropdown-link" style={{ color: '#B91C1C', fontWeight: 600 }}>
                          Archive Sale (-40%)
                        </Link>
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-tertiary)', marginBottom: 12 }}>
                        Categories
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <Link to="/shop?category=outerwear" className="dropdown-link">Jackets & Coats</Link>
                        <Link to="/shop?category=tops" className="dropdown-link">Tops & Shirts</Link>
                        <Link to="/shop?category=hoodies" className="dropdown-link">Hoodies & Knits</Link>
                        <Link to="/shop?category=trousers" className="dropdown-link">Pants & Trousers</Link>
                        <Link to="/shop?category=accessories" className="dropdown-link">Leather & Goods</Link>
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-tertiary)', marginBottom: 12 }}>
                        Curations
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                        <Link to="/collections/kayoo-archive" className="dropdown-link">KAYOO Core Archive</Link>
                        <Link to="/collections/underground-drift" className="dropdown-link">Underground Drift</Link>
                        <Link to="/collections/angkor-sanctuary" className="dropdown-link">Angkor Sanctuary</Link>
                        <Link to="/collections/hanuman-performance" className="dropdown-link">Hanuman Athletic</Link>
                        <Link to="/collections/lakeside-solitude" className="dropdown-link">Lakeside Solitude</Link>
                      </div>
                    </div>

                    {/* Featured Mini Promo in Dropdown */}
                    <div
                      style={{
                        backgroundColor: 'var(--bg-secondary)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        overflow: 'hidden',
                        position: 'relative'
                      }}
                    >
                      <div>
                        <span className="badge badge-gold" style={{ marginBottom: 8 }}>CORE DROP 2026</span>
                        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', lineHeight: 1.25, marginTop: 4 }}>
                          KAYOO Starburst Tee
                        </div>
                        <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                          320GSM custom combed cotton with electric lilac insignia.
                        </p>
                      </div>
                      <Link
                        to="/product/prod-kayoo-tee"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          color: 'var(--text-primary)',
                          marginTop: 12
                        }}
                      >
                        Discover Piece <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <NavLink to="/collections" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Collections
              </NavLink>
              <NavLink to="/lookbook" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Lookbook
              </NavLink>
              <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                About
              </NavLink>
              <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Concierge
              </NavLink>
            </nav>

            {/* Right: Actions (Search, Wishlist, Cart, Account, Admin Badge) */}
            <div className="nav-actions">
              {/* Search Trigger */}
              <button
                className="nav-icon-btn"
                onClick={onOpenSearch}
                aria-label="Search products"
                title="Search garments & collections (⌘K)"
              >
                <Search size={19} />
              </button>

              {/* Wishlist */}
              <Link to="/wishlist" className="nav-icon-btn" aria-label="View Wishlist" title="Saved Wishlist">
                <Heart size={19} />
                {wishlistCount > 0 && <span className="nav-badge-count">{wishlistCount}</span>}
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                className="nav-icon-btn"
                onClick={() => setIsCartOpen(true)}
                aria-label="View Cart"
                title="Shopping Bag"
              >
                <ShoppingBag size={19} />
                {totalItemsCount > 0 && <span className="nav-badge-count">{totalItemsCount}</span>}
              </button>

              {/* Account Link */}
              <Link
                to="/account"
                className="nav-icon-btn desktop-only"
                aria-label="Customer Account"
                title={isAuthenticated ? `Account: ${user.name}` : 'Sign In'}
              >
                <User size={19} />
              </Link>

              {/* Admin Portal Shortcut per Docx Spec */}
              <Link
                to="/admin"
                className="desktop-only"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-pill)',
                  border: '1px solid var(--border-medium)',
                  backgroundColor: 'var(--bg-surface)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--text-primary)',
                  transition: 'all 0.2s ease'
                }}
                title="Open Store Administration Dashboard"
              >
                <ShieldCheck size={14} color="var(--accent-gold)" />
                <span>Admin Demo</span>
              </Link>

              {/* Mobile Menu Button */}
              <button
                className="nav-icon-btn mobile-menu-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide-out Navigation Drawer */}
      {mobileMenuOpen && (
        <>
          <div className="drawer-backdrop" onClick={() => setMobileMenuOpen(false)} />
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              bottom: 0,
              width: '86%',
              maxWidth: '340px',
              height: '100dvh',
              maxHeight: '100dvh',
              backgroundColor: '#FFFFFF',
              zIndex: 1100,
              paddingTop: 'max(20px, env(safe-area-inset-top, 20px))',
              paddingBottom: 'max(24px, env(safe-area-inset-bottom, 24px))',
              paddingLeft: 'max(20px, env(safe-area-inset-left, 20px))',
              paddingRight: 'max(20px, env(safe-area-inset-right, 20px))',
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
              boxShadow: 'var(--shadow-drawer)',
              animation: 'slideInLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <div style={{ flex: '1 0 auto', paddingBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
                <div className="nav-logo">
                  <span className="nav-logo-text">KAYOO</span>
                  <span style={{ fontSize: '0.62rem', letterSpacing: '0.18em', color: 'var(--text-tertiary)', fontWeight: 800 }}>STUDIO</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="nav-icon-btn" aria-label="Close menu">
                  <X size={20} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <Link to="/shop" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                  All Pieces & Shop
                </Link>
                <Link to="/shop?gender=men" className="mobile-nav-sublink" onClick={() => setMobileMenuOpen(false)}>
                  ↳ Men's Streetwear
                </Link>
                <Link to="/shop?gender=women" className="mobile-nav-sublink" onClick={() => setMobileMenuOpen(false)}>
                  ↳ Women's Streetwear
                </Link>
                <Link to="/shop?gender=unisex" className="mobile-nav-sublink" onClick={() => setMobileMenuOpen(false)}>
                  ↳ Unisex Silhouettes
                </Link>
                <Link to="/shop?category=sale" className="mobile-nav-sublink" style={{ color: '#B91C1C' }} onClick={() => setMobileMenuOpen(false)}>
                  ↳ Archive Sale (-40%)
                </Link>
                <div style={{ height: 1, backgroundColor: 'var(--border-subtle)', margin: '8px 0' }} />
                <Link to="/collections" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                  Collections
                </Link>
                <Link to="/lookbook" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                  Lookbook & Outfits
                </Link>
                <Link to="/about" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                  Brand Story
                </Link>
                <Link to="/contact" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                  Concierge & Flagships
                </Link>
                <Link to="/track-order" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
                  Track Order
                </Link>
              </div>
            </div>

            <div style={{ flexShrink: 0, marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 16, borderTop: '1px solid var(--border-subtle)' }}>
              <Link
                to="/account"
                className="btn btn-secondary btn-sm"
                onClick={() => setMobileMenuOpen(false)}
                style={{ width: '100%', minHeight: 42 }}
              >
                <User size={15} /> Customer Account
              </Link>
              <Link
                to="/admin"
                className="btn btn-primary btn-sm"
                onClick={() => setMobileMenuOpen(false)}
                style={{ width: '100%', backgroundColor: 'var(--bg-dark)', minHeight: 42 }}
              >
                <ShieldCheck size={15} color="var(--accent-gold)" /> Admin Dashboard
              </Link>
            </div>
          </div>
        </>
      )}

      {/* Inline styles helper for responsive navbar */}
      <style>{`
        .dropdown-link {
          font-size: 0.85rem;
          color: var(--text-secondary);
          padding: 3px 0;
          transition: color 0.15s ease;
        }
        .dropdown-link:hover {
          color: var(--text-primary);
          font-weight: 500;
        }
        .mobile-nav-link {
          font-family: var(--font-display);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--text-primary);
          padding: 4px 0;
          touch-action: manipulation;
        }
        .mobile-nav-sublink {
          font-size: 0.9rem;
          color: var(--text-secondary);
          padding-left: 8px;
          padding-top: 2px;
          padding-bottom: 2px;
          touch-action: manipulation;
        }
        @media (max-width: 1060px) and (min-width: 901px) {
          .nav-links {
            gap: 18px !important;
          }
          .nav-link {
            font-size: 0.8rem !important;
          }
        }
        @media (max-width: 900px) {
          .desktop-only { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (min-width: 901px) {
          .mobile-menu-btn { display: none !important; }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
