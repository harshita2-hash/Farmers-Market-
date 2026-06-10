import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, MapPin } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsProps {
  items: Testimonial[];
}

export default function Testimonials({ items }: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex(prev => (prev - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    setActiveIndex(prev => (prev + 1) % items.length);
  };

  return (
    <section className="py-20 bg-white dark:bg-zinc-900 border-t border-zinc-150 dark:border-zinc-805">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 tracking-widest uppercase block">
            COMMUNITY VOICE
          </span>
          <h2 className="font-display font-black text-2.5xl sm:text-4xl text-zinc-900 dark:text-neutral-50 tracking-tight leading-tight">
            Hear From Our Community
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-sans leading-relaxed">
            Real feedback from local urban culinary enthusiasts, sustainable homesteaders, and business organic buyers.
          </p>
        </div>

        {/* Interactive Slider Box */}
        <div className="max-w-4xl mx-auto relative px-4 sm:px-12">
          
          {/* Main frame */}
          <div className="relative overflow-hidden bg-zinc-50 dark:bg-zinc-855 rounded-3xl p-6 sm:p-10 border border-zinc-150 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row items-center gap-8 min-h-64 transition-all">
            
            {/* Quote decorative backdrop element */}
            <Quote className="absolute right-6 top-6 w-24 h-24 text-zinc-100 dark:text-zinc-800/40 select-none z-0 pointer-events-none" />

            {/* left: photo bubble */}
            <div className="relative z-10 shrink-0 text-center md:text-left">
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-emerald-500 shadow-md mx-auto md:mx-0">
                <img
                  src={items[activeIndex].avatar}
                  alt={items[activeIndex].name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <span className="inline-block mt-3 px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-black text-[9px] uppercase tracking-wider rounded-md">
                {items[activeIndex].role}
              </span>
            </div>

            {/* right text content */}
            <div className="relative z-10 flex-1 space-y-4">
              
              {/* Stars ratings */}
              <div className="flex items-center gap-1 text-amber-500 justify-center md:justify-start">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < items[activeIndex].rating ? 'fill-current' : 'opacity-25'
                    }`}
                  />
                ))}
              </div>

              {/* quote block statement */}
              <p className="text-sm sm:text-base font-serif italic text-zinc-700 dark:text-zinc-200 leading-relaxed text-center md:text-left">
                {items[activeIndex].content}
              </p>

              {/* name and location */}
              <div className="text-center md:text-left leading-tight">
                <p className="font-display font-extrabold text-sm text-zinc-950 dark:text-neutral-50">
                  {items[activeIndex].name}
                </p>
                <div className="inline-flex items-center gap-1 text-[11px] text-zinc-400 mt-1">
                  <MapPin className="w-3 h-3 text-rose-500" />
                  <span>{items[activeIndex].location}</span>
                </div>
              </div>

            </div>

          </div>

          {/* Left/Right Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-750 border border-zinc-200 dark:border-zinc-700 rounded-full shadow-sm hidden sm:block cursor-pointer"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft className="w-4.5 h-4.5 text-zinc-650 dark:text-neutral-300" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-750 border border-zinc-200 dark:border-zinc-700 rounded-full shadow-sm hidden sm:block cursor-pointer"
            aria-label="Next Testimonial"
          >
            <ChevronRight className="w-4.5 h-4.5 text-zinc-655 dark:text-neutral-300" />
          </button>

          {/* Bullet Indicators */}
          <div className="flex items-center justify-center gap-1.5 mt-8">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  idx === activeIndex
                    ? 'w-5 bg-emerald-650'
                    : 'bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400'
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
