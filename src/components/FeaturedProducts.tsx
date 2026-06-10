import { useState } from 'react';
import { Star, ShoppingBag, Heart, Search, Eye, Sparkles, CheckCircle2, ChevronRight, Sprout } from 'lucide-react';
import { Product } from '../types';

interface FeaturedProductsProps {
  products: Product[];
  wishlist: Product[];
  onAddToCart: (product: Product, quantity?: number) => void;
  onToggleWishlist: (product: Product) => void;
  searchQuery: string;
  currency: 'USD' | 'INR';
}

const CATEGORIES = [
  'All',
  'Vegetables',
  'Fruits',
  'Grains',
  'Dairy',
  'Spices',
  'Honey & Natural Foods'
];

export default function FeaturedProducts({
  products,
  wishlist,
  onAddToCart,
  onToggleWishlist,
  searchQuery,
  currency
}: FeaturedProductsProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [detailQuantity, setDetailQuantity] = useState(1);
  const [justAddedCartId, setJustAddedCartId] = useState<string | null>(null);

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

  // Filter products by both Category AND search query
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.farmName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const isFavorited = (productId: string) => {
    return wishlist.some(item => item.id === productId);
  };

  const handleAddToCartConfirm = (product: Product, qty: number) => {
    onAddToCart(product, qty);
    setJustAddedCartId(product.id);
    setSelectedProduct(null);
    setDetailQuantity(1);
    
    setTimeout(() => {
      setJustAddedCartId(null);
    }, 2000);
  };

  return (
    <section id="catalog" className="py-20 bg-linear-to-b from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 tracking-widest uppercase block">
              ORGANIC HARVEST CATALOG
            </span>
            <h2 className="font-display text-2.5xl sm:text-4xl text-zinc-900 dark:text-neutral-50 tracking-tight leading-none">
              Explore Our <span className="italic text-emerald-400 font-serif">Featured Produce</span>
            </h2>
            <p className="text-xs text-zinc-400 max-w-md font-sans">
              Filter by nutritional food group or harvest source. Sourced to maintain pristine ecosystem support.
            </p>
          </div>

          {/* Search notice indicator */}
          {searchQuery && (
            <div className="px-4 py-2 bg-emerald-50 dark:bg-zinc-805 text-emerald-800 dark:text-emerald-400 rounded-xl text-xs font-semibold flex items-center gap-2 border border-emerald-100">
              <Search className="w-4 h-4 text-emerald-600" />
              <span>Found {filteredProducts.length} results matching "{searchQuery}"</span>
            </div>
          )}
        </div>

        {/* Category filtering Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8 overflow-x-auto pb-2 border-b border-zinc-150 dark:border-zinc-800 scrollbar-none font-sans">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`py-2 px-5 text-xs font-bold rounded-full border transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === category
                  ? 'border-emerald-600 bg-emerald-600 text-white shadow-xs'
                  : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-850 text-zinc-500 dark:text-zinc-400 hover:border-zinc-350 dark:hover:border-zinc-700 hover:bg-zinc-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-zinc-50/50 dark:bg-zinc-850/40 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800">
            <p className="text-sm font-bold text-zinc-500">No products found</p>
            <p className="text-xs text-zinc-400 mt-1">Try switching categories or removing search filters.</p>
            <button
              onClick={() => { setSelectedCategory('All'); }}
              className="mt-4 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="group relative bg-white dark:bg-zinc-850 rounded-3xl border border-zinc-180 dark:border-zinc-805 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                
                {/* Popularity Badge or Category label */}
                <div className="absolute top-4 left-4 z-15 flex flex-col gap-1.5 font-sans">
                  {product.isPopular && (
                    <span className="px-2.5 py-0.75 text-[9px] font-extrabold bg-amber-500 text-zinc-950 uppercase tracking-widest rounded-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3 fill-current" />
                      Popular
                    </span>
                  )}
                  <span className="px-2 py-0.5 text-[9px] font-black bg-zinc-900/60 backdrop-blur-xs text-white uppercase tracking-wider rounded-sm w-fit">
                    {product.category}
                  </span>
                </div>

                {/* Wishlist Toggle Heart Icon */}
                <button
                  onClick={() => onToggleWishlist(product)}
                  className="absolute top-4 right-4 z-15 p-2 bg-white/70 dark:bg-zinc-800/80 backdrop-blur-xs hover:bg-white dark:hover:bg-zinc-800 rounded-full shadow-sm border border-zinc-100 dark:border-zinc-700 text-zinc-400 hover:text-rose-500 transition-colors"
                  title="Toggle wishlist save"
                >
                  <Heart
                    className={`w-3.5 h-3.5 transition-all ${
                      isFavorited(product.id) ? 'text-rose-500 fill-current scale-110' : 'text-zinc-650'
                    }`}
                  />
                </button>

                {/* Product Image Stage */}
                <div className="relative h-48 bg-zinc-100 overflow-hidden shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Hover Eyes icon */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
                        setDetailQuantity(1);
                      }}
                      className="p-3 bg-white text-zinc-900 rounded-full shadow-md flex items-center gap-1 text-[11px] font-bold active:scale-95 transition-all cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      View Nutrition & Farm
                    </button>
                  </div>
                </div>

                {/* Info block */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    {/* Sourced Farm */}
                    <div className="flex items-center gap-1 text-[10px] text-zinc-400 font-bold tracking-wider uppercase">
                      <Sprout className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{product.farmName}</span>
                    </div>

                    <h3 className="font-display font-extrabold text-sm text-zinc-900 dark:text-neutral-50 tracking-tight leading-tight group-hover:text-emerald-700 transition-colors">
                      {product.name}
                    </h3>

                    {/* stars review line */}
                    <div className="flex items-center gap-1.5 text-xs text-amber-500">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < Math.floor(product.rating) ? 'fill-current' : 'opacity-30'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-zinc-400 font-bold">
                        ({product.reviewCount})
                      </span>
                    </div>
                  </div>

                  {/* price action panel */}
                  <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800 mt-4">
                    <div className="leading-tight">
                      <p className="text-sm font-black font-mono text-zinc-900 dark:text-neutral-50">
                        {formatPrice(product.price)}
                      </p>
                      <span className="text-[9px] text-zinc-400 block uppercase">
                        per {product.unit}
                      </span>
                    </div>

                    {/* Quick Add To Cart */}
                    <button
                      onClick={() => {
                        onAddToCart(product, 1);
                        setJustAddedCartId(product.id);
                        setTimeout(() => setJustAddedCartId(null), 2000);
                      }}
                      className={`p-2.5 text-white rounded-xl shadow-xs cursor-pointer flex items-center justify-center transition-all ${
                        justAddedCartId === product.id
                          ? 'bg-emerald-500'
                          : 'bg-emerald-600 hover:bg-emerald-700 active:translate-y-px'
                      }`}
                      title="Add to cart"
                    >
                      {justAddedCartId === product.id ? (
                        <CheckCircle2 className="w-4 h-4 text-white animate-in zoom-in-50" />
                      ) : (
                        <ShoppingBag className="w-4.5 h-4.5" />
                      )}
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Product specs details model popup */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/60 backdrop-blur-xs">
            <div className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl p-6 sm:p-8 border border-emerald-100 dark:border-zinc-800 animate-in fade-in zoom-in-95 duration-200 flex flex-col md:flex-row gap-6 max-h-[90vh] overflow-y-auto">
              
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 p-1 rounded-lg text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-300"
                aria-label="Close"
              >
                ✕
              </button>

              {/* Left Column: Image */}
              <div className="w-full md:w-1/2 relative rounded-2xl overflow-hidden bg-zinc-50 h-56 md:h-auto border border-zinc-150">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 px-2.5 py-0.5 text-[9px] font-black bg-emerald-600 text-white uppercase rounded-md tracking-wider">
                  {selectedProduct.category}
                </span>
              </div>

              {/* Right Column: product parameters */}
              <div className="w-full md:w-1/2 flex flex-col justify-between font-sans">
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-emerald-605 tracking-widest uppercase">
                      🏞️ Harvested by {selectedProduct.farmName}
                    </p>
                    <h3 className="font-display font-black text-xl text-zinc-900 dark:text-neutral-50 leading-tight">
                      {selectedProduct.name}
                    </h3>
                  </div>

                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {selectedProduct.description}
                  </p>

                  {/* Nutrition panel Grid */}
                  <div className="bg-zinc-50 dark:bg-zinc-850 rounded-2xl border border-zinc-150 dark:border-zinc-800 p-4 space-y-2">
                    <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Macro Nutrition Specs (100g serving):</h4>
                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div className="p-2 bg-white dark:bg-zinc-800 border border-zinc-200/50 dark:border-zinc-700 rounded-xl">
                        <span className="font-mono font-bold text-zinc-900 dark:text-neutral-50 text-xs block">{selectedProduct.nutrition.calories}</span>
                        <span className="text-[9px] text-zinc-400 uppercase font-black">Energy</span>
                      </div>
                      <div className="p-2 bg-white dark:bg-zinc-800 border border-zinc-200/50 dark:border-zinc-700 rounded-xl">
                        <span className="font-mono font-bold text-zinc-900 dark:text-neutral-50 text-xs block">{selectedProduct.nutrition.carbs}</span>
                        <span className="text-[9px] text-zinc-400 uppercase font-black">Carbs</span>
                      </div>
                      <div className="p-2 bg-white dark:bg-zinc-800 border border-zinc-200/50 dark:border-zinc-700 rounded-xl">
                        <span className="font-mono font-bold text-zinc-900 dark:text-neutral-50 text-xs block">{selectedProduct.nutrition.protein}</span>
                        <span className="text-[9px] text-zinc-400 uppercase font-black">protein</span>
                      </div>
                      <div className="p-2 bg-white dark:bg-zinc-800 border border-zinc-200/50 dark:border-zinc-700 rounded-xl">
                        <span className="font-mono font-bold text-zinc-900 dark:text-neutral-50 text-xs block">{selectedProduct.nutrition.fat}</span>
                        <span className="text-[9px] text-zinc-400 uppercase font-black">Fats</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* controls action */}
                <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 mt-6 flex items-center justify-between gap-4">
                  <div className="leading-tight">
                    <span className="text-[10px] text-zinc-400 block uppercase">Price value</span>
                    <strong className="text-base font-mono font-black text-zinc-900 dark:text-neutral-100">
                      {formatPrice(selectedProduct.price * detailQuantity)}
                    </strong>
                    <span className="text-[9px] text-zinc-400 block">per {detailQuantity} {selectedProduct.unit}(s)</span>
                  </div>

                  {/* Quantity adjustment & checkout triggers */}
                  <div className="flex gap-2 items-center">
                    <div className="flex bg-zinc-100 dark:bg-zinc-800 p-1 rounded-xl border border-zinc-200 dark:border-zinc-700">
                      <button
                        onClick={() => setDetailQuantity(q => Math.max(1, q - 1))}
                        className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-emerald-600 hover:bg-white rounded-md text-xs font-black transition-all"
                      >
                        -
                      </button>
                      <span className="w-8 h-8 flex items-center justify-center text-zinc-800 dark:text-neutral-150 text-xs font-bold font-mono">
                        {detailQuantity}
                      </span>
                      <button
                        onClick={() => setDetailQuantity(q => q + 1)}
                        className="w-8 h-8 flex items-center justify-center text-zinc-400 hover:text-emerald-600 hover:bg-white rounded-md text-xs font-black transition-all"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => handleAddToCartConfirm(selectedProduct, detailQuantity)}
                      className="py-3 px-6 bg-emerald-605 hover:bg-emerald-705 active:bg-emerald-800 text-white font-bold rounded-xl text-xs shadow-xs transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Add to Basket
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
