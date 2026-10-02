import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, Truck, ArrowRight, PackageCheck, Mail, ShieldCheck } from 'lucide-react';

export default function OrderConfirmation() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId') || 'KY-8921';

  return (
    <div className="section">
      <div className="container-narrow text-center">
        {/* Celebration Insignia */}
        <div
          style={{
            width: 88,
            height: 88,
            borderRadius: '50%',
            backgroundColor: 'rgba(168, 85, 247, 0.15)',
            border: '2px solid #A855F7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px'
          }}
        >
          <CheckCircle2 size={46} color="#A855F7" />
        </div>

        <span className="badge badge-gold" style={{ marginBottom: 12, backgroundColor: 'rgba(168, 85, 247, 0.15)', borderColor: '#A855F7', color: '#9333EA' }}>
          ORDER CONFIRMED & QUEUED AT KAYOO STUDIO
        </span>

        <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', marginBottom: 12 }}>
          Thank You For Supporting KAYOO
        </h1>

        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '580px', margin: '0 auto 28px', lineHeight: 1.6 }}>
          Your order has been recorded under reference <strong>{orderId}</strong>. Our Phnom Penh studio is preparing your garments with custom dustbags and archival stickers.
        </p>

        {/* Order Details Card */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            padding: '32px',
            maxWidth: '540px',
            margin: '0 auto 36px',
            textAlign: 'left',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 16, borderBottom: '1px solid var(--border-subtle)', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-tertiary)', letterSpacing: '0.08em' }}>
                Order Number
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>{orderId}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-tertiary)', letterSpacing: '0.08em' }}>
                Estimated Delivery
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-gold-dark)' }}>
                3–4 Business Days
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Mail size={16} color="var(--accent-gold)" />
              <span>Confirmation dispatch sent to your account email</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Truck size={16} color="var(--accent-gold)" />
              <span>FedEx Priority International with real-time signature courier</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <ShieldCheck size={16} color="var(--accent-gold)" />
              <span>Complimentary 30-day returns envelope included inside parcel</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          <Link to={`/track-order?order=${orderId}`} className="btn btn-primary btn-lg">
            <Truck size={18} /> Track Courier Telemetry <ArrowRight size={16} />
          </Link>
          <Link to="/account/orders" className="btn btn-secondary btn-lg">
            View in Account Portal
          </Link>
          <Link to="/shop" className="btn btn-secondary btn-lg">
            Continue Browsing
          </Link>
        </div>
      </div>
    </div>
  );
}
