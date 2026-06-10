import { Sprout, Facebook, Twitter, Instagram, Linkedin, ShieldCheck, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 text-zinc-400 font-sans border-t border-zinc-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core links layouts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 border-b border-zinc-900 pb-12 mb-12">
          
          {/* Column 1: Brand & Bio (4 columns) */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#" className="flex items-center gap-2">
              <span className="p-2 bg-emerald-600 rounded-xl text-white">
                <Sprout className="w-5 h-5" />
              </span>
              <div className="leading-tight">
                <h3 className="font-display font-black text-xs tracking-wider text-white uppercase">
                  Natural Grocery
                </h3>
                <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold block">
                  Direct Farm Sourced
                </span>
              </div>
            </a>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-sm">
              Connecting urban homes and business buyers directly with independent local growers. By cutting out middle distributors, we provideFair Wages for Farmers, and Fresh Foods for You.
            </p>
            
            {/* Social icons */}
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-zinc-900 hover:bg-emerald-600 hover:text-white rounded-lg transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-zinc-900 hover:bg-emerald-600 hover:text-white rounded-lg transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-zinc-900 hover:bg-emerald-600 hover:text-white rounded-lg transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-zinc-900 hover:bg-emerald-600 hover:text-white rounded-lg transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Sitemap (3 columns) */}
          <div className="lg:col-span-2.5 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs text-zinc-500">
              <li>
                <a href="#catalog" className="hover:text-emerald-450 transition-colors">Shop Catalog</a>
              </li>
              <li>
                <a href="#about" className="hover:text-emerald-450 transition-colors">Our Food Story</a>
              </li>
              <li>
                <a href="#services" className="hover:text-emerald-450 transition-colors">Capabilities</a>
              </li>
              <li>
                <a href="#farmers" className="hover:text-emerald-450 transition-colors">Farmer Partners</a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-emerald-450 transition-colors">Socio Impact</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Services categories sitemap (3 columns) */}
          <div className="lg:col-span-2.5 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 text-xs text-zinc-500">
              <li>
                <a href="#catalog" className="hover:text-emerald-450 transition-colors">Organic Greens & Fruits</a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-emerald-450 transition-colors">Pasture Graze Dairy</a>
              </li>
              <li>
                <a href="#catalog" className="hover:text-emerald-450 transition-colors">Ancient Wild Grains</a>
              </li>
              <li>
                <a href="#services" className="hover:text-emerald-450 transition-colors">Vans Home Dispatch</a>
              </li>
              <li>
                <a href="#about" className="hover:text-emerald-450 transition-colors">Independent Sellers Hub</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Legals & Operations (3 columns) */}
          <div className="lg:col-span-3 space-y-4 text-xs text-zinc-500">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Operational Coordinates</h4>
            <p className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span>920 SW Broadway Suite 1400, Portland, OR 97205</span>
            </p>
            <p className="flex items-start gap-2.5">
              <Mail className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>hello@naturalgrocery.co</span>
            </p>
            <div className="flex items-center gap-1.5 p-2 bg-zinc-900 border border-zinc-805 rounded-xl text-[10px] uppercase text-zinc-400 font-bold max-w-fit">
              <ShieldCheck className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
              <span>Verified 2026 organic</span>
            </div>
          </div>

        </div>

        {/* copyright and legal triggers */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-600 gap-4">
          <p>© {currentYear} Natural Grocery Marketplace. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-zinc-500 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-zinc-500 transition-colors">Terms & Conditions</a>
            <span>•</span>
            <a href="#" className="hover:text-zinc-500 transition-colors">Regulatory Filings</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
