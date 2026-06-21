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
    <div className="checkout-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(64, 18, 22, 0.5)', backdropFilter: 'blur(6px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div className="checkout-modal">
        {/* Header */}
        {step < 3 && (
          <div style={{ padding: '24px 30px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'var(--color-light-gray)' }} className="checkout-modal-header">
            <div>
              <h3 style={{ fontSize: '20px', letterSpacing: '0.05em', color: 'var(--color-burgundy)' }}>Checkout Atelier</h3>
              <p style={{ fontSize: '11px', color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '2px' }}>Secure order processing</p>
            </div>
            <button style={{ cursor: 'pointer', padding: '4px', marginLeft: 'auto' }} onClick={handleClose} aria-label="Close Checkout">
              <X size={20} color="var(--color-burgundy)" />
            </button>
          </div>
        )}

        <div className="checkout-modal-body">
          {/* Left Column: Forms */}
          {step === 1 && (
            <div className="checkout-form-col">
              <h4 className="checkout-step-title" style={{ fontSize: '18px', color: 'var(--color-burgundy)', marginBottom: '20px', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>
                1. Shipping Atelier
              </h4>
              <form onSubmit={handleShippingSubmit} className="checkout-form-grid">
                <div className="checkout-input-span-2">
                  <label className="checkout-label">Full Name *</label>
                  <input
                    type="text"
                    required
                    className="input-luxury"
                    placeholder="Siddharth Kochhar"
                    value={shippingForm.fullName}
                    onChange={(e) => setShippingForm({ ...shippingForm, fullName: e.target.value })}
                  />
                </div>
                <div className="checkout-input-group">
                  <label className="checkout-label">Email Address *</label>
                  <input
                    type="email"
                    required
                    className="input-luxury"
                    placeholder="sid@kochharsilk.com"
                    value={shippingForm.email}
                    onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                  />
                </div>
                <div className="checkout-input-group">
                  <label className="checkout-label">Phone Number *</label>
                  <input
                    type="text"
                    required
                    className="input-luxury"
                    placeholder="+91 98765 43210"
                    value={shippingForm.phone}
                    onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                  />
                </div>
                <div className="checkout-input-span-2">
                  <label className="checkout-label">Full Address *</label>
                  <input
                    type="text"
                    required
                    className="input-luxury"
                    placeholder="House No, Street, Landmark"
                    value={shippingForm.address}
                    onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                  />
                </div>
                <div className="checkout-input-group">
                  <label className="checkout-label">Pincode *</label>
                  <input
                    type="text"
                    required
                    className="input-luxury"
                    placeholder="143001"
                    value={shippingForm.pincode}
                    onChange={(e) => setShippingForm({ ...shippingForm, pincode: e.target.value })}
                  />
                </div>
                <div className="checkout-input-group">
                  <label className="checkout-label">City *</label>
                  <input
                    type="text"
                    required
                    className="input-luxury"
                    placeholder="Amritsar"
                    value={shippingForm.city}
                    onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                  />
                </div>
                <div className="checkout-input-span-2">
                  <label className="checkout-label">State *</label>
                  <input
                    type="text"
                    required
                    className="input-luxury"
                    placeholder="Punjab"
                    value={shippingForm.state}
                    onChange={(e) => setShippingForm({ ...shippingForm, state: e.target.value })}
                  />
                </div>

                <div className="checkout-input-span-2" style={{ marginTop: 15 }}>
                  <button type="submit" className="btn-luxury" style={{ width: '100%' }}>
                    Continue to Payment
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="checkout-form-col">
              <h4 className="checkout-step-title" style={{ fontSize: '18px', color: 'var(--color-burgundy)', marginBottom: '20px', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>
                2. Secure Payment
              </h4>

              {/* Payment selector tabs */}
              <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                <button
                  type="button"
                  style={{
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
                    borderColor: paymentMethod === 'card' ? 'var(--color-burgundy)' : 'var(--color-border)',
                    backgroundColor: paymentMethod === 'card' ? 'var(--color-cream)' : 'none'
                  }}
                  onClick={() => setPaymentMethod('card')}
                >
                  <CreditCard size={18} color="var(--color-burgundy)" />
                  <span style={{ fontSize: '11px', fontWeight: '500', textTransform: 'uppercase', marginTop: '6px', color: 'var(--color-burgundy)' }}>Card</span>
                </button>
                <button
                  type="button"
                  style={{
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
                    borderColor: paymentMethod === 'upi' ? 'var(--color-burgundy)' : 'var(--color-border)',
                    backgroundColor: paymentMethod === 'upi' ? 'var(--color-cream)' : 'none'
                  }}
                  onClick={() => setPaymentMethod('upi')}
                >
                  <Landmark size={18} color="var(--color-burgundy)" />
                  <span style={{ fontSize: '11px', fontWeight: '500', textTransform: 'uppercase', marginTop: '6px', color: 'var(--color-burgundy)' }}>UPI / Net</span>
                </button>
                <button
                  type="button"
                  style={{
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
                    borderColor: paymentMethod === 'cod' ? 'var(--color-burgundy)' : 'var(--color-border)',
                    backgroundColor: paymentMethod === 'cod' ? 'var(--color-cream)' : 'none'
                  }}
                  onClick={() => setPaymentMethod('cod')}
                >
                  <Gift size={18} color="var(--color-burgundy)" />
                  <span style={{ fontSize: '11px', fontWeight: '500', textTransform: 'uppercase', marginTop: '6px', color: 'var(--color-burgundy)' }}>COD</span>
                </button>
              </div>

              <form onSubmit={handlePaymentSubmit}>
                {paymentMethod === 'card' && (
                  <div className="checkout-form-grid">
                    <div className="checkout-input-span-2">
                      <label className="checkout-label">Card Number *</label>
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
                    <div className="checkout-input-span-2">
                      <label className="checkout-label">Cardholder Name *</label>
                      <input
                        type="text"
                        required
                        className="input-luxury"
                        placeholder="SIDDHARTH KOCHHAR"
                        value={cardForm.name}
                        onChange={(e) => setCardForm({ ...cardForm, name: e.target.value.toUpperCase() })}
                      />
                    </div>
                    <div className="checkout-input-group">
                      <label className="checkout-label">Expiry Date *</label>
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
                    <div className="checkout-input-group">
                      <label className="checkout-label">CVV *</label>
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
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '15px 0' }}>
                    <div style={{ padding: '10px', border: '1px dashed var(--color-border)', backgroundColor: 'var(--color-light-gray)', marginBottom: '10px' }}>
                      <div style={{ width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-white)' }}>
                        <div style={{ border: '2px solid var(--color-burgundy)', padding: 10, borderRadius: 4 }}>
                          <CheckCircle size={48} color="var(--color-taupe)" />
                        </div>
                      </div>
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--color-muted)', marginBottom: '15px', textAlign: 'center' }}>
                      Scan the QR above using BHIM, GPAY, or PhonePe to pay securely.
                    </p>
                    <div className="checkout-input-group" style={{ width: '100%' }}>
                      <label className="checkout-label">Or enter your UPI ID *</label>
                      <input type="text" className="input-luxury" placeholder="sid@okaxis" />
                    </div>
                  </div>
                )}

                {paymentMethod === 'cod' && (
                  <div style={{ padding: '20px', backgroundColor: 'var(--color-light-gray)', border: '1px solid var(--color-border)', borderRadius: '4px', marginBottom: '20px' }}>
                    <p style={{ fontSize: '13px', color: 'var(--color-burgundy)', lineHeight: '1.5' }}>
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
                    style={{ width: '100%', textAlign: 'center', fontSize: '12px', color: 'var(--color-muted)', cursor: 'pointer', marginTop: '15px', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                    onClick={() => setStep(1)}
                  >
                    Back to Shipping
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 3 && (
            <div style={{ flex: 1, padding: '40px 30px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
              <div style={{ marginBottom: '20px', borderRadius: '50%' }}>
                <CheckCircle size={64} color="var(--color-taupe)" />
              </div>
              <h2 style={{ fontSize: '28px', color: 'var(--color-burgundy)', marginBottom: '8px' }}>Order Placed Successfully</h2>
              <p style={{ fontSize: '14px', color: 'var(--color-muted)', marginBottom: '24px' }}>Thank you for choosing Kochhar Silk Store.</p>
              <div className="checkout-receipt-box">
                <p style={{ fontSize: '13px', marginBottom: '8px', color: 'var(--color-dark)', lineHeight: '1.4' }}><strong>Client Name:</strong> {shippingForm.fullName || 'Valued Client'}</p>
                <p style={{ fontSize: '13px', marginBottom: '8px', color: 'var(--color-dark)', lineHeight: '1.4' }}><strong>Estimated Delivery:</strong> 5-7 Business Days</p>
                <p style={{ fontSize: '13px', marginBottom: '8px', color: 'var(--color-dark)', lineHeight: '1.4' }}><strong>Order Ref ID:</strong> #KSS-{Math.floor(100000 + Math.random() * 900000)}</p>
                <p style={{ fontSize: '13px', marginBottom: '8px', color: 'var(--color-dark)', lineHeight: '1.4' }}><strong>Delivery Address:</strong> {shippingForm.address}, {shippingForm.city}, {shippingForm.state}</p>
              </div>
              <p style={{ fontSize: '12px', color: 'var(--color-muted)', maxWidth: '400px', marginBottom: '24px', lineHeight: '1.5' }}>
                A detailed invoice and confirmation email have been sent to {shippingForm.email || 'your inbox'}.
              </p>
              <button className="btn-luxury" style={{ marginTop: 10 }} onClick={handleClose}>
                Continue Shopping
              </button>
            </div>
          )}

          {/* Right Column: Summary Panel */}
          {step < 3 && (
            <div className="checkout-summary-col">
              <h4 style={{ fontSize: '16px', color: 'var(--color-burgundy)', marginBottom: '20px' }}>Your Order Summary</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxHeight: '200px', overflowY: 'auto', marginBottom: '20px', paddingRight: '6px' }}>
                {cart.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '12px' }}>
                    <img src={item.product.image} alt={item.product.title} style={{ width: '50px', height: '65px', objectFit: 'cover', border: '1px solid var(--color-border)', borderRadius: '2px' }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '12px', fontWeight: '500', color: 'var(--color-burgundy)', lineHeight: '1.3' }}>{item.product.title}</p>
                      <p style={{ fontSize: '11px', color: 'var(--color-muted)', marginTop: '2px' }}>Qty: {item.quantity} | Size: {item.selectedSize}</p>
                      <p style={{ fontSize: '12px', fontWeight: '600', color: 'var(--color-taupe)', marginTop: '4px' }}>₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Details */}
              <div style={{ marginTop: 'auto', borderTop: '1px solid var(--color-border)', paddingTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--color-dark)', marginBottom: '10px' }}>
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--color-dark)', marginBottom: '10px' }}>
                  <span>Atelier Packaging</span>
                  <span style={{ color: 'var(--color-taupe)' }}>Complimentary</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--color-dark)', marginBottom: '10px' }}>
                  <span>Shipping Details</span>
                  <span style={{ color: 'var(--color-taupe)' }}>Complimentary</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--color-dark)', marginBottom: '10px', borderTop: '1px solid var(--color-border)', paddingTop: 12, marginTop: 12, fontWeight: '600' }}>
                  <span>Total Amount</span>
                  <span style={{ fontSize: '18px', color: 'var(--color-burgundy)' }}>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: 'var(--color-muted)', marginTop: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
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

export default CheckoutModal;
