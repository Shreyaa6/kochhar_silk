import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}

export type Page = 'home' | 'shop' | 'product-detail' | 'wishlist';

interface ShopContextType {
  currentPage: Page;
  selectedProductId: number | null;
  cart: CartItem[];
  wishlist: Product[];
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  searchQuery: string;
  categoryFilter: string;
  priceFilter: number;
  addToCart: (product: Product, quantity: number, selectedSize: string) => void;
  removeFromCart: (productId: number, selectedSize: string) => void;
  updateCartQty: (productId: number, selectedSize: string, quantity: number) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: number) => boolean;
  navigateTo: (page: Page, productId?: number | null) => void;
  setSearchQuery: (query: string) => void;
  setCategoryFilter: (category: string) => void;
  setPriceFilter: (price: number) => void;
  setCartOpen: (open: boolean) => void;
  setCheckoutOpen: (open: boolean) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isCartOpen, setCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setCheckoutOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [priceFilter, setPriceFilter] = useState<number>(100000);

  // Derive cart quantities and totals
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  // Smooth scroll to top when page changes
  const navigateTo = (page: Page, productId: number | null = null) => {
    setCurrentPage(page);
    if (productId !== null) {
      setSelectedProductId(productId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, quantity: number, selectedSize: string) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === selectedSize
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      }

      return [...prevCart, { product, quantity, selectedSize }];
    });
    setCartOpen(true); // Auto-open cart drawer on item addition
  };

  const removeFromCart = (productId: number, selectedSize: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.product.id === productId && item.selectedSize === selectedSize))
    );
  };

  const updateCartQty = (productId: number, selectedSize: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId && item.selectedSize === selectedSize
          ? { ...item, quantity }
          : item
      )
    );
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((prevWishlist) => {
      const isAlreadyIn = prevWishlist.some((item) => item.id === product.id);
      if (isAlreadyIn) {
        return prevWishlist.filter((item) => item.id !== product.id);
      }
      return [...prevWishlist, product];
    });
  };

  const isInWishlist = (productId: number) => {
    return wishlist.some((item) => item.id === productId);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <ShopContext.Provider
      value={{
        currentPage,
        selectedProductId,
        cart,
        wishlist,
        isCartOpen,
        isCheckoutOpen,
        searchQuery,
        categoryFilter,
        priceFilter,
        addToCart,
        removeFromCart,
        updateCartQty,
        toggleWishlist,
        isInWishlist,
        navigateTo,
        setSearchQuery,
        setCategoryFilter,
        setPriceFilter,
        setCartOpen,
        setCheckoutOpen,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
