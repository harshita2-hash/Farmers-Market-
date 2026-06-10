import { useState } from 'react';
import { Search, Heart, ShoppingBag, Sun, Moon, User, Sprout, Menu, X, LogOut, ClipboardList, Shield } from 'lucide-react';
import { Product, CartItem, User as UserType } from '../types';

interface HeaderProps {
  cart: CartItem[];
  wishlist: Product[];
  currentUser: UserType | null;
  onLogout: () => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenFarmerPortal: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onSearchChange: (query: string) => void;
  searchQuery: string;
  currency: 'USD' | 'INR';
  onToggleCurrency: () => void;
}

export default function Header({
  cart,
  wishlist,
  currentUser,
  onLogout,
  onOpenAuth,
  onOpenCart,
  onOpenWishlist,
  onOpenFarmerPortal,
  darkMode,
  onToggleDarkMode,
  onSearchChange,
  searchQuery,
  currency,
  onToggleCurrency
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Calculate cart counts
  const cartItemsCount = cart.reduce((count, item) => count + item.quantity, 0);

  const navLinks = [
    { label: 'Shop Catalog', href: '#catalog' },
    { label: 'Our Story', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Farmers', href: '#farmers' },
    { label: 'Socio Impact', href: '#portfolio' },
    { label: 'Healthy Blog', href: '#blog' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-150 dark:border-zinc-800 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo Brand */}
          <a href="#" className="flex items-center gap-2 group">
            <span className="p-2.5 bg-emerald-600 dark:bg-emerald-600 rounded-2xl text-white shadow-sm transition-transform group-hover:scale-105">
              <Sprout className="w-5 h-5" />
            </span>
            <div className="leading-tight shrink-0">
              <h1 className="font-display font-black text-sm tracking-tight text-emerald-850 dark:text-emerald-500 uppercase">
                Natural Grocery
              </h1>
              <span className="text-[9px] uppercase tracking-widest text-zinc-400 font-bold block">
                Direct Farm Sourced
              </span>
            </div>
          </a>

          {/* Large Screen Navigation Menu Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="text-xs font-semibold text-zinc-600 dark:text-zinc-350 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Center (Search, Cart, Wishlist, Profile, Dark Mode) */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Catalog search bar */}
            <div className="hidden md:relative md:block max-w-44">
              <input
                type="text"
                value={searchQuery}
                onChange={e => onSearchChange(e.target.value)}
                placeholder="Search fresh harvest..."
                className="w-full pl-8 pr-3 py-1.5 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-750 rounded-full text-xs text-zinc-800 dark:text-neutral-50 placeholder-zinc-400 focus:outline-hidden focus:border-emerald-500 transition-all font-sans"
              />
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-zinc-400" />
            </div>

            {/* Currency switcher (USD/INR) */}
            <button
              onClick={onToggleCurrency}
              className="px-2.5 py-1.5 text-xs font-bold text-zinc-500 dark:text-zinc-400 hover:text-emerald-650 dark:hover:text-emerald-450 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-all border border-zinc-200 dark:border-zinc-750 flex items-center gap-1 cursor-pointer"
              title="Switch currency (USD/INR)"
            >
              <span className="text-[11px] leading-none">{currency === 'USD' ? '🇺🇸 $' : '🇮🇳 ₹'}</span>
              <span className="hidden sm:inline font-mono text-[9px] uppercase tracking-wider">{currency}</span>
            </button>

            {/* Dark mode state switch */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 text-zinc-500 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-all"
              title="Toggle theme view"
            >
              {darkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>

            {/* Wishlist Heart */}
            <button
              onClick={onOpenWishlist}
              className="p-2 text-zinc-500 dark:text-zinc-300 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl relative transition-all"
              title="Your Wishlist"
            >
              <Heart className="w-4.5 h-4.5" />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-rose-500 border border-white dark:border-zinc-900 rounded-full flex items-center justify-center text-[8px] font-black text-white">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Bag */}
            <button
              onClick={onOpenCart}
              className="p-2 text-zinc-500 dark:text-zinc-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl relative transition-all"
              title="Your Shopping Cart"
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 w-4.5 h-4.5 bg-emerald-600 border border-white dark:border-zinc-900 rounded-full flex items-center justify-center text-[8px] font-black text-white">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {/* User Login/Signup profile menu */}
            <div className="relative">
              {currentUser ? (
                <div>
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-1.5 py-1.5 px-3 bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900 rounded-full text-xs font-bold border border-emerald-200/50 dark:border-emerald-800 transition-all cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span className="truncate max-w-[70px]">{currentUser.name}</span>
                  </button>

                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2.5 w-48 bg-white dark:bg-zinc-850 rounded-2xl shadow-xl py-2 border border-zinc-100 dark:border-zinc-800 animate-in fade-in zoom-in-95 duration-100 text-xs font-sans text-zinc-700 dark:text-zinc-350 z-50">
                      <div className="px-4 py-2 border-b border-zinc-100 dark:border-zinc-805">
                        <p className="font-semibold text-zinc-900 dark:text-neutral-100 truncate">{currentUser.name}</p>
                        <p className="text-[10px] text-zinc-400 truncate mt-0.5">{currentUser.email}</p>
                      </div>

                      {currentUser.role === 'farmer' && (
                        <button
                          onClick={() => {
                            onOpenFarmerPortal();
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2.5 hover:bg-emerald-50 dark:hover:bg-zinc-750 text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-2"
                        >
                          <Shield className="w-3.5 h-3.5" />
                          Farmer Dashboard
                        </button>
                      )}

                      <button
                        onClick={() => {
                          onLogout();
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-750 text-rose-600 font-semibold flex items-center gap-2 border-t border-zinc-100 dark:border-zinc-805"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => onOpenAuth('login')}
                  className="py-1.75 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full text-xs shadow-xs transition-colors cursor-pointer"
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile burger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 lg:hidden"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-150 dark:border-zinc-850 bg-white dark:bg-zinc-900 px-4 py-4 space-y-3.5 font-sans animate-in slide-in-from-top duration-200 shadow-xl">
          {/* Mobile search */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              placeholder="Search fresh harvest..."
              className="w-full pl-8 pr-3 py-2 bg-zinc-50 dark:bg-zinc-805 border border-zinc-200 dark:border-zinc-750 rounded-xl text-xs text-zinc-800 dark:text-neutral-50"
            />
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-zinc-400" />
          </div>

          <div className="grid grid-cols-2 gap-2 text-center text-xs font-semibold">
            {navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 bg-zinc-50 dark:bg-zinc-850 hover:bg-emerald-50 border border-zinc-200/40 dark:border-zinc-800 rounded-xl text-zinc-700 dark:text-zinc-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2.5 pb-0.5 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between font-sans">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Show Prices In:</span>
            <button
              onClick={onToggleCurrency}
              className="py-1.5 px-3 bg-zinc-50 dark:bg-zinc-855 hover:bg-emerald-50 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-750 rounded-xl text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 cursor-pointer"
            >
              <span>{currency === 'USD' ? '🇺🇸 Dollar ($)' : '🇮🇳 Rupee (₹)'}</span>
            </button>
          </div>

          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex justify-between gap-3 text-center">
            <button
              onClick={() => {
                onOpenFarmerPortal();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2.5 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-200 dark:border-emerald-900 rounded-xl text-xs cursor-pointer"
            >
              🌾 Become Seller
            </button>
            <button
              onClick={() => {
                onOpenAuth('signup');
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs cursor-pointer"
            >
              Register Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
