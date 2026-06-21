import React from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { Heart } from 'lucide-react';

export const FavoritesPage: React.FC = () => {
  const { wishlist, navigateTo } = useShop();

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      {/* Header */}
      <div className="section-header" style={{ marginBottom: '50px' }}>
        <h1 style={{ fontSize: '40px', fontWeight: '400', color: 'var(--color-burgundy)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
          Your Favorites
        </h1>
        <div className="gold-divider"></div>
        <p style={{ fontSize: '15px', color: 'var(--color-muted)', fontWeight: '300' }}>
          Designs you have saved for your upcoming celebrations.
        </p>
      </div>

      {/* Grid */}
      {wishlist.length === 0 ? (
        <div className="shop-empty-state">
          <Heart size={48} color="var(--color-champagne)" style={{ marginBottom: 16 }} />
          <h3 style={{ fontSize: '22px', color: 'var(--color-burgundy)', marginBottom: '8px' }}>
            Your Wishlist is Empty
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--color-muted)', fontWeight: '300', maxWidth: '450px' }}>
            Tap the heart icon on any creation while browsing our collections to save it here.
          </p>
          <button
            className="btn-luxury"
            style={{ marginTop: 24 }}
            onClick={() => navigateTo('shop')}
          >
            Start Exploring Collection
          </button>
        </div>
      ) : (
        <div className="products-grid">
          {wishlist.map((product) => (
            <div key={product.id} className="card-wrapper">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
