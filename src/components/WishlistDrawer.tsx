import { X, Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onOpenProductDetails: (product: Product) => void;
  currency: 'USD' | 'INR';
}

export default function WishlistDrawer({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onAddToCart,
  onOpenProductDetails,
  currency
}: WishlistDrawerProps) {
  if (!isOpen) return null;

  // Helper function to format the price in target currency
  const formatPrice = (priceInUSD: number) => {
    if (currency === 'INR') {
      return `₹${(priceInUSD * 83).toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}`;
    }
    return `$${priceInUSD.toFixed(2)}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-zinc-950/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-zinc-900 shadow-2xl flex flex-col h-full border-l border-emerald-50 dark:border-zinc-800 animate-in slide-in-from-right duration-200">
          
          {/* Header */}
          <div className="px-5 py-6 bg-emerald-100/40 dark:bg-zinc-850 border-b border-zinc-100 dark:border-zinc-850 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-2 bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 rounded-xl">
                <Heart className="w-5 h-5 fill-current" />
              </span>
              <h2 className="font-display text-lg font-bold text-zinc-900 dark:text-neutral-50">
                Your Saved Wishlist
              </h2>
              <span className="ml-1 px-2.5 py-0.5 text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-full">
                {wishlist.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlist.length === 0 ? (
              <div className="h-[70%] flex flex-col items-center justify-center text-center space-y-3.5 px-6">
                <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-zinc-800 flex items-center justify-center text-rose-400 dark:text-zinc-500 animate-bounce">
                  <Heart className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-zinc-800 dark:text-neutral-200">
                    Your Wishlist is Empty
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    Keep a pulse on your favorite seasonal products! Click the heart icon on cards while browsing to save them here.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="mt-2 text-xs font-semibold text-emerald-600 hover:text-emerald-700 underline"
                >
                  Continue Browsing
                </button>
              </div>
            ) : (
              wishlist.map(product => (
                <div
                  key={product.id}
                  className="flex items-center gap-3.5 p-3 rounded-2xl border border-zinc-150 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-850/50 hover:border-emerald-300 dark:hover:border-zinc-700 transition-all group"
                >
                  {/* Image */}
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>

                  {/* Text Details & Actions */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 tracking-wider">
                      {product.category}
                    </span>
                    <h3 className="font-semibold text-xs text-zinc-800 dark:text-neutral-200 truncate pr-4">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-bold text-zinc-900 dark:text-neutral-100">
                        {formatPrice(product.price)}
                      </span>
                      <span className="text-[10px] text-zinc-400">
                        / {product.unit}
                      </span>
                    </div>

                    {/* Button Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => {
                          onAddToCart(product);
                          // Option: Auto-remove from wishlist or keep it
                        }}
                        className="flex-1 py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-lg font-medium text-[10px] flex items-center justify-center gap-1 transition-all cursor-pointer"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        Add to Cart
                      </button>
                      <button
                        onClick={() => onOpenProductDetails(product)}
                        className="p-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors cursor-pointer"
                        title="View details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveFromWishlist(product)}
                    className="p-1 text-zinc-300 hover:text-rose-500 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-850 shrink-0 self-start mt-0.5"
                    title="Remove from wishlist"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Bottom Bar: Action to transfer all items into store cart */}
          {wishlist.length > 0 && (
            <div className="p-5 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">
              <button
                onClick={() => {
                  wishlist.forEach(p => onAddToCart(p));
                  onClose();
                }}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold rounded-xl text-xs transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4.5 h-4.5" />
                Transfer All to Shopping Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
