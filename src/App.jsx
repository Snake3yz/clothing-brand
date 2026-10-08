import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Providers
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

// Layout Components
import { Navbar, Footer } from './components/layout';

// Common Components
import { CartDrawer, SearchModal, Toast } from './components/common';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Collections from './pages/Collections';
import CollectionDetails from './pages/CollectionDetails';
import Lookbook from './pages/Lookbook';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import TrackOrder from './pages/TrackOrder';
import Account from './pages/Account';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PageTitleManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/') {
      document.title = 'KAYOO | Kampuchea Aspire Youth Original Outfit — Streetwear Archive';
    } else if (pathname.startsWith('/shop')) {
      document.title = 'Shop Archive | KAYOO STUDIO';
    } else if (pathname.startsWith('/product/')) {
      document.title = 'Creation Details | KAYOO STUDIO';
    } else if (pathname.startsWith('/collections')) {
      document.title = 'Collections & Capsules | KAYOO STUDIO';
    } else if (pathname.startsWith('/lookbook')) {
      document.title = 'Runway Lookbook | KAYOO STUDIO';
    } else if (pathname.startsWith('/about')) {
      document.title = 'Brand Manifesto & Heritage | KAYOO STUDIO';
    } else if (pathname.startsWith('/contact')) {
      document.title = 'Studio & Concierge | KAYOO STUDIO';
    } else if (pathname.startsWith('/cart')) {
      document.title = 'Shopping Bag | KAYOO STUDIO';
    } else if (pathname.startsWith('/checkout')) {
      document.title = 'Secure Studio Checkout | KAYOO STUDIO';
    } else if (pathname.startsWith('/track-order')) {
      document.title = 'Track Order | KAYOO STUDIO';
    } else if (pathname.startsWith('/account')) {
      document.title = 'My Account & Syndicate | KAYOO STUDIO';
    } else if (pathname.startsWith('/admin')) {
      document.title = 'KAYOO STUDIO COMMAND CENTER';
    } else {
      document.title = 'KAYOO STUDIO — Streetwear Archive';
    }
  }, [pathname]);

  return null;
}

function MainLayout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const isCheckout = location.pathname.startsWith('/checkout');

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Global Command+K keyboard listener for search modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ScrollToTop />
      <PageTitleManager />

      {/* Render Navbar on all non-admin pages */}
      {!isAdmin && <Navbar onOpenSearch={() => setIsSearchOpen(true)} />}

      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/:id" element={<CollectionDetails />} />
          <Route path="/lookbook" element={<Lookbook />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/track-order" element={<TrackOrder />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/orders" element={<Account />} />
          <Route path="/account/wishlist" element={<Account />} />
          <Route path="/wishlist" element={<Account />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {/* Render Footer on storefront pages (excluding admin & checkout distraction-free flow) */}
      {!isAdmin && !isCheckout && <Footer />}

      {/* Global Overlays & Notifications */}
      <CartDrawer />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <ToastProvider>
            <Router>
              <MainLayout />
            </Router>
          </ToastProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}
