import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '@/services/productService';
import FilterSidebar from './components/FilterSidebar';
import { ProductGrid } from '@/components/common';
import { Filter, X, ArrowLeft, SlidersHorizontal, Sparkles } from 'lucide-react';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();

  // State initialized from URL query params
  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [gender, setGender] = useState(searchParams.get('gender') || 'all');
  const [collection, setCollection] = useState(searchParams.get('collection') || '');
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [priceRange, setPriceRange] = useState(600);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state if URL query params change
  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    const gen = searchParams.get('gender') || 'all';
    const col = searchParams.get('collection') || '';
    const q = searchParams.get('search') || '';

    setCategory(cat);
    setGender(gen);
    setCollection(col);
    setSearch(q);
  }, [searchParams]);

  // Fetch filtered products
  useEffect(() => {
    async function fetchFiltered() {
      setLoading(true);
      const res = await getProducts({
        category,
        gender,
        collection: collection || null,
        search,
        maxPrice: priceRange,
        sizes: selectedSizes,
        colors: selectedColors,
        inStockOnly,
        sortBy,
        limit: 30
      });
      setProducts(res.products);
      setTotalCount(res.total);
      setLoading(false);
    }
    fetchFiltered();

    const handleUpdate = () => fetchFiltered();
    window.addEventListener('kayoo:products_updated', handleUpdate);
    return () => window.removeEventListener('kayoo:products_updated', handleUpdate);
  }, [category, gender, collection, search, priceRange, selectedSizes, selectedColors, inStockOnly, sortBy]);

  const handleCategoryChange = (newCat) => {
    setCategory(newCat);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (newCat === 'all') next.delete('category');
      else next.set('category', newCat);
      return next;
    });
  };

  const handleGenderChange = (newGender) => {
    setGender(newGender);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      if (newGender === 'all') next.delete('gender');
      else next.set('gender', newGender);
      return next;
    });
  };

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const handleResetFilters = () => {
    setCategory('all');
    setGender('all');
    setCollection('');
    setSearch('');
    setPriceRange(600);
    setSelectedSizes([]);
    setSelectedColors([]);
    setInStockOnly(false);
    setSortBy('featured');
    setSearchParams({});
  };

  // Active filter pills count
  const hasActiveFilters =
    category !== 'all' ||
    gender !== 'all' ||
    collection !== '' ||
    search !== '' ||
    priceRange < 600 ||
    selectedSizes.length > 0 ||
    selectedColors.length > 0 ||
    inStockOnly;

  return (
    <div className="section-sm">
      <div className="container">
        {/* Page Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
            <span>Home</span>
            <span>/</span>
            <span>KAYOO Archive</span>
            {category !== 'all' && (
              <>
                <span>/</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{category}</span>
              </>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', textTransform: 'capitalize' }}>
                {category === 'all'
                  ? gender !== 'all'
                    ? `${gender}'s KAYOO Collection`
                    : 'All Creations'
                  : category}
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '600px', marginTop: 4 }}>
                {category === 'outerwear'
                  ? 'Italian wool trenches, structured blazers, and down-filled memory nylon bombers.'
                  : category === 'hoodies'
                  ? '500GSM heavyweight Japanese loopback terry and pure Mongolian cashmere crewnecks.'
                  : category === 'tops'
                  ? 'Long-staple pima cotton drop-tees and relaxed noil raw silk camp shirts.'
                  : category === 'sale'
                  ? 'Exclusive seasonal archive pieces offered with complimentary worldwide courier.'
                  : 'Engineered proportions, noble organic fibers, and bespoke tailoring.'}
              </p>
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="btn btn-secondary mobile-only"
              style={{ display: 'none', gap: 8 }}
            >
              <SlidersHorizontal size={16} /> Filters {hasActiveFilters && '(Active)'}
            </button>
          </div>

          {/* Active Filter Pills Bar */}
          {hasActiveFilters && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginTop: 20 }}>
              <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-tertiary)', fontWeight: 700 }}>
                Active:
              </span>
              {category !== 'all' && (
                <span className="badge badge-dark">
                  Category: {category}
                  <button onClick={() => handleCategoryChange('all')} style={{ color: '#FFF', marginLeft: 4 }}>
                    <X size={12} />
                  </button>
                </span>
              )}
              {gender !== 'all' && (
                <span className="badge badge-dark">
                  Gender: {gender}
                  <button onClick={() => handleGenderChange('all')} style={{ color: '#FFF', marginLeft: 4 }}>
                    <X size={12} />
                  </button>
                </span>
              )}
              {search && (
                <span className="badge badge-gold">
                  Search: "{search}"
                  <button onClick={() => setSearch('')} style={{ color: 'inherit', marginLeft: 4 }}>
                    <X size={12} />
                  </button>
                </span>
              )}
              {selectedSizes.map((sz) => (
                <span key={sz} className="badge badge-outline">
                  Size: {sz}
                  <button onClick={() => toggleSize(sz)} style={{ color: 'inherit', marginLeft: 4 }}>
                    <X size={12} />
                  </button>
                </span>
              ))}
              {selectedColors.map((col) => (
                <span key={col} className="badge badge-outline">
                  Color: {col}
                  <button onClick={() => toggleColor(col)} style={{ color: 'inherit', marginLeft: 4 }}>
                    <X size={12} />
                  </button>
                </span>
              ))}
              {priceRange < 600 && (
                <span className="badge badge-outline">
                  Max: ${priceRange}
                  <button onClick={() => setPriceRange(600)} style={{ color: 'inherit', marginLeft: 4 }}>
                    <X size={12} />
                  </button>
                </span>
              )}
              {inStockOnly && (
                <span className="badge badge-outline">
                  In Stock Only
                  <button onClick={() => setInStockOnly(false)} style={{ color: 'inherit', marginLeft: 4 }}>
                    <X size={12} />
                  </button>
                </span>
              )}
              <button
                onClick={handleResetFilters}
                style={{ fontSize: '0.75rem', color: '#B91C1C', textDecoration: 'underline', fontWeight: 600, marginLeft: 4 }}
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Main Content Layout (Sidebar + Product Grid) */}
        <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>
          {/* Desktop Filter Sidebar */}
          <div className="desktop-only" style={{ position: 'sticky', top: '96px' }}>
            <FilterSidebar
              selectedCategory={category}
              onCategoryChange={handleCategoryChange}
              selectedGender={gender}
              onGenderChange={handleGenderChange}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              selectedSizes={selectedSizes}
              onToggleSize={toggleSize}
              selectedColors={selectedColors}
              onToggleColor={toggleColor}
              inStockOnly={inStockOnly}
              onToggleInStock={setInStockOnly}
              onResetFilters={handleResetFilters}
            />
          </div>

          {/* Product Grid Area */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {loading ? (
              <div style={{ padding: '80px', textAlign: 'center', color: 'var(--text-tertiary)' }}>
                Curating KAYOO catalogue...
              </div>
            ) : (
              <ProductGrid
                products={products}
                sortBy={sortBy}
                onSortChange={setSortBy}
                columns={3}
                emptyMessage="No creations match the selected combination of category, size, color, or price. Try clearing some filters."
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer Overlay (Rendered only when open) */}
      {mobileFilterOpen && (
        <FilterSidebar
          selectedCategory={category}
          onCategoryChange={handleCategoryChange}
          selectedGender={gender}
          onGenderChange={handleGenderChange}
          priceRange={priceRange}
          onPriceChange={setPriceRange}
          selectedSizes={selectedSizes}
          onToggleSize={toggleSize}
          selectedColors={selectedColors}
          onToggleColor={toggleColor}
          inStockOnly={inStockOnly}
          onToggleInStock={setInStockOnly}
          onResetFilters={handleResetFilters}
          isOpenMobile={true}
          onCloseMobile={() => setMobileFilterOpen(false)}
        />
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-only { display: none !important; }
          .mobile-only { display: inline-flex !important; }
        }
      `}</style>
    </div>
  );
}
