import React from 'react';
import { CATEGORIES } from '@/data/mockData';
import { X, RotateCcw, Check } from 'lucide-react';

export default function FilterSidebar({
  selectedCategory,
  onCategoryChange,
  selectedGender,
  onGenderChange,
  priceRange,
  onPriceChange,
  selectedSizes,
  onToggleSize,
  selectedColors,
  onToggleColor,
  inStockOnly,
  onToggleInStock,
  onResetFilters,
  isOpenMobile,
  onCloseMobile
}) {
  const availableColors = [
    { name: 'Obsidian Black', hex: '#1A1A1C' },
    { name: 'Oatmeal Taupe', hex: '#D7D0C5' },
    { name: 'Raw Ecru', hex: '#EDE7DC' },
    { name: 'Charcoal Asphalt', hex: '#2C2B2D' },
    { name: 'Deep Olive', hex: '#3B4136' },
    { name: 'Alabaster Chalk', hex: '#ECE8DF' },
    { name: 'Optic White', hex: '#F9F9F8' }
  ];

  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', '28', '30', '32', '34', 'One Size'];

  const content = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Header with Reset */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16, borderBottom: '1px solid var(--border-subtle)' }}>
        <h4 style={{ fontSize: '1.05rem', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Filters
        </h4>
        <button
          onClick={onResetFilters}
          style={{
            fontSize: '0.78rem',
            color: 'var(--text-tertiary)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            fontWeight: 600
          }}
          title="Reset all filters"
        >
          <RotateCcw size={12} /> Clear All
        </button>
      </div>

      {/* Gender Filter */}
      <div>
        <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
          Gender / Division
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {[
            { id: 'all', label: 'All' },
            { id: 'men', label: "Men's" },
            { id: 'women', label: "Women's" },
            { id: 'unisex', label: 'Unisex' }
          ].map((g) => (
            <button
              key={g.id}
              onClick={() => onGenderChange(g.id)}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.78rem',
                fontWeight: 600,
                border: selectedGender === g.id ? '1.5px solid var(--text-primary)' : '1px solid var(--border-medium)',
                backgroundColor: selectedGender === g.id ? 'var(--bg-dark)' : '#FFFFFF',
                color: selectedGender === g.id ? '#FFFFFF' : 'var(--text-primary)'
              }}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>
          Category
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '6px 10px',
                borderRadius: 'var(--radius-xs)',
                backgroundColor: selectedCategory === cat.id ? 'var(--bg-secondary)' : 'transparent',
                color: selectedCategory === cat.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontWeight: selectedCategory === cat.id ? 700 : 500,
                fontSize: '0.86rem',
                textAlign: 'left'
              }}
            >
              <span>{cat.name}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{cat.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Maximum Price
          </span>
          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            ${priceRange}
          </span>
        </div>
        <input
          type="range"
          min="80"
          max="600"
          step="10"
          value={priceRange}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--bg-dark)', cursor: 'pointer' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: 4 }}>
          <span>$80</span>
          <span>$600+</span>
        </div>
      </div>

      {/* Size Selector */}
      <div>
        <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
          Size
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {availableSizes.map((sz) => {
            const isSelected = selectedSizes.includes(sz);
            return (
              <button
                key={sz}
                onClick={() => onToggleSize(sz)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  border: isSelected ? '1.5px solid var(--text-primary)' : '1px solid var(--border-medium)',
                  backgroundColor: isSelected ? 'var(--bg-dark)' : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : 'var(--text-primary)',
                  cursor: 'pointer'
                }}
              >
                {sz}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Swatches */}
      <div>
        <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
          Color Palette
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {availableColors.map((c) => {
            const isSelected = selectedColors.includes(c.name);
            return (
              <button
                key={c.name}
                onClick={() => onToggleColor(c.name)}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  backgroundColor: c.hex,
                  border: isSelected ? '2px solid var(--text-primary)' : '1px solid rgba(0,0,0,0.15)',
                  boxShadow: isSelected ? '0 0 0 2px #FFFFFF' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                title={c.name}
              >
                {isSelected && (
                  <Check size={12} color={c.hex === '#F9F9F8' || c.hex === '#ECE8DF' ? '#000' : '#FFF'} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* In Stock Toggle */}
      <div style={{ paddingTop: 8, borderTop: '1px solid var(--border-subtle)' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: '0.85rem' }}>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => onToggleInStock(e.target.checked)}
            style={{ width: 16, height: 16, accentColor: 'var(--bg-dark)' }}
          />
          <span style={{ fontWeight: 600 }}>In-Stock Items Only</span>
        </label>
      </div>
    </div>
  );

  // If used as mobile drawer
  if (isOpenMobile !== undefined) {
    if (!isOpenMobile) return null;
    return (
      <>
        <div className="drawer-backdrop" onClick={onCloseMobile} />
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            height: '100dvh',
            width: '84%',
            maxWidth: '360px',
            backgroundColor: '#FFFFFF',
            zIndex: 1100,
            padding: 'max(20px, env(safe-area-inset-top, 20px)) clamp(16px, 3vw, 24px) max(24px, env(safe-area-inset-bottom, 24px)) clamp(16px, 3vw, 24px)',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            boxShadow: 'var(--shadow-drawer)',
            animation: 'slideInLeft 0.3s ease'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
            <button onClick={onCloseMobile} className="nav-icon-btn">
              <X size={20} />
            </button>
          </div>
          {content}
          <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--border-subtle)' }}>
            <button
              className="btn btn-primary"
              onClick={onCloseMobile}
              style={{ width: '100%' }}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </>
    );
  }

  // Desktop inline filter
  return (
    <div
      style={{
        width: '260px',
        flexShrink: 0,
        maxHeight: 'calc(100vh - 120px)',
        overflowY: 'auto',
        paddingRight: '12px'
      }}
      className="filter-sidebar-scrollable"
    >
      {content}
    </div>
  );
}
