import React from 'react';
import { useShop } from '../context/ShopContext';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { navigateTo, setCategoryFilter } = useShop();

  // Pick top 4 products for featured section
  const featuredProducts = products.slice(0, 4);

  const handleCategorySelect = (category: string) => {
    setCategoryFilter(category);
    navigateTo('shop');
  };

  return (
    <div className="landing-page">
      {/* Hero Banner Section */}
      <section className="hero-section">
        <img src="/hero_banner.png" alt="Editorial Fashion Collection" className="hero-image" />
        <div className="hero-overlay">
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={12} style={{ marginRight: 6 }} />
              Festive Couture 2026
            </div>
            <h1 className="hero-title">The Legacy of Pure Weaves</h1>
            <p className="hero-text">
              Handcrafted Kanjeevarams, exquisite Banarasis, and royal bridal lehengas. Experience Indian luxury, woven by hand.
            </p>
            <div className="hero-actions">
              <button
                className="btn-luxury"
                onClick={() => handleCategorySelect('All')}
              >
                Shop The Collection
              </button>
              <button
                className="btn-luxury-outline hero-btn-outline"
                onClick={() => handleCategorySelect('Saree')}
              >
                Explore Sarees
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="section container">
        <div className="section-header">
          <h2 className="section-title">Shop by Category</h2>
          <div className="gold-divider"></div>
          <p className="section-subtitle">Discover meticulously hand-woven masterpieces tailored for your special occasions.</p>
        </div>

        <div className="category-grid">
          {/* Saree Card */}
          <div className="category-card" onClick={() => handleCategorySelect('Saree')}>
            <img src="/saree_banarasi.png" alt="Pure Silk Sarees" className="category-img" />
            <div className="category-card-overlay">
              <h3 className="category-name">Heritage Sarees</h3>
              <span className="category-link">Discover <ArrowRight size={14} style={{ marginLeft: 4 }} /></span>
            </div>
          </div>

          {/* Lehenga Card */}
          <div className="category-card" onClick={() => handleCategorySelect('Lehenga')}>
            <img src="/lehenga_velvet.png" alt="Bridal Lehengas" className="category-img" />
            <div className="category-card-overlay">
              <h3 className="category-name">Royal Lehengas</h3>
              <span className="category-link">Discover <ArrowRight size={14} style={{ marginLeft: 4 }} /></span>
            </div>
          </div>

          {/* Suit Card */}
          <div className="category-card" onClick={() => handleCategorySelect('Suit')}>
            <img src="/suit_anarkali.png" alt="Salwar Suits" className="category-img" />
            <div className="category-card-overlay">
              <h3 className="category-name">Designer Suits</h3>
              <span className="category-link">Discover <ArrowRight size={14} style={{ marginLeft: 4 }} /></span>
            </div>
          </div>
        </div>
      </section>

      {/* Heritage Story Section */}
      <section className="heritage-section">
        <div className="container heritage-grid">
          <div className="heritage-img-col">
            <div className="heritage-img-frame">
              <img src="/saree_tussar.png" alt="Weaving process" className="heritage-img" />
            </div>
          </div>
          <div className="heritage-text-col">
            <span className="heritage-label">Since 1985</span>
            <h2 className="heritage-title">Preserving The Fine Art of Hand-loom Weaving</h2>
            <div className="gold-divider-small"></div>
            <p className="heritage-para">
              At the heart of Kochhar Silk Store lies an enduring devotion to classical Indian workmanship. For over four decades, our designers have collaborated directly with master artisans across Banaras, Kanchipuram, and Bhagalpur.
            </p>
            <p className="heritage-para">
              Every single piece is individual. A pure silk saree takes anywhere from 80 to 300 hours of continuous hand-weaving. Our metallic zaris are tested to secure generational preservation, passing down stories of threads from mother to daughter.
            </p>
            <button
              className="btn-luxury-outline"
              style={{ marginTop: 10 }}
              onClick={() => handleCategorySelect('All')}
            >
              Our Artisanal Story
            </button>
          </div>
        </div>
      </section>

      {/* Featured Masterpieces */}
      <section className="section container">
        <div className="section-header">
          <h2 className="section-title">Featured Masterpieces</h2>
          <div className="gold-divider"></div>
          <p className="section-subtitle">Handpicked styles displaying unparalleled craftsmanship.</p>
        </div>

        <div className="products-grid">
          {featuredProducts.map((product) => (
            <div key={product.id} className="product-card-wrapper">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="view-all-wrapper">
          <button
            className="btn-luxury"
            onClick={() => handleCategorySelect('All')}
          >
            View All Creations
          </button>
        </div>
      </section>

      {/* Instagram Feed / Callout Section */}
      <section className="insta-section">
        <div className="container section-header">
          <h2 className="section-title">Follow Our Atelier</h2>
          <div className="gold-divider"></div>
          <p className="section-subtitle">Join us on Instagram for daily draping, behind-the-scenes, and reviews.</p>
          <a
            href="https://www.instagram.com/kochharsilkstore/"
            target="_blank"
            rel="noopener noreferrer"
            className="insta-handle"
          >
            @kochharsilkstore
          </a>
        </div>

        <div className="container insta-grid">
          <div className="insta-frame" onClick={() => window.open('https://www.instagram.com/kochharsilkstore/', '_blank')}>
            <img src="/saree_banarasi.png" alt="Instagram Post" className="insta-img" />
            <div className="insta-hover"><Heart size={24} color="var(--color-white)" /></div>
          </div>
          <div className="insta-frame" onClick={() => window.open('https://www.instagram.com/kochharsilkstore/', '_blank')}>
            <img src="/saree_kanjeevaram.png" alt="Instagram Post" className="insta-img" />
            <div className="insta-hover"><Heart size={24} color="var(--color-white)" /></div>
          </div>
          <div className="insta-frame" onClick={() => window.open('https://www.instagram.com/kochharsilkstore/', '_blank')}>
            <img src="/saree_organza.png" alt="Instagram Post" className="insta-img" />
            <div className="insta-hover"><Heart size={24} color="var(--color-white)" /></div>
          </div>
          <div className="insta-frame" onClick={() => window.open('https://www.instagram.com/kochharsilkstore/', '_blank')}>
            <img src="/lehenga_ivory.png" alt="Instagram Post" className="insta-img" />
            <div className="insta-hover"><Heart size={24} color="var(--color-white)" /></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
