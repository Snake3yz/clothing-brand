import React, { createContext, useContext, useState, useEffect } from 'react';
import { validatePromoCode } from '../services/productService';

const CartContext = createContext(null);

const FREE_SHIPPING_THRESHOLD = 150;
const STANDARD_SHIPPING_FEE = 15;
const TAX_RATE = 0.08; // 8%

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('kayoo_cart') || localStorage.getItem('aura_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        const valid = parsed.filter((item) => item.id && item.id.startsWith('prod-kayoo'));
        if (valid.length > 0) return valid;
      }
    } catch {
      // ignore
    }
    // Default initial cart items with authentic KAYOO creations
    return [
      {
        id: 'prod-kayoo-tee',
        name: 'KAYOO Starburst "Rock-On" Heavyweight Oversized Tee',
        sku: 'KY-TEE-001',
        price: 28,
        compareAtPrice: 38,
        color: 'Obsidian Black & Electric Lilac',
        size: 'L',
        quantity: 1,
        image: '/products/kayoo-tee-duo.jpeg',
        maxStock: 24
      },
      {
        id: 'prod-kayoo-jersey',
        name: 'KAYOO Official Athletic Jersey — "King of Hanuman"',
        sku: 'KY-JSY-002',
        price: 11.49,
        compareAtPrice: 15.00,
        color: 'Onyx Black & Electric Violet',
        size: 'M',
        quantity: 1,
        image: '/products/kayoo-jersey-hanuman.jpeg',
        maxStock: 35
      }
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [orderNote, setOrderNote] = useState('');
  const [currency] = useState({ code: 'USD', symbol: '$', rate: 1.0 });

  useEffect(() => {
    try {
      localStorage.setItem('kayoo_cart', JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const addToCart = (product, size, color, quantity = 1) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === product.id && item.size === size && item.color === color
      );

      const chosenColor = color || (product.colors && product.colors[0]?.name) || 'Standard';
      const chosenSize = size || (product.sizes && product.sizes[0]?.size) || 'M';
      const matchedSizeObj = product.sizes?.find((s) => s.size === chosenSize);
      const maxStock = matchedSizeObj ? matchedSizeObj.stock : product.stock || 10;

      if (existingIndex > -1) {
        const next = [...prev];
        const newQty = Math.min(next[existingIndex].quantity + quantity, maxStock);
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: newQty
        };
        return next;
      } else {
        const newItem = {
          id: product.id,
          name: product.name,
          sku: product.sku,
          price: product.price,
          compareAtPrice: product.compareAtPrice,
          color: chosenColor,
          size: chosenSize,
          quantity: Math.min(quantity, maxStock),
          image: product.images ? product.images[0] : '',
          maxStock
        };
        return [...prev, newItem];
      }
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (id, size, color) => {
    setItems((prev) => prev.filter((i) => !(i.id === id && i.size === size && i.color === color)));
  };

  const updateQuantity = (id, size, color, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id, size, color);
      return;
    }
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id && item.size === size && item.color === color) {
          const clamped = Math.min(newQty, item.maxStock || 20);
          return { ...item, quantity: clamped };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedPromo(null);
  };

  const applyPromo = async (code) => {
    const result = await validatePromoCode(code);
    if (result.valid) {
      setAppliedPromo(result);
      return { success: true, message: `Promo code ${result.code} applied successfully!` };
    }
    return { success: false, message: result.message || 'Invalid promotional code.' };
  };

  const removePromo = () => {
    setAppliedPromo(null);
  };

  // Computations
  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let discountAmount = 0;
  if (appliedPromo && appliedPromo.discountPercent) {
    discountAmount = (subtotal * appliedPromo.discountPercent) / 100;
  }

  const shippingFee =
    subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD || appliedPromo?.freeShipping
      ? 0
      : STANDARD_SHIPPING_FEE;

  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const taxAmount = Number((taxableAmount * TAX_RATE).toFixed(2));
  const totalAmount = Number((taxableAmount + shippingFee + taxAmount).toFixed(2));

  return (
    <CartContext.Provider
      value={{
        items,
        totalItemsCount,
        subtotal,
        discountAmount,
        shippingFee,
        taxAmount,
        totalAmount,
        freeShippingRemaining,
        freeShippingProgress,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        appliedPromo,
        orderNote,
        setOrderNote,
        currency,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyPromo,
        removePromo
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
