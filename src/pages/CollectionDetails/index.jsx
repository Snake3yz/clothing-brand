import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCollectionById } from '@/services/productService';
import { ProductGrid } from '@/components/common';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { getAssetUrl } from '@/utils/assetUrl';

export default function CollectionDetails() {
  const { id } = useParams();
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    async function load() {
      setLoading(true);
      window.scrollTo(0, 0);
      const res = await getCollectionById(id);
      setCollection(res);
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="section text-center">
        <p style={{ color: 'var(--text-tertiary)' }}>Presenting collection capsule...</p>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="section text-center">
        <h2>Collection Not Found</h2>
        <p style={{ margin: '16px 0 24px', color: 'var(--text-secondary)' }}>
          This seasonal capsule may have completed its private exhibition.
        </p>
        <Link to="/collections" className="btn btn-primary">
          View All Collections
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Editorial Hero Banner */}
      <div
        style={{
          position: 'relative',
          height: '420px',
          display: 'flex',
          alignItems: 'flex-end',
          paddingBottom: '48px',
          color: '#FFFFFF',
          overflow: 'hidden'
        }}
      >
        <img
          src={getAssetUrl(collection.heroImage)}
          alt={collection.title}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(12, 12, 14, 0.85) 0%, rgba(12, 12, 14, 0.3) 100%)'
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <Link
            to="/collections"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              color: '#FFFFFF',
              fontSize: '0.8rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: 16
            }}
          >
            <ArrowLeft size={14} /> All Collections
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span className="badge badge-gold">{collection.season}</span>
            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#DFDDD9' }}>
              {collection.subtitle}
            </span>
          </div>

          <h1 style={{ color: '#FFFFFF', fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', marginBottom: 12 }}>
            {collection.title}
          </h1>

          <p style={{ color: '#E4E2DC', fontSize: '1rem', maxWidth: '680px', lineHeight: 1.6 }}>
            {collection.description}
          </p>
        </div>
      </div>

      {/* Collection Products Grid */}
      <div className="section-sm">
        <div className="container">
          <ProductGrid
            products={collection.products || []}
            sortBy={sortBy}
            onSortChange={setSortBy}
            columns={4}
          />
        </div>
      </div>
    </div>
  );
}
