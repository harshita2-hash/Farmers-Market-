import { Sprout, Sun, Heart, Coins, ShieldCheck, Zap } from 'lucide-react';

export default function WhyChooseUs() {
  const cards = [
    {
      icon: <Sprout className="w-6 h-6 text-emerald-600" />,
      title: 'Farm Direct Sourcing',
      description: 'We cut out the intermediate distributors completely, purchasing directly from local growers. This guarantees authentic provenance.'
    },
    {
      icon: <Sun className="w-6 h-6 text-emerald-600" />,
      title: 'Fresh Daily Harvest',
      description: 'Crops are picked early in the morning cold and dispatched within hours, ensuring supreme nutritional trace enzyme preservation.'
    },
    {
      icon: <Heart className="w-6 h-6 text-emerald-600" />,
      title: 'Eco-Friendly Packaging',
      description: 'We package exclusively with compostable potato-starch bags, zero plastic, and returnable glass bottle systems.'
    },
    {
      icon: <Coins className="w-6 h-6 text-emerald-600" />,
      title: 'Affordable Pricing',
      description: 'By bypassing commercial markup networks, our farmers earn higher margins while shoppers pay less for organic excellence.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      title: 'Secure Payments',
      description: 'Fully SSL-encrypted banking connections with standard tokens protect your card assets safely at checkout.'
    },
    {
      icon: <Zap className="w-6 h-6 text-emerald-600" />,
      title: 'Fast Micro Delivery',
      description: 'Delivered directly from local valley agriculture nodes to city doors within 8 hours of mornings.'
    }
  ];

  return (
    <section className="py-20 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-150 dark:border-zinc-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title Panel */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 tracking-widest uppercase block">
            HOW WE DO BUSINESS
          </span>
          <h2 className="font-display font-black text-2.5xl sm:text-4xl text-zinc-900 dark:text-neutral-50 tracking-tight leading-tight">
            Designed for Soil health & Consumer Vitality
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-sans leading-relaxed">
            By shifting from commercial logistic chains to direct farmer hubs, we resolve the dual issues of excessive grocery costs and stale nutrients.
          </p>
        </div>

        {/* Feature Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="p-6 bg-white dark:bg-zinc-855 rounded-3xl border border-zinc-150 dark:border-zinc-800 shadow-xs hover:scale-101 hover:shadow-md transition-all duration-200"
            >
              {/* Icon displayed in soft background circle panel */}
              <div className="w-12 h-12 bg-emerald-50 dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-4 text-center">
                {card.icon}
              </div>

              <h4 className="font-display font-bold text-sm sm:text-base text-zinc-950 dark:text-neutral-50 mb-2">
                {card.title}
              </h4>

              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">
                {card.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
