import React, { useState } from 'react';
import { X, Award, CheckCircle2, CloudLightning, Sprout, TrendingUp, ShoppingBag, PlusCircle } from 'lucide-react';
import { Product } from '../types';
import { parseLocalPrice } from '../utils/currency';

interface FarmerPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (newProduct: Product) => void;
  currency: 'USD' | 'INR';
}

export default function FarmerPortalModal({ isOpen, onClose, onAddProduct, currency }: FarmerPortalModalProps) {
  const [activeTab, setActiveTab] = useState<'register' | 'add_crop' | 'stats'>('register');
  
  // Registration Form
  const [farmName, setFarmName] = useState('');
  const [location, setLocation] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [soilType, setSoilType] = useState('Composted Clay Loam');
  const [isCertifiedOrganic, setIsCertifiedOrganic] = useState(true);
  const [regSuccess, setRegSuccess] = useState(false);

  // Crop Listing Form
  const [cropName, setCropName] = useState('');
  const [cropCategory, setCropCategory] = useState<'Vegetables' | 'Fruits' | 'Grains' | 'Dairy' | 'Spices' | 'Honey & Natural Foods'>('Vegetables');
  const [cropPrice, setCropPrice] = useState('');
  const [cropUnit, setCropUnit] = useState('lb');
  const [cropDesc, setCropDesc] = useState('');
  const [cropImage, setCropImage] = useState('');
  const [cropSuccess, setCropSuccess] = useState(false);

  if (!isOpen) return null;

  const handleRegisterFarm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmName || !location) return;
    setRegSuccess(true);
    setTimeout(() => {
      setActiveTab('add_crop');
      setRegSuccess(false);
    }, 1800);
  };

  const handleAddCrop = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cropName || !cropPrice) return;

    // Create a real product object and pass upward to state
    const customId = 'p_farm_' + Math.floor(Math.random() * 1000);
    const standardImages: Record<string, string> = {
      'Vegetables': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=400',
      'Fruits': 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&q=80&w=400',
      'Grains': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400',
      'Dairy': 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=400',
      'Spices': 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&q=80&w=400',
      'Honey & Natural Foods': 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=400'
    };

    const finalImage = cropImage || standardImages[cropCategory];

    // Convert INR back to standard USD base price internally if currently browsing in INR
    const priceInUSD = currency === 'INR' ? parseFloat(cropPrice) / 83 : parseFloat(cropPrice);

    const newProd: Product = {
      id: customId,
      name: `Organic ${cropName}`,
      category: cropCategory,
      price: priceInUSD,
      unit: cropUnit,
      rating: 5.0,
      reviewCount: 1,
      image: finalImage,
      description: cropDesc || `Delicious fresh heirloom ${cropName} of clean sustainable quality, grown on fertile organic soils.`,
      farmName: farmName || 'Your Registered Farm',
      farmerId: 'f_custom',
      nutrition: {
        calories: '35 kcal',
        carbs: '8g',
        protein: '1.2g',
        fat: '0.1g'
      },
      inStock: true,
      isPopular: false
    };

    onAddProduct(newProd);
    setCropSuccess(true);
    
    // Clear elements
    setCropName('');
    setCropPrice('');
    setCropDesc('');
    setCropImage('');

    setTimeout(() => {
      setCropSuccess(false);
      setActiveTab('stats');
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-990/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden border border-emerald-100 dark:border-zinc-850 animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Top Header Banner */}
        <div className="px-6 py-5 bg-gradient-to-r from-emerald-800 to-teal-700 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Sprout className="w-5 h-5 text-emerald-300 animate-spin-slow" />
            <span className="font-display font-black text-base uppercase tracking-wider">Farmer Hub Portal</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-emerald-100 hover:text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 px-3 shrink-0">
          <button
            onClick={() => setActiveTab('register')}
            className={`py-3.5 px-4 text-xs font-bold transition-all relative ${
              activeTab === 'register'
                ? 'text-emerald-700 dark:text-emerald-400'
                : 'text-zinc-400 hover:text-zinc-650'
            }`}
          >
            1. Register Farm
            {activeTab === 'register' && <span className="absolute bottom-0 left-0 right-0 h-0.75 bg-emerald-600 rounded-full" />}
          </button>

          <button
            onClick={() => setActiveTab('add_crop')}
            className={`py-3.5 px-4 text-xs font-bold transition-all relative ${
              activeTab === 'add_crop'
                ? 'text-emerald-700 dark:text-emerald-400'
                : 'text-zinc-400 hover:text-zinc-650'
            }`}
          >
            2. List Organic Crop
            {activeTab === 'add_crop' && <span className="absolute bottom-0 left-0 right-0 h-0.75 bg-emerald-600 rounded-full" />}
          </button>

          <button
            onClick={() => setActiveTab('stats')}
            className={`py-3.5 px-4 text-xs font-bold transition-all relative ${
              activeTab === 'stats'
                ? 'text-emerald-700 dark:text-emerald-400'
                : 'text-zinc-400 hover:text-zinc-650'
            }`}
          >
            3. Dashboard Performance
            {activeTab === 'stats' && <span className="absolute bottom-0 left-0 right-0 h-0.75 bg-emerald-600 rounded-full" />}
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 font-sans">
          
          {/* TAB 1: REGISTER FARM */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterFarm} className="space-y-4">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 rounded-2xl border border-emerald-150 dark:border-emerald-900 text-xs flex gap-2.5 items-start">
                <Award className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <h4 className="font-bold mb-0.5">Direct Wholesale Network</h4>
                  <p className="opacity-90 leading-relaxed">Earn 85% of retail pricing. Natural Grocery provides cold delivery trucks, compostable packaging cargo, and centralized buyer routing instantly.</p>
                </div>
              </div>

              {regSuccess && (
                <div className="p-4 bg-emerald-100/55 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 border border-emerald-250 rounded-2xl text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Farm registered! Transferring you to listing your active products...</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1 tracking-wider uppercase">
                  OFFICIAL FARM NAME
                </label>
                <input
                  required
                  type="text"
                  placeholder="E.g. Oregon Sweet Soil Homestead"
                  value={farmName}
                  onChange={e => setFarmName(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-850 text-zinc-900 dark:text-neutral-50 rounded-xl border border-zinc-200 dark:border-zinc-750 focus:border-emerald-500 outline-hidden text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1 tracking-wider uppercase">
                    REGIONAL LOCATION
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="E.g. Sonoma Valley, CA"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-850 text-zinc-900 dark:text-neutral-50 rounded-xl border border-zinc-200 dark:border-zinc-750 focus:border-emerald-500 outline-hidden text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1 tracking-wider uppercase">
                    SPECIALTY HARVEST CROPS
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="E.g. Vine Berries, Heirloom Herbs"
                    value={specialty}
                    onChange={e => setSpecialty(e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-850 text-zinc-900 dark:text-neutral-50 rounded-xl border border-zinc-200 dark:border-zinc-750 focus:border-emerald-500 outline-hidden text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1 tracking-wider uppercase">
                  SOIL BIOME COMPOST CLASSIFICATION
                </label>
                <select
                  value={soilType}
                  onChange={e => setSoilType(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-850 text-zinc-900 dark:text-neutral-50 rounded-xl border border-zinc-200 dark:border-zinc-750 focus:border-emerald-500 outline-hidden text-xs cursor-pointer"
                >
                  <option>Composted Clay Loam (High Nitrogen)</option>
                  <option>Sandy River Bed (Perfect Drainage for Berries)</option>
                  <option>Perlite Forest Peat (Optimal Root Expansion)</option>
                  <option>Silt Loam Orchard Ground (Rich Minerals)</option>
                </select>
              </div>

              {/* Bio-compost verification checkbox */}
              <label className="flex items-start gap-2.5 p-3 rounded-xl border border-zinc-150 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-850/30 text-[11px] text-zinc-500 dark:text-zinc-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isCertifiedOrganic}
                  onChange={e => setIsCertifiedOrganic(e.target.checked)}
                  className="mt-0.5 accent-emerald-600 rounded-sm"
                />
                <span>We guarantee our farm fields use 0% glyphosate or artificial chemical fertilizers. We consent to random periodic leaf testing by local organic associations.</span>
              </label>

              <button
                type="submit"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer transition-colors"
              >
                Save Registration and Proceed
              </button>
            </form>
          )}

          {/* TAB 2: LIST ORGANIC CROP */}
          {activeTab === 'add_crop' && (
            <form onSubmit={handleAddCrop} className="space-y-4">
              <div className="p-3 bg-zinc-50 dark:bg-zinc-850 rounded-xl border border-zinc-150 dark:border-zinc-800 text-[11px] text-zinc-500">
                <span className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">👨‍🌾 Listing Rules:</span>
                Provide real customer weight/unit packages and realistic prices. Let's make sure the produce looks premium.
              </div>

              {cropSuccess && (
                <div className="p-4 bg-emerald-100/55 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 border border-emerald-250 rounded-2xl text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Harvest listing published! Your crop is immediately integrated into the live marketplace catalog!</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1 tracking-wider uppercase">
                  CROP OR PRODUCT NAME
                </label>
                <input
                  required
                  type="text"
                  placeholder="E.g. Sweet Sugar Snap Peas"
                  value={cropName}
                  onChange={e => setCropName(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-850 text-zinc-900 dark:text-neutral-50 rounded-xl border border-zinc-200 dark:border-zinc-750 focus:border-emerald-500 outline-hidden text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1 tracking-wider uppercase">
                    MARKET CATEGORY
                  </label>
                  <select
                    value={cropCategory}
                    onChange={e => setCropCategory(e.target.value as any)}
                    className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-850 text-zinc-900 dark:text-neutral-50 rounded-xl border border-zinc-200 dark:border-zinc-750 focus:border-emerald-500 outline-hidden text-xs cursor-pointer"
                  >
                    <option value="Vegetables">Fresh Vegetables</option>
                    <option value="Fruits">Organic Fruits</option>
                    <option value="Dairy">Dairy Products</option>
                    <option value="Grains">Rice & Grains</option>
                    <option value="Spices">Spices</option>
                    <option value="Honey & Natural Foods">Honey & Natural Foods</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1 tracking-wider uppercase">
                      PRICE ({currency === 'INR' ? '₹' : '$'})
                    </label>
                    <input
                      required
                      type="number"
                      step="0.01"
                      placeholder={currency === 'INR' ? '250.00' : '2.99'}
                      value={cropPrice}
                      onChange={e => setCropPrice(e.target.value)}
                      className="w-full px-3 py-3 bg-zinc-50 dark:bg-zinc-850 text-zinc-900 dark:text-neutral-50 rounded-xl border border-zinc-200 dark:border-zinc-750 focus:border-emerald-500 outline-hidden text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1 tracking-wider uppercase">
                      UNIT
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="lb, bunch, oz jar"
                      value={cropUnit}
                      onChange={e => setCropUnit(e.target.value)}
                      className="w-full px-3 py-3 bg-zinc-50 dark:bg-zinc-850 text-zinc-900 dark:text-neutral-50 rounded-xl border border-zinc-200 dark:border-zinc-750 focus:border-emerald-500 outline-hidden text-xs"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1 tracking-wider uppercase">
                  CUSTOM IMAGE URL (OPTIONAL)
                </label>
                <input
                  type="url"
                  placeholder="Paste Unsplash URL or leave empty for smart category asset"
                  value={cropImage}
                  onChange={e => setCropImage(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-850 text-zinc-900 dark:text-neutral-50 rounded-xl border border-zinc-200 dark:border-zinc-750 focus:border-emerald-500 outline-hidden text-xs font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 mb-1 tracking-wider uppercase">
                  PRODUCT DESCRIPTION (OPTIONAL)
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe your crop's soil nutrients, health flavor profiles, or best storing recommendations."
                  value={cropDesc}
                  onChange={e => setCropDesc(e.target.value)}
                  className="w-full px-4 py-2 bg-zinc-50 dark:bg-zinc-850 text-zinc-900 dark:text-neutral-50 rounded-xl border border-zinc-200 dark:border-zinc-750 focus:border-emerald-500 outline-hidden text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                Publish Live Harvest Item
              </button>
            </form>
          )}

          {/* TAB 3: DASHBOARD METRICS */}
          {activeTab === 'stats' && (
            <div className="space-y-4">
              
              {/* Stats bento rows */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-emerald-50 dark:bg-zinc-850 border border-emerald-100 dark:border-zinc-805 rounded-2xl text-center">
                  <TrendingUp className="w-4.5 h-4.5 text-emerald-600 mx-auto mb-1" />
                  <span className="text-[10px] text-zinc-400 font-bold block">SALES</span>
                  <span className="text-sm font-black font-mono text-zinc-800 dark:text-neutral-100">
                    {currency === 'INR' ? '₹1,20,424.70' : '$1,450.90'}
                  </span>
                </div>

                <div className="p-3 bg-emerald-50 dark:bg-zinc-850 border border-emerald-100 dark:border-zinc-805 rounded-2xl text-center">
                  <ShoppingBag className="w-4.5 h-4.5 text-emerald-600 mx-auto mb-1" />
                  <span className="text-[10px] text-zinc-400 font-bold block">CARGO</span>
                  <span className="text-sm font-black font-mono text-zinc-800 dark:text-neutral-100">32 Orders</span>
                </div>

                <div className="p-3 bg-emerald-50 dark:bg-zinc-850 border border-emerald-100 dark:border-zinc-805 rounded-2xl text-center">
                  <CloudLightning className="w-4.5 h-4.5 text-emerald-600 mx-auto mb-1" />
                  <span className="text-[10px] text-zinc-400 font-bold block">SOIL HEALTH</span>
                  <span className="text-sm font-black font-mono text-emerald-600">A+ Rating</span>
                </div>
              </div>

              {/* simulated order active list */}
              <div>
                <h4 className="text-xs font-bold text-zinc-700 dark:text-neutral-300 mb-2">ACTIVE DISPATCH ORDERS QUEUE</h4>
                <div className="space-y-2 text-xs font-sans">
                  
                  <div className="p-3 rounded-xl border border-zinc-150 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-850/40">
                    <div>
                      <p className="font-bold text-zinc-800 dark:text-neutral-250">12lb Organic Vine Tomatoes</p>
                      <p className="text-[10px] text-zinc-400">Order #NG-9218 • Portland Hub</p>
                    </div>
                    <span className="px-2.5 py-1 text-[10px] font-bold bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 rounded-lg">Wait Picking</span>
                  </div>

                  <div className="p-3 rounded-xl border border-zinc-150 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-850/40">
                    <div>
                      <p className="font-bold text-zinc-800 dark:text-neutral-250">8 bunch Crisp Organic Broccoli</p>
                      <p className="text-[10px] text-zinc-400">Order #NG-8401 • Salem Delivery</p>
                    </div>
                    <span className="px-2.5 py-1 text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 rounded-lg">Picked & Checked</span>
                  </div>

                  <div className="p-3 rounded-xl border border-zinc-150 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-850/40 opacity-70">
                    <div>
                      <p className="font-bold text-zinc-800 dark:text-neutral-250">30 Brown Eggs Carton</p>
                      <p className="text-[10px] text-zinc-400">Order #NG-7140 • Curbside Hub</p>
                    </div>
                    <span className="px-2.5 py-1 text-[10px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-500 rounded-lg">Shipped</span>
                  </div>

                </div>
              </div>

              {/* CTA to close portal */}
              <button
                onClick={onClose}
                className="w-full py-3 bg-zinc-900 hover:bg-black text-white dark:bg-zinc-800 dark:hover:bg-zinc-750 rounded-xl text-xs font-semibold"
              >
                Return to Shop Storefront
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
