import { useState, useEffect } from 'react';
import { ArrowRight, Leaf, Shield, UserCheck, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroProps {
  onShopClick: () => void;
  onBecomeSellerClick: () => void;
}

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1400',
    title: 'Fresh Sourced Direct From Valley Soil',
    tagline: 'ORGANIC CERTIFIED'
  },
  {
    image: 'https://images.unsplash.com/photo-1500937386664-56d15943747d?auto=format&fit=crop&q=80&w=1400',
    title: 'Supporting Our Local Multi-Generational Farmers',
    tagline: 'COMMUNITY SUPPORTED AGRICULTURE'
  }
];

export default function Hero({ onShopClick, onBecomeSellerClick }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentSlide(prev => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = () => {
    setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section className="relative w-full h-[85vh] overflow-hidden bg-zinc-950 flex items-center">
      
      {/* Slider Background images */}
      {HERO_SLIDES.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-40' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt="Organic Farms Background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover scale-102 transition-transform duration-10000"
          />
        </div>
      ))}

      {/* ambient styling dust overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/50 via-zinc-900/45 to-black/70" />

      {/* Main Content Info */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
        <div className="max-w-2xl space-y-5">
          
          {/* Animated decorative leaf batch */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-600/30 backdrop-blur-xs border border-emerald-500/30 rounded-full text-xs font-semibold text-emerald-300 animate-pulse">
            <Leaf className="w-3.5 h-3.5" />
            <span>{HERO_SLIDES[currentSlide].tagline}</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-white">
            Fresh from <span className="italic text-emerald-400 font-serif">Farms</span> <br />
            to Your Household.
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-lg font-sans">
            Shop organic vegetables, fruits, grains, and natural products directly from trusted local farmers. Same-day cold deliveries straight to your kitchen door!
          </p>

          {/* Action Call to campaigns */}
          <div className="pt-4 flex flex-wrap gap-4">
            <button
              onClick={onShopClick}
              className="py-3.5 px-7 bg-emerald-600 hover:bg-emerald-700 active:translate-y-px text-white font-bold rounded-2xl text-xs sm:text-sm shadow-lg transition-all flex items-center gap-2 group cursor-pointer"
            >
              Shop Fresh Storefront
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={onBecomeSellerClick}
              className="py-3.5 px-6 bg-white/10 hover:bg-white/15 border border-white/25 hover:border-white/40 text-neutral-50 font-bold rounded-2xl text-xs sm:text-sm backdrop-blur-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              Become a Seller Partner
            </button>
          </div>

          {/* Core reassurance benchmarks */}
          <div className="pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-bold text-zinc-300">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-emerald-500/20 text-emerald-300">✓</span>
              <span>100% Non-Glyphosate</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-emerald-500/20 text-emerald-300">✓</span>
              <span>Fair Farmer Payout</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <span className="p-1 rounded-md bg-emerald-500/20 text-emerald-300">✓</span>
              <span>Carbon-Neutral Route</span>
            </div>
          </div>

        </div>
      </div>

      {/* Slide Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/25 hover:bg-black/45 border border-white/10 text-white rounded-full hidden md:flex cursor-pointer transition-colors"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/25 hover:bg-black/45 border border-white/10 text-white rounded-full hidden md:flex cursor-pointer transition-colors"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

    </section>
  );
}
