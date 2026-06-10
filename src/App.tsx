import { useState, useEffect } from 'react';
import { Currency } from './utils/currency';

// Static Sourced Datasets
import { productsData, farmersData, servicesData, portfolioData, testimonialsData, blogData } from './data';
import { Product, Farmer, CartItem, User, Order } from './types';

// Core Components Imports
import Header from './components/Header';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import Services from './components/Services';
import FeaturedProducts from './components/FeaturedProducts';
import WhyChooseUs from './components/WhyChooseUs';
import FarmerPartners from './components/FarmerPartners';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

// Drawer & Portal Modals
import AuthModal from './components/AuthModal';
import WishlistDrawer from './components/WishlistDrawer';
import CartDrawer from './components/CartDrawer';
import FarmerPortalModal from './components/FarmerPortalModal';

export default function App() {
  // --- States management ---
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('natural_grocery_custom_products');
    if (saved) {
      const parsed = JSON.parse(saved);
      return [...productsData, ...parsed];
    }
    return productsData;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('natural_grocery_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('natural_grocery_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('natural_grocery_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('natural_grocery_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [searchQuery, setSearchQuery] = useState('');
  
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('natural_grocery_dark_mode');
    return saved === 'true';
  });

  const [currency, setCurrency] = useState<Currency>(() => {
    const saved = localStorage.getItem('natural_grocery_currency');
    return (saved === 'USD' || saved === 'INR') ? saved : 'INR';
  });

  // --- Modal Visibility Controls ---
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState<'login' | 'signup'>('login');
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [farmerPortalOpen, setFarmerPortalOpen] = useState(false);

  // --- Theme Sync effect ---
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('natural_grocery_dark_mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('natural_grocery_dark_mode', 'false');
    }
  }, [darkMode]);

  // --- LocalStorage persistence hooks ---
  useEffect(() => {
    localStorage.setItem('natural_grocery_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('natural_grocery_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('natural_grocery_orders', JSON.stringify(orders));
  }, [orders]);

  // --- Action Handlers ---
  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleToggleCurrency = () => {
    setCurrency(prev => {
      const next = prev === 'USD' ? 'INR' : 'USD';
      localStorage.setItem('natural_grocery_currency', next);
      return next;
    });
  };

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthInitialMode(mode);
    setAuthModalOpen(true);
  };

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setAuthModalOpen(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('natural_grocery_current_user');
  };

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existingIdx = prev.findIndex(item => item.product.id === product.id);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.product.id === productId) {
            return { ...item, quantity: item.quantity + delta };
          }
          return item;
        })
        .filter(item => item.quantity > 0);
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const handleRemoveFromWishlist = (product: Product) => {
    setWishlist(prev => prev.filter(item => item.id !== product.id));
  };

  const handleAddOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
  };

  const handleAddProduct = (newProduct: Product) => {
    setProducts(prev => {
      const updated = [newProduct, ...prev];
      // Sync added custom farming items to local cache separate from default ones
      const customOnly = updated.filter(p => p.id.startsWith('p_farm_'));
      localStorage.setItem('natural_grocery_custom_products', JSON.stringify(customOnly));
      return updated;
    });
  };

  const handleOpenProductDetails = (product: Product) => {
    setWishlistOpen(false);
    // Set query of that name in search, or wait, we can let them scroll/focus or trigger details
    // For comfort, we can just trigger Search to make sure it exists, or just append cart immediately
    handleAddToCart(product, 1);
  };

  const handleScrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBecomeSellerAction = () => {
    // If not logged in, prompt sign-in first as a farmer
    if (!currentUser) {
      handleOpenAuth('signup');
    } else {
      setFarmerPortalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 font-sans transition-all duration-300">
      
      {/* Scroll-sticky navigation header */}
      <Header
        cart={cart}
        wishlist={wishlist}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenAuth={handleOpenAuth}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenFarmerPortal={() => setFarmerPortalOpen(true)}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
        currency={currency}
        onToggleCurrency={handleToggleCurrency}
      />

      {/* Hero section */}
      <Hero
        onShopClick={handleScrollToCatalog}
        onBecomeSellerClick={handleBecomeSellerAction}
      />

      {/* Main Pages Flow */}
      <main className="relative z-10">
        {/* About corporate story */}
        <AboutUs />

        {/* Business logistics capabilities */}
        <Services />

        {/* Core Product catalog with active visual search filters */}
        <FeaturedProducts
          products={filteredProductsHandler(products, searchQuery)}
          wishlist={wishlist}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          searchQuery={searchQuery}
          currency={currency}
        />

        {/* competitive cards grids */}
        <WhyChooseUs />

        {/* Meet our farmers testimonial cards */}
        <FarmerPartners farmers={farmersData} />

        {/* Socio and Eco metrics report grids */}
        <Portfolio items={portfolioData} />

        {/* customer sliding reviews carousel */}
        <Testimonials items={testimonialsData} />

        {/* knowledge hub blogs and modals */}
        <Blog posts={blogData} />

        {/* direct feedback coordinates and GIS interactive hub map */}
        <Contact />

        {/* Newsletter subscribe card banner */}
        <Newsletter />
      </main>

      {/* structural sitemap footer */}
      <Footer />

      {/* --- DRAWERS & PORTAL OVERLAY MODALS RENDERS --- */}
      
      {/* Auth Account wizard */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        initialMode={authInitialMode}
      />

      {/* Saved wishlist slide panels */}
      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onAddToCart={handleAddToCart}
        onOpenProductDetails={handleOpenProductDetails}
        currency={currency}
      />

      {/* Shopping basket checkout wizard */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onAddOrder={handleAddOrder}
        userAddress={currentUser?.address || ''}
        userName={currentUser?.name || ''}
        currency={currency}
      />

      {/* Farmer listing hub desk */}
      <FarmerPortalModal
        isOpen={farmerPortalOpen}
        onClose={() => setFarmerPortalOpen(false)}
        onAddProduct={handleAddProduct}
        currency={currency}
      />

    </div>
  );
}

// Simple Helper function to feed parent handler
function filteredProductsHandler(prods: Product[], query: string): Product[] {
  // Let the internal component handle category state, let's keep pass robust
  return prods;
}
