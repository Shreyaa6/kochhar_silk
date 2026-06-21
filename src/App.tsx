import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { LandingPage } from './pages/LandingPage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { FavoritesPage } from './pages/FavoritesPage';
import './App.css';

const MainContent: React.FC = () => {
  const { currentPage } = useShop();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <LandingPage />;
      case 'shop':
        return <ShopPage />;
      case 'product-detail':
        return <ProductDetailPage />;
      case 'wishlist':
        return <FavoritesPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <>
      <Navbar />
      <main style={styles.main}>
        {renderPage()}
      </main>
      <Footer />
      <CartDrawer />
      <CheckoutModal />
    </>
  );
};

function App() {
  return (
    <ShopProvider>
      <MainContent />
    </ShopProvider>
  );
}

const styles = {
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    width: '100%',
  }
};

export default App;
