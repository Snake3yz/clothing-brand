import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { createOrder } from '@/services/productService';
import { getAssetUrl } from '@/utils/assetUrl';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  ArrowRight,
  ArrowLeft,
  Lock,
  Tag,
  CheckCircle2,
  Apple
} from 'lucide-react';

export default function Checkout() {
  const {
    items,
    subtotal,
    discountAmount,
    shippingFee,
    taxAmount,
    totalAmount,
    appliedPromo,
    clearCart,
    orderNote
  } = useCart();

  const { user } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    email: user?.email || 'elena.vance@studio.com',
    phone: user?.phone || '+1 (555) 234-8901',
    firstName: 'Elena',
    lastName: 'Vance',
    address: '450 West 14th Street',
    apartment: 'Apt 8B',
    city: 'New York',
    state: 'NY',
    postalCode: '10014',
    country: 'United States',
    shippingMethod: 'express', // 'express' | 'overnight'
    paymentMethod: 'card', // 'card' | 'apple' | 'paypal' | 'klarna'
    cardNumber: '•••• •••• •••• 4092',
    cardExpiry: '09/28',
    cardCvc: '•••'
  });

  const [isProcessing, setIsProcessing] = useState(false);

  if (items.length === 0) {
    return (
      <div className="section text-center">
        <h2>Your Shopping Bag is Empty</h2>
        <p style={{ margin: '16px 0 24px', color: 'var(--text-secondary)' }}>
          Please add creations to your shopping bag before proceeding to checkout.
        </p>
        <Link to="/shop" className="btn btn-primary">
          Discover All Creations
        </Link>
      </div>
    );
  }

  const deliveryCost = formData.shippingMethod === 'overnight' ? 35 : shippingFee;
  const finalGrandTotal = Number((subtotal - discountAmount + deliveryCost + taxAmount).toFixed(2));

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const orderPayload = {
        items,
        shippingAddress: {
          fullName: `${formData.firstName} ${formData.lastName}`,
          address1: `${formData.address} ${formData.apartment}`,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country
        },
        subtotal,
        discount: discountAmount,
        shippingFee: deliveryCost,
        tax: taxAmount,
        total: finalGrandTotal,
        paymentMethod:
          formData.paymentMethod === 'card'
            ? 'Mastercard ending in 4092'
            : formData.paymentMethod === 'apple'
            ? 'Apple Pay'
            : formData.paymentMethod === 'klarna'
            ? 'Klarna Pay in 4'
            : 'PayPal Express',
        orderNote
      };

      const placedOrder = await createOrder(orderPayload);
      clearCart();
      setIsProcessing(false);
      addToast('Order confirmed! Transmitting tracking telemetry...', 'success');
      navigate(`/order-confirmation?orderId=${placedOrder.orderNumber}`);
    } catch {
      setIsProcessing(false);
      addToast('Encountered an issue placing demo order.', 'error');
    }
  };

  return (
    <div className="section-sm" style={{ backgroundColor: 'var(--bg-secondary)', minHeight: '100vh' }}>
      <div className="container">
        {/* Navigation Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 36 }}>
          <Link to="/cart" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            <ArrowLeft size={16} /> Return to Shopping Bag
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
            <Lock size={14} color="var(--accent-gold)" /> 256-Bit Encrypted KAYOO Studio Checkout
          </div>
        </div>

        {/* Checkout Dual Layout: Form (Left) + Order Summary Sidebar (Right) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.35fr 1fr',
            gap: 48,
            alignItems: 'flex-start'
          }}
          className="checkout-grid"
        >
          {/* LEFT: Checkout Form Steps */}
          <form onSubmit={handlePlaceOrder} style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {/* Express Checkout Demo */}
            <div style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-tertiary)', marginBottom: 12, fontWeight: 700 }}>
                Instant Express Checkout
              </div>
              <div className="checkout-express-btns" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'apple' })}
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-pill)',
                    backgroundColor: '#000',
                    color: '#FFF',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6
                  }}
                >
                  <Apple size={16} /> Pay
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'paypal' })}
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-pill)',
                    backgroundColor: '#FFC439',
                    color: '#003087',
                    fontSize: '0.85rem',
                    fontWeight: 700
                  }}
                >
                  PayPal
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, paymentMethod: 'klarna' })}
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-pill)',
                    backgroundColor: '#FFB3C7',
                    color: '#000',
                    fontSize: '0.85rem',
                    fontWeight: 700
                  }}
                >
                  Klarna
                </button>
              </div>
              <div style={{ textAlign: 'center', margin: '16px 0 4px', fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                — Or continue with bespoke delivery details —
              </div>
            </div>

            {/* Step 1: Contact Information */}
            <div style={{ padding: 'clamp(20px, 4vw, 32px)', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: 20 }}>1. Contact Details</h3>
              <div className="checkout-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Mobile Phone (For Courier Updates) *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Destination Address */}
            <div style={{ padding: 'clamp(20px, 4vw, 32px)', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: 20 }}>2. Delivery Address</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div className="checkout-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label className="form-label">First Name *</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="form-input"
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">Last Name *</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label">Street Address *</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="House number and street name"
                    className="form-input"
                    required
                  />
                </div>

                <div className="checkout-three-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                  <div>
                    <label className="form-label">Apartment / Suite</label>
                    <input
                      type="text"
                      value={formData.apartment}
                      onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label className="form-label">City *</label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="form-input"
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">Postal / ZIP Code *</label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="checkout-two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label className="form-label">State / Province *</label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="form-input"
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">Country *</label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="form-select"
                    >
                      <option value="Cambodia">Cambodia (KAYOO Flagship Studio)</option>
                      <option value="United States">United States</option>
                      <option value="Japan">Japan (Tokyo Hub)</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="France">France</option>
                      <option value="Germany">Germany</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Courier Delivery Method */}
            <div style={{ padding: '32px', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: 20 }}>3. Courier Dispatch Method</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px',
                    borderRadius: 'var(--radius-sm)',
                    border: formData.shippingMethod === 'express' ? '2px solid var(--text-primary)' : '1px solid var(--border-medium)',
                    backgroundColor: formData.shippingMethod === 'express' ? 'var(--bg-secondary)' : '#FFF',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <input
                      type="radio"
                      name="shippingMethod"
                      checked={formData.shippingMethod === 'express'}
                      onChange={() => setFormData({ ...formData, shippingMethod: 'express' })}
                      style={{ accentColor: 'var(--bg-dark)' }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                        FedEx Priority International Courier
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                        Delivery in 2–3 business days • Tracked with signature
                      </div>
                    </div>
                  </div>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                    {shippingFee === 0 ? 'COMPLIMENTARY' : `$${shippingFee}`}
                  </span>
                </label>

                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px',
                    borderRadius: 'var(--radius-sm)',
                    border: formData.shippingMethod === 'overnight' ? '2px solid var(--text-primary)' : '1px solid var(--border-medium)',
                    backgroundColor: formData.shippingMethod === 'overnight' ? 'var(--bg-secondary)' : '#FFF',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <input
                      type="radio"
                      name="shippingMethod"
                      checked={formData.shippingMethod === 'overnight'}
                      onChange={() => setFormData({ ...formData, shippingMethod: 'overnight' })}
                      style={{ accentColor: 'var(--bg-dark)' }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                        KAYOO Priority Overnight / Grab Express Courier
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                        Same/next business day delivery • Custom luxury garment bag & stickers
                      </div>
                    </div>
                  </div>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>$35.00</span>
                </label>
              </div>
            </div>

            {/* Step 4: Payment Details */}
            <div style={{ padding: '32px', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 style={{ fontSize: '1.25rem', margin: 0 }}>4. Payment Verification</h3>
                <div style={{ display: 'flex', gap: 6 }}>
                  <span className="badge badge-outline">Mastercard</span>
                  <span className="badge badge-outline">Visa</span>
                  <span className="badge badge-outline">Amex</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label className="form-label">Cardholder Name *</label>
                  <input
                    type="text"
                    defaultValue="Elena Vance"
                    className="form-input"
                    required
                  />
                </div>

                <div>
                  <label className="form-label">Card Number *</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      defaultValue="5412 7500 8921 4092"
                      className="form-input"
                      required
                    />
                    <CreditCard size={18} color="var(--text-tertiary)" style={{ position: 'absolute', right: 14, top: 14 }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label className="form-label">Expiration Date *</label>
                    <input
                      type="text"
                      defaultValue="09/28"
                      className="form-input"
                      required
                    />
                  </div>
                  <div>
                    <label className="form-label">Security CVC *</label>
                    <input
                      type="password"
                      defaultValue="492"
                      className="form-input"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Place Order CTA Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="btn btn-primary btn-lg"
              style={{ padding: '20px', width: '100%', fontSize: '1rem', backgroundColor: 'var(--bg-dark)' }}
            >
              {isProcessing ? 'Processing KAYOO Security Check...' : `Place KAYOO Order • $${finalGrandTotal} USD`}
            </button>
          </form>

          {/* RIGHT: Order Summary Sidebar */}
          <div
            style={{
              padding: '32px',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              position: 'sticky',
              top: '100px'
            }}
          >
            <h3 style={{ fontSize: '1.2rem', marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid var(--border-subtle)' }}>
              In Your Bag ({items.reduce((s, i) => s + i.quantity, 0)})
            </h3>

            {/* Mini items list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxHeight: '340px', overflowY: 'auto', marginBottom: 20 }}>
              {items.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}`} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <img
                    src={getAssetUrl(item.image)}
                    alt={item.name}
                    style={{ width: 56, height: 72, objectFit: 'cover', borderRadius: 'var(--radius-xs)', backgroundColor: 'var(--bg-secondary)' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>{item.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      Size {item.size} • {item.color} • Qty {item.quantity}
                    </div>
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, borderTop: '1px solid var(--border-subtle)', paddingTop: 16, marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#B91C1C' }}>
                  <span>Promo Discount ({appliedPromo?.code})</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Courier Shipping</span>
                <span>{deliveryCost === 0 ? 'Complimentary' : `$${deliveryCost.toFixed(2)}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Sales & Import Tax (8%)</span>
                <span>${taxAmount.toFixed(2)}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  borderTop: '1px solid var(--border-medium)',
                  paddingTop: 14,
                  marginTop: 6
                }}
              >
                <span>Definitive Total</span>
                <span>${finalGrandTotal} USD</span>
              </div>
            </div>

            <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', lineHeight: 1.5, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <CheckCircle2 size={13} color="var(--accent-gold)" /> Delivered Duty Paid (DDP) — No additional import fees.
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <ShieldCheck size={13} color="var(--accent-gold)" /> 30-Day complimentary return privileges included.
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .checkout-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
        @media (max-width: 640px) {
          .checkout-three-col {
            grid-template-columns: 1fr !important;
          }
          .checkout-two-col {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 480px) {
          .checkout-express-btns {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
