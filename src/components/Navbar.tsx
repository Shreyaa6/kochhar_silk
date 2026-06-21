import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Search, Heart, ShoppingBag, Menu, X, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    navigateTo,
    cartCount,
    wishlist,
    setCartOpen,
    searchQuery,
    setSearchQuery,
    setCategoryFilter,
    currentPage
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const handleNavClick = (category: string) => {
    setCategoryFilter(category);
    navigateTo('shop');
    setMobileMenuOpen(false);
  };

  return (
    <header className="navbar-header">
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <div className="announcement-text">
          <Sparkles size={12} style={{ marginRight: 6 }} />
          COMPLIMENTARY SHIPPING ON ORDERS ABOVE ₹15,000 | HERITAGE WEAVES SINCE 1985
          <Sparkles size={12} style={{ marginLeft: 6 }} />
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="main-nav">
        <div className="container nav-container">
          {/* Hamburger (Mobile) */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={22} color="var(--color-burgundy)" /> : <Menu size={22} color="var(--color-burgundy)" />}
          </button>

          {/* Brand Logo */}
          <div className="logo-container" onClick={() => navigateTo('home')}>
            <span className="logo-text">KOCHHAR</span>
            <span className="logo-subtext">SILK STORE</span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav">
            <span
              className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
              onClick={() => navigateTo('home')}
            >
              Home
            </span>
            <span className="nav-link" onClick={() => handleNavClick('All')}>
              Shop All
            </span>
            <span className="nav-link" onClick={() => handleNavClick('Saree')}>
              Sarees
            </span>
            <span className="nav-link" onClick={() => handleNavClick('Lehenga')}>
              Lehengas
            </span>
            <span className="nav-link" onClick={() => handleNavClick('Suit')}>
              Suits
            </span>
          </nav>

          {/* Actions Column (Search, Wishlist, Cart) */}
          <div className="nav-actions">
            {/* Search Input Box (Desktop) */}
            <div className={`search-wrapper ${searchFocused ? 'focused' : ''}`}>
              <Search size={16} color="var(--color-muted)" style={{ marginRight: 6 }} />
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  setSearchFocused(true);
                  if (currentPage !== 'shop') navigateTo('shop');
                }}
                onBlur={() => setSearchFocused(false)}
                className="search-input"
              />
            </div>

            {/* Wishlist Trigger */}
            <button
              className="action-btn"
              onClick={() => navigateTo('wishlist')}
              aria-label="Wishlist"
            >
              <Heart
                size={20}
                color="var(--color-burgundy)"
                fill={wishlist.length > 0 ? "var(--color-burgundy)" : "none"}
              />
              {wishlist.length > 0 && (
                <span className="badge">{wishlist.length}</span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              className="action-btn"
              onClick={() => setCartOpen(true)}
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={20} color="var(--color-burgundy)" />
              {cartCount > 0 && (
                <span className="badge">{cartCount}</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Row */}
      <div className="mobile-search-row">
        <div className="mobile-search-wrapper">
          <Search size={16} color="var(--color-muted)" style={{ marginRight: 6 }} />
          <input
            type="text"
            placeholder="Search catalog..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => {
              if (currentPage !== 'shop') navigateTo('shop');
            }}
            className="search-input"
          />
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-container">
          <div className="mobile-nav-links">
            <span className="mobile-nav-link" onClick={() => { navigateTo('home'); setMobileMenuOpen(false); }}>Home</span>
            <span className="mobile-nav-link" onClick={() => handleNavClick('All')}>Shop All</span>
            <span className="mobile-nav-link" onClick={() => handleNavClick('Saree')}>Sarees</span>
            <span className="mobile-nav-link" onClick={() => handleNavClick('Lehenga')}>Lehengas</span>
            <span className="mobile-nav-link" onClick={() => handleNavClick('Suit')}>Suits</span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
