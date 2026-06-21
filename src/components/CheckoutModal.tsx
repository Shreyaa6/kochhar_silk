import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, ShieldCheck, CreditCard, Landmark, CheckCircle, Gift } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setCheckoutOpen,
    cart,
    cartTotal,
    clearCart
  } = useShop();

  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
  const [shippingForm, setShippingForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    state: ''
  });
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod'>('card');
  const [cardForm, setCardForm] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  if (!isCheckoutOpen) return null;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
    clearCart();
  };

  const handleClose = () => {
    setCheckoutOpen(false);
    setStep(1); // Reset step
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        {/* Header (Hidden on success step to emphasize the clean graphics) */}
        {step < 3 && (
          <div style={styles.header}>
            <div>
              <h3 style={styles.modalTitle}>Checkout Atelier</h3>
              <p style={styles.modalSubtitle}>Secure order processing</p>
            </div>
            <button style={styles.closeBtn} onClick={handleClose} aria-label="Close Checkout">
              <X size={20} color="var(--color-burgundy)" />
            </button>
          </div>
        )}

        <div style={styles.body}>
          {/* Left Column: Forms */}
          {step === 1 && (
            <div style={styles.formColumn}>
              <h4 style={styles.stepTitle}>1. Shipping Atelier</h4>
              <form onSubmit={handleShippingSubmit} style={styles.formGrid}>
                <div style={{ ...styles.inputGroup, gridColumn: 'span 2' }}>
                  <label style={styles.label}>Full Name *</label>
                  <input
                    type="text"
                    required
                    className="input-luxury"
                    placeholder="Siddharth Kochhar"
                    value={shippingForm.fullName}
                    onChange={(e) => setShippingForm({ ...shippingForm, fullName: e.target.value })}
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Email Address *</label>
                  <input
                    type="email"
                    required
                    className="input-luxury"
                    placeholder="sid@kochharsilk.com"
                    value={shippingForm.email}
                    onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Phone Number *</label>
                  <input
                    type="tel"
                    required
                    className="input-luxury"
                    placeholder="+91 98765 43210"
                    value={shippingForm.phone}
                    onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                  />
                </div>
                <div style={{ ...styles.inputGroup, gridColumn: 'span 2' }}>
                  <label style={styles.label}>Full Address *</label>
                  <input
                    type="text"
                    required
                    className="input-luxury"
                    placeholder="House No, Street, Landmark"
                    value={shippingForm.address}
                    onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Pincode *</label>
                  <input
                    type="text"
                    required
                    className="input-luxury"
                    placeholder="143001"
                    value={shippingForm.pincode}
                    onChange={(e) => setShippingForm({ ...shippingForm, pincode: e.target.value })}
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>City *</label>
                  <input
                    type="text"
                    required
                    className="input-luxury"
                    placeholder="Amritsar"
                    value={shippingForm.city}
                    onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                  />
                </div>
                <div style={{ ...styles.inputGroup, gridColumn: 'span 2' }}>
                  <label style={styles.label}>State *</label>
                  <input
                    type="text"
                    required
                    className="input-luxury"
                    placeholder="Punjab"
                    value={shippingForm.state}
                    onChange={(e) => setShippingForm({ ...shippingForm, state: e.target.value })}
                  />
                </div>

                <div style={{ gridColumn: 'span 2', marginTop: 15 }}>
                  <button type="submit" className="btn-luxury" style={{ width: '100%' }}>
                    Continue to Payment
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 2 && (
            <div style={styles.formColumn}>
              <h4 style={styles.stepTitle}>2. Secure Payment</h4>

              {/* Payment selector tabs */}
              <div style={styles.paymentSelector}>
                <button
                  type="button"
                  style={{
                    ...styles.paymentTab,
                    borderColor: paymentMethod === 'card' ? 'var(--color-burgundy)' : 'var(--color-border)',
                    backgroundColor: paymentMethod === 'card' ? 'var(--color-cream)' : 'none'
                  }}
                  onClick={() => setPaymentMethod('card')}
                >
                  <CreditCard size={18} color="var(--color-burgundy)" />
                  <span style={styles.tabText}>Card</span>
                </button>
                <button
                  type="button"
                  style={{
                    ...styles.paymentTab,
                    borderColor: paymentMethod === 'upi' ? 'var(--color-burgundy)' : 'var(--color-border)',
                    backgroundColor: paymentMethod === 'upi' ? 'var(--color-cream)' : 'none'
                  }}
                  onClick={() => setPaymentMethod('upi')}
                >
                  <Landmark size={18} color="var(--color-burgundy)" />
                  <span style={styles.tabText}>UPI / Net</span>
                </button>
                <button
                  type="button"
                  style={{
                    ...styles.paymentTab,
                    borderColor: paymentMethod === 'cod' ? 'var(--color-burgundy)' : 'var(--color-border)',
                    backgroundColor: paymentMethod === 'cod' ? 'var(--color-cream)' : 'none'
                  }}
                  onClick={() => setPaymentMethod('cod')}
                >
                  <Gift size={18} color="var(--color-burgundy)" />
                  <span style={styles.tabText}>COD</span>
                </button>
              </div>

              <form onSubmit={handlePaymentSubmit}>
                {paymentMethod === 'card' && (
                  <div style={styles.formGrid}>
                    <div style={{ ...styles.inputGroup, gridColumn: 'span 2' }}>
                      <label style={styles.label}>Card Number *</label>
                      <input
                        type="text"
                        required
                        className="input-luxury"
                        placeholder="4321 8765 9012 3456"
                        maxLength={19}
                        value={cardForm.number}
                        onChange={(e) => setCardForm({ ...cardForm, number: e.target.value })}
                      />
                    </div>
                    <div style={{ ...styles.inputGroup, gridColumn: 'span 2' }}>
                      <label style={styles.label}>Cardholder Name *</label>
                      <input
                        type="text"
                        required
                        className="input-luxury"
                        placeholder="SIDDHARTH KOCHHAR"
                        value={cardForm.name}
                        onChange={(e) => setCardForm({ ...cardForm, name: e.target.value.toUpperCase() })}
                      />
                    </div>
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Expiry Date *</label>
                      <input
                        type="text"
                        required
                        className="input-luxury"
                        placeholder="MM/YY"
                        maxLength={5}
                        value={cardForm.expiry}
                        onChange={(e) => setCardForm({ ...cardForm, expiry: e.target.value })}
                      />
                    </div>
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>CVV *</label>
                      <input
                        type="password"
                        required
                        className="input-luxury"
                        placeholder="***"
                        maxLength={3}
                        value={cardForm.cvv}
                        onChange={(e) => setCardForm({ ...cardForm, cvv: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div style={styles.upiContainer}>
                    <div style={styles.qrCodeBox}>
                      {/* Simulating QR check grid */}
                      <div style={styles.dummyQr}>
                        <div style={{ border: '2px solid var(--color-burgundy)', padding: 10, borderRadius: 4 }}>
                          <CheckCircle size={48} color="var(--color-taupe)" />
                        </div>
                      </div>
                    </div>
                    <p style={styles.upiInstructions}>Scan the QR above using BHIM, GPAY, or PhonePe to pay securely.</p>
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Or enter your UPI ID *</label>
                      <input type="text" className="input-luxury" placeholder="sid@okaxis" />
                    </div>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div style={styles.codContainer}>
                    <p style={styles.codNotice}>
                      Cash on Delivery is available. A validation charge of ₹50 may apply at delivery time. Please confirm details.
                    </p>
                  </div>
                )}

                <div style={{ marginTop: 24 }}>
                  <button type="submit" className="btn-luxury" style={{ width: '100%' }}>
                    Place Order (₹{cartTotal.toLocaleString('en-IN')})
                  </button>
                  <button
                    type="button"
                    style={styles.backBtn}
                    onClick={() => setStep(1)}
                  >
                    Back to Shipping
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 3 && (
            <div style={styles.successContainer}>
              <div style={styles.successIconWrapper}>
                <CheckCircle size={64} color="var(--color-taupe)" />
              </div>
              <h2 style={styles.successTitle}>Order Placed Successfully</h2>
              <p style={styles.successSubtitle}>Thank you for choosing Kochhar Silk Store.</p>
              <div style={styles.receiptBox}>
                <p style={styles.receiptRow}><strong>Client Name:</strong> {shippingForm.fullName || 'Valued Client'}</p>
                <p style={styles.receiptRow}><strong>Estimated Delivery:</strong> 5-7 Business Days</p>
                <p style={styles.receiptRow}><strong>Order Ref ID:</strong> #KSS-{Math.floor(100000 + Math.random() * 900000)}</p>
                <p style={styles.receiptRow}><strong>Delivery Address:</strong> {shippingForm.address}, {shippingForm.city}, {shippingForm.state}</p>
              </div>
              <p style={styles.successEmailNotice}>A detailed invoice and confirmation email have been sent to {shippingForm.email || 'your inbox'}.</p>
              <button className="btn-luxury" style={{ marginTop: 10 }} onClick={handleClose}>
                Continue Shopping
              </button>
            </div>
          )}

          {/* Right Column: Summary Panel (Hidden on success screen) */}
          {step < 3 && (
            <div style={styles.summaryColumn}>
              <h4 style={styles.summaryTitle}>Your Order Summary</h4>
              <div style={styles.summaryList}>
                {cart.map((item, idx) => (
                  <div key={idx} style={styles.summaryItem}>
                    <img src={item.product.image} alt={item.product.title} style={styles.summaryImage} />
                    <div style={styles.summaryDetails}>
                      <p style={styles.summaryItemTitle}>{item.product.title}</p>
                      <p style={styles.summaryItemSub}>Qty: {item.quantity} | Size: {item.selectedSize}</p>
                      <p style={styles.summaryItemPrice}>₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Details */}
              <div style={styles.priceSummary}>
                <div style={styles.priceRow}>
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div style={styles.priceRow}>
                  <span>Atelier Packaging</span>
                  <span style={{ color: 'var(--color-taupe)' }}>Complimentary</span>
                </div>
                <div style={styles.priceRow}>
                  <span>Shipping Details</span>
                  <span style={{ color: 'var(--color-taupe)' }}>Complimentary</span>
                </div>
                <div style={{ ...styles.priceRow, borderTop: '1px solid var(--color-border)', paddingTop: 12, marginTop: 12, fontWeight: '600' }}>
                  <span>Total Amount</span>
                  <span style={{ fontSize: '18px', color: 'var(--color-burgundy)' }}>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div style={styles.securitySeal}>
                <ShieldCheck size={18} color="var(--color-taupe)" style={{ marginRight: 8 }} />
                <span>128-bit SSL encrypted connections</span>
              </div>
            </div>
          )}
        </div>
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
    backgroundColor: 'rgba(64, 18, 22, 0.5)',
    backdropFilter: 'blur(6px)',
    zIndex: 2000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    animation: 'fadeIn 0.3s ease-out',
  },
  modal: {
    backgroundColor: 'var(--color-white)',
    width: '900px',
    maxWidth: '100%',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: 'var(--shadow-drawer)',
    animation: 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  header: {
    padding: '24px 30px',
    borderBottom: '1px solid var(--color-border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'var(--color-light-gray)',
  },
  modalTitle: {
    fontSize: '20px',
    letterSpacing: '0.05em',
    color: 'var(--color-burgundy)',
  },
  modalSubtitle: {
    fontSize: '11px',
    color: 'var(--color-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginTop: '2px',
  },
  closeBtn: {
    cursor: 'pointer',
    padding: '4px',
  },
  body: {
    display: 'flex',
    flex: 1,
    overflow: 'hidden',
  },
  formColumn: {
    flex: 1.2,
    padding: '30px',
    overflowY: 'auto',
  },
  stepTitle: {
    fontSize: '18px',
    color: 'var(--color-burgundy)',
    marginBottom: '20px',
    borderBottom: '1px solid var(--color-border)',
    paddingBottom: '8px',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '12px',
    fontWeight: '500',
    color: 'var(--color-burgundy)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  paymentSelector: {
    display: 'flex',
    gap: '12px',
    marginBottom: '24px',
  },
  paymentTab: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px 6px',
    border: '1px solid var(--color-border)',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'var(--transition-smooth)',
  },
  tabText: {
    fontSize: '11px',
    fontWeight: '500',
    textTransform: 'uppercase',
    marginTop: '6px',
    color: 'var(--color-burgundy)',
  },
  upiContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '15px 0',
  },
  qrCodeBox: {
    padding: '10px',
    border: '1px dashed var(--color-border)',
    backgroundColor: 'var(--color-light-gray)',
    marginBottom: '10px',
  },
  dummyQr: {
    width: '120px',
    height: '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--color-white)',
  },
  upiInstructions: {
    fontSize: '12px',
    color: 'var(--color-muted)',
    marginBottom: '15px',
    textAlign: 'center',
  },
  codContainer: {
    padding: '20px',
    backgroundColor: 'var(--color-light-gray)',
    border: '1px solid var(--color-border)',
    borderRadius: '4px',
    marginBottom: '20px',
  },
  codNotice: {
    fontSize: '13px',
    color: 'var(--color-burgundy)',
    lineHeight: '1.5',
  },
  backBtn: {
    width: '100%',
    textAlign: 'center',
    fontSize: '12px',
    color: 'var(--color-muted)',
    cursor: 'pointer',
    marginTop: '15px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  summaryColumn: {
    flex: 1,
    backgroundColor: 'var(--color-light-gray)',
    borderLeft: '1px solid var(--color-border)',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto',
  },
  summaryTitle: {
    fontSize: '16px',
    color: 'var(--color-burgundy)',
    marginBottom: '20px',
  },
  summaryList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    maxHeight: '200px',
    overflowY: 'auto',
    marginBottom: '20px',
    paddingRight: '6px',
  },
  summaryItem: {
    display: 'flex',
    gap: '12px',
  },
  summaryImage: {
    width: '50px',
    height: '65px',
    objectFit: 'cover',
    border: '1px solid var(--color-border)',
    borderRadius: '2px',
  },
  summaryDetails: {
    flex: 1,
  },
  summaryItemTitle: {
    fontSize: '12px',
    fontWeight: '500',
    color: 'var(--color-burgundy)',
    lineHeight: '1.3',
  },
  summaryItemSub: {
    fontSize: '11px',
    color: 'var(--color-muted)',
    marginTop: '2px',
  },
  summaryItemPrice: {
    fontSize: '12px',
    fontWeight: '600',
    color: 'var(--color-taupe)',
    marginTop: '4px',
  },
  priceSummary: {
    marginTop: 'auto',
    borderTop: '1px solid var(--color-border)',
    paddingTop: '20px',
  },
  priceRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
    color: 'var(--color-dark)',
    marginBottom: '10px',
  },
  securitySeal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    color: 'var(--color-muted)',
    marginTop: '20px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  successContainer: {
    flex: 1,
    padding: '40px 30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  successIconWrapper: {
    marginBottom: '20px',
    animation: 'pulseGold 2s infinite',
    borderRadius: '50%',
  },
  successTitle: {
    fontSize: '28px',
    color: 'var(--color-burgundy)',
    marginBottom: '8px',
  },
  successSubtitle: {
    fontSize: '14px',
    color: 'var(--color-muted)',
    marginBottom: '24px',
  },
  receiptBox: {
    width: '100%',
    maxWidth: '450px',
    backgroundColor: 'var(--color-light-gray)',
    border: '1px solid var(--color-border)',
    padding: '20px',
    textAlign: 'left',
    marginBottom: '20px',
    borderRadius: '4px',
  },
  receiptRow: {
    fontSize: '13px',
    marginBottom: '8px',
    color: 'var(--color-dark)',
    lineHeight: '1.4',
  },
  successEmailNotice: {
    fontSize: '12px',
    color: 'var(--color-muted)',
    maxWidth: '400px',
    marginBottom: '24px',
    lineHeight: '1.5',
  }
};

// Inject CSS style for layout responses in browser
const styleCss = `
  @media (max-width: 768px) {
    div[style*="body"] {
      flex-direction: column !important;
      overflow-y: auto !important;
    }
    div[style*="summaryColumn"] {
      border-left: none !important;
      border-top: 1px solid var(--color-border) !important;
      margin-top: 20px !important;
    }
  }
`;
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.appendChild(document.createTextNode(styleCss));
  document.head.appendChild(style);
}
export default CheckoutModal;
