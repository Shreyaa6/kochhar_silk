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
    <header style={styles.header}>
      {/* Announcement Bar */}
      <div style={styles.announcementBar}>
        <div style={styles.announcementText}>
          <Sparkles size={12} style={{ marginRight: 6 }} />
          COMPLIMENTARY SHIPPING ON ORDERS ABOVE ₹15,000 | HERITAGE WEAVES SINCE 1985
          <Sparkles size={12} style={{ marginLeft: 6 }} />
        </div>
      </div>

      {/* Main Navigation Row */}
      <div style={styles.mainNav}>
        <div className="container" style={styles.navContainer}>
          {/* Hamburger (Mobile) */}
          <button
            style={styles.mobileToggle}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={22} color="var(--color-burgundy)" /> : <Menu size={22} color="var(--color-burgundy)" />}
          </button>

          {/* Brand Logo */}
          <div
            style={styles.logoContainer}
            onClick={() => navigateTo('home')}
          >
            <span style={styles.logoText}>KOCHHAR</span>
            <span style={styles.logoSubtext}>SILK STORE</span>
          </div>

          {/* Desktop Navigation Links */}
          <nav style={styles.desktopNav}>
            <span
              style={{
                ...styles.navLink,
                fontWeight: currentPage === 'home' ? '600' : '400',
                borderBottom: currentPage === 'home' ? '1px solid var(--color-burgundy)' : 'none'
              }}
              onClick={() => navigateTo('home')}
            >
              Home
            </span>
            <span
              style={styles.navLink}
              onClick={() => handleNavClick('All')}
            >
              Shop All
            </span>
            <span
              style={styles.navLink}
              onClick={() => handleNavClick('Saree')}
            >
              Sarees
            </span>
            <span
              style={styles.navLink}
              onClick={() => handleNavClick('Lehenga')}
            >
              Lehengas
            </span>
            <span
              style={styles.navLink}
              onClick={() => handleNavClick('Suit')}
            >
              Suits
            </span>
          </nav>

          {/* Actions Column (Search, Wishlist, Cart) */}
          <div style={styles.actions}>
            {/* Search Input Box */}
            <div style={{
              ...styles.searchWrapper,
              borderColor: searchFocused ? 'var(--color-taupe)' : 'var(--color-border)',
              width: searchFocused ? '200px' : '150px'
            }}>
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
                style={styles.searchInput}
              />
            </div>

            {/* Wishlist Trigger */}
            <button
              style={styles.actionBtn}
              onClick={() => navigateTo('wishlist')}
              aria-label="Wishlist"
            >
              <Heart
                size={20}
                color="var(--color-burgundy)"
                fill={wishlist.length > 0 ? "var(--color-burgundy)" : "none"}
              />
              {wishlist.length > 0 && (
                <span style={styles.badge}>{wishlist.length}</span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              style={styles.actionBtn}
              onClick={() => setCartOpen(true)}
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={20} color="var(--color-burgundy)" />
              {cartCount > 0 && (
                <span style={styles.badge}>{cartCount}</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div style={styles.mobileNavContainer}>
          <div style={styles.mobileNavLinks}>
            <span style={styles.mobileNavLink} onClick={() => { navigateTo('home'); setMobileMenuOpen(false); }}>Home</span>
            <span style={styles.mobileNavLink} onClick={() => handleNavClick('All')}>Shop All</span>
            <span style={styles.mobileNavLink} onClick={() => handleNavClick('Saree')}>Sarees</span>
            <span style={styles.mobileNavLink} onClick={() => handleNavClick('Lehenga')}>Lehengas</span>
            <span style={styles.mobileNavLink} onClick={() => handleNavClick('Suit')}>Suits</span>
          </div>
        </div>
      )}
    </header>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  header: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    position: 'sticky',
    top: 0,
    zIndex: 99,
    boxShadow: '0 4px 20px rgba(64, 18, 22, 0.03)',
    backgroundColor: 'var(--color-white)',
  },
  announcementBar: {
    backgroundColor: 'var(--color-burgundy)',
    color: 'var(--color-cream)',
    padding: '8px 0',
    textAlign: 'center',
    fontSize: '11px',
    fontWeight: '500',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
  },
  announcementText: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainNav: {
    padding: '15px 0',
    borderBottom: '1px solid var(--color-border)',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
  },
  navContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  mobileToggle: {
    display: 'none',
    cursor: 'pointer',
    padding: '4px',
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
  },
  logoText: {
    fontFamily: 'var(--font-serif)',
    fontSize: '28px',
    fontWeight: '600',
    letterSpacing: '0.18em',
    lineHeight: '1.1',
    color: 'var(--color-burgundy)',
  },
  logoSubtext: {
    fontSize: '8px',
    fontWeight: '500',
    letterSpacing: '0.35em',
    color: 'var(--color-taupe)',
    marginTop: '2px',
    textTransform: 'uppercase',
  },
  desktopNav: {
    display: 'flex',
    gap: '30px',
    alignItems: 'center',
  },
  navLink: {
    fontSize: '13px',
    fontWeight: '400',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--color-burgundy)',
    cursor: 'pointer',
    padding: '6px 0',
    transition: 'var(--transition-smooth)',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '18px',
  },
  searchWrapper: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid var(--color-border)',
    borderRadius: '20px',
    padding: '6px 12px',
    backgroundColor: 'var(--color-light-gray)',
    transition: 'var(--transition-smooth)',
  },
  searchInput: {
    background: 'none',
    border: 'none',
    fontSize: '12px',
    width: '100%',
    color: 'var(--color-dark)',
  },
  actionBtn: {
    position: 'relative',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    padding: '4px',
    transition: 'var(--transition-smooth)',
  },
  badge: {
    position: 'absolute',
    top: '-4px',
    right: '-4px',
    backgroundColor: 'var(--color-taupe)',
    color: 'var(--color-white)',
    fontSize: '9px',
    fontWeight: '600',
    width: '15px',
    height: '15px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileNavContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    backgroundColor: 'var(--color-white)',
    boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
    borderBottom: '1px solid var(--color-border)',
    padding: '20px',
    zIndex: 98,
  },
  mobileNavLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  mobileNavLink: {
    fontSize: '14px',
    fontWeight: '500',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--color-burgundy)',
    cursor: 'pointer',
    paddingBottom: '8px',
    borderBottom: '1px solid var(--color-light-gray)',
  }
};

// Add responsive mobile display styles by checking media queries inside component lifecycle or rendering.
// To handle css media queries in TSX for mobileToggle / desktopNav without raw CSS, we inject a style block:
const css = `
  @media (max-width: 820px) {
    header nav { display: none !important; }
    button[aria-label="Toggle Menu"] { display: block !important; }
  }
  @media (min-width: 821px) {
    button[aria-label="Toggle Menu"] { display: none !important; }
  }
`;
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);
}
