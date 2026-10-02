import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProducts } from '@/services/productService';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const trendingTags = ['Trench Coat', '500GSM Hoodie', 'Tailored Wool', 'Raw Silk', 'Cashmere', 'Leather Tote'];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      const res = await getProducts({ search: query, limit: 6 });
      setResults(res.products);
      setLoading(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <>
      <div className="drawer-backdrop" onClick={onClose} />
      <div
        style={{
          position: 'fixed',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '92%',
          maxWidth: '720px',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-modal)',
          zIndex: 1300,
          overflow: 'hidden',
          animation: 'fadeIn 0.2s ease'
        }}
      >
        {/* Search Input Bar */}
        <form
          onSubmit={handleSearchSubmit}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '18px 24px',
            borderBottom: '1px solid var(--border-subtle)',
            gap: 14
          }}
        >
          <Search size={22} color="var(--text-tertiary)" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search creations by name, silhouette, material, or SKU..."
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '1.05rem',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-sans)'
            }}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              style={{ color: 'var(--text-tertiary)', padding: 4 }}
            >
              <X size={18} />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="btn btn-secondary btn-sm"
            style={{ padding: '6px 14px' }}
          >
            Esc
          </button>
        </form>

        {/* Trending Searches */}
        {!query && (
          <div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-tertiary)', marginBottom: 12, fontWeight: 700 }}>
              <Sparkles size={14} color="var(--accent-gold)" /> Trending KAYOO Inquiries
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {trendingTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-pill)',
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-subtle)',
                    fontSize: '0.82rem',
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Live Results List */}
        {query && (
          <div style={{ maxHeight: '420px', overflowY: 'auto', padding: '16px 24px' }}>
            {loading ? (
              <div style={{ padding: '30px', textAlign: 'center', color: 'var(--text-tertiary)' }}>
                Searching KAYOO records...
              </div>
            ) : results.length === 0 ? (
              <div style={{ padding: '30px', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  No garments found matching "<strong>{query}</strong>"
                </p>
                <button
                  onClick={() => {
                    onClose();
                    navigate('/shop');
                  }}
                  className="btn btn-secondary btn-sm"
                  style={{ marginTop: 12 }}
                >
                  Browse All Collections
                </button>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-tertiary)', marginBottom: 12 }}>
                  Creations ({results.length})
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {results.map((p) => (
                    <Link
                      key={p.id}
                      to={`/product/${p.id}`}
                      onClick={onClose}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14,
                        padding: '10px',
                        borderRadius: 'var(--radius-sm)',
                        transition: 'background-color 0.15s ease'
                      }}
                      className="search-result-item"
                    >
                      <img
                        src={p.images?.[0]}
                        alt={p.name}
                        style={{ width: 48, height: 60, objectFit: 'cover', borderRadius: 4, backgroundColor: 'var(--bg-secondary)' }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                          {p.name}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                          {p.gender} • {p.category} • SKU: {p.sku}
                        </div>
                      </div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        ${p.price}
                      </div>
                      <ArrowRight size={16} color="var(--text-tertiary)" />
                    </Link>
                  ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: 16, paddingTop: 12, borderTop: '1px solid var(--border-subtle)' }}>
                  <button
                    onClick={handleSearchSubmit}
                    style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', textDecoration: 'underline' }}
                  >
                    View all results for "{query}" →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        .search-result-item:hover {
          background-color: var(--bg-secondary);
        }
      `}</style>
    </>
  );
}
