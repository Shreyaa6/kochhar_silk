import React from 'react';
import type { Product } from '../data/products';
import { useShop } from '../context/ShopContext';
import { Heart, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleWishlist, isInWishlist, addToCart, navigateTo } = useShop();

  const activeWish = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Default size is "Standard Drape" for Sarees and "M" for Lehengas/Suits
    const defaultSize = product.category === 'Saree' ? 'Standard Drape' : 'M';
    addToCart(product, 1, defaultSize);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      className="luxury-card"
      style={styles.card}
      onClick={() => navigateTo('product-detail', product.id)}
    >
      {/* Image Container */}
      <div style={styles.imageContainer}>
        <img src={product.image} alt={product.title} style={styles.image} className="product-image" />
        
        {/* Wishlist Hover Button */}
        <button
          style={styles.wishlistBtn}
          onClick={handleWishlistClick}
          aria-label={activeWish ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart
            size={18}
            color="var(--color-burgundy)"
            fill={activeWish ? "var(--color-burgundy)" : "none"}
          />
        </button>

        {/* Quick Add Overlay */}
        <button
          style={styles.quickAddBtn}
          className="quick-add-overlay-btn"
          onClick={handleQuickAdd}
        >
          <ShoppingBag size={14} style={{ marginRight: 6 }} />
          Quick Add
        </button>
      </div>

      {/* Details Area */}
      <div style={styles.info}>
        <span style={styles.category}>{product.category}</span>
        <h4 style={styles.title}>{product.title}</h4>
        
        <div style={styles.priceRow}>
          <span style={styles.price}>₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice && (
            <span style={styles.originalPrice}>₹{product.originalPrice.toLocaleString('en-IN')}</span>
          )}
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    cursor: 'pointer',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  imageContainer: {
    position: 'relative',
    overflow: 'hidden',
    aspectRatio: '3/4',
    backgroundColor: 'var(--color-light-gray)',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'var(--transition-slow)',
  },
  wishlistBtn: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    border: 'none',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 2,
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
    transition: 'var(--transition-smooth)',
  },
  quickAddBtn: {
    position: 'absolute',
    bottom: '-45px', // Start hidden below container boundary
    left: 0,
    width: '100%',
    backgroundColor: 'rgba(64, 18, 22, 0.95)',
    color: 'var(--color-cream)',
    padding: '12px 0',
    fontFamily: 'var(--font-sans)',
    fontSize: '11px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'var(--transition-smooth)',
    zIndex: 2,
  },
  info: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  category: {
    fontSize: '10px',
    fontWeight: '500',
    color: 'var(--color-taupe)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: '6px',
  },
  title: {
    fontSize: '16px',
    fontWeight: '500',
    color: 'var(--color-burgundy)',
    lineHeight: '1.4',
    marginBottom: '8px',
    flexGrow: 1,
  },
  priceRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: 'auto',
  },
  price: {
    fontSize: '15px',
    fontWeight: '600',
    color: 'var(--color-dark)',
  },
  originalPrice: {
    fontSize: '12px',
    color: 'var(--color-muted)',
    textDecoration: 'line-through',
  }
};

// Inject hover styles into standard CSS header inside browser
const styleCss = `
  .luxury-card:hover .product-image {
    transform: scale(1.08);
  }
  .luxury-card:hover .quick-add-overlay-btn {
    bottom: 0 !important;
  }
  .luxury-card button[aria-label*="Wishlist"]:hover {
    transform: scale(1.15);
    background-color: var(--color-white);
  }
`;
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.appendChild(document.createTextNode(styleCss));
  document.head.appendChild(style);
}
export default ProductCard;
