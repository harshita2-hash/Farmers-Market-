import { Users, Leaf, Truck, Star, Award, Landmark } from 'lucide-react';

export default function AboutUs() {
  const statCards = [
    {
      icon: <Users className="w-6 h-6 text-emerald-600" />,
      value: '500+',
      label: 'Partnered Farmers',
      description: 'Localized family orchards and community homesteads.'
    },
    {
      icon: <Star className="w-6 h-6 text-emerald-600" />,
      value: '10,000+',
      label: 'Delighted Customers',
      description: 'Sourcing clean, chemical-free raw food daily.'
    },
    {
      icon: <Leaf className="w-6 h-6 text-emerald-600" />,
      value: '100%',
      label: 'Certified Natural',
      description: 'No glyphosates, zero chemical wax, and absolute flavor.'
    },
    {
      icon: <Truck className="w-6 h-6 text-emerald-600" />,
      value: 'Same-Day',
      label: 'Cold Logistics',
      description: 'Delivered within 8 hours of morning harvesting.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-linear-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900 border-t border-zinc-100 dark:border-zinc-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Splitscreen section layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Interactive design image cards stack */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-emerald-150/45 dark:border-zinc-800">
              <img
                src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&q=80&w=700"
                alt="Farmer harvested fresh crates of tomatoes"
                referrerPolicy="no-referrer"
                className="w-full h-[500px] object-cover"
              />
              {/* Green backdrop absolute label */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 text-white">
                <p className="text-xl font-display font-bold leading-tight">
                  “We deliver produce that still has the early morning sun on it.”
                </p>
                <p className="text-xs font-semibold text-emerald-300 mt-2">
                  — J. Miller, Green Valley Growers
                </p>
              </div>
            </div>

            {/* floating badges */}
            <div className="absolute -top-6 -right-6 hidden sm:block p-4 bg-emerald-600 rounded-3xl text-white shadow-xl max-w-44 border border-emerald-500">
              <Award className="w-7 h-7 text-emerald-200 mb-1.5" />
              <p className="font-display font-extrabold text-sm uppercase leading-none">Soil steward</p>
              <p className="text-[10px] text-emerald-100 mt-1">100% Regenerative crop farming operations.</p>
            </div>
          </div>

          {/* Right: Company text credentials */}
          <div className="lg:col-span-7 space-y-7">
            <div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block mb-2">
                WHO WE ARE
              </span>
              <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl text-zinc-900 dark:text-neutral-50 leading-[1.15] tracking-tight">
                Empowering <span className="italic text-emerald-400 font-serif">Small Agriculture</span>, <br />
                Nourishing Communities.
              </h3>
            </div>

            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
              Founded on the belief that healthy food is a fundamental right, <strong>Natural Grocery</strong> is a peer-to-peer agricultural network. We completely eliminate wholesale shipping warehouses, commercial cold storage gas processing, and heavy middle-agent margins. By facilitating a direct connection, we deliver optimal nutrition from the soil straight to your counter.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Mission */}
              <div className="p-5 rounded-2xl bg-emerald-50/50 dark:bg-zinc-850/60 border border-emerald-100/50 dark:border-zinc-800 space-y-2">
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                  <Landmark className="w-4.5 h-4.5" />
                  <h4 className="font-bold text-xs uppercase tracking-wider">Our Mission</h4>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  To provide direct equitable market channels for small-scale rural agro-homesteaders while supplying nutrient-dense, chemical-free food to families at beautiful affordable rates.
                </p>
              </div>

              {/* Vision */}
              <div className="p-5 rounded-2xl bg-teal-50/50 dark:bg-zinc-850/60 border border-teal-100/50 dark:border-zinc-800 space-y-2">
                <div className="flex items-center gap-2 text-teal-700 dark:text-teal-400">
                  <Leaf className="w-4.5 h-4.5" />
                  <h4 className="font-bold text-xs uppercase tracking-wider">Our Vision</h4>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  To establish decentralized sustainable agricultural paradigms everywhere that successfully restore depleted soil biology, respect waterways, and protect pollinator insects.
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom statistics list card rows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 pt-12 border-t border-zinc-150 dark:border-zinc-805">
          {statCards.map((card, idx) => (
            <div
              key={idx}
              className="p-5 bg-white dark:bg-zinc-850 rounded-2xl border border-zinc-150 dark:border-zinc-800 hover:shadow-md transition-shadow flex items-start gap-4"
            >
              <div className="p-2.5 bg-emerald-50 dark:bg-zinc-800 rounded-xl shrink-0">
                {card.icon}
              </div>
              <div className="space-y-1">
                <h5 className="font-display text-lg sm:text-xl font-extrabold text-zinc-900 dark:text-neutral-50 leading-none">
                  {card.value}
                </h5>
                <p className="text-xs font-bold text-zinc-700 dark:text-neutral-300 leading-none">
                  {card.label}
                </p>
                <p className="text-[11px] text-zinc-400 dark:text-zinc-500 leading-normal">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
