import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const InstagramIcon = ({ size = 20, ...props }: { size?: number } & React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export const Footer: React.FC = () => {
  const { navigateTo, setCategoryFilter } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const handleNav = (category: string) => {
    setCategoryFilter(category);
    navigateTo('shop');
  };

  return (
    <footer style={styles.footer}>
      {/* Newsletter Section */}
      <div style={styles.newsletterSection}>
        <div className="container" style={styles.newsletterContainer}>
          <div style={styles.newsletterInfo}>
            <h3 style={styles.newsletterTitle}>Join the House of Kochhar</h3>
            <p style={styles.newsletterSubtitle}>Subscribe to receive exclusive access to heritage collection launches, weaving stories, and private trunk shows.</p>
          </div>
          <form style={styles.newsletterForm} onSubmit={handleSubscribe}>
            {subscribed ? (
              <div style={styles.subscribedMsg}>Welcome to our inner circle. We will be in touch shortly.</div>
            ) : (
              <div style={styles.inputWrapper}>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={styles.newsletterInput}
                />
                <button type="submit" style={styles.newsletterSubmit} aria-label="Subscribe">
                  <ArrowRight size={18} color="var(--color-burgundy)" />
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div style={styles.mainFooter}>
        <div className="container" style={styles.gridContainer}>
          {/* Brand Col */}
          <div style={styles.col}>
            <h2 style={styles.brandLogo}>KOCHHAR</h2>
            <p style={styles.brandDesc}>
              Preserving India's weaving heritage since 1985. We design, craft, and curate authentic, hand-loomed luxury sarees, bridal lehengas, and designer silhouettes.
            </p>
            <div style={styles.socials}>
              <a
                href="https://www.instagram.com/kochharsilkstore/"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.socialIcon}
                aria-label="Instagram"
              >
                <InstagramIcon size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links Col */}
          <div style={styles.col}>
            <h4 style={styles.colTitle}>The Collections</h4>
            <ul style={styles.linksList}>
              <li style={styles.linkItem} onClick={() => handleNav('Saree')}>Pure Silk Sarees</li>
              <li style={styles.linkItem} onClick={() => handleNav('Lehenga')}>Bridal Lehengas</li>
              <li style={styles.linkItem} onClick={() => handleNav('Suit')}>Designer Suits</li>
              <li style={styles.linkItem} onClick={() => handleNav('All')}>Heritage Weaves</li>
            </ul>
          </div>

          {/* Brand Story Col */}
          <div style={styles.col}>
            <h4 style={styles.colTitle}>Our Story</h4>
            <ul style={styles.linksList}>
              <li style={styles.linkItem} onClick={() => navigateTo('home')}>Our Heritage</li>
              <li style={styles.linkItem} onClick={() => navigateTo('home')}>The Artisans</li>
              <li style={styles.linkItem} onClick={() => navigateTo('home')}>Sustainability</li>
              <li style={styles.linkItem} onClick={() => navigateTo('home')}>Private Viewings</li>
            </ul>
          </div>

          {/* Contact Col */}
          <div style={styles.col}>
            <h4 style={styles.colTitle}>The Atelier</h4>
            <ul style={styles.linksList}>
              <li style={styles.contactItem}>
                <MapPin size={16} style={{ marginRight: 8, flexShrink: 0 }} />
                <span>Kochhar Silk Store, Mall Road, Amritsar, Punjab, India</span>
              </li>
              <li style={styles.contactItem}>
                <Phone size={16} style={{ marginRight: 8, flexShrink: 0 }} />
                <span>+91 98765 43210</span>
              </li>
              <li style={styles.contactItem}>
                <Mail size={16} style={{ marginRight: 8, flexShrink: 0 }} />
                <span>atelier@kochharsilk.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright row */}
      <div style={styles.copyrightRow}>
        <div className="container" style={styles.copyContainer}>
          <p>© {new Date().getFullYear()} Kochhar Silk Store. All rights reserved.</p>
          <div style={styles.legalLinks}>
            <span style={styles.legalLink}>Terms of Service</span>
            <span style={styles.legalLink}>Privacy Policy</span>
            <span style={styles.legalLink}>Shipping & Returns</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  footer: {
    backgroundColor: 'var(--color-burgundy)',
    color: 'var(--color-cream)',
    marginTop: 'auto',
    borderTop: '1px solid var(--color-taupe)',
  },
  newsletterSection: {
    borderBottom: '1px solid rgba(255, 237, 218, 0.15)',
    padding: '40px 0',
  },
  newsletterContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '24px',
  },
  newsletterInfo: {
    flex: '1 1 400px',
  },
  newsletterTitle: {
    color: 'var(--color-cream)',
    fontSize: '24px',
    marginBottom: '8px',
    letterSpacing: '0.05em',
  },
  newsletterSubtitle: {
    color: 'var(--color-champagne)',
    fontSize: '13px',
    maxWidth: '500px',
    fontWeight: '300',
  },
  newsletterForm: {
    flex: '1 1 350px',
    maxWidth: '450px',
  },
  inputWrapper: {
    display: 'flex',
    borderBottom: '1.5px solid var(--color-champagne)',
    paddingBottom: '8px',
    alignItems: 'center',
  },
  newsletterInput: {
    flex: 1,
    background: 'none',
    border: 'none',
    outline: 'none',
    color: 'var(--color-cream)',
    fontSize: '14px',
    padding: '4px 8px',
  },
  newsletterSubmit: {
    cursor: 'pointer',
    backgroundColor: 'var(--color-cream)',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '10px',
    transition: 'var(--transition-smooth)',
  },
  subscribedMsg: {
    color: 'var(--color-champagne)',
    fontSize: '14px',
    fontStyle: 'italic',
  },
  mainFooter: {
    padding: '60px 0 40px',
  },
  gridContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '40px',
  },
  col: {
    flex: '1 1 200px',
    minWidth: '180px',
  },
  brandLogo: {
    fontFamily: 'var(--font-serif)',
    fontSize: '32px',
    fontWeight: '500',
    color: 'var(--color-cream)',
    letterSpacing: '0.12em',
    marginBottom: '15px',
  },
  brandDesc: {
    fontSize: '13px',
    lineHeight: '1.6',
    color: 'var(--color-champagne)',
    marginBottom: '20px',
    fontWeight: '300',
  },
  socials: {
    display: 'flex',
    gap: '12px',
  },
  socialIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    border: '1.5px solid rgba(255, 237, 218, 0.3)',
    color: 'var(--color-cream)',
    transition: 'var(--transition-smooth)',
  },
  colTitle: {
    color: 'var(--color-cream)',
    fontFamily: 'var(--font-serif)',
    fontSize: '18px',
    marginBottom: '20px',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
  linksList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  linkItem: {
    fontSize: '13px',
    color: 'var(--color-champagne)',
    cursor: 'pointer',
    transition: 'var(--transition-smooth)',
    fontWeight: '300',
  },
  contactItem: {
    fontSize: '13px',
    color: 'var(--color-champagne)',
    display: 'flex',
    alignItems: 'flex-start',
    lineHeight: '1.4',
    fontWeight: '300',
  },
  copyrightRow: {
    borderTop: '1px solid rgba(255, 237, 218, 0.08)',
    padding: '24px 0',
    fontSize: '12px',
    color: 'var(--color-champagne)',
    fontWeight: '300',
  },
  copyContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px',
  },
  legalLinks: {
    display: 'flex',
    gap: '20px',
  },
  legalLink: {
    cursor: 'pointer',
    transition: 'var(--transition-smooth)',
  }
};

// Inject CSS style for footer interactions and responsive behavior
const css = `
  footer ul li:hover {
    color: var(--color-white) !important;
    transform: translateX(4px);
  }
  footer a:hover {
    border-color: var(--color-white) !important;
    background-color: rgba(255,255,255,0.05);
  }
  @media (max-width: 820px) {
    footer div[style*="newsletterContainer"] {
      flex-direction: column !important;
      align-items: stretch !important;
    }
  }
`;
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);
}
export default Footer;
