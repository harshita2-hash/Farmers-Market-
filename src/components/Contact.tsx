import React, { useState } from 'react';
import { Mail, Phone, Clock, MapPin, Send, CheckCircle2, Globe } from 'lucide-react';

interface FarmerHub {
  id: string;
  name: string;
  coords: { x: number; y: number };
  crops: string;
  deliveries: string;
}

const PORTLAND_HUBS: FarmerHub[] = [
  { id: '1', name: 'Valley Greens Warehouse (Eastside)', coords: { x: 75, y: 35 }, crops: 'Tomatoes, Broccoli, Strawberries', deliveries: 'Same-day Portland Core' },
  { id: '2', name: 'Hood River Cold Cellar (Gorge Hub)', coords: { x: 88, y: 72 }, crops: 'Apples, Wild Honey, Apricots', deliveries: '8-hr Cold Van dispatch' },
  { id: '3', name: 'Sonoma Orchard Transfer Point', coords: { x: 30, y: 80 }, crops: 'Milk, Eggs, Raw Cheese, Turmeric', deliveries: 'Overnight cold-freight' },
  { id: '4', name: 'Yuba County Grain Silos', coords: { x: 22, y: 25 }, crops: 'Ancient Quinoa, Steel Oats, Heirloom Spelt', deliveries: 'Daily morning delivery' }
];

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [activeHub, setActiveHub] = useState<FarmerHub>(PORTLAND_HUBS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setTimeout(() => {
      setSuccess(false);
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-zinc-900 border-t border-zinc-150 dark:border-zinc-805">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Grid */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 tracking-widest uppercase block">
            LOCATION & CONTACT
          </span>
          <h2 className="font-display font-black text-2.5xl sm:text-4xl text-zinc-900 dark:text-neutral-50 tracking-tight leading-tight">
            Get in Touch With Our Hubs
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-sans leading-relaxed">
            Have questions about farm deliveries, seller partnerships, or commercial wholesale? Submit an inquiry below.
          </p>
        </div>

        {/* Content splitscreen layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 font-sans">
          
          {/* Left Column: Coordinates & Contact Form (7 columns) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Contact details row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-zinc-600 dark:text-zinc-350">
              
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-855 border border-zinc-150 dark:border-zinc-800 space-y-2">
                <div className="flex items-center gap-2 text-emerald-600">
                  <MapPin className="w-4 h-4 text-rose-500" />
                  <h4 className="font-bold">Organic Hub HQs</h4>
                </div>
                <p className="font-medium text-zinc-800 dark:text-neutral-100">
                  920 SW Broadway <br />
                  Portland, OR 97205
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-855 border border-zinc-150 dark:border-zinc-800 space-y-2">
                <div className="flex items-center gap-2 text-emerald-600">
                  <Phone className="w-4 h-4 text-emerald-500 animate-pulse" />
                  <h4 className="font-bold">Phone Channels</h4>
                </div>
                <p className="font-medium text-zinc-800 dark:text-neutral-100">
                  +1 (503) 555-0192 <br />
                  +1 (800) DirectFarm
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-855 border border-zinc-150 dark:border-zinc-800 space-y-2">
                <div className="flex items-center gap-2 text-emerald-600">
                  <Clock className="w-4 h-4 text-emerald-500" />
                  <h4 className="font-bold">Hub Timing</h4>
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  Mon-Sat: 8 AM - 7 PM <br />
                  Sun: 9 AM - 4 PM
                </p>
              </div>

            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 bg-zinc-50/75 dark:bg-zinc-855 rounded-3xl border border-zinc-150 dark:border-zinc-800 space-y-4">
              
              <h3 className="font-display font-extrabold text-sm sm:text-base text-zinc-950 dark:text-neutral-50 mb-2">
                Direct Inquiry Form
              </h3>

              {success && (
                <div className="p-4 bg-emerald-100/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 rounded-2xl text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Success! Your message was sent to our logistics team. We will call you within 12 hours.</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1">YOUR FULL NAME</label>
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="E.g. Jane Doe"
                    className="w-full px-4 py-3 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-neutral-50 rounded-xl border border-zinc-250 dark:border-zinc-800 focus:border-emerald-500 outline-hidden text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1">EMAIL ADDRESS</label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="w-full px-4 py-3 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-neutral-50 rounded-xl border border-zinc-250 dark:border-zinc-800 focus:border-emerald-500 outline-hidden text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">TELEPHONE NUMBER</label>
                <input
                  required
                  type="text"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+1 (555) 012-3456"
                  className="w-full px-4 py-3 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-neutral-50 rounded-xl border border-zinc-250 dark:border-zinc-800 focus:border-emerald-500 outline-hidden text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">YOUR MESSAGE OR REQUEST</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Ask about daily delivery availability, bulk pricing, or crop list options."
                  className="w-full px-4 py-3 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-neutral-50 rounded-xl border border-zinc-250 dark:border-zinc-800 focus:border-emerald-500 outline-hidden text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 active:translate-y-px text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                Submit Verification Inquiry
              </button>

            </form>

          </div>

          {/* Right Column: Interactive Vector GIS Farmer Hub Map (5 columns) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-5 bg-zinc-900 text-emerald-300 rounded-3xl border border-zinc-800 flex items-start gap-3 text-xs">
              <Globe className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <h4 className="font-bold text-white uppercase">Interactive Location Map</h4>
                <p className="text-[11px] text-zinc-400 mt-1">Select any pin coordinate on the micro spatial grid to trace our localized farmer hub storage nodes where fresh crops are gathered daily.</p>
              </div>
            </div>

            {/* Vector Map Canvas Box */}
            <div className="relative h-72 bg-emerald-950 dark:bg-zinc-950 rounded-3xl overflow-hidden shadow-inner border border-zinc-800">
              {/* grid lines for map visual aesthetic */}
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:16px_16px]" />
              
              {/* map abstract shapes representing valleys */}
              <div className="absolute top-10 left-20 w-44 h-44 rounded-full bg-emerald-900/10 blur-xl" />
              <div className="absolute bottom-16 right-10 w-36 h-36 rounded-full bg-emerald-900/20 blur-xl" />

              {/* Hub markers */}
              {PORTLAND_HUBS.map(hub => {
                const isActive = activeHub.id === hub.id;
                return (
                  <button
                    key={hub.id}
                    onClick={() => setActiveHub(hub)}
                    style={{ left: `${hub.coords.x}%`, top: `${hub.coords.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group"
                    title={hub.name}
                  >
                    <div className={`relative flex items-center justify-center transition-all ${
                      isActive ? 'scale-125' : 'hover:scale-110'
                    }`}>
                      {/* ping ring for active mapping */}
                      {isActive && (
                        <span className="absolute w-7 h-7 bg-emerald-400/40 rounded-full animate-ping" />
                      )}
                      
                      <div className={`w-4.5 h-4.5 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-black ${
                        isActive ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                      }`}>
                        📍
                      </div>
                    </div>
                  </button>
                );
              })}

              {/* Scale metric decoration */}
              <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/60 rounded-md text-[9px] font-mono font-bold text-zinc-400">
                SCALE: 1:440,000 | WGS84
              </div>
            </div>

            {/* Active selective hub card details */}
            <div className="p-5 rounded-3xl bg-zinc-50 dark:bg-zinc-855 border border-zinc-150 dark:border-zinc-800 space-y-3">
              <span className="text-[10px] font-black bg-rose-100 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 px-2 py-0.5 rounded-sm uppercase">
                Active selected Node
              </span>
              <h4 className="font-display font-black text-xs sm:text-sm text-zinc-950 dark:text-neutral-50">
                {activeHub.name}
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-sans">
                <strong>Crop inventory:</strong> {activeHub.crops}
              </p>
              <div className="border-t border-zinc-200 dark:border-zinc-800 pt-2 flex justify-between items-center text-[11px] font-mono">
                <span className="text-zinc-400">Logistics dispatch:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">{activeHub.deliveries}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
