import React, { useState } from 'react';
import { Mail, CheckCircle, Sparkles, Send } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSuccess(true);
    setEmail('');
    setTimeout(() => {
      setSuccess(false);
    }, 4000);
  };

  return (
    <section className="py-12 bg-linear-to-r from-emerald-800 to-teal-850 text-white relative overflow-hidden">
      {/* decorative vectors */}
      <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 rounded-full bg-white/5 blur-xl pointer-events-none" />
      <div className="absolute left-10 bottom-0 translate-y-12 w-48 h-48 rounded-full bg-emerald-500/10 blur-lg pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left information */}
          <div className="max-w-md space-y-2.5 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full text-[10px] font-bold">
              <Sparkles className="w-3 h-3" />
              <span>15% DISCOUNT DISCOUNT COUPON ON INBOX</span>
            </div>
            <h3 className="font-display font-black text-xl sm:text-2xl tracking-tight leading-none text-white">
              Join Our Seasonal Farm Circle
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed font-sans max-w-sm">
              Subscribe to receive weekly stock notices, exclusive farmer harvest discounts, and premium organic composting guidelines.
            </p>
          </div>

          {/* Right Input elements */}
          <div className="w-full max-w-md font-sans">
            {success ? (
              <div className="p-4 bg-white/10 backdrop-blur-xs rounded-2xl border border-white/15 text-xs font-semibold flex items-center justify-center gap-2 text-center text-emerald-200">
                <CheckCircle className="w-4.5 h-4.5" />
                <span>Subscription Saved! Check email for voucher code: FARMFRESH</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter email address..."
                    className="w-full pl-10 pr-4 py-3 bg-white/10 hover:bg-white/15 focus:bg-white dark:focus:bg-zinc-900 border border-white/15 focus:border-white text-white dark:focus:text-neutral-50 rounded-2xl text-xs outline-hidden placeholder-zinc-350 transition-all font-sans"
                  />
                  <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-350" />
                </div>
                <button
                  type="submit"
                  className="py-3 px-6 bg-white hover:bg-zinc-100 text-emerald-900 font-bold rounded-2xl text-xs sm:text-sm active:translate-y-px transition-all shadow-md shrink-0 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  Subscribe NOW
                </button>
              </form>
            )}
            <p className="text-[10px] text-zinc-400 text-center lg:text-left mt-2 whitespace-nowrap">
              🔒 We never sell contact information. Unsubscribe at any single click.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
