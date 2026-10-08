import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import {
  X,
  ShoppingBag,
  Trash2,
  ArrowRight,
  Truck,
  Tag,
  Check,
  ShieldCheck
} from 'lucide-react';
import { getAssetUrl } from '@/utils/assetUrl';

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    shippingFee,
    totalAmount,
    freeShippingRemaining,
    freeShippingProgress,
    appliedPromo,
    applyPromo,
    removePromo,
    orderNote,
    setOrderNote
  } = useCart();

  const { addToast } = useToast();
  const navigate = useNavigate();

  const [promoInput, setPromoInput] = useState('');
  const [promoLoading, setPromoLoading] = useState(false);
  const [showNoteField, setShowNoteField] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyPromo = async (e) => {
    e.preventDefault();
    if (!promoInput) return;
    setPromoLoading(true);
    const result = await applyPromo(promoInput);
    setPromoLoading(false);
    if (result.success) {
      addToast(result.message, 'success');
      setPromoInput('');
    } else {
      addToast(result.message, 'error');
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <>
      <div className="drawer-backdrop" onClick={() => setIsCartOpen(false)} />
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          height: '100dvh',
          width: '100%',
          maxWidth: 'min(460px, 100vw)',
          backgroundColor: '#FFFFFF',
          zIndex: 1100,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-drawer)',
          animation: 'slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: 'max(20px, env(safe-area-inset-top, 20px)) clamp(16px, 3vw, 24px) 18px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ShoppingBag size={20} />
            <h4 style={{ fontSize: '1.1rem', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Shopping Bag ({items.reduce((s, i) => s + i.quantity, 0)})
            </h4>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="nav-icon-btn"
            aria-label="Close cart drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Dynamic Progress Meter */}
        <div style={{ padding: '14px 24px', backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', marginBottom: 8, fontWeight: 600 }}>
            <Truck size={16} color={freeShippingRemaining === 0 ? 'var(--accent-emerald)' : 'var(--accent-gold)'} />
            {freeShippingRemaining === 0 ? (
              <span style={{ color: 'var(--accent-emerald)' }}>
                You have unlocked <strong>Complimentary Worldwide Courier</strong>!
              </span>
            ) : (
              <span>
                Add <strong>${freeShippingRemaining.toFixed(2)}</strong> more for Complimentary Courier
              </span>
            )}
          </div>
          <div
            style={{
              width: '100%',
              height: 5,
              backgroundColor: '#E4DFD5',
              borderRadius: 4,
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                width: `${freeShippingProgress}%`,
                height: '100%',
                backgroundColor: freeShippingRemaining === 0 ? 'var(--accent-emerald)' : 'var(--accent-gold)',
                transition: 'width 0.4s ease'
              }}
            />
          </div>
        </div>

        {/* Items List */}
        <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch', padding: '20px clamp(16px, 3vw, 24px)' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px'
                }}
              >
                <ShoppingBag size={24} color="var(--text-tertiary)" />
              </div>
              <h5 style={{ marginBottom: 6 }}>Your shopping bag is empty</h5>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: 20 }}>
                Explore our latest architectural runway silhouettes.
              </p>
              <Link
                to="/shop"
                className="btn btn-primary btn-sm"
                onClick={() => setIsCartOpen(false)}
              >
                Explore New Season
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.size}-${item.color}`}
                  style={{
                    display: 'flex',
                    gap: 14,
                    paddingBottom: 16,
                    borderBottom: '1px solid var(--border-subtle)'
                  }}
                >
                  <img
                    src={getAssetUrl(item.image)}
                    alt={item.name}
                    style={{
                      width: 76,
                      height: 98,
                      objectFit: 'cover',
                      borderRadius: 'var(--radius-xs)',
                      backgroundColor: 'var(--bg-secondary)'
                    }}
                  />

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Link
                          to={`/product/${item.id}`}
                          onClick={() => setIsCartOpen(false)}
                          style={{
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            lineHeight: 1.3,
                            color: 'var(--text-primary)',
                            maxWidth: '220px'
                          }}
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.id, item.size, item.color)}
                          style={{ color: 'var(--text-tertiary)', padding: 4 }}
                          aria-label="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                        Size: <strong>{item.size}</strong> • Color: <strong>{item.color}</strong>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          border: '1px solid var(--border-medium)',
                          borderRadius: 'var(--radius-pill)',
                          padding: '2px 8px'
                        }}
                      >
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                          style={{ padding: '0 6px', fontSize: '1rem', fontWeight: 600 }}
                        >
                          -
                        </button>
                        <span style={{ fontSize: '0.82rem', fontWeight: 600, minWidth: 20, textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                          style={{ padding: '0 6px', fontSize: '1rem', fontWeight: 600 }}
                        >
                          +
                        </button>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.92rem', fontWeight: 700 }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Promo Code Entry */}
              <div style={{ marginTop: 8 }}>
                {appliedPromo ? (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      backgroundColor: 'rgba(197, 160, 89, 0.12)',
                      border: '1px dashed var(--accent-gold)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '10px 14px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.82rem' }}>
                      <Tag size={16} color="var(--accent-gold-dark)" />
                      <span>
                        Code <strong>{appliedPromo.code}</strong> applied ({appliedPromo.description})
                      </span>
                    </div>
                    <button
                      onClick={removePromo}
                      style={{ fontSize: '0.75rem', color: '#B91C1C', fontWeight: 600 }}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: 8 }}>
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                      placeholder="Promo code (e.g. KAYOO10)"
                      style={{
                        flex: 1,
                        padding: '10px 14px',
                        border: '1px solid var(--border-medium)',
                        borderRadius: 'var(--radius-pill)',
                        fontSize: '0.82rem'
                      }}
                    />
                    <button
                      type="submit"
                      disabled={promoLoading}
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '8px 16px' }}
                    >
                      Apply
                    </button>
                  </form>
                )}
              </div>

              {/* Order Gift Note Toggle */}
              <div>
                <button
                  onClick={() => setShowNoteField(!showNoteField)}
                  style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', textDecoration: 'underline' }}
                >
                  {showNoteField ? 'Hide gift note / order request' : '+ Add gift note or tailoring request'}
                </button>
                {showNoteField && (
                  <textarea
                    rows={2}
                    value={orderNote}
                    onChange={(e) => setOrderNote(e.target.value)}
                    placeholder="Enter bespoke packaging or delivery instructions..."
                    style={{
                      width: '100%',
                      marginTop: 8,
                      padding: '10px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-medium)',
                      fontSize: '0.82rem'
                    }}
                  />
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {items.length > 0 && (
          <div
            style={{
              padding: '16px clamp(16px, 3vw, 24px) max(20px, env(safe-area-inset-bottom, 20px))',
              borderTop: '1px solid var(--border-subtle)',
              backgroundColor: 'var(--bg-primary)'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#B91C1C' }}>
                  <span>Discount ({appliedPromo.code})</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Courier Shipping</span>
                <span>{shippingFee === 0 ? 'Complimentary' : `$${shippingFee.toFixed(2)}`}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  paddingTop: 8,
                  borderTop: '1px solid var(--border-medium)',
                  marginTop: 4
                }}
              >
                <span>Estimated Total</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button
                className="btn btn-primary"
                onClick={handleCheckout}
                style={{ width: '100%', padding: '16px' }}
              >
                Proceed to Checkout <ArrowRight size={16} />
              </button>
              <Link
                to="/cart"
                className="btn btn-secondary btn-sm"
                onClick={() => setIsCartOpen(false)}
                style={{ width: '100%' }}
              >
                View Full Shopping Bag
              </Link>
            </div>

            <div style={{ textAlign: 'center', marginTop: 12, fontSize: '0.72rem', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
              <ShieldCheck size={13} color="var(--accent-gold)" /> Encrypted 256-bit checkout • DDP All taxes included
            </div>
          </div>
        )}
      </div>
    </>
  );
}
