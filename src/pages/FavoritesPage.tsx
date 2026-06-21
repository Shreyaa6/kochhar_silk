import React from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { Heart } from 'lucide-react';

export const FavoritesPage: React.FC = () => {
  const { wishlist, navigateTo } = useShop();

  return (
    <div className="container" style={styles.wishlistPage}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>Your Favorites</h1>
        <div style={styles.goldDivider}></div>
        <p style={styles.subtitle}>Designs you have saved for your upcoming celebrations.</p>
      </div>

      {/* Grid */}
      {wishlist.length === 0 ? (
        <div style={styles.emptyState}>
          <Heart size={48} color="var(--color-champagne)" style={{ marginBottom: 16 }} />
          <h3 style={styles.emptyTitle}>Your Wishlist is Empty</h3>
          <p style={styles.emptyText}>Tap the heart icon on any creation while browsing our collections to save it here.</p>
          <button
            className="btn-luxury"
            style={{ marginTop: 24 }}
            onClick={() => navigateTo('shop')}
          >
            Start Exploring Collection
          </button>
        </div>
      ) : (
        <div style={styles.productsGrid}>
          {wishlist.map((product) => (
            <div key={product.id} style={styles.cardWrapper}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  wishlistPage: {
    paddingTop: '40px',
    paddingBottom: '80px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '50px',
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
  emptyState: {
    padding: '80px 20px',
    textAlign: 'center',
    backgroundColor: 'var(--color-light-gray)',
    border: '1px dashed var(--color-border)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
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

export default FavoritesPage;
