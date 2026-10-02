import React, { useState } from 'react';
import ProductCard from './ProductCard';
import QuickViewModal from './QuickViewModal';
import { Grid3X3, LayoutGrid, Rows } from 'lucide-react';

export default function ProductGrid({
  products = [],
  sortBy,
  onSortChange,
  showControls = true,
  columns = 4,
  emptyMessage = 'No garments match the current criteria.'
}) {
  const [gridCols, setGridCols] = useState(columns);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  return (
    <div>
      {/* Top Filter & Sort Bar */}
      {showControls && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px',
            paddingBottom: '16px',
            borderBottom: '1px solid var(--border-subtle)',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
            Showing <strong style={{ color: 'var(--text-primary)' }}>{products.length}</strong> creations
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* View Mode Switcher */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', border: '1px solid var(--border-medium)', borderRadius: 'var(--radius-pill)', padding: '2px 4px' }}>
              <button
                onClick={() => setGridCols(4)}
                style={{
                  padding: '4px 8px',
                  borderRadius: 'var(--radius-pill)',
                  backgroundColor: gridCols === 4 ? 'var(--bg-dark)' : 'transparent',
                  color: gridCols === 4 ? '#FFFFFF' : 'var(--text-secondary)'
                }}
                aria-label="4 Columns View"
                title="4 Columns"
              >
                <LayoutGrid size={15} />
              </button>
              <button
                onClick={() => setGridCols(3)}
                style={{
                  padding: '4px 8px',
                  borderRadius: 'var(--radius-pill)',
                  backgroundColor: gridCols === 3 ? 'var(--bg-dark)' : 'transparent',
                  color: gridCols === 3 ? '#FFFFFF' : 'var(--text-secondary)'
                }}
                aria-label="3 Columns View"
                title="3 Columns"
              >
                <Grid3X3 size={15} />
              </button>
              <button
                onClick={() => setGridCols(2)}
                style={{
                  padding: '4px 8px',
                  borderRadius: 'var(--radius-pill)',
                  backgroundColor: gridCols === 2 ? 'var(--bg-dark)' : 'transparent',
                  color: gridCols === 2 ? '#FFFFFF' : 'var(--text-secondary)'
                }}
                aria-label="2 Columns View"
                title="2 Columns"
              >
                <Rows size={15} />
              </button>
            </div>

            {/* Sort Select */}
            {onSortChange && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-tertiary)', fontWeight: 600 }}>
                  Sort:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => onSortChange(e.target.value)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-pill)',
                    border: '1px solid var(--border-medium)',
                    backgroundColor: '#FFFFFF',
                    fontSize: '0.82rem',
                    color: 'var(--text-primary)',
                    cursor: 'pointer'
                  }}
                >
                  <option value="featured">Curated & Featured</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Products Grid or Empty State */}
      {products.length === 0 ? (
        <div
          style={{
            padding: '80px 24px',
            textAlign: 'center',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-md)'
          }}
        >
          <h4 style={{ marginBottom: '8px' }}>No pieces discovered</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto 20px' }}>
            {emptyMessage}
          </p>
        </div>
      ) : (
        <div
          className={
            gridCols === 4
              ? 'product-grid-4'
              : gridCols === 3
              ? 'product-grid-3'
              : 'product-grid-2'
          }
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
}
