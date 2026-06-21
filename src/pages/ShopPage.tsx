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
    <div className="container" style={styles.shopPage}>
      {/* Page Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>{categoryTitle}</h1>
        <div style={styles.goldDivider}></div>
        <p style={styles.subtitle}>Woven with luxury, crafted for elegance.</p>
      </div>

      {/* Utilities: Sorting & Mobile Filter Toggle */}
      <div style={styles.utilityBar}>
        <button
          style={styles.filterToggleBtn}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <SlidersHorizontal size={16} style={{ marginRight: 8 }} />
          Filters {sidebarOpen ? '(Close)' : ''}
        </button>

        <div style={styles.resultsCount}>
          Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'creation' : 'creations'}
        </div>

        <div style={styles.sortWrapper}>
          <ArrowUpDown size={16} color="var(--color-burgundy)" style={{ marginRight: 8 }} />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as any)}
            style={styles.sortSelect}
          >
            <option value="featured">Sort: Featured</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Layout Columns */}
      <div style={styles.layoutGrid}>
        {/* Sidebar Filter Panel */}
        <aside style={{
          ...styles.sidebar,
          display: sidebarOpen ? 'block' : styles.sidebar.display // Mobile responsiveness toggle
        }} className="shop-sidebar-panel">
          {/* Section: Category */}
          <div style={styles.filterSection}>
            <h4 style={styles.filterSectionTitle}>Collection</h4>
            <div style={styles.filterOptions}>
              {['All', 'Saree', 'Lehenga', 'Suit'].map((cat) => (
                <button
                  key={cat}
                  style={{
                    ...styles.filterOptionBtn,
                    color: categoryFilter === cat ? 'var(--color-burgundy)' : 'var(--color-muted)',
                    fontWeight: categoryFilter === cat ? '600' : '400'
                  }}
                  onClick={() => setCategoryFilter(cat)}
                >
                  {cat === 'All' ? 'All Creations' : cat + 's'}
                </button>
              ))}
            </div>
          </div>

          {/* Section: Fabric */}
          <div style={styles.filterSection}>
            <h4 style={styles.filterSectionTitle}>Fabric</h4>
            <div style={styles.filterOptions}>
              {fabrics.map((fab) => (
                <button
                  key={fab}
                  style={{
                    ...styles.filterOptionBtn,
                    color: selectedFabric === fab ? 'var(--color-burgundy)' : 'var(--color-muted)',
                    fontWeight: selectedFabric === fab ? '600' : '400'
                  }}
                  onClick={() => setSelectedFabric(fab)}
                >
                  {fab}
                </button>
              ))}
            </div>
          </div>

          {/* Section: Color */}
          <div style={styles.filterSection}>
            <h4 style={styles.filterSectionTitle}>Color</h4>
            <div style={styles.filterOptions}>
              {colors.map((col) => (
                <button
                  key={col}
                  style={{
                    ...styles.filterOptionBtn,
                    color: selectedColor === col ? 'var(--color-burgundy)' : 'var(--color-muted)',
                    fontWeight: selectedColor === col ? '600' : '400'
                  }}
                  onClick={() => setSelectedColor(col)}
                >
                  {col}
                </button>
              ))}
            </div>
          </div>

          {/* Section: Price Slider */}
          <div style={styles.filterSection}>
            <div style={styles.priceHeader}>
              <h4 style={styles.filterSectionTitle}>Max Price</h4>
              <span style={styles.priceVal}>₹{priceFilter.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min={10000}
              max={100000}
              step={5000}
              value={priceFilter}
              onChange={(e) => setPriceFilter(Number(e.target.value))}
              style={styles.priceSlider}
            />
            <div style={styles.sliderLimits}>
              <span>₹10K</span>
              <span>₹100K</span>
            </div>
          </div>

          {/* Reset Action */}
          <button
            style={styles.resetBtn}
            onClick={handleResetFilters}
          >
            <RotateCcw size={14} style={{ marginRight: 8 }} />
            Clear Filters
          </button>
        </aside>

        {/* Product Grid Area */}
        <main style={styles.mainGrid}>
          {filteredProducts.length === 0 ? (
            <div style={styles.emptyState}>
              <RotateCcw size={48} color="var(--color-champagne)" style={{ marginBottom: 16 }} />
              <h3 style={styles.emptyTitle}>No Creations Match Your Selection</h3>
              <p style={styles.emptyText}>Try relaxing your filter parameters or search queries to view our weaving atelier pieces.</p>
              <button
                className="btn-luxury"
                style={{ marginTop: 24 }}
                onClick={handleResetFilters}
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div style={styles.productsGrid}>
              {filteredProducts.map((product) => (
                <div key={product.id} style={styles.cardWrapper}>
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

const styles: { [key: string]: React.CSSProperties } = {
  shopPage: {
    paddingTop: '40px',
    paddingBottom: '80px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: '40px',
    fontWeight: '400',
    color: 'var(--color-burgundy)',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  },
  goldDivider: {
    height: '1.5px',
    width: '80px',
    backgroundColor: 'var(--color-taupe)',
    margin: '12px 0',
  },
  subtitle: {
    fontSize: '15px',
    color: 'var(--color-muted)',
    fontWeight: '300',
  },
  utilityBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 0',
    borderTop: '1px solid var(--color-border)',
    borderBottom: '1px solid var(--color-border)',
    marginBottom: '40px',
  },
  filterToggleBtn: {
    display: 'none',
    alignItems: 'center',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '500',
    color: 'var(--color-burgundy)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    padding: '6px 12px',
    border: '1px solid var(--color-border)',
  },
  resultsCount: {
    fontSize: '13px',
    color: 'var(--color-muted)',
    fontWeight: '300',
  },
  sortWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  sortSelect: {
    cursor: 'pointer',
    padding: '6px 10px',
    fontSize: '13px',
    fontWeight: '500',
    color: 'var(--color-burgundy)',
    border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-white)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  layoutGrid: {
    display: 'grid',
    gridTemplateColumns: '250px 1fr',
    gap: '40px',
  },
  sidebar: {
    display: 'block', // Default desktop
  },
  filterSection: {
    marginBottom: '30px',
    borderBottom: '1px solid var(--color-light-gray)',
    paddingBottom: '20px',
  },
  filterSectionTitle: {
    fontFamily: 'var(--font-sans)',
    fontSize: '13px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: 'var(--color-burgundy)',
    marginBottom: '15px',
  },
  filterOptions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    alignItems: 'flex-start',
  },
  filterOptionBtn: {
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'var(--transition-smooth)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    padding: '2px 0',
  },
  priceHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  priceVal: {
    fontSize: '13px',
    fontWeight: '600',
    color: 'var(--color-taupe)',
  },
  priceSlider: {
    width: '100%',
    cursor: 'pointer',
    accentColor: 'var(--color-burgundy)',
  },
  sliderLimits: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '11px',
    color: 'var(--color-muted)',
    marginTop: '6px',
  },
  resetBtn: {
    width: '100%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px 0',
    border: '1px solid var(--color-border)',
    color: 'var(--color-muted)',
    fontSize: '12px',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    cursor: 'pointer',
    transition: 'var(--transition-smooth)',
    marginTop: '10px',
  },
  mainGrid: {
    flex: 1,
  },
  emptyState: {
    padding: '80px 20px',
    textAlign: 'center',
    backgroundColor: 'var(--color-light-gray)',
    border: '1px dashed var(--color-border)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    fontSize: '22px',
    color: 'var(--color-burgundy)',
    marginBottom: '8px',
  },
  emptyText: {
    fontSize: '14px',
    color: 'var(--color-muted)',
    fontWeight: '300',
    maxWidth: '450px',
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '30px',
  },
  cardWrapper: {
    animation: 'fadeIn 0.5s ease-out',
  }
};

// Inject CSS style for catalog responsiveness
const styleCss = `
  .shop-sidebar-panel button:hover {
    color: var(--color-burgundy) !important;
    padding-left: 4px;
  }
  select:focus {
    border-color: var(--color-taupe);
  }
  @media (max-width: 820px) {
    div[style*="layoutGrid"] {
      grid-template-columns: 1fr !important;
    }
    aside[style*="sidebar"] {
      display: none !important; /* Managed by filter toggle button on mobile */
    }
    .shop-sidebar-panel {
      padding: 20px !important;
      border: 1px solid var(--color-border) !important;
      background-color: var(--color-light-gray) !important;
      margin-bottom: 30px !important;
    }
    button[style*="filterToggleBtn"] {
      display: inline-flex !important;
    }
  }
`;
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.appendChild(document.createTextNode(styleCss));
  document.head.appendChild(style);
}
export default ShopPage;
