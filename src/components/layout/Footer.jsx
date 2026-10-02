import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '@/context/ToastContext';
import { ArrowRight, ShieldCheck, RefreshCw, Truck, Award, Check } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { addToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid email address.', 'error');
      return;
    }
    setSubscribed(true);
    addToast('Welcome to the KAYOO Circle. Your exclusive 10% code is "KAYOO10".', 'success');
  };

  return (
    <footer style={{ backgroundColor: 'var(--bg-dark)', color: 'var(--text-inverse)', borderTop: '1px solid var(--border-dark)' }}>
      {/* Brand Value Props Strip */}
      <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', padding: '36px 0' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '24px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <Truck size={22} color="var(--accent-gold)" />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.04em' }}>Express Courier</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-inverse-muted)' }}>Same-day in Phnom Penh • Worldwide shipping</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <RefreshCw size={22} color="var(--accent-gold)" />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.04em' }}>Hassle-Free Returns</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-inverse-muted)' }}>30-day exchange on all unworn drops</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <Award size={22} color="var(--accent-gold)" />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.04em' }}>Cambodian Heritage</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-inverse-muted)' }}>Custom-milled 320GSM combed cotton</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <ShieldCheck size={22} color="var(--accent-gold)" />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.04em' }}>Authentic Youth Original</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-inverse-muted)' }}>Official Kampuchea Aspire Youth Outfits</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="section-sm">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.5fr repeat(3, 1fr) 1.5fr',
              gap: '40px'
            }}
            className="footer-grid"
          >
            {/* Column 1: Brand Info */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <svg width="26" height="26" viewBox="0 0 100 100" fill="none">
                  <rect width="100" height="100" rx="16" fill="#121214"/>
                  <path d="M50 14 L58 38 L86 38 L64 54 L72 82 L50 66 L28 82 L36 54 L14 38 L42 38 Z" fill="#9D4EDD"/>
                  <circle cx="50" cy="50" r="14" fill="#FFFFFF"/>
                </svg>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 800, letterSpacing: '0.06em' }}>
                  KAYOO
                </span>
                <span style={{ fontSize: '0.62rem', letterSpacing: '0.18em', color: 'var(--accent-gold)', fontWeight: 800 }}>STUDIO</span>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-inverse-muted)', lineHeight: 1.7, maxWidth: '320px' }}>
                Kampuchea Aspire Youth Original Outfit. Conceived at the crossroads of ancient Angkorian stone architecture and modern oversized streetwear.
              </p>
              <div style={{ marginTop: 20, fontSize: '0.75rem', color: 'var(--text-inverse-muted)' }}>
                Locations: <span style={{ color: '#FFFFFF' }}>Phnom Penh • Siem Reap • Worldwide</span>
              </div>
            </div>

            {/* Column 2: Shop Links */}
            <div>
              <h6 style={{ color: '#FFFFFF', marginBottom: 16, fontSize: '0.78rem' }}>Creations</h6>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.82rem', color: 'var(--text-inverse-muted)' }}>
                <li><Link to="/shop" className="footer-link">All Pieces</Link></li>
                <li><Link to="/shop?category=tops" className="footer-link">Tops & Tees</Link></li>
                <li><Link to="/shop?category=trousers" className="footer-link">Pants & Bottoms</Link></li>
                <li><Link to="/shop?category=accessories" className="footer-link">Headwear & Caps</Link></li>
                <li><Link to="/shop?category=sale" className="footer-link" style={{ color: '#F87171' }}>Archive Sale</Link></li>
              </ul>
            </div>

            {/* Column 3: Atelier Links */}
            <div>
              <h6 style={{ color: '#FFFFFF', marginBottom: 16, fontSize: '0.78rem' }}>The Archive</h6>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.82rem', color: 'var(--text-inverse-muted)' }}>
                <li><Link to="/collections" className="footer-link">Curated Capsules</Link></li>
                <li><Link to="/lookbook" className="footer-link">Runway Lookbook</Link></li>
                <li><Link to="/about" className="footer-link">Brand Story & Heritage</Link></li>
                <li><Link to="/contact" className="footer-link">Studios & Stores</Link></li>
                <li><Link to="/admin" className="footer-link" style={{ color: 'var(--accent-gold)' }}>Admin Demo Portal</Link></li>
              </ul>
            </div>

            {/* Column 4: Client Care */}
            <div>
              <h6 style={{ color: '#FFFFFF', marginBottom: 16, fontSize: '0.78rem' }}>Community</h6>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.82rem', color: 'var(--text-inverse-muted)' }}>
                <li><Link to="/track-order" className="footer-link">Track Your Order</Link></li>
                <li><Link to="/account" className="footer-link">KAYOO Account</Link></li>
                <li><Link to="/contact#faq" className="footer-link">Shipping & Delivery</Link></li>
                <li><Link to="/contact#faq" className="footer-link">Easy Returns</Link></li>
              </ul>
            </div>

            {/* Column 5: Newsletter */}
            <div>
              <h6 style={{ color: '#FFFFFF', marginBottom: 16, fontSize: '0.78rem' }}>KAYOO Gazette</h6>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-inverse-muted)', marginBottom: 14 }}>
                Subscribe for private invitations to limited capsule drops and campaign photography.
              </p>
              {subscribed ? (
                <div
                  style={{
                    backgroundColor: 'rgba(197, 160, 89, 0.15)',
                    border: '1px solid var(--accent-gold)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: '0.82rem',
                    color: 'var(--accent-gold-light)'
                  }}
                >
                  <Check size={16} /> Subscribed. Use code <strong>KAYOO10</strong> for 10% off.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      style={{
                        width: '100%',
                        padding: '12px 42px 12px 14px',
                        backgroundColor: '#161619',
                        border: '1px solid #28282E',
                        borderRadius: 'var(--radius-pill)',
                        color: '#FFFFFF',
                        fontSize: '0.82rem'
                      }}
                      required
                    />
                    <button
                      type="submit"
                      style={{
                        position: 'absolute',
                        right: 4,
                        top: 4,
                        bottom: 4,
                        width: 34,
                        borderRadius: '50%',
                        backgroundColor: 'var(--accent-gold)',
                        color: '#000000',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      aria-label="Subscribe"
                    >
                      <ArrowRight size={14} />
                    </button>
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-inverse-muted)' }}>
                    Receive exclusive early access to upcoming drops. Unsubscribe anytime.
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Bottom Bar: Copyright & Payment Badges */}
          <div
            style={{
              marginTop: 48,
              paddingTop: 24,
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 16,
              fontSize: '0.75rem',
              color: 'var(--text-inverse-muted)'
            }}
          >
            <div>
              © {new Date().getFullYear()} KAYOO STUDIO (Kampuchea Aspire Youth Original Outfit). All rights reserved.
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Payment Methods:</span>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span className="badge badge-dark" style={{ border: '1px solid #333' }}>KHQR / ABA</span>
                <span className="badge badge-dark" style={{ border: '1px solid #333' }}>Apple Pay</span>
                <span className="badge badge-dark" style={{ border: '1px solid #333' }}>Visa</span>
                <span className="badge badge-dark" style={{ border: '1px solid #333' }}>Mastercard</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .footer-link {
          transition: color 0.15s ease, transform 0.15s ease;
          display: inline-block;
        }
        .footer-link:hover {
          color: #FFFFFF;
          transform: translateX(2px);
        }
        @media (max-width: 900px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
