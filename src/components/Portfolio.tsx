import { useState } from 'react';
import { Target, Leaf, Sparkles, Award } from 'lucide-react';
import { PortfolioItem } from '../types';

interface PortfolioProps {
  items: PortfolioItem[];
}

export default function Portfolio({ items }: PortfolioProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="portfolio" className="py-20 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-150 dark:border-zinc-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 tracking-widest uppercase block">
            ECO SOCIAL IMPACT REPORT
          </span>
          <h2 className="font-display text-2.5xl sm:text-4xl text-zinc-900 dark:text-neutral-50 tracking-tight leading-tight">
            Before-and-After <span className="italic text-emerald-400 font-serif">Growth Metrics</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-sans leading-relaxed">
            Direct farmer transactions allow families to implement soil composting, carbon sequestration, and bio-packaging improvements.
          </p>
        </div>

        {/* Masonry-like Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
          {items.map(item => (
            <div
              key={item.id}
              className="group relative bg-white dark:bg-zinc-855 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col sm:flex-row h-auto sm:h-64"
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              
              {/* Photo */}
              <div className="w-full sm:w-2/5 h-48 sm:h-full relative overflow-hidden bg-zinc-100 shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* floating badge */}
                <span className="absolute top-4 left-4 px-2.5 py-0.5 text-[8px] font-black bg-zinc-950/70 text-white uppercase tracking-widest rounded-md">
                  {item.category}
                </span>
              </div>

              {/* Text content details */}
              <div className="w-full sm:w-3/5 p-6 flex flex-col justify-between space-y-4">
                
                <div className="space-y-2">
                  {/* Metric display - big bold display */}
                  <div className="text-emerald-650 dark:text-emerald-400 font-display font-extrabold text-lg sm:text-xl tracking-tight leading-none flex items-center gap-1.5">
                    <Target className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>{item.metric}</span>
                  </div>

                  <h3 className="font-display font-extrabold text-sm sm:text-base text-zinc-900 dark:text-neutral-50 tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>

                {/* Subtle success validation indicator */}
                <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-bold dark:text-zinc-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>Verified ecological output • 2026 Audit</span>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Bottom micro quote block */}
        <div className="mt-16 text-center text-xs p-5 max-w-xl mx-auto rounded-2xl bg-emerald-50/40 dark:bg-zinc-850/30 border border-emerald-150/45 dark:border-zinc-800 text-emerald-800 dark:text-emerald-400 font-medium">
          ⚖️ **Fair Trade Assurance:** Natural Grocery pays out **85.5%** of gross retail purchase logs immediately to farmer bank accounts, compared to standard commercial grocery averages of just **14.2%**.
        </div>

      </div>
    </section>
  );
}
