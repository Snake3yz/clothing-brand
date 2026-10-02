import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLookbook } from '@/services/productService';
import { ArrowRight, Sparkles, Eye, ShoppingBag } from 'lucide-react';

export default function Lookbook() {
  const [looks, setLooks] = useState([]);
  const [activePin, setActivePin] = useState(null);

  useEffect(() => {
    async function load() {
      const res = await getLookbook();
      setLooks(res);
    }
    load();
  }, []);

  return (
    <div className="section-sm">
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '740px', margin: '0 auto 60px' }}>
          <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent-gold-dark)', fontWeight: 700 }}>
            Visual Dialogue
          </span>
          <h1 style={{ marginTop: 8, marginBottom: 16 }}>Runway Lookbook</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
            Photographed on location across Milan and Tokyo. Hover or tap the interactive pins on each editorial photograph to discover the individual garments comprising the silhouette.
          </p>
        </div>

        {/* Editorial Looks Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 80 }}>
          {looks.map((look, index) => (
            <div
              key={look.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '1.25fr 1fr',
                gap: 56,
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                border: '1px solid var(--border-subtle)',
                padding: '36px'
              }}
              className="lookbook-item-grid"
            >
              {/* Left: Editorial Image with Hotspots */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '4 / 5',
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden',
                  backgroundColor: '#161619'
                }}
              >
                <img
                  src={look.editorialImage}
                  alt={look.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />

                {/* Hotspot Pins */}
                {look.pins.map((pin, pIdx) => {
                  const isCurrent = activePin === `${look.id}-${pIdx}`;
                  return (
                    <div
                      key={pIdx}
                      style={{ position: 'absolute', left: `${pin.x}%`, top: `${pin.y}%` }}
                    >
                      <button
                        className="lookbook-pin"
                        onClick={() => setActivePin(isCurrent ? null : `${look.id}-${pIdx}`)}
                        aria-label={`Inspect ${pin.label}`}
                      >
                        {pIdx + 1}
                      </button>

                      {/* Popover on click/hover */}
                      {isCurrent && (
                        <div className="lookbook-popover animate-fade-in">
                          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>
                            {pin.label}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold-dark)', fontWeight: 600, marginBottom: 8 }}>
                            {pin.price} USD
                          </div>
                          <Link
                            to={`/product/${pin.productId}`}
                            className="btn btn-primary btn-sm"
                            style={{ width: '100%', padding: '6px 12px' }}
                          >
                            Discover Piece
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                })}

                <div
                  style={{
                    position: 'absolute',
                    bottom: 16,
                    left: 16,
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    backdropFilter: 'blur(8px)',
                    color: '#FFF',
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.04em'
                  }}
                >
                  📍 {look.location}
                </div>
              </div>

              {/* Right: Look Breakdown */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <span className="badge badge-gold">{look.season}</span>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-tertiary)' }}>
                    Editorial 0{index + 1}
                  </span>
                </div>

                <h2 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)', marginBottom: 16 }}>
                  {look.title}
                </h2>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: 28 }}>
                  Photography by {look.photographer}. Exploring the structural tension between oversized heavyweights and unconstructed tailoring draped over modern silhouettes.
                </p>

                {/* Tagged Outfits Breakdown */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
                  <div style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-tertiary)', fontWeight: 700 }}>
                    Pieces in This Outfit ({look.pins.length})
                  </div>
                  {look.pins.map((pin, pIdx) => (
                    <div
                      key={pIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '14px 18px',
                        backgroundColor: 'var(--bg-secondary)',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-subtle)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            backgroundColor: 'var(--bg-dark)',
                            color: '#FFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.75rem',
                            fontWeight: 700
                          }}
                        >
                          {pIdx + 1}
                        </span>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{pin.label}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{pin.price} USD</div>
                        </div>
                      </div>

                      <Link to={`/product/${pin.productId}`} className="btn btn-secondary btn-sm">
                        View Piece <ArrowRight size={13} />
                      </Link>
                    </div>
                  ))}
                </div>

                <Link to="/shop" className="btn btn-primary">
                  Shop Entire Runway Collection <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .lookbook-item-grid {
            grid-template-columns: 1fr !important;
            padding: 20px !important;
            gap: 28px !important;
          }
        }
      `}</style>
    </div>
  );
}
