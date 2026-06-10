import { useState } from 'react';
import { Star, MapPin, Award, Calendar, ChevronRight, X, Heart, MessageSquare } from 'lucide-react';
import { Farmer } from '../types';

interface FarmerPartnersProps {
  farmers: Farmer[];
}

export default function FarmerPartners({ farmers }: FarmerPartnersProps) {
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);

  return (
    <section id="farmers" className="py-20 bg-white dark:bg-zinc-900 border-t border-zinc-150 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title Grid */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 tracking-widest uppercase block">
              OUR HARVEST HEROES
            </span>
            <h2 className="font-display text-2.5xl sm:text-4xl text-zinc-900 dark:text-neutral-50 tracking-tight leading-none animate-fade-in">
              Meet Our <span className="italic text-emerald-400 font-serif">Partner Farmers</span>
            </h2>
            <p className="text-xs text-zinc-400 max-w-md font-sans">
              Meet the real families and independent growers who sustain our fertile landscapes and cultivate our fresh crops.
            </p>
          </div>
        </div>

        {/* Farmer Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {farmers.map(farmer => (
            <div
              key={farmer.id}
              className="group relative bg-zinc-50 dark:bg-zinc-855 rounded-3xl overflow-hidden border border-zinc-150 dark:border-zinc-800 shadow-xs hover:shadow-md hover:scale-101 transition-all duration-300 flex flex-col justify-between"
            >
              
              {/* Photo */}
              <div className="h-64 overflow-hidden relative shrink-0">
                <img
                  src={farmer.image}
                  alt={farmer.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                />
                
                {/* Years badge relative placement */}
                <div className="absolute bottom-4 left-4 px-3 py-1 bg-zinc-900/70 backdrop-blur-xs text-white rounded-md text-[10px] font-bold flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-emerald-400" />
                  <span>Partner: {farmer.yearsPartnered} years</span>
                </div>
              </div>

              {/* Card info column */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-[10px] font-black rounded-sm uppercase tracking-wider">
                      {farmer.specialty.split(' & ')[0]}
                    </span>
                    <div className="flex items-center gap-1 text-amber-500 font-bold font-mono">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{farmer.rating}</span>
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-base text-zinc-900 dark:text-neutral-50">
                    {farmer.name}
                  </h3>

                  <div className="flex items-center gap-1 text-xs text-zinc-400 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span className="truncate">{farmer.location}</span>
                  </div>
                </div>

                {/* success details activator button */}
                <div className="pt-4 border-t border-zinc-150 dark:border-zinc-800 mt-4">
                  <button
                    onClick={() => setSelectedFarmer(farmer)}
                    className="w-full py-2 bg-white hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-750 border border-zinc-200 dark:border-zinc-700 text-zinc-750 dark:text-neutral-50 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
                    Read Success Story
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Selected Farmer Success Case overlay modal */}
        {selectedFarmer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/60 backdrop-blur-xs">
            <div className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl p-6 sm:p-8 border border-emerald-100 dark:border-zinc-800 animate-in fade-in zoom-in-95 duration-200 flex flex-col gap-6">
              
              <button
                onClick={() => setSelectedFarmer(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                aria-label="Close stories modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col sm:flex-row gap-5 items-center">
                {/* Farmer mini image */}
                <img
                  src={selectedFarmer.image}
                  alt={selectedFarmer.name}
                  className="w-24 h-24 rounded-2xl object-cover border-2 border-emerald-110 shadow-md shrink-0"
                />

                <div className="space-y-1.5 text-center sm:text-left">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 uppercase justify-center sm:justify-start">
                    <Award className="w-4 h-4 text-emerald-500" />
                    <span>Specialty: {selectedFarmer.specialty}</span>
                  </div>
                  <h3 className="font-display font-black text-xl text-zinc-900 dark:text-neutral-50">
                    {selectedFarmer.name}
                  </h3>
                  <p className="text-xs text-zinc-400">Located at: {selectedFarmer.location}</p>
                </div>
              </div>

              {/* Bio & Success case description */}
              <div className="space-y-4 font-sans text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-b border-zinc-100 dark:border-zinc-800 py-4">
                <p>
                  <strong>About Grower:</strong> {selectedFarmer.bio}
                </p>
                
                {/* Success quotes */}
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-355 border border-emerald-100/50 rounded-2xl italic font-medium leading-relaxed font-serif relative">
                  <span className="text-3xl text-emerald-200 dark:text-emerald-800 absolute -top-2 left-2 pointer-events-none select-none">“</span>
                  <p className="pl-4 pr-2">{selectedFarmer.story.replace(/“|”/g, '')}</p>
                </div>
              </div>

              {/* metrics line */}
              <div className="grid grid-cols-2 gap-3 text-center text-xs font-sans">
                <div className="p-3 bg-zinc-50 dark:bg-zinc-850 rounded-xl border border-zinc-150">
                  <span className="font-mono font-bold text-zinc-950 dark:text-neutral-50 text-sm block">{selectedFarmer.productsCount}</span>
                  <span className="text-[10px] text-zinc-400 uppercase font-bold">Catalog Items</span>
                </div>
                <div className="p-3 bg-zinc-50 dark:bg-zinc-850 rounded-xl border border-zinc-150">
                  <span className="font-mono font-bold text-zinc-950 dark:text-neutral-50 text-sm block">+{selectedFarmer.yearsPartnered} Years</span>
                  <span className="text-[10px] text-zinc-400 uppercase font-bold">Years Partnered</span>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setSelectedFarmer(null)}
                  className="py-2.5 px-6 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Return to Farmer List
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
