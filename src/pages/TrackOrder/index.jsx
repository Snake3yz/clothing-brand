import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getOrderTracking } from '@/services/productService';
import {
  Truck,
  CheckCircle2,
  Clock,
  Package,
  MapPin,
  Search,
  ExternalLink,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export default function TrackOrder() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('order') || 'KY-8921';

  const [orderQuery, setOrderQuery] = useState(initialQuery);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTracking() {
      setLoading(true);
      const res = await getOrderTracking(orderQuery);
      setOrder(res);
      setLoading(false);
    }
    loadTracking();
  }, [orderQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (orderQuery.trim()) {
      setSearchParams({ order: orderQuery.trim() });
    }
  };

  const steps = [
    { title: 'Order Confirmed', desc: 'Verified and queued at KAYOO Studio', date: 'March 24' },
    { title: 'Quality Inspection', desc: 'Hand-inspected, holographic tagged, and packed', date: 'March 25' },
    { title: 'Dispatched / In Transit', desc: 'Priority Courier Hub Transit', date: 'March 26' },
    { title: 'Out for Delivery', desc: 'Local courier van dispatch', date: 'Pending' },
    { title: 'Delivered', desc: 'Direct doorstep handover', date: 'Estimated April 2' }
  ];

  return (
    <div className="section-sm">
      <div className="container-narrow">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent-gold-dark)', fontWeight: 700 }}>
            Live Telemetry
          </span>
          <h1 style={{ marginTop: 6, marginBottom: 12 }}>Courier Order Tracking</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Follow your handcrafted garments from our KAYOO Phnom Penh Studio straight to your residence.
          </p>

          {/* Search Order Form */}
          <form
            onSubmit={handleSearch}
            style={{
              maxWidth: '480px',
              margin: '24px auto 0',
              display: 'flex',
              gap: 8,
              backgroundColor: '#FFFFFF',
              padding: '6px 6px 6px 16px',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid var(--border-medium)',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <input
              type="text"
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              placeholder="Enter Order # (e.g. KY-8921)"
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: '0.9rem',
                color: 'var(--text-primary)'
              }}
            />
            <button type="submit" className="btn btn-primary btn-sm" style={{ padding: '8px 20px' }}>
              <Search size={14} /> Track
            </button>
          </form>
        </div>

        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: 'var(--text-tertiary)' }}>
            Polling courier telemetry...
          </div>
        ) : order ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {/* Status Card */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                padding: '32px',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: 16,
                  paddingBottom: 24,
                  borderBottom: '1px solid var(--border-subtle)',
                  marginBottom: 32
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <h3 style={{ fontSize: '1.4rem', margin: 0 }}>Order {order.orderNumber}</h3>
                    <span className="badge badge-status-transit">{order.status}</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Carrier: <strong>{order.carrier}</strong> • Tracking #{' '}
                    <strong style={{ fontFamily: 'monospace' }}>{order.trackingNumber}</strong>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-tertiary)' }}>
                    Estimated Doorstep Arrival
                  </div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--accent-gold-dark)' }}>
                    {order.estimatedDelivery}
                  </div>
                </div>
              </div>

              {/* Stepper Timeline */}
              <div style={{ position: 'relative', marginBottom: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }} className="timeline-stepper">
                  {steps.map((st, idx) => {
                    const stepNum = idx + 1;
                    const isCompleted = stepNum < order.timelineStep;
                    const isCurrent = stepNum === order.timelineStep;
                    const isPending = stepNum > order.timelineStep;

                    return (
                      <div key={idx} style={{ textAlign: 'center', position: 'relative' }}>
                        {/* Circle Node */}
                        <div
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: '50%',
                            backgroundColor: isCompleted
                              ? 'var(--accent-emerald)'
                              : isCurrent
                              ? 'var(--accent-gold)'
                              : 'var(--bg-secondary)',
                            color: isPending ? 'var(--text-tertiary)' : '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 12px',
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            border: isCurrent ? '3px solid #FFF' : 'none',
                            boxShadow: isCurrent ? '0 0 0 3px var(--accent-gold)' : 'none'
                          }}
                        >
                          {isCompleted ? <CheckCircle2 size={18} /> : stepNum}
                        </div>

                        <div style={{ fontSize: '0.82rem', fontWeight: 700, color: isCurrent ? 'var(--text-primary)' : isCompleted ? 'var(--text-primary)' : 'var(--text-tertiary)' }}>
                          {st.title}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', marginTop: 2 }}>
                          {st.desc}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: isCurrent ? 'var(--accent-gold-dark)' : 'var(--text-tertiary)', marginTop: 4, fontWeight: 600 }}>
                          {st.date}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Destination & Order Items Breakdown */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24 }} className="order-tracking-breakdown">
              {/* Items Card */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', padding: '24px' }}>
                <h4 style={{ marginBottom: 16, fontSize: '1.1rem' }}>Items in Consignment</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {order.items?.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: 60, height: 75, objectFit: 'cover', borderRadius: 'var(--radius-xs)', backgroundColor: 'var(--bg-secondary)' }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{item.name}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                          Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
                        </div>
                      </div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Destination Card */}
              <div style={{ backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', padding: '24px' }}>
                <h4 style={{ marginBottom: 16, fontSize: '1.1rem' }}>Shipping Destination</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{order.shippingAddress?.fullName}</div>
                  <div>{order.shippingAddress?.address1}</div>
                  <div>
                    {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.postalCode}
                  </div>
                  <div>{order.shippingAddress?.country}</div>
                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>
                    <ShieldCheck size={14} color="var(--accent-gold)" /> Signature required on delivery
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)' }}>
            <h4>No Telemetry Found for "{orderQuery}"</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: 8 }}>
              Please verify your order number or contact our concierge desk.
            </p>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .timeline-stepper {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
            text-align: left !important;
          }
          .order-tracking-breakdown {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
