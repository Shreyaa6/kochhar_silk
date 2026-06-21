import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Heart, Star, ChevronLeft, ChevronDown, ChevronUp, ShoppingBag, Truck, CornerDownLeft, Sparkles } from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProductId,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigateTo
  } = useShop();

  // Find active product
  const product = useMemo(() => {
    return products.find((p) => p.id === selectedProductId) || products[0];
  }, [selectedProductId]);

  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [quantity, setQuantity] = useState(1);
  
  // Accordion status
  const [openTab, setOpenTab] = useState<'craft' | 'specs' | 'shipping' | null>('craft');

  const activeWish = isInWishlist(product.id);

  // Sync image if product changes
  React.useEffect(() => {
    setActiveImage(product.image);
    setSelectedSize(product.sizes[0] || 'M');
    setQuantity(1);
  }, [product]);

  // Recommendations: select products from same category, excluding active one
  const recommendations = useMemo(() => {
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 3);
  }, [product]);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize);
  };

  return (
    <div className="container" style={styles.detailPage}>
      {/* Breadcrumb / Back button */}
      <button style={styles.backBtn} onClick={() => navigateTo('shop')}>
        <ChevronLeft size={16} style={{ marginRight: 6 }} />
        Back to Collections
      </button>

      {/* Main product showcase split */}
      <div style={styles.grid}>
        {/* Left Column: Gallery */}
        <div style={styles.galleryCol}>
          <div style={styles.mainImageWrapper}>
            <img src={activeImage} alt={product.title} style={styles.mainImage} />
          </div>
          {/* Thumbnails row */}
          {product.images.length > 1 && (
            <div style={styles.thumbsRow}>
              {product.images.map((img, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.thumbFrame,
                    borderColor: activeImage === img ? 'var(--color-burgundy)' : 'var(--color-border)'
                  }}
                  onClick={() => setActiveImage(img)}
                >
                  <img src={img} alt={`${product.title} thumbnail ${index}`} style={styles.thumbImage} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Information Panel */}
        <div style={styles.infoCol}>
          <span style={styles.brandLabel}>Kochhar Weaving Atelier</span>
          <h1 style={styles.title}>{product.title}</h1>

          {/* Ratings row */}
          <div style={styles.ratingsRow}>
            <div style={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  color={i < Math.floor(product.rating) ? 'var(--color-taupe)' : 'var(--color-border)'}
                  fill={i < Math.floor(product.rating) ? 'var(--color-taupe)' : 'none'}
                />
              ))}
            </div>
            <span style={styles.ratingVal}>{product.rating}</span>
            <span style={styles.reviewsCount}>({product.reviewsCount} verified reviews)</span>
          </div>

          {/* Pricing Box */}
          <div style={styles.priceContainer}>
            <span style={styles.price}>₹{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice && (
              <>
                <span style={styles.originalPrice}>₹{product.originalPrice.toLocaleString('en-IN')}</span>
                <span style={styles.discountBadge}>
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </span>
              </>
            )}
          </div>
          <p style={styles.taxNotice}>Price inclusive of all taxes. Free shipping across India.</p>

          <div style={styles.divider}></div>

          {/* Fabric Highlight Badge */}
          <div style={styles.featureRow}>
            <Sparkles size={16} color="var(--color-taupe)" style={{ marginRight: 10 }} />
            <span>Fabric: <strong>{product.fabric}</strong></span>
          </div>

          {/* Size Select Panel */}
          <div style={styles.sizeSection}>
            <div style={styles.sizeHeader}>
              <span style={styles.selectLabel}>Select Size / Draping</span>
              {product.category !== 'Saree' && <span style={styles.sizeGuideLink}>Sizing Guide</span>}
            </div>
            <div style={styles.sizeOptions}>
              {product.sizes.map((size) => (
                <button
                  key={size}
                  style={{
                    ...styles.sizeBtn,
                    borderColor: selectedSize === size ? 'var(--color-burgundy)' : 'var(--color-border)',
                    backgroundColor: selectedSize === size ? 'var(--color-cream)' : 'var(--color-white)',
                    fontWeight: selectedSize === size ? '600' : '400'
                  }}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Cart Actions Row */}
          <div style={styles.actionRow}>
            {/* Quantity adjustment box */}
            <div style={styles.qtyBox}>
              <button style={styles.qtyBtn} onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span style={styles.qtyVal}>{quantity}</span>
              <button style={styles.qtyBtn} onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>

            {/* Main CTAs */}
            <button
              className="btn-luxury"
              style={styles.addCartBtn}
              onClick={handleAddToCart}
            >
              <ShoppingBag size={16} style={{ marginRight: 10 }} />
              Add to Bag
            </button>

            <button
              className="btn-luxury-outline"
              style={styles.wishBtn}
              onClick={() => toggleWishlist(product)}
              aria-label={activeWish ? "Remove from Wishlist" : "Add to Wishlist"}
            >
              <Heart size={16} color="var(--color-burgundy)" fill={activeWish ? "var(--color-burgundy)" : "none"} />
            </button>
          </div>

          <div style={styles.divider}></div>

          {/* Accordion drawers */}
          <div style={styles.accordionContainer}>
            {/* Tab 1 */}
            <div style={styles.accordionItem}>
              <button
                style={styles.accordionHeader}
                onClick={() => setOpenTab(openTab === 'craft' ? null : 'craft')}
              >
                <span>The Craftsmanship Story</span>
                {openTab === 'craft' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {openTab === 'craft' && (
                <div style={styles.accordionContent}>
                  <p style={{ marginBottom: 12 }}>{product.description}</p>
                  <ul style={styles.bulletsList}>
                    {product.highlights.map((h, i) => (
                      <li key={i} style={styles.bulletItem}>• {h}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Tab 2 */}
            <div style={styles.accordionItem}>
              <button
                style={styles.accordionHeader}
                onClick={() => setOpenTab(openTab === 'specs' ? null : 'specs')}
              >
                <span>Specifications & Care</span>
                {openTab === 'specs' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {openTab === 'specs' && (
                <div style={styles.accordionContent}>
                  <table style={styles.specsTable}>
                    <tbody>
                      {Object.entries(product.specs).map(([key, val]) => (
                        <tr key={key} style={styles.specsRow}>
                          <td style={styles.specsKey}>{key}</td>
                          <td style={styles.specsVal}>{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Tab 3 */}
            <div style={styles.accordionItem}>
              <button
                style={styles.accordionHeader}
                onClick={() => setOpenTab(openTab === 'shipping' ? null : 'shipping')}
              >
                <span>Atelier Shipping & Exchange</span>
                {openTab === 'shipping' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {openTab === 'shipping' && (
                <div style={styles.accordionContent}>
                  <div style={styles.shippingDetail}>
                    <Truck size={16} color="var(--color-taupe)" style={{ marginRight: 10, flexShrink: 0 }} />
                    <p><strong>Complimentary Courier Express Delivery:</strong> Dispatched in 3-5 business days for catalog items, or 10-15 days for custom fits.</p>
                  </div>
                  <div style={styles.shippingDetail}>
                    <CornerDownLeft size={16} color="var(--color-taupe)" style={{ marginRight: 10, flexShrink: 0 }} />
                    <p><strong>Easy Exchanges:</strong> We support a 7-day catalog exchange policy for unused garments containing tags. Custom stitched orders are final sale.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations Slider */}
      {recommendations.length > 0 && (
        <section style={styles.recommendationsSection}>
          <div style={styles.recHeader}>
            <h2 style={styles.recTitle}>Complete The Look</h2>
            <div style={styles.recDivider}></div>
          </div>
          <div style={styles.recGrid}>
            {recommendations.map((recProd) => (
              <div key={recProd.id} style={styles.recCardWrapper}>
                <ProductCard product={recProd} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  detailPage: {
    paddingTop: '30px',
    paddingBottom: '80px',
  },
  backBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: '12px',
    fontWeight: '500',
    color: 'var(--color-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    cursor: 'pointer',
    marginBottom: '30px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr',
    gap: '50px',
  },
  galleryCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  mainImageWrapper: {
    border: '1px solid var(--color-border)',
    borderRadius: '2px',
    overflow: 'hidden',
    aspectRatio: '3/4',
    backgroundColor: 'var(--color-light-gray)',
  },
  mainImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  thumbsRow: {
    display: 'flex',
    gap: '12px',
  },
  thumbFrame: {
    width: '70px',
    height: '90px',
    border: '1.5px solid var(--color-border)',
    borderRadius: '2px',
    cursor: 'pointer',
    overflow: 'hidden',
    transition: 'var(--transition-smooth)',
  },
  thumbImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  infoCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  brandLabel: {
    fontSize: '11px',
    fontWeight: '600',
    color: 'var(--color-taupe)',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    marginBottom: '8px',
  },
  title: {
    fontSize: '36px',
    fontWeight: '400',
    color: 'var(--color-burgundy)',
    lineHeight: '1.2',
    marginBottom: '12px',
  },
  ratingsRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '20px',
  },
  stars: {
    display: 'flex',
  },
  ratingVal: {
    fontSize: '13px',
    fontWeight: '600',
    color: 'var(--color-dark)',
  },
  reviewsCount: {
    fontSize: '12px',
    color: 'var(--color-muted)',
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '6px',
  },
  price: {
    fontSize: '26px',
    fontWeight: '600',
    color: 'var(--color-burgundy)',
  },
  originalPrice: {
    fontSize: '18px',
    color: 'var(--color-muted)',
    textDecoration: 'line-through',
  },
  discountBadge: {
    fontSize: '12px',
    fontWeight: '600',
    backgroundColor: 'var(--color-cream)',
    color: 'var(--color-burgundy)',
    padding: '3px 8px',
    border: '1px solid var(--color-taupe)',
    borderRadius: '2px',
  },
  taxNotice: {
    fontSize: '12px',
    color: 'var(--color-muted)',
    marginBottom: '24px',
    fontWeight: '300',
  },
  divider: {
    height: '1px',
    backgroundColor: 'var(--color-border)',
    margin: '24px 0',
  },
  featureRow: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    color: 'var(--color-dark)',
  },
  sizeSection: {
    marginTop: '24px',
  },
  sizeHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
    marginBottom: '12px',
  },
  selectLabel: {
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: 'var(--color-burgundy)',
  },
  sizeGuideLink: {
    color: 'var(--color-taupe)',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
  sizeOptions: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  sizeBtn: {
    cursor: 'pointer',
    border: '1px solid var(--color-border)',
    borderRadius: '2px',
    padding: '8px 16px',
    fontSize: '13px',
    minWidth: '50px',
    transition: 'var(--transition-smooth)',
  },
  actionRow: {
    display: 'flex',
    gap: '16px',
    marginTop: '30px',
    alignItems: 'center',
  },
  qtyBox: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid var(--color-border)',
    padding: '8px',
    backgroundColor: 'var(--color-light-gray)',
    height: '46px',
  },
  qtyBtn: {
    cursor: 'pointer',
    fontSize: '16px',
    padding: '0 8px',
    color: 'var(--color-dark)',
  },
  qtyVal: {
    padding: '0 12px',
    fontSize: '14px',
    fontWeight: '500',
    minWidth: '24px',
    textAlign: 'center',
  },
  addCartBtn: {
    flex: 1,
    height: '46px',
  },
  wishBtn: {
    width: '46px',
    height: '46px',
    padding: 0,
  },
  accordionContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  accordionItem: {
    borderBottom: '1px solid var(--color-border)',
    paddingBottom: '10px',
  },
  accordionHeader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 0',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: 'var(--color-burgundy)',
    textAlign: 'left',
  },
  accordionContent: {
    padding: '4px 0 16px',
    fontSize: '14px',
    color: 'var(--color-dark)',
    lineHeight: '1.6',
    fontWeight: '300',
    animation: 'fadeIn 0.3s ease-out',
  },
  bulletsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    paddingLeft: '4px',
  },
  bulletItem: {
    listStyleType: 'none',
  },
  specsTable: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  specsRow: {
    borderBottom: '1px solid var(--color-light-gray)',
  },
  specsKey: {
    padding: '8px 0',
    fontSize: '13px',
    fontWeight: '500',
    color: 'var(--color-burgundy)',
    width: '40%',
  },
  specsVal: {
    padding: '8px 0',
    fontSize: '13px',
    color: 'var(--color-dark)',
  },
  shippingDetail: {
    display: 'flex',
    alignItems: 'flex-start',
    fontSize: '13px',
    marginBottom: '12px',
    lineHeight: '1.4',
  },
  recommendationsSection: {
    marginTop: '80px',
    borderTop: '1px solid var(--color-border)',
    paddingTop: '60px',
  },
  recHeader: {
    textAlign: 'center',
    marginBottom: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  recTitle: {
    fontSize: '28px',
    fontWeight: '400',
    color: 'var(--color-burgundy)',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
  },
  recDivider: {
    height: '1px',
    width: '60px',
    backgroundColor: 'var(--color-taupe)',
    margin: '12px 0',
  },
  recGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '30px',
  },
  recCardWrapper: {
    animation: 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
  }
};

// CSS injection for specific responsive issues and hovers
const styleCss = `
  @media (max-width: 820px) {
    div[style*="detailPage"] div[style*="grid"] {
      grid-template-columns: 1fr !important;
      gap: 30px !important;
    }
    div[style*="recGrid"] {
      grid-template-columns: 1fr !important;
    }
  }
`;
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.appendChild(document.createTextNode(styleCss));
  document.head.appendChild(style);
}
export default ProductDetailPage;
