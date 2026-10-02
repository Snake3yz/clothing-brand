import React, { createContext, useContext, useState, useEffect } from 'react';
import { getActiveProducts } from '../services/productService';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlistIds, setWishlistIds] = useState(() => {
    try {
      const saved = localStorage.getItem('kayoo_wishlist') || localStorage.getItem('aura_wishlist');
      if (saved) {
        const parsed = JSON.parse(saved);
        const valid = parsed.filter((id) => typeof id === 'string' && id.startsWith('prod-kayoo'));
        if (valid.length > 0) return valid;
      }
    } catch {
      // ignore
    }
    return ['prod-kayoo-tee', 'prod-kayoo-jersey', 'prod-kayoo-joggers']; // Sample wishlist items
  });

  const [allProducts, setAllProducts] = useState(getActiveProducts);

  useEffect(() => {
    const handleProductsUpdated = () => {
      setAllProducts(getActiveProducts());
    };
    window.addEventListener('kayoo:products_updated', handleProductsUpdated);
    window.addEventListener('storage', handleProductsUpdated);
    return () => {
      window.removeEventListener('kayoo:products_updated', handleProductsUpdated);
      window.removeEventListener('storage', handleProductsUpdated);
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('kayoo_wishlist', JSON.stringify(wishlistIds));
    } catch {
      // ignore
    }
  }, [wishlistIds]);

  const toggleWishlist = (productId) => {
    setWishlistIds((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId) => wishlistIds.includes(productId);

  const removeFromWishlist = (productId) => {
    setWishlistIds((prev) => prev.filter((id) => id !== productId));
  };

  const clearWishlist = () => setWishlistIds([]);

  // Hydrate full products from active inventory
  const wishlistProducts = allProducts.filter((p) => wishlistIds.includes(p.id));

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistProducts,
        wishlistCount: wishlistIds.length,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        clearWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
