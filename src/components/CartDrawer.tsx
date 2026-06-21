import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setCartOpen,
    updateCartQty,
    removeFromCart,
    cartTotal,
    navigateTo,
    setCheckoutOpen
  } = useShop();

  if (!isCartOpen) return null;

  const handleCheckoutClick = () => {
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  return (
    <div style={styles.overlay} onClick={() => setCartOpen(false)}>
      {/* Drawer Container */}
      <div
        style={styles.drawer}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking drawer content
      >
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerTitle}>
            <ShoppingBag size={20} color="var(--color-burgundy)" style={{ marginRight: 8 }} />
            <h3 style={{ fontSize: '20px', letterSpacing: '0.05em' }}>Your Bag</h3>
          </div>
          <button style={styles.closeBtn} onClick={() => setCartOpen(false)} aria-label="Close Cart">
            <X size={20} color="var(--color-burgundy)" />
          </button>
        </div>

        {/* Content Section */}
        <div style={styles.content}>
          {cart.length === 0 ? (
            <div style={styles.emptyState}>
              <ShoppingBag size={48} color="var(--color-champagne)" style={{ marginBottom: 16 }} />
              <p style={styles.emptyText}>Your shopping bag is empty.</p>
              <button
                className="btn-luxury"
                style={{ marginTop: 20 }}
                onClick={() => {
                  setCartOpen(false);
                  navigateTo('shop');
                }}
              >
                Explore Collection
              </button>
            </div>
          ) : (
            <div style={styles.itemsList}>
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedSize}`} style={styles.itemRow}>
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    style={styles.itemImage}
                    onClick={() => {
                      navigateTo('product-detail', item.product.id);
                      setCartOpen(false);
                    }}
                  />
                  <div style={styles.itemDetails}>
                    <h4
                      style={styles.itemTitle}
                      onClick={() => {
                        navigateTo('product-detail', item.product.id);
                        setCartOpen(false);
                      }}
                    >
                      {item.product.title}
                    </h4>
                    <p style={styles.itemSize}>Size: {item.selectedSize}</p>
                    <p style={styles.itemPrice}>₹{item.product.price.toLocaleString('en-IN')}</p>

                    {/* Quantity Selector and Delete Row */}
                    <div style={styles.itemActions}>
                      <div style={styles.qtyControl}>
                        <button
                          style={styles.qtyBtn}
                          onClick={() => updateCartQty(item.product.id, item.selectedSize, item.quantity - 1)}
                        >
                          <Minus size={12} color="var(--color-dark)" />
                        </button>
                        <span style={styles.qtyVal}>{item.quantity}</span>
                        <button
                          style={styles.qtyBtn}
                          onClick={() => updateCartQty(item.product.id, item.selectedSize, item.quantity + 1)}
                        >
                          <Plus size={12} color="var(--color-dark)" />
                        </button>
                      </div>

                      <button
                        style={styles.deleteBtn}
                        onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                        aria-label="Remove Item"
                      >
                        <Trash2 size={16} color="var(--color-muted)" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Area with Subtotals */}
        {cart.length > 0 && (
          <div style={styles.footer}>
            <div style={styles.subtotalRow}>
              <span style={styles.subtotalLabel}>Subtotal</span>
              <span style={styles.subtotalVal}>₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
            <p style={styles.shippingNotice}>Shipping and taxes calculated at checkout.</p>
            <button
              className="btn-luxury"
              style={styles.checkoutBtn}
              onClick={handleCheckoutClick}
            >
              Proceed to Checkout
            </button>
            <button
              style={styles.continueBtn}
              onClick={() => setCartOpen(false)}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(64, 18, 22, 0.4)',
    backdropFilter: 'blur(5px)',
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'flex-end',
    animation: 'fadeIn 0.3s ease-out',
  },
  drawer: {
    width: '450px',
    maxWidth: '100%',
    height: '100%',
    backgroundColor: 'var(--color-white)',
    boxShadow: 'var(--shadow-drawer)',
    display: 'flex',
    flexDirection: 'column',
    animation: 'slideLeft 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  header: {
    padding: '24px 30px',
    borderBottom: '1px solid var(--color-border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'var(--color-light-gray)',
  },
  headerTitle: {
    display: 'flex',
    alignItems: 'center',
  },
  closeBtn: {
    cursor: 'pointer',
    padding: '4px',
  },
  content: {
    flex: 1,
    overflowY: 'auto',
    padding: '30px',
  },
  emptyState: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: '15px',
    color: 'var(--color-muted)',
    fontWeight: '300',
  },
  itemsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  itemRow: {
    display: 'flex',
    gap: '16px',
    borderBottom: '1px solid var(--color-border)',
    paddingBottom: '20px',
  },
  itemImage: {
    width: '80px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '2px',
    cursor: 'pointer',
    border: '1px solid var(--color-border)',
  },
  itemDetails: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  itemTitle: {
    fontSize: '14px',
    fontWeight: '500',
    color: 'var(--color-burgundy)',
    marginBottom: '4px',
    cursor: 'pointer',
    lineHeight: '1.3',
  },
  itemSize: {
    fontSize: '12px',
    color: 'var(--color-muted)',
    marginBottom: '6px',
  },
  itemPrice: {
    fontSize: '14px',
    fontWeight: '600',
    color: 'var(--color-taupe)',
    marginBottom: '12px',
  },
  itemActions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  qtyControl: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid var(--color-border)',
    padding: '4px 8px',
    backgroundColor: 'var(--color-light-gray)',
  },
  qtyBtn: {
    cursor: 'pointer',
    padding: '2px 6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyVal: {
    fontSize: '13px',
    padding: '0 10px',
    minWidth: '20px',
    textAlign: 'center',
  },
  deleteBtn: {
    cursor: 'pointer',
    padding: '4px',
    transition: 'var(--transition-smooth)',
  },
  footer: {
    padding: '24px 30px 40px',
    borderTop: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-light-gray)',
  },
  subtotalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '18px',
    fontWeight: '600',
    color: 'var(--color-burgundy)',
    marginBottom: '8px',
  },
  subtotalLabel: {
    fontFamily: 'var(--font-serif)',
  },
  subtotalVal: {
    color: 'var(--color-burgundy)',
  },
  shippingNotice: {
    fontSize: '12px',
    color: 'var(--color-muted)',
    marginBottom: '20px',
    fontWeight: '300',
  },
  checkoutBtn: {
    width: '100%',
    marginBottom: '12px',
  },
  continueBtn: {
    width: '100%',
    textAlign: 'center',
    fontSize: '12px',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: 'var(--color-muted)',
    cursor: 'pointer',
    marginTop: '8px',
  }
};

// In case CSS rules need extra styling for drawer responsiveness:
const css = `
  button[aria-label="Remove Item"]:hover {
    color: var(--color-burgundy) !important;
  }
`;
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);
}
