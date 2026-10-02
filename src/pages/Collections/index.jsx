import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCollections } from '@/services/productService';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Collections() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await getCollections();
      setCollections(res);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="section-sm">
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 56px' }}>
          <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent-gold-dark)', fontWeight: 700 }}>
            Curated Archival Series
          </span>
          <h1 style={{ marginTop: 8, marginBottom: 16 }}>KAYOO Collections</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6 }}>
            Each collection represents an exploration of boxy volume, 320GSM cotton integrity, and authentic Khmer youth streetwear. Conceived in our Phnom Penh studio.
          </p>
        </div>

        {/* Collections Editorial Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
          {collections.map((coll, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <div
                key={coll.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 1fr',
                  gap: 48,
                  alignItems: 'center',
                  backgroundColor: '#FFFFFF',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  border: '1px solid var(--border-subtle)',
                  padding: '32px'
                }}
                className={`collection-row ${isReversed ? 'collection-reversed' : ''}`}
              >
                {/* Visual */}
                <div
                  style={{
                    order: isReversed ? 2 : 1,
                    width: '100%',
                    aspectRatio: '16 / 10',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    backgroundColor: 'var(--bg-secondary)'
                  }}
                >
                  <img
                    src={coll.heroImage}
                    alt={coll.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Narrative */}
                <div style={{ order: isReversed ? 1 : 2, padding: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <span className="badge badge-gold">{coll.season}</span>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-tertiary)', letterSpacing: '0.08em' }}>
                      {coll.subtitle}
                    </span>
                  </div>

                  <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', marginBottom: 14 }}>
                    {coll.title}
                  </h2>

                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: 12 }}>
                    {coll.tagline}
                  </div>

                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 28 }}>
                    {coll.description}
                  </p>

                  <Link to={`/collections/${coll.id}`} className="btn btn-primary">
                    Explore Collection ({coll.curatedProductIds.length} Pieces) <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .collection-row {
            grid-template-columns: 1fr !important;
            padding: 20px !important;
          }
          .collection-reversed > div:first-child {
            order: 1 !important;
          }
          .collection-reversed > div:last-child {
            order: 2 !important;
          }
        }
      `}</style>
    </div>
  );
}
