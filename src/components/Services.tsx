import React, { useState } from 'react';
import { Apple, Sparkles, Wheat, Truck, Users, Briefcase, ChevronRight, X, ShieldAlert } from 'lucide-react';

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string;
}

export default function Services() {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const services: ServiceItem[] = [
    {
      id: 's1',
      title: 'Organic Fruits & Vegetables',
      description: 'Freshly harvested daily and immediately packed to keep the absolute biological peak flavor and health benefits.',
      icon: <Apple className="w-6 h-6" />,
      details: 'All vegetables and fruits are sourced from fields authorized under strictly organic crop practices. There are no gas treatments to false-ripen or chemical waxes applied. We carry heirloom tomatoes, sweet corn, berries, leafy greens, avocados and raw roots.'
    },
    {
      id: 's2',
      title: 'Farm Fresh Dairy Products',
      description: 'Raw materials, non-homogenized cold milk, rich natural butter, and standard forest farm eggs of pasture graze quality.',
      icon: <Sparkles className="w-6 h-6" />,
      details: 'Featuring grass-fed Jersey cow products and pasture-grazed animal products. Cows graze organic orchard grass all year long. Our free-range eggs are gathered early every morning from hens allowed to forage on biological woodland pastures.'
    },
    {
      id: 's3',
      title: 'Natural Grains & Pulses',
      description: 'Slow grown heirloom seed varieties, harvested using sustainable threshing methods and zero storage additives.',
      icon: <Wheat className="w-6 h-6" />,
      details: 'Explore clean organic quinoa, whole spelt kernel, rolling oats, and hand-milled wild brown rices. We maintain crop biodiversity by helping farmers preserve heirloom grain genetic variants that have high digestability indexes.'
    },
    {
      id: 's4',
      title: 'Home Delivery Logistics',
      description: 'Clean eco-friendly electric vehicles deliver orders directly from farmers’ hubs to your doorstep within 8 hours.',
      icon: <Truck className="w-6 h-6" />,
      details: 'Our temperature-controlled logistics ensure your leafy greens arrive cold and crisp. We optimize delivery routes to limit municipal greenhouse pollution while wrapping items in biodegradable cellulose pulp starch bag liners.'
    },
    {
      id: 's5',
      title: 'Farmer Marketplace Portal',
      description: 'A dedicated seller interface empowering small rural family homesteads to set their own fair marketplace prices.',
      icon: <Users className="w-6 h-6" />,
      details: 'Small family farms often struggle with commercial supermarkets imposing aggressive wholesale pricing caps. On our platform, farmers directly manage their own stock levels and set prices that reflect true fair organic values.'
    },
    {
      id: 's6',
      title: 'Bulk Orders for Businesses',
      description: 'Cost-saving scale packs for healthy workspace cafeterias, juice bars, craft bakeries, and organic bistro operations.',
      icon: <Briefcase className="w-6 h-6" />,
      details: 'We support local business enterprises. Restaurants, bakeries and workspaces can consolidate high-volume organic supply into simplified corporate delivery accounts with automated tax tracking and scaled pricing breaks.'
    }
  ];

  return (
    <section id="services" className="py-20 bg-white dark:bg-zinc-900 border-t border-zinc-150 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 tracking-widest uppercase block">
            OUR CAPABILITIES
          </span>
          <h2 className="font-display font-black text-2.5xl sm:text-4xl text-zinc-900 dark:text-neutral-50 tracking-tight leading-tight">
            Comprehensive Organic Supply Chain
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-sans leading-relaxed">
            From biological soil analysis and direct farmer support to modern cold route dispatching, we handle grocery logistics responsibly.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(service => (
            <div
              key={service.id}
              className="group p-6 bg-zinc-50 dark:bg-zinc-850 hover:bg-white dark:hover:bg-zinc-800 rounded-3xl border border-zinc-150 dark:border-zinc-800 hover:border-emerald-250 dark:hover:border-zinc-700 hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-64"
            >
              <div className="space-y-4">
                {/* Icon display */}
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105">
                  {service.icon}
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-display font-bold text-base text-zinc-900 dark:text-neutral-50">
                    {service.title}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Action trigger learn more details */}
              <button
                onClick={() => setSelectedService(service)}
                className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 uppercase tracking-widest self-start pt-3 group-hover:translate-x-1 transition-all cursor-pointer"
              >
                Learn More
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Selected Service Detail Modal Popup */}
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/60 backdrop-blur-xs">
            <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl p-6 sm:p-8 border border-emerald-100 dark:border-zinc-800 animate-in fade-in zoom-in-95 duration-200">
              
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 p-1 rounded-lg text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex gap-3 items-center mb-4">
                <span className="p-3 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 rounded-2xl">
                  {selectedService.icon}
                </span>
                <h3 className="font-display font-black text-lg text-zinc-900 dark:text-neutral-50">
                  {selectedService.title}
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
                <p className="font-semibold text-zinc-800 dark:text-neutral-150">
                  {selectedService.description}
                </p>
                <p className="pt-3 border-t border-zinc-100 dark:border-zinc-800">
                  {selectedService.details}
                </p>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedService(null)}
                  className="py-2.5 px-6 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Got It
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
