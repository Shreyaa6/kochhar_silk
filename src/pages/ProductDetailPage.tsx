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
    <div className="container" style={{ paddingTop: '30px', paddingBottom: '80px' }}>
      {/* Breadcrumb / Back button */}
      <button className="detail-back-btn" onClick={() => navigateTo('shop')}>
        <ChevronLeft size={16} style={{ marginRight: 6 }} />
        Back to Collections
      </button>

      {/* Main product showcase split */}
      <div className="detail-grid">
        {/* Left Column: Gallery */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="detail-main-image-wrapper">
            <img src={activeImage} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          {/* Thumbnails row */}
          {product.images.length > 1 && (
            <div className="detail-thumbs-row">
              {product.images.map((img, index) => (
                <div
                  key={index}
                  className="detail-thumb-frame"
                  style={{
                    borderColor: activeImage === img ? 'var(--color-burgundy)' : 'var(--color-border)'
                  }}
                  onClick={() => setActiveImage(img)}
                >
                  <img src={img} alt={`${product.title} thumbnail ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Information Panel */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--color-taupe)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' }}>
            Kochhar Weaving Atelier
          </span>
          <h1 className="detail-main-title" style={{ fontSize: '36px', fontWeight: '400', color: 'var(--color-burgundy)', lineHeight: '1.2', marginBottom: '12px' }}>
            {product.title}
          </h1>

          {/* Ratings row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <div style={{ display: 'flex' }}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  color={i < Math.floor(product.rating) ? 'var(--color-taupe)' : 'var(--color-border)'}
                  fill={i < Math.floor(product.rating) ? 'var(--color-taupe)' : 'none'}
                />
              ))}
            </div>
            <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-dark)' }}>{product.rating}</span>
            <span style={{ fontSize: '12px', color: 'var(--color-muted)' }}>({product.reviewsCount} verified reviews)</span>
          </div>

          {/* Pricing Box */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '6px' }}>
            <span style={{ fontSize: '26px', fontWeight: '600', color: 'var(--color-burgundy)' }}>
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <>
                <span style={{ fontSize: '18px', color: 'var(--color-muted)', textDecoration: 'line-through' }}>
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="badge-luxury">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </span>
              </>
            )}
          </div>
          <p style={{ fontSize: '12px', color: 'var(--color-muted)', marginBottom: '24px', fontWeight: '300' }}>
            Price inclusive of all taxes. Free shipping across India.
          </p>

          <div style={{ height: '1px', backgroundColor: 'var(--color-border)', margin: '24px 0' }}></div>

          {/* Fabric Highlight Badge */}
          <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', color: 'var(--color-dark)' }}>
            <Sparkles size={16} color="var(--color-taupe)" style={{ marginRight: 10 }} />
            <span>Fabric: <strong>{product.fabric}</strong></span>
          </div>

          {/* Size Select Panel */}
          <div style={{ marginTop: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '12px' }}>
              <span style={{ fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-burgundy)' }}>
                Select Size / Draping
              </span>
              {product.category !== 'Saree' && <span style={{ color: 'var(--color-taupe)', cursor: 'pointer', textDecoration: 'underline' }}>Sizing Guide</span>}
            </div>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className="detail-size-btn"
                  style={{
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
          <div className="detail-action-row">
            {/* Quantity adjustment box */}
            <div className="detail-qty-box">
              <button className="detail-qty-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span className="detail-qty-val">{quantity}</span>
              <button className="detail-qty-btn" onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>

            {/* Main CTAs */}
            <button
              className="btn-luxury detail-add-cart-btn"
              onClick={handleAddToCart}
            >
              <ShoppingBag size={16} style={{ marginRight: 10 }} />
              Add to Bag
            </button>

            <button
              className="btn-luxury-outline detail-wish-btn"
              onClick={() => toggleWishlist(product)}
              aria-label={activeWish ? "Remove from Wishlist" : "Add to Wishlist"}
            >
              <Heart size={16} color="var(--color-burgundy)" fill={activeWish ? "var(--color-burgundy)" : "none"} />
            </button>
          </div>

          <div style={{ height: '1px', backgroundColor: 'var(--color-border)', margin: '24px 0' }}></div>

          {/* Accordion drawers */}
          <div className="accordion-container" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {/* Tab 1 */}
            <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '10px' }}>
              <button
                className="accordion-header"
                onClick={() => setOpenTab(openTab === 'craft' ? null : 'craft')}
              >
                <span>The Craftsmanship Story</span>
                {openTab === 'craft' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {openTab === 'craft' && (
                <div className="accordion-content">
                  <p style={{ marginBottom: 12 }}>{product.description}</p>
                  <ul className="bullets-list" style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingLeft: '4px' }}>
                    {product.highlights.map((h, i) => (
                      <li key={i} style={{ listStyleType: 'none' }}>• {h}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Tab 2 */}
            <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '10px' }}>
              <button
                className="accordion-header"
                onClick={() => setOpenTab(openTab === 'specs' ? null : 'specs')}
              >
                <span>Specifications & Care</span>
                {openTab === 'specs' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {openTab === 'specs' && (
                <div className="accordion-content">
                  <table className="specs-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <tbody>
                      {Object.entries(product.specs).map(([key, val]) => (
                        <tr key={key} style={{ borderBottom: '1px solid var(--color-light-gray)' }}>
                          <td style={{ padding: '8px 0', fontSize: '13px', fontWeight: '500', color: 'var(--color-burgundy)', width: '40%' }}>
                            {key}
                          </td>
                          <td style={{ padding: '8px 0', fontSize: '13px', color: 'var(--color-dark)' }}>
                            {val}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Tab 3 */}
            <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '10px' }}>
              <button
                className="accordion-header"
                onClick={() => setOpenTab(openTab === 'shipping' ? null : 'shipping')}
              >
                <span>Atelier Shipping & Exchange</span>
                {openTab === 'shipping' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {openTab === 'shipping' && (
                <div className="accordion-content">
                  <div style={{ display: 'flex', alignItems: 'flex-start', fontSize: '13px', marginBottom: '12px', lineHeight: '1.4' }}>
                    <Truck size={16} color="var(--color-taupe)" style={{ marginRight: 10, flexShrink: 0 }} />
                    <p><strong>Complimentary Courier Express Delivery:</strong> Dispatched in 3-5 business days for catalog items, or 10-15 days for custom fits.</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', fontSize: '13px', marginBottom: '12px', lineHeight: '1.4' }}>
                    <CornerDownLeft size={16} color="var(--color-taupe)" style={{ marginRight: 10, flexShrink: 0 }} />
                    <p><strong>Easy Exchanges:</strong> We support a 7-day catalog exchange policy for unused garments containing tags. Custom stitched orders are final sale.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations Section */}
      {recommendations.length > 0 && (
        <section className="recommendations-section" style={{ marginTop: '80px', borderTop: '1px solid var(--color-border)', paddingTop: '60px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '400', color: 'var(--color-burgundy)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Complete The Look
            </h2>
            <div className="gold-divider"></div>
          </div>
          <div className="detail-rec-grid">
            {recommendations.map((recProd) => (
              <div key={recProd.id} className="rec-card-wrapper">
                <ProductCard product={recProd} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailPage;
