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
    <div style={styles.page}>
      {/* Hero Banner Section */}
      <section style={styles.heroSection}>
        <img src="/hero_banner.png" alt="Editorial Fashion Collection" style={styles.heroImage} />
        <div style={styles.heroOverlay}>
          <div style={styles.heroContent}>
            <div style={styles.heroBadge}>
              <Sparkles size={12} style={{ marginRight: 6 }} />
              Festive Couture 2026
            </div>
            <h1 style={styles.heroTitle}>The Legacy of Pure Weaves</h1>
            <p style={styles.heroText}>
              Handcrafted Kanjeevarams, exquisite Banarasis, and royal bridal lehengas. Experience Indian luxury, woven by hand.
            </p>
            <div style={styles.heroActions}>
              <button
                className="btn-luxury"
                onClick={() => handleCategorySelect('All')}
              >
                Shop The Collection
              </button>
              <button
                className="btn-luxury-outline"
                style={styles.heroBtnOutline}
                onClick={() => handleCategorySelect('Saree')}
              >
                Explore Sarees
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section style={styles.section} className="container">
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Shop by Category</h2>
          <div style={styles.goldDivider}></div>
          <p style={styles.sectionSubtitle}>Discover meticulously hand-woven masterpieces tailored for your special occasions.</p>
        </div>

        <div style={styles.categoryGrid}>
          {/* Saree Card */}
          <div style={styles.categoryCard} onClick={() => handleCategorySelect('Saree')}>
            <img src="/saree_banarasi.png" alt="Pure Silk Sarees" style={styles.categoryImg} />
            <div style={styles.categoryOverlay}>
              <h3 style={styles.categoryName}>Heritage Sarees</h3>
              <span style={styles.categoryLink}>Discover <ArrowRight size={14} style={{ marginLeft: 4 }} /></span>
            </div>
          </div>

          {/* Lehenga Card */}
          <div style={styles.categoryCard} onClick={() => handleCategorySelect('Lehenga')}>
            <img src="/lehenga_velvet.png" alt="Bridal Lehengas" style={styles.categoryImg} />
            <div style={styles.categoryOverlay}>
              <h3 style={styles.categoryName}>Royal Lehengas</h3>
              <span style={styles.categoryLink}>Discover <ArrowRight size={14} style={{ marginLeft: 4 }} /></span>
            </div>
          </div>

          {/* Suit Card */}
          <div style={styles.categoryCard} onClick={() => handleCategorySelect('Suit')}>
            <img src="/suit_anarkali.png" alt="Salwar Suits" style={styles.categoryImg} />
            <div style={styles.categoryOverlay}>
              <h3 style={styles.categoryName}>Designer Suits</h3>
              <span style={styles.categoryLink}>Discover <ArrowRight size={14} style={{ marginLeft: 4 }} /></span>
            </div>
          </div>
        </div>
      </section>

      {/* Heritage Story Section */}
      <section style={styles.heritageSection}>
        <div className="container" style={styles.heritageGrid}>
          <div style={styles.heritageImageCol}>
            <div style={styles.heritageImageFrame}>
              <img src="/saree_tussar.png" alt="Weaving process" style={styles.heritageImage} />
            </div>
          </div>
          <div style={styles.heritageTextCol}>
            <span style={styles.heritageLabel}>Since 1985</span>
            <h2 style={styles.heritageTitle}>Preserving The Fine Art of Hand-loom Weaving</h2>
            <div style={styles.goldDividerSmall}></div>
            <p style={styles.heritageParagraph}>
              At the heart of Kochhar Silk Store lies an enduring devotion to classical Indian workmanship. For over four decades, our designers have collaborated directly with master artisans across Banaras, Kanchipuram, and Bhagalpur.
            </p>
            <p style={styles.heritageParagraph}>
              Every single piece is individual. A pure silk saree takes anywhere from 80 to 300 hours of continuous hand-weaving. Our metallic zaris are tested to secure generational preservation, passing down stories of threads from mother to daughter.
            </p>
            <button
              className="btn-luxury-outline"
              style={{ marginTop: 10, alignSelf: 'flex-start' }}
              onClick={() => handleCategorySelect('All')}
            >
              Our Artisanal Story
            </button>
          </div>
        </div>
      </section>

      {/* Featured Masterpieces */}
      <section style={styles.section} className="container">
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Featured Masterpieces</h2>
          <div style={styles.goldDivider}></div>
          <p style={styles.sectionSubtitle}>Handpicked styles displaying unparalleled craftsmanship.</p>
        </div>

        <div style={styles.productsGrid}>
          {featuredProducts.map((product) => (
            <div key={product.id} style={styles.productCardWrapper}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div style={styles.viewAllWrapper}>
          <button
            className="btn-luxury"
            onClick={() => handleCategorySelect('All')}
          >
            View All Creations
          </button>
        </div>
      </section>

      {/* Instagram Feed / Callout Section */}
      <section style={styles.instaSection}>
        <div className="container" style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>Follow Our Atelier</h2>
          <div style={styles.goldDivider}></div>
          <p style={styles.sectionSubtitle}>Join us on Instagram for daily draping, behind-the-scenes, and reviews.</p>
          <a
            href="https://www.instagram.com/kochharsilkstore/"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.instaHandle}
          >
            @kochharsilkstore
          </a>
        </div>

        <div className="container" style={styles.instaGrid}>
          <div style={styles.instaFrame} onClick={() => window.open('https://www.instagram.com/kochharsilkstore/', '_blank')}>
            <img src="/saree_banarasi.png" alt="Instagram Post" style={styles.instaImg} />
            <div style={styles.instaHover}><Heart size={24} color="var(--color-white)" /></div>
          </div>
          <div style={styles.instaFrame} onClick={() => window.open('https://www.instagram.com/kochharsilkstore/', '_blank')}>
            <img src="/saree_kanjeevaram.png" alt="Instagram Post" style={styles.instaImg} />
            <div style={styles.instaHover}><Heart size={24} color="var(--color-white)" /></div>
          </div>
          <div style={styles.instaFrame} onClick={() => window.open('https://www.instagram.com/kochharsilkstore/', '_blank')}>
            <img src="/saree_organza.png" alt="Instagram Post" style={styles.instaImg} />
            <div style={styles.instaHover}><Heart size={24} color="var(--color-white)" /></div>
          </div>
          <div style={styles.instaFrame} onClick={() => window.open('https://www.instagram.com/kochharsilkstore/', '_blank')}>
            <img src="/lehenga_ivory.png" alt="Instagram Post" style={styles.instaImg} />
            <div style={styles.instaHover}><Heart size={24} color="var(--color-white)" /></div>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  page: {
    width: '100%',
    backgroundColor: 'var(--color-white)',
  },
  heroSection: {
    height: '80vh',
    minHeight: '550px',
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center 20%',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(64, 18, 22, 0.35)', // Burgundy tint to darken image
    display: 'flex',
    alignItems: 'center',
    padding: '0 8%',
  },
  heroContent: {
    maxWidth: '600px',
    color: 'var(--color-cream)',
    animation: 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
    display: 'flex',
    flexDirection: 'column',
  },
  heroBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 237, 218, 0.15)',
    border: '1.5px solid var(--color-champagne)',
    color: 'var(--color-cream)',
    alignSelf: 'flex-start',
    padding: '5px 12px',
    fontSize: '11px',
    fontWeight: '500',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    marginBottom: '20px',
    backdropFilter: 'blur(2px)',
  },
  heroTitle: {
    fontFamily: 'var(--font-serif)',
    fontSize: '56px',
    fontWeight: '400',
    color: 'var(--color-cream)',
    lineHeight: '1.1',
    marginBottom: '20px',
    textShadow: '0 2px 4px rgba(0,0,0,0.2)',
  },
  heroText: {
    fontSize: '16px',
    fontWeight: '300',
    color: 'var(--color-champagne)',
    marginBottom: '32px',
    lineHeight: '1.6',
  },
  heroActions: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  },
  heroBtnOutline: {
    borderColor: 'var(--color-cream)',
    color: 'var(--color-cream)',
    backgroundColor: 'transparent',
  },
  section: {
    padding: '80px 30px',
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '50px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: '36px',
    color: 'var(--color-burgundy)',
    fontWeight: '400',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  goldDivider: {
    height: '1px',
    width: '80px',
    backgroundColor: 'var(--color-taupe)',
    margin: '15px 0',
    position: 'relative',
  },
  sectionSubtitle: {
    fontSize: '15px',
    color: 'var(--color-muted)',
    fontWeight: '300',
    maxWidth: '600px',
  },
  categoryGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '30px',
  },
  categoryCard: {
    position: 'relative',
    aspectRatio: '3/4',
    overflow: 'hidden',
    cursor: 'pointer',
    border: '1px solid var(--color-border)',
    boxShadow: 'var(--shadow-card)',
  },
  categoryImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'var(--transition-slow)',
  },
  categoryOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: '30px',
    background: 'linear-gradient(to top, rgba(64,18,22,0.85) 0%, rgba(64,18,22,0) 100%)',
    color: 'var(--color-cream)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  categoryName: {
    color: 'var(--color-cream)',
    fontSize: '24px',
    fontWeight: '400',
    marginBottom: '8px',
  },
  categoryLink: {
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: 'var(--color-champagne)',
    display: 'flex',
    alignItems: 'center',
    fontWeight: '500',
  },
  heritageSection: {
    backgroundColor: 'var(--color-cream)',
    padding: '100px 0',
    borderTop: '1px solid var(--color-border)',
    borderBottom: '1px solid var(--color-border)',
  },
  heritageGrid: {
    display: 'flex',
    alignItems: 'center',
    gap: '60px',
    flexWrap: 'wrap',
  },
  heritageImageCol: {
    flex: '1 1 450px',
  },
  heritageImageFrame: {
    border: '1px solid var(--color-taupe)',
    padding: '16px',
    backgroundColor: 'var(--color-white)',
    boxShadow: 'var(--shadow-luxury)',
  },
  heritageImage: {
    width: '100%',
    aspectRatio: '1/1',
    objectFit: 'cover',
  },
  heritageTextCol: {
    flex: '1 1 450px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  heritageLabel: {
    fontSize: '11px',
    color: 'var(--color-taupe)',
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    fontWeight: '600',
    marginBottom: '12px',
  },
  heritageTitle: {
    fontSize: '42px',
    color: 'var(--color-burgundy)',
    fontWeight: '400',
    lineHeight: '1.2',
  },
  goldDividerSmall: {
    height: '1px',
    width: '60px',
    backgroundColor: 'var(--color-taupe)',
    margin: '20px 0',
  },
  heritageParagraph: {
    fontSize: '15px',
    color: 'var(--color-dark)',
    lineHeight: '1.7',
    marginBottom: '20px',
    fontWeight: '300',
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '30px',
  },
  productCardWrapper: {
    animation: 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  viewAllWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '50px',
  },
  instaSection: {
    padding: '80px 0',
    backgroundColor: 'var(--color-light-gray)',
    borderTop: '1px solid var(--color-border)',
  },
  instaHandle: {
    color: 'var(--color-taupe)',
    fontFamily: 'var(--font-sans)',
    fontSize: '16px',
    fontWeight: '500',
    letterSpacing: '0.05em',
    marginTop: '10px',
    transition: 'var(--transition-smooth)',
  },
  instaGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    marginTop: '40px',
  },
  instaFrame: {
    position: 'relative',
    aspectRatio: '1/1',
    overflow: 'hidden',
    cursor: 'pointer',
    border: '1px solid var(--color-border)',
  },
  instaImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'var(--transition-smooth)',
  },
  instaHover: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(64, 18, 22, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'var(--transition-smooth)',
  }
};

// Inject custom banner button animations
const styleCss = `
  section div[style*="categoryCard"]:hover img {
    transform: scale(1.06);
  }
  div[style*="instaFrame"]:hover img {
    transform: scale(1.06);
  }
  div[style*="instaFrame"]:hover div[style*="instaHover"] {
    opacity: 1 !important;
  }
  a[style*="instaHandle"]:hover {
    color: var(--color-burgundy) !important;
    text-decoration: underline;
  }
  @media (max-width: 820px) {
    section[style*="heroSection"] {
      height: 60vh !important;
    }
    h1[style*="heroTitle"] {
      font-size: 36px !important;
    }
    h2[style*="heritageTitle"] {
      font-size: 30px !important;
    }
    div[style*="heritageGrid"] {
      flex-direction: column !important;
      gap: 30px !important;
    }
    div[style*="categoryGrid"] {
      grid-template-columns: 1fr !important;
    }
    div[style*="instaGrid"] {
      grid-template-columns: 1fr 1fr !important;
    }
  }
`;
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.appendChild(document.createTextNode(styleCss));
  document.head.appendChild(style);
}
export default LandingPage;
