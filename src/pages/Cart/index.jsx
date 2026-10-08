import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Truck,
  Tag,
  ShieldCheck,
  Check
} from 'lucide-react';

export default function Cart() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    discountAmount,
    shippingFee,
    taxAmount,
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

  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [loadingPromo, setLoadingPromo] = useState(false);

  const handleApplyCode = async (e) => {
    e.preventDefault();
    if (!promoCodeInput) return;
    setLoadingPromo(true);
    const res = await applyPromo(promoCodeInput);
    setLoadingPromo(false);
    if (res.success) {
      addToast(res.message, 'success');
      setPromoCodeInput('');
    } else {
      addToast(res.message, 'error');
    }
  };

  if (items.length === 0) {
    return (
      <div className="section text-center">
        <div className="container-narrow">
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: 'var(--bg-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}
          >
            <ShoppingBag size={32} color="var(--text-tertiary)" />
          </div>
          <h2 style={{ marginBottom: 12 }}>Your Shopping Bag is Empty</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '440px', margin: '0 auto 32px' }}>
            Discover our latest runway silhouettes cut from Italian virgin wool and 500GSM Japanese cotton.
          </p>
          <Link to="/shop" className="btn btn-primary">
            Explore All Creations <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="section-sm">
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: 36, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-tertiary)', marginBottom: 6 }}>
              Bag Overview
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)' }}>Shopping Bag ({items.reduce((s, i) => s + i.quantity, 0)})</h1>
          </div>
          <Link to="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            <ArrowLeft size={16} /> Continue Shopping
          </Link>
        </div>

        {/* Free Shipping Dynamic Bar */}
        <div
          style={{
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-sm)',
            padding: '16px 24px',
            marginBottom: 36,
            border: '1px solid var(--border-subtle)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.88rem', fontWeight: 600, marginBottom: 8 }}>
            <Truck size={18} color={freeShippingRemaining === 0 ? 'var(--accent-emerald)' : 'var(--accent-gold)'} />
            {freeShippingRemaining === 0 ? (
              <span style={{ color: 'var(--accent-emerald)' }}>
                Congratulations — You have unlocked <strong>Complimentary Worldwide Express Courier</strong>!
              </span>
            ) : (
              <span>
                Add <strong>${freeShippingRemaining.toFixed(2)} USD</strong> more to unlock Complimentary Worldwide Courier
              </span>
            )}
          </div>
          <div style={{ width: '100%', height: 6, backgroundColor: '#E0DDD7', borderRadius: 4, overflow: 'hidden' }}>
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

        {/* Cart Layout: Items Table (Left) + Order Summary (Right) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr',
            gap: 48,
            alignItems: 'flex-start'
          }}
          className="cart-page-grid"
        >
          {/* Left: Items List */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {items.map((item) => (
                <div
                  key={`${item.id}-${item.size}-${item.color}`}
                  style={{
                    display: 'flex',
                    gap: 20,
                    padding: '24px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)',
                    alignItems: 'center'
                  }}
                  className="cart-item-row"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: 90,
                      height: 115,
                      objectFit: 'cover',
                      borderRadius: 'var(--radius-xs)',
                      backgroundColor: 'var(--bg-secondary)',
                      flexShrink: 0
                    }}
                  />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <Link
                          to={`/product/${item.id}`}
                          style={{
                            fontSize: '1rem',
                            fontWeight: 700,
                            color: 'var(--text-primary)',
                            display: 'block',
                            marginBottom: 4
                          }}
                        >
                          {item.name}
                        </Link>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                          Size: <strong>{item.size}</strong> • Color: <strong>{item.color}</strong> • SKU: {item.sku}
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id, item.size, item.color)}
                        style={{ color: 'var(--text-tertiary)', padding: 6 }}
                        aria-label="Remove item"
                        title="Remove from bag"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 18 }}>
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          border: '1px solid var(--border-medium)',
                          borderRadius: 'var(--radius-pill)',
                          padding: '4px 10px'
                        }}
                      >
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                          style={{ padding: '0 8px', fontSize: '1.1rem', fontWeight: 600 }}
                        >
                          -
                        </button>
                        <span style={{ fontSize: '0.9rem', fontWeight: 700, minWidth: 24, textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                          style={{ padding: '0 8px', fontSize: '1.1rem', fontWeight: 600 }}
                        >
                          +
                        </button>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                        {item.quantity > 1 && (
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                            ${item.price} each
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Special Instructions / Gift Packaging */}
            <div style={{ marginTop: 24, padding: '20px 24px', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: 8 }}>
                Bespoke Packaging & Tailoring Notes
              </div>
              <textarea
                rows={2}
                value={orderNote}
                onChange={(e) => setOrderNote(e.target.value)}
                placeholder="Include custom ribbon monogramming or special delivery requirements..."
                className="form-textarea"
                style={{ fontSize: '0.82rem' }}
              />
            </div>
          </div>

          {/* Right: Order Summary */}
          <div
            style={{
              padding: '32px',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <h3 style={{ fontSize: '1.3rem', marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid var(--border-subtle)' }}>
              Order Summary
            </h3>

            {/* Price lines */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Bag Subtotal</span>
                <span style={{ fontWeight: 600 }}>${subtotal.toFixed(2)}</span>
              </div>

              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#B91C1C' }}>
                  <span>Discount ({appliedPromo.code})</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Express Courier Shipping</span>
                <span style={{ fontWeight: 600 }}>
                  {shippingFee === 0 ? 'Complimentary' : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Estimated Sales Tax (8%)</span>
                <span>${taxAmount.toFixed(2)}</span>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1.3rem',
                  fontWeight: 800,
                  paddingTop: 16,
                  borderTop: '1px solid var(--border-medium)',
                  marginTop: 6
                }}
              >
                <span>Total Amount</span>
                <span>${totalAmount.toFixed(2)} USD</span>
              </div>
            </div>

            {/* Promo Code Box */}
            <div style={{ marginBottom: 24 }}>
              {appliedPromo ? (
                <div
                  style={{
                    backgroundColor: 'rgba(197, 160, 89, 0.12)',
                    border: '1px dashed var(--accent-gold)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.85rem' }}>
                    <Tag size={16} color="var(--accent-gold-dark)" />
                    <span>
                      Promo <strong>{appliedPromo.code}</strong> applied
                    </span>
                  </div>
                  <button onClick={removePromo} style={{ color: '#B91C1C', fontSize: '0.78rem', fontWeight: 700 }}>
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCode} style={{ display: 'flex', gap: 8 }}>
                  <input
                    type="text"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value.toUpperCase())}
                    placeholder="Promo code (e.g. KAYOO10)"
                    className="form-input"
                    style={{ flex: 1, padding: '10px 14px', fontSize: '0.85rem' }}
                  />
                  <button
                    type="submit"
                    disabled={loadingPromo}
                    className="btn btn-secondary btn-sm"
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Checkout Action */}
            <button
              onClick={() => navigate('/checkout')}
              className="btn btn-primary"
              style={{ width: '100%', padding: '16px', fontSize: '0.95rem' }}
            >
              Proceed to Checkout <ArrowRight size={18} />
            </button>

            <div style={{ marginTop: 20, textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <ShieldCheck size={14} color="var(--accent-gold)" /> 256-bit encrypted checkout • DDP All duties included
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .cart-page-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
        @media (max-width: 600px) {
          .cart-item-row {
            padding: 16px !important;
            gap: 14px !important;
            align-items: flex-start !important;
          }
          .cart-item-row img {
            width: 76px !important;
            height: 98px !important;
          }
        }
      `}</style>
    </div>
  );
}
