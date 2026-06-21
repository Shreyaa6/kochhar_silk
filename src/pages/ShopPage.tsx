import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { SlidersHorizontal, ArrowUpDown, RotateCcw } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const {
    searchQuery,
    categoryFilter,
    setCategoryFilter,
    priceFilter,
    setPriceFilter
  } = useShop();

  const [sortOption, setSortOption] = useState<'featured' | 'low-to-high' | 'high-to-low'>('featured');
  const [selectedFabric, setSelectedFabric] = useState<string>('All');
  const [selectedColor, setSelectedColor] = useState<string>('All');
  const [sidebarOpen, setSidebarOpen] = useState(false); // Responsive mobile sidebar

  // Static list of fabrics and colors extracted from our mock database
  const fabrics = ['All', 'Banarasi Silk', 'Kanjeevaram Silk', 'Organza', 'Velvet', 'Tussar Silk'];
  const colors = ['All', 'Crimson Red', 'Emerald Green', 'Blush Pink', 'Deep Burgundy', 'Midnight Plum', 'Mustard Gold', 'Ivory White'];

  const handleResetFilters = () => {
    setCategoryFilter('All');
    setPriceFilter(100000);
    setSelectedFabric('All');
    setSelectedColor('All');
    setSortOption('featured');
  };

  // Filter & Sort logic
  const filteredProducts = useMemo(() => {
    let result = products;

    // Search query match
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q)
      );
    }

    // Category match
    if (categoryFilter !== 'All') {
      result = result.filter((p) => p.category === categoryFilter);
    }

    // Fabric match
    if (selectedFabric !== 'All') {
      result = result.filter((p) => p.fabric === selectedFabric);
    }

    // Color match
    if (selectedColor !== 'All') {
      result = result.filter((p) => p.colors.some(c => c.includes(selectedColor) || selectedColor.includes(c)));
    }

    // Price match
    result = result.filter((p) => p.price <= priceFilter);

    // Sort matching
    if (sortOption === 'low-to-high') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortOption === 'high-to-low') {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [searchQuery, categoryFilter, selectedFabric, selectedColor, priceFilter, sortOption]);

  const categoryTitle = useMemo(() => {
    switch (categoryFilter) {
      case 'Saree': return 'The Heritage Sarees';
      case 'Lehenga': return 'The Bridal Lehengas';
      case 'Suit': return 'The Designer Suits';
      default: return 'The Complete Catalog';
    }
  }, [categoryFilter]);

  return (
    <div className="container shop-page-container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      {/* Page Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ fontSize: '40px', fontWeight: '400', color: 'var(--color-burgundy)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          {categoryTitle}
        </h1>
        <div className="gold-divider"></div>
        <p style={{ fontSize: '15px', color: 'var(--color-muted)', fontWeight: '300' }}>
          Woven with luxury, crafted for elegance.
        </p>
      </div>

      {/* Utilities: Sorting & Mobile Filter Toggle */}
      <div className="utility-bar">
        <button
          className="filter-toggle-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <SlidersHorizontal size={16} style={{ marginRight: 8 }} />
          Filters {sidebarOpen ? '(Close)' : ''}
        </button>

        <div className="results-count">
          Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'creation' : 'creations'}
        </div>

        <div className="sort-wrapper">
          <ArrowUpDown size={16} color="var(--color-burgundy)" style={{ marginRight: 8 }} />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as any)}
            className="sort-select"
          >
            <option value="featured">Sort: Featured</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Background Overlay for mobile filter drawer */}
      {sidebarOpen && <div className="shop-sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}

      {/* Layout Columns */}
      <div className="shop-layout-grid">
        {/* Sidebar Filter Panel */}
        <aside className={`shop-sidebar-panel ${sidebarOpen ? 'open' : ''}`}>
          {/* Section: Category */}
          <div className="filter-section">
            <h4 className="filter-section-title">Collection</h4>
            <div className="filter-options">
              {['All', 'Saree', 'Lehenga', 'Suit'].map((cat) => (
                <button
                  key={cat}
                  className="filter-option-btn"
                  style={{
                    color: categoryFilter === cat ? 'var(--color-burgundy)' : 'var(--color-muted)',
                    fontWeight: categoryFilter === cat ? '600' : '400'
                  }}
                  onClick={() => {
                    setCategoryFilter(cat);
                    setSidebarOpen(false); // Close sidebar on mobile select
                  }}
                >
                  {cat === 'All' ? 'All Creations' : cat + 's'}
                </button>
              ))}
            </div>
          </div>

          {/* Section: Fabric */}
          <div className="filter-section">
            <h4 className="filter-section-title">Fabric</h4>
            <div className="filter-options">
              {fabrics.map((fab) => (
                <button
                  key={fab}
                  className="filter-option-btn"
                  style={{
                    color: selectedFabric === fab ? 'var(--color-burgundy)' : 'var(--color-muted)',
                    fontWeight: selectedFabric === fab ? '600' : '400'
                  }}
                  onClick={() => {
                    setSelectedFabric(fab);
                    setSidebarOpen(false);
                  }}
                >
                  {fab}
                </button>
              ))}
            </div>
          </div>

          {/* Section: Color */}
          <div className="filter-section">
            <h4 className="filter-section-title">Color</h4>
            <div className="filter-options">
              {colors.map((col) => (
                <button
                  key={col}
                  className="filter-option-btn"
                  style={{
                    color: selectedColor === col ? 'var(--color-burgundy)' : 'var(--color-muted)',
                    fontWeight: selectedColor === col ? '600' : '400'
                  }}
                  onClick={() => {
                    setSelectedColor(col);
                    setSidebarOpen(false);
                  }}
                >
                  {col}
                </button>
              ))}
            </div>
          </div>

          {/* Section: Price Slider */}
          <div className="filter-section">
            <div className="price-header">
              <h4 className="filter-section-title">Max Price</h4>
              <span className="price-val">₹{priceFilter.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min={10000}
              max={100000}
              step={5000}
              value={priceFilter}
              onChange={(e) => setPriceFilter(Number(e.target.value))}
              className="price-slider"
            />
            <div className="slider-limits">
              <span>₹10K</span>
              <span>₹100K</span>
            </div>
          </div>

          {/* Reset Action */}
          <button
            className="reset-btn"
            onClick={() => {
              handleResetFilters();
              setSidebarOpen(false);
            }}
          >
            <RotateCcw size={14} style={{ marginRight: 8 }} />
            Clear Filters
          </button>
        </aside>

        {/* Product Grid Area */}
        <main style={{ flex: 1 }}>
          {filteredProducts.length === 0 ? (
            <div className="shop-empty-state">
              <RotateCcw size={48} color="var(--color-champagne)" style={{ marginBottom: 16 }} />
              <h3 style={{ fontSize: '22px', color: 'var(--color-burgundy)', marginBottom: '8px' }}>
                No Creations Match Your Selection
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--color-muted)', fontWeight: '300', maxWidth: '450px' }}>
                Try relaxing your filter parameters or search queries to view our weaving atelier pieces.
              </p>
              <button
                className="btn-luxury"
                style={{ marginTop: 24 }}
                onClick={handleResetFilters}
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <div key={product.id} className="card-wrapper">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ShopPage;
