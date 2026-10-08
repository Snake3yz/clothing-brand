import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { MOCK_ORDERS } from '@/data/mockData';
import { getAssetUrl } from '@/utils/assetUrl';
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  CreditCard,
  LogOut,
  LogIn,
  Package,
  ArrowRight,
  Trash2,
  Plus,
  Eye,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  X
} from 'lucide-react';

export default function Account() {
  const location = useLocation();
  const { user, isAuthenticated, login, logout, updateProfile, addAddress } = useAuth();
  const { wishlistProducts, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { addToast } = useToast();

  // Determine active tab from URL or state
  const queryTab = location.pathname.includes('orders')
    ? 'orders'
    : location.pathname.includes('wishlist')
    ? 'wishlist'
    : 'profile';

  const [activeTab, setActiveTab] = useState(queryTab);
  const [selectedOrderReceipt, setSelectedOrderReceipt] = useState(null);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);

  // Address Form state
  const [newAddr, setNewAddr] = useState({
    fullName: '',
    address1: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States'
  });

  const handleMoveToCart = (prod) => {
    const size = prod.sizes?.[0]?.size || 'M';
    const color = prod.colors?.[0]?.name || 'Standard';
    addToCart(prod, size, color, 1);
    removeFromWishlist(prod.id);
    addToast(`Moved "${prod.name}" to shopping bag`, 'success');
  };

  const handleAddAddressSubmit = (e) => {
    e.preventDefault();
    if (!newAddr.fullName || !newAddr.address1) return;
    addAddress(newAddr);
    setShowAddAddressModal(false);
    addToast('New delivery residence saved to your profile.', 'success');
  };

  return (
    <div className="section-sm">
      <div className="container">
        {/* User VIP Hero Banner */}
        <div
          style={{
            backgroundColor: 'var(--bg-dark)',
            color: '#FFFFFF',
            borderRadius: 'var(--radius-md)',
            padding: 'clamp(20px, 4vw, 40px)',
            marginBottom: 40,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 24
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                backgroundColor: 'var(--accent-gold-dark)',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.8rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                border: '3px solid rgba(255,255,255,0.2)'
              }}
            >
              {isAuthenticated ? user.name.charAt(0) : 'G'}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span className="badge badge-gold">{isAuthenticated ? user.loyaltyTier : 'Guest Patron'}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-inverse-muted)' }}>
                  Member since {user.memberSince}
                </span>
              </div>
              <h2 style={{ color: '#FFFFFF', fontSize: '1.8rem', margin: 0 }}>
                {isAuthenticated ? user.name : 'Welcome, KAYOO Collector'}
              </h2>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-inverse-muted)', marginTop: 4 }}>
                {isAuthenticated ? user.email : 'Sign in to access order history and Syndicate rewards'}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {isAuthenticated ? (
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-gold)' }}>
                  KAYOO Points
                </div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800 }}>{user.points} PTS</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-inverse-muted)' }}>
                  520 pts to VIP Syndicate Drop Access
                </div>
              </div>
            ) : (
              <button onClick={() => login()} className="btn btn-white">
                <LogIn size={15} /> Sign In to Demo Account
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid var(--border-subtle)',
            marginBottom: 36,
            gap: 28,
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            paddingBottom: 2
          }}
        >
          {[
            { id: 'profile', label: 'Client Profile', icon: User },
            { id: 'orders', label: `Order History (${MOCK_ORDERS.length})`, icon: Package },
            { id: 'wishlist', label: `Saved Wishlist (${wishlistProducts.length})`, icon: Heart },
            { id: 'addresses', label: 'Residences & Addresses', icon: MapPin },
            { id: 'payments', label: 'Payment Methods', icon: CreditCard }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px 4px',
                  borderBottom: isActive ? '2px solid var(--text-primary)' : '2px solid transparent',
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: Profile Tab */}
        {activeTab === 'profile' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 40 }} className="account-split-grid">
            <div style={{ backgroundColor: '#FFFFFF', padding: '32px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: 20 }}>Personal Information</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label className="form-label">Full Name</label>
                  <input type="text" defaultValue={user.name} className="form-input" />
                </div>
                <div>
                  <label className="form-label">Email Address</label>
                  <input type="email" defaultValue={user.email} className="form-input" />
                </div>
                <div>
                  <label className="form-label">Contact Phone</label>
                  <input type="tel" defaultValue={user.phone} className="form-input" />
                </div>
                <button
                  type="button"
                  onClick={() => addToast('Profile changes saved.', 'success')}
                  className="btn btn-primary"
                  style={{ alignSelf: 'flex-start', marginTop: 10 }}
                >
                  Save Profile Changes
                </button>
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '32px', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ marginBottom: 12 }}>Tier II Privileges</h4>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <CheckCircle2 size={16} color="var(--accent-gold)" /> 24-Hour early access to seasonal runway drops
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <CheckCircle2 size={16} color="var(--accent-gold)" /> Private appointment privileges in Milan & Tokyo
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <CheckCircle2 size={16} color="var(--accent-gold)" /> Complimentary bespoke hem and sleeve adjustments
                  </li>
                </ul>
              </div>

              <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--border-subtle)' }}>
                {isAuthenticated ? (
                  <button
                    onClick={() => {
                      logout();
                      addToast('Logged out of demo account.', 'info');
                    }}
                    className="btn btn-secondary btn-sm"
                    style={{ color: '#B91C1C' }}
                  >
                    <LogOut size={14} /> Sign Out of Account
                  </button>
                ) : (
                  <button onClick={() => login()} className="btn btn-primary btn-sm">
                    <LogIn size={14} /> Sign In
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Orders Tab */}
        {activeTab === 'orders' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {MOCK_ORDERS.map((order) => (
              <div
                key={order.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  padding: '28px',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16, paddingBottom: 18, borderBottom: '1px solid var(--border-subtle)', marginBottom: 20 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <h4 style={{ fontSize: '1.15rem', margin: 0 }}>Order {order.orderNumber}</h4>
                      <span className={`badge ${order.status === 'Delivered' ? 'badge-status-delivered' : 'badge-status-transit'}`}>
                        {order.status}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                      Placed on {order.date} • Courier: {order.carrier}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <button
                      onClick={() => setSelectedOrderReceipt(order)}
                      className="btn btn-secondary btn-sm"
                    >
                      <Eye size={14} /> View Invoice
                    </button>
                    <Link to={`/track-order?order=${order.orderNumber}`} className="btn btn-primary btn-sm">
                      Track Live <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>

                {/* Items in order */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
                  {order.items.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <img
                        src={getAssetUrl(item.image)}
                        alt={item.name}
                        style={{ width: 56, height: 72, objectFit: 'cover', borderRadius: 'var(--radius-xs)', backgroundColor: 'var(--bg-secondary)' }}
                      />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>{item.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                          Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
                        </div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, marginTop: 2 }}>
                          ${item.price} USD
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: Wishlist Tab */}
        {activeTab === 'wishlist' && (
          <div>
            {wishlistProducts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)' }}>
                <Heart size={36} color="var(--text-tertiary)" style={{ margin: '0 auto 12px' }} />
                <h4>Your Wishlist is Empty</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: '8px 0 20px' }}>
                  Explore creations and tap the heart icon to save garments to your personal wishlist.
                </p>
                <Link to="/shop" className="btn btn-primary btn-sm">
                  Browse Creations
                </Link>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
                {wishlistProducts.map((prod) => (
                  <div
                    key={prod.id}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: 'var(--radius-sm)',
                      overflow: 'hidden',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '3 / 4' }}>
                      <img src={getAssetUrl(prod.images?.[0])} alt={prod.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <button
                        onClick={() => removeFromWishlist(prod.id)}
                        style={{
                          position: 'absolute',
                          top: 10,
                          right: 10,
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          backgroundColor: '#FFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#B91C1C'
                        }}
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-tertiary)' }}>
                          {prod.category}
                        </div>
                        <h4 style={{ fontSize: '0.95rem', margin: '4px 0 8px' }}>{prod.name}</h4>
                        <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
                          ${prod.price} USD
                        </div>
                      </div>

                      <button
                        onClick={() => handleMoveToCart(prod)}
                        className="btn btn-primary btn-sm"
                        style={{ marginTop: 16, width: '100%' }}
                      >
                        <ShoppingBag size={14} /> Move to Bag
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: Addresses Tab */}
        {activeTab === 'addresses' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3>Saved Residences</h3>
              <button
                onClick={() => setShowAddAddressModal(true)}
                className="btn btn-secondary btn-sm"
              >
                <Plus size={14} /> Add Residence
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
              <div style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-sm)', border: '2px solid var(--text-primary)', position: 'relative' }}>
                <span className="badge badge-dark" style={{ position: 'absolute', top: 16, right: 16 }}>DEFAULT</span>
                <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 6 }}>{user.defaultAddress?.fullName}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {user.defaultAddress?.address1}<br />
                  {user.defaultAddress?.city}, {user.defaultAddress?.state} {user.defaultAddress?.postalCode}<br />
                  {user.defaultAddress?.country}
                </div>
              </div>

              {/* Show any added extra addresses */}
              {user.addresses?.map((addr, i) => (
                <div key={i} style={{ padding: '24px', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-medium)' }}>
                  <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 6 }}>{addr.fullName}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {addr.address1}<br />
                    {addr.city}, {addr.state} {addr.postalCode}<br />
                    {addr.country}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: Payment Methods Tab */}
        {activeTab === 'payments' && (
          <div>
            <h3 style={{ marginBottom: 20 }}>Verified Payment Methods</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
              {user.savedCards?.map((card) => (
                <div
                  key={card.id}
                  style={{
                    padding: '24px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: 'var(--radius-sm)',
                    border: card.default ? '2px solid var(--text-primary)' : '1px solid var(--border-medium)',
                    position: 'relative'
                  }}
                >
                  {card.default && (
                    <span className="badge badge-dark" style={{ position: 'absolute', top: 16, right: 16 }}>
                      PRIMARY
                    </span>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <CreditCard size={20} color="var(--accent-gold)" />
                    <span style={{ fontWeight: 700 }}>{card.brand}</span>
                  </div>
                  <div style={{ fontFamily: 'monospace', fontSize: '1.1rem', letterSpacing: '0.1em', marginBottom: 8 }}>
                    •••• •••• •••• {card.last4}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    Expires {card.exp}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Order Receipt Modal */}
      {selectedOrderReceipt && (
        <>
          <div className="drawer-backdrop" onClick={() => setSelectedOrderReceipt(null)} />
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '92%',
              maxWidth: '600px',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-modal)',
              zIndex: 1300,
              padding: 'clamp(20px, 4vw, 36px)',
              animation: 'fadeIn 0.2s ease',
              maxHeight: 'min(90vh, 90dvh)',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div>
                <h3 style={{ margin: 0 }}>KAYOO Invoice Receipt</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>{selectedOrderReceipt.orderNumber} • {selectedOrderReceipt.date}</span>
              </div>
              <button onClick={() => setSelectedOrderReceipt(null)} className="nav-icon-btn">
                <X size={18} />
              </button>
            </div>

            <div style={{ borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', padding: '16px 0', margin: '16px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {selectedOrderReceipt.items.map((it, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                  <span>{it.quantity}x {it.name} ({it.size}, {it.color})</span>
                  <strong>${(it.price * it.quantity).toFixed(2)}</strong>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
                <span>${selectedOrderReceipt.subtotal.toFixed(2)}</span>
              </div>
              {selectedOrderReceipt.discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#B91C1C' }}>
                  <span>Promotional Discount</span>
                  <span>-${selectedOrderReceipt.discount.toFixed(2)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Courier Shipping</span>
                <span>{selectedOrderReceipt.shippingFee === 0 ? 'Complimentary' : `$${selectedOrderReceipt.shippingFee.toFixed(2)}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 800, borderTop: '1px solid var(--border-medium)', paddingTop: 10 }}>
                <span>Total Paid</span>
                <span>${selectedOrderReceipt.total.toFixed(2)} USD</span>
              </div>
            </div>

            <div style={{ marginTop: 24, textAlign: 'center' }}>
              <button onClick={() => setSelectedOrderReceipt(null)} className="btn btn-primary" style={{ width: '100%' }}>
                Close Receipt
              </button>
            </div>
          </div>
        </>
      )}

      {/* Add Address Modal */}
      {showAddAddressModal && (
        <>
          <div className="drawer-backdrop" onClick={() => setShowAddAddressModal(false)} />
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '92%',
              maxWidth: '500px',
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-modal)',
              zIndex: 1300,
              padding: 'clamp(20px, 4vw, 32px)',
              maxHeight: 'min(90vh, 90dvh)',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
              animation: 'fadeIn 0.2s ease'
            }}
          >
            <h3 style={{ marginBottom: 16 }}>Add New Residence</h3>
            <form onSubmit={handleAddAddressSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  value={newAddr.fullName}
                  onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                  className="form-input"
                  required
                />
              </div>
              <div>
                <label className="form-label">Street Address</label>
                <input
                  type="text"
                  value={newAddr.address1}
                  onChange={(e) => setNewAddr({ ...newAddr, address1: e.target.value })}
                  className="form-input"
                  required
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    value={newAddr.city}
                    onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label className="form-label">Postal Code</label>
                  <input
                    type="text"
                    value={newAddr.postalCode}
                    onChange={(e) => setNewAddr({ ...newAddr, postalCode: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                <button type="button" onClick={() => setShowAddAddressModal(false)} className="btn btn-secondary" style={{ flex: 1 }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      <style>{`
        @media (max-width: 768px) {
          .account-split-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
