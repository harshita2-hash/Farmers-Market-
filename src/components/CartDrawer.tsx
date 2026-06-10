import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, CreditCard, Sparkles, CheckCircle2, Ticket, MapPin, Truck } from 'lucide-react';
import { CartItem, Product, Order } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveFromCart: (productId: string) => void;
  onClearCart: () => void;
  onAddOrder: (order: Order) => void;
  userAddress: string;
  userName: string;
  currency: 'USD' | 'INR';
}

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveFromCart,
  onClearCart,
  onAddOrder,
  userAddress,
  userName,
  currency
}: CartDrawerProps) {
  const [step, setStep] = useState<'cart' | 'shipping' | 'payment' | 'completed'>('cart');

  // Helper function to format the price in target currency
  const formatPrice = (priceInUSD: number) => {
    if (currency === 'INR') {
      return `₹${(priceInUSD * 83).toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}`;
    }
    return `$${priceInUSD.toFixed(2)}`;
  };
  
  // Checkout Form Details
  const [fullName, setFullName] = useState(userName || '');
  const [address, setAddress] = useState(userAddress || '');
  const [city, setCity] = useState('Portland');
  const [zipcode, setZipcode] = useState('97201');
  const [phone, setPhone] = useState('+1 (555) 0192');
  const [shippingMethod, setShippingMethod] = useState<'delivery' | 'pickup'>('delivery');

  // Payment Form Details
  const [cardName, setCardName] = useState(fullName || '');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  // Discount / Coupons
  const [promoCode, setPromoCode] = useState('');
  const [activeCoupon, setActiveCoupon] = useState<'FARMFRESH' | 'HOLIDAY' | null>(null);
  const [promoError, setPromoError] = useState('');

  // Generated Order Tracking
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // Pricing calculations
  const itemsSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const deliveryFee = shippingMethod === 'delivery' ? 4.99 : 0.00;
  
  let discount = 0;
  if (activeCoupon === 'FARMFRESH') {
    discount = itemsSubtotal * 0.15; // 15% off
  } else if (activeCoupon === 'HOLIDAY') {
    discount = 10.00; // $10 flat off
  }

  const finalTotal = Math.max(0, itemsSubtotal + deliveryFee - discount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCode.trim().toUpperCase();
    if (code === 'FARMFRESH') {
      setActiveCoupon('FARMFRESH');
      setPromoCode('');
    } else if (code === 'HOLIDAY') {
      if (itemsSubtotal < 30) {
        setPromoError('HOLIDAY coupon requires minimum orders of $30.00');
      } else {
        setActiveCoupon('HOLIDAY');
        setPromoCode('');
      }
    } else {
      setPromoError('Invalid coupon. Try applying "FARMFRESH" (15% off) or "HOLIDAY" ($10 off).');
    }
  };

  const handleClearCoupon = () => {
    setActiveCoupon(null);
  };

  const handleGoToShipping = () => {
    if (cart.length === 0) return;
    setStep('shipping');
  };

  const handleCompleteShipping = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !address || !city || !zipcode) return;
    setStep('payment');
  };

  const handleCompletePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardName || !cardNumber || !cardExp || !cardCvv) return;

    setIsSubmitting(true);

    // Simulate Payment Node Processing
    setTimeout(() => {
      const designID = 'NG-' + Math.floor(1000 + Math.random() * 9000) + '-OR';
      const orderObj: Order = {
        id: designID,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        items: [...cart],
        total: parseFloat(finalTotal.toFixed(2)),
        status: 'Processing',
        shippingAddress: `${address}, ${city}, ${zipcode}`
      };

      setPlacedOrder(orderObj);
      onAddOrder(orderObj);
      setIsSubmitting(false);
      setStep('completed');
      onClearCart();
    }, 1500);
  };

  const handleResetCheckout = () => {
    setStep('cart');
    setPlacedOrder(null);
    setActiveCoupon(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-zinc-950/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-zinc-900 shadow-2xl flex flex-col h-full border-l border-emerald-50 dark:border-zinc-800 animate-in slide-in-from-right duration-200">
          
          {/* Header */}
          <div className="px-5 py-6 bg-emerald-700 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              <h2 className="font-display text-lg font-bold">
                {step === 'cart' && 'Your Shopping Basket'}
                {step === 'shipping' && 'Delivery Coordinates'}
                {step === 'payment' && 'Secure Checkout'}
                {step === 'completed' && 'Order Placed!'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-emerald-100 hover:text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper Timeline indicators (Only shown when not completed) */}
          {step !== 'completed' && (
            <div className="px-5 py-3.5 bg-emerald-50 dark:bg-zinc-850 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-around text-xs font-semibold text-zinc-400">
              <span className={`pb-1 ${step === 'cart' ? 'text-emerald-700 dark:text-emerald-400 border-b-2 border-emerald-600' : 'text-emerald-600'}`}>Review</span>
              <span className="text-zinc-300">→</span>
              <span className={`pb-1 ${step === 'shipping' ? 'text-emerald-700 dark:text-emerald-400 border-b-2 border-emerald-600' : step === 'payment' ? 'text-emerald-600' : ''}`}>Delivery</span>
              <span className="text-zinc-300">→</span>
              <span className={`pb-1 ${step === 'payment' ? 'text-emerald-700 dark:text-emerald-400 border-b-2 border-emerald-600' : ''}`}>Payment</span>
            </div>
          )}

          {/* Core Body Container */}
          <div className="flex-1 overflow-y-auto p-5">
            
            {/* STEP 1: CART DETAILS CONTAINER */}
            {step === 'cart' && (
              <div className="space-y-4 h-full flex flex-col">
                {cart.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 px-4 py-8">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-zinc-800 flex items-center justify-center text-emerald-500 dark:text-emerald-400">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-sm text-zinc-800 dark:text-neutral-150">
                        Your Shopping Basket is Empty
                      </h3>
                      <p className="text-xs text-zinc-400 mt-1 max-w-xs">
                        Fill your kitchen with clean products sourced direct from our hand-picked farmers.
                      </p>
                    </div>
                    <button
                      onClick={onClose}
                      className="mt-2 py-2.5 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="flex-1 space-y-3.5">
                    {cart.map((item, index) => (
                      <div
                        key={`${item.product.id}-${index}`}
                        className="flex items-center gap-3.5 p-3 rounded-2xl border border-zinc-150 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-850/50"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-14 h-14 rounded-xl object-cover shrink-0 bg-white"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-zinc-800 dark:text-neutral-150 truncate">
                            {item.product.name}
                          </h4>
                          <p className="text-[10px] text-zinc-400">
                            By {item.product.farmName}
                          </p>
                          <p className="text-xs mt-1 font-semibold text-zinc-900 dark:text-neutral-50">
                            {formatPrice(item.product.price * item.quantity)}{' '}
                            <span className="text-[10px] text-zinc-400 font-normal">
                              ({formatPrice(item.product.price)} / {item.product.unit})
                            </span>
                          </p>
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-1.5 shrink-0 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-1.5">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="p-0.5 text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-zinc-150 dark:hover:bg-zinc-700 rounded-sm"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center text-zinc-800 dark:text-neutral-100">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="p-0.5 text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-zinc-150 dark:hover:bg-zinc-700 rounded-sm"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Trash */}
                        <button
                          onClick={() => onRemoveFromCart(item.product.id)}
                          className="p-1.5 text-zinc-300 hover:text-rose-500 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* STEP 2: SHIPPING DETAILS FORM */}
            {step === 'shipping' && (
              <form onSubmit={handleCompleteShipping} className="space-y-4">
                <div className="p-3.5 bg-emerald-50 dark:bg-zinc-850 rounded-2xl border border-emerald-100 dark:border-zinc-800 flex gap-2 text-xs text-emerald-800 dark:text-emerald-300 items-start">
                  <Truck className="w-5 h-5 shrink-0 text-emerald-600" />
                  <p>
                    <strong>Delivery Guarantee:</strong> All fresh farm produce is delivered under cold chain ventilation within 8 hours of dispatch from our regional farmer hubs.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
                    RECEIVER NAME
                  </label>
                  <input
                    required
                    type="text"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="E.g. Jane Doe"
                    className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-850 text-zinc-900 dark:text-neutral-50 rounded-xl border border-zinc-200 dark:border-zinc-750 focus:border-emerald-500 outline-hidden text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
                    STREET ADDRESS
                  </label>
                  <input
                    required
                    type="text"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="E.g. 742 Evergreen Terrace"
                    className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-850 text-zinc-900 dark:text-neutral-50 rounded-xl border border-zinc-200 dark:border-zinc-750 focus:border-emerald-500 outline-hidden text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
                      CITY
                    </label>
                    <input
                      required
                      type="text"
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      placeholder="Portland"
                      className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-850 text-zinc-900 dark:text-neutral-50 rounded-xl border border-zinc-200 dark:border-zinc-750 focus:border-emerald-500 outline-hidden text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
                      ZIP / POSTAL CODE
                    </label>
                    <input
                      required
                      type="text"
                      value={zipcode}
                      onChange={e => setZipcode(e.target.value)}
                      placeholder="97201"
                      className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-850 text-zinc-900 dark:text-neutral-50 rounded-xl border border-zinc-200 dark:border-zinc-750 focus:border-emerald-500 outline-hidden text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
                    PHONE NUMBER
                  </label>
                  <input
                    required
                    type="text"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+1 (555) 0192"
                    className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-850 text-zinc-900 dark:text-neutral-50 rounded-xl border border-zinc-200 dark:border-zinc-750 focus:border-emerald-500 outline-hidden text-xs"
                  />
                </div>

                {/* Delivery Option */}
                <div>
                  <span className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-2">
                    SELECT LOGISTICS METHOD
                  </span>
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => setShippingMethod('delivery')}
                      className={`w-full flex items-center justify-between p-3 rounded-2xl border text-xs text-left transition-all ${
                        shippingMethod === 'delivery'
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 ring-2 ring-emerald-500/10'
                          : 'border-zinc-200 dark:border-zinc-750 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-805'
                      }`}
                    >
                      <div className="flex gap-2.5 items-center">
                        <Truck className="w-4 h-4 text-emerald-500" />
                        <div>
                          <p className="font-bold">Ventilated Cold Delivery</p>
                          <p className="text-[10px] opacity-70">Directly from farm roots to door slab</p>
                        </div>
                      </div>
                      <span className="font-bold font-mono">{formatPrice(4.99)}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShippingMethod('pickup')}
                      className={`w-full flex items-center justify-between p-3 rounded-2xl border text-xs text-left transition-all ${
                        shippingMethod === 'pickup'
                          ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 ring-2 ring-emerald-500/10'
                          : 'border-zinc-200 dark:border-zinc-750 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-805'
                      }`}
                    >
                      <div className="flex gap-2.5 items-center">
                        <MapPin className="w-4 h-4 text-emerald-500" />
                        <div>
                          <p className="font-bold">Eco-Hub Curbside Pickup</p>
                          <p className="text-[10px] opacity-70">Pick up from Natural Grocery regional storage box</p>
                        </div>
                      </div>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">FREE</span>
                    </button>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep('cart')}
                    className="flex-1 py-3 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-xl text-xs font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Proceed to Payment
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: PAYMENT FORM */}
            {step === 'payment' && (
              <form onSubmit={handleCompletePayment} className="space-y-4">
                <div className="p-3 bg-emerald-950 text-emerald-300 rounded-2xl border border-emerald-850 flex items-center gap-2 text-xs">
                  <ShieldCheck className="w-4.5 h-4.5 text-emerald-400" />
                  <span>SSL encrypted banking protocol active. SSL 256bit.</span>
                </div>

                {/* Simulated credit card preview */}
                <div className="p-5 rounded-2xl bg-gradient-to-tr from-emerald-800 via-teal-700 to-emerald-900 text-white shadow-md relative overflow-hidden">
                  <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 w-28 h-28 rounded-full bg-white/5" />
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] uppercase tracking-wider font-extrabold opacity-80">Natural Card network</span>
                    <CreditCard className="w-6 h-6 text-emerald-200" />
                  </div>
                  <p className="font-mono text-base tracking-widest mb-4">
                    {cardNumber ? cardNumber.replace(/(\d{4})/g, '$1 ').trim() : '•••• •••• •••• ••••'}
                  </p>
                  <div className="flex justify-between items-end text-[10px]">
                    <div>
                      <p className="opacity-60 uppercase mb-0.5">Card Holder</p>
                      <p className="font-semibold tracking-wide truncate max-w-[150px]">
                        {cardName ? cardName.toUpperCase() : 'JANE DOE'}
                      </p>
                    </div>
                    <div>
                      <p className="opacity-60 uppercase mb-0.5">Expires</p>
                      <p className="font-semibold font-mono">{cardExp || 'MM/YY'}</p>
                    </div>
                  </div>
                </div>

                {/* Form fields */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
                    NAME ON CREDIT CARD
                  </label>
                  <input
                    required
                    type="text"
                    value={cardName}
                    onChange={e => setCardName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-850 text-zinc-900 dark:text-neutral-50 rounded-xl border border-zinc-200 dark:border-zinc-750 focus:border-emerald-500 outline-hidden text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
                    CARD NUMBER
                  </label>
                  <input
                    required
                    type="text"
                    maxLength={16}
                    value={cardNumber}
                    onChange={e => setCardNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="4111222233334444"
                    className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-850 text-zinc-900 dark:text-neutral-50 rounded-xl border border-zinc-200 dark:border-zinc-750 focus:border-emerald-500 outline-hidden text-xs font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
                      VALID THRU
                    </label>
                    <input
                      required
                      type="text"
                      maxLength={5}
                      value={cardExp}
                      onChange={e => setCardExp(e.target.value)}
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-850 text-zinc-900 dark:text-neutral-50 rounded-xl border border-zinc-200 dark:border-zinc-750 focus:border-emerald-500 outline-hidden text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
                      CVV / CODE
                    </label>
                    <input
                      required
                      type="password"
                      maxLength={3}
                      value={cardCvv}
                      onChange={e => setCardCvv(e.target.value.replace(/\D/g, ''))}
                      placeholder="•••"
                      className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-850 text-zinc-900 dark:text-neutral-50 rounded-xl border border-zinc-200 dark:border-zinc-750 focus:border-emerald-500 outline-hidden text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep('shipping')}
                    className="flex-1 py-3 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-xl text-xs font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? 'Verifying Card...' : `Complete Payment ${formatPrice(finalTotal)}`}
                  </button>
                </div>
              </form>
            )}

            {/* STEP 4: ORDER SUCCESS / COMPLETED PAGE */}
            {step === 'completed' && placedOrder && (
              <div className="text-center space-y-5 py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 font-bold flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="font-display font-black text-lg text-zinc-900 dark:text-neutral-50">
                    Order Super Charged!
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">
                    Your order was routed successfully to our local farmers.
                  </p>
                </div>

                {/* Receipt Board Box */}
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-850 border border-zinc-150 dark:border-zinc-800 text-left text-xs space-y-2 font-sans">
                  <p className="flex justify-between">
                    <span className="text-zinc-400">Tracking Code:</span>
                    <strong className="font-mono text-zinc-800 dark:text-neutral-100">{placedOrder.id}</strong>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-zinc-400">Hub Dispatch:</span>
                    <span className="text-emerald-600 font-bold">Guaranteed within 8 hrs</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-zinc-400">Total Charged:</span>
                    <strong className="font-mono text-zinc-800 dark:text-neutral-150">{formatPrice(placedOrder.total)}</strong>
                  </p>
                  <div className="pt-2 border-t border-zinc-200 dark:border-zinc-700 mt-2">
                    <p className="text-[10px] text-zinc-400">SHIPPING DESTINATION:</p>
                    <p className="text-zinc-600 dark:text-zinc-300 font-medium text-[11px] truncate">
                      {placedOrder.shippingAddress}
                    </p>
                  </div>
                </div>

                {/* Environmental Stat celebration */}
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 rounded-2xl border border-emerald-150 dark:border-emerald-950 text-left text-xs flex gap-2 items-center text-emerald-800 dark:text-emerald-400">
                  <Sparkles className="w-5 h-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <h5 className="font-bold">Zero Plastic Footprint!</h5>
                    <p className="text-[10px] opacity-90">By ordering, you avoided 4.5 ounces of single-use polyethylene bags. Our carrier uses starch-lined pulp crates.</p>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleResetCheckout}
                    className="w-full py-3 bg-zinc-900 hover:bg-black text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-900 rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    View Store Dashboard
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* BOTTOM CHECKOUT FOOTER (Only shown on Step 1: Review Basket) */}
          {step === 'cart' && cart.length > 0 && (
            <div className="p-5 border-t border-zinc-150 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 space-y-4 shadow-xl">
              
              {/* Promotion entry field */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon: try FARMFRESH"
                  value={promoCode}
                  onChange={e => setPromoCode(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-white dark:bg-zinc-850 text-zinc-900 dark:text-neutral-50 rounded-xl border border-zinc-200 dark:border-zinc-750 focus:border-emerald-500 outline-hidden"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-zinc-800 hover:bg-black dark:bg-zinc-850 dark:hover:bg-zinc-750 text-white dark:text-neutral-100 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  Apply
                </button>
              </form>

              {promoError && <p className="text-[10px] text-rose-500 font-semibold">{promoError}</p>}
              {activeCoupon && (
                <div className="flex items-center justify-between text-xs font-semibold bg-emerald-100/60 dark:bg-emerald-950/20 text-emerald-850 dark:text-emerald-300 px-3 py-1.5 rounded-xl">
                  <span>🎟️ Promo "{activeCoupon}" Active</span>
                  <button onClick={handleClearCoupon} className="text-zinc-400 hover:text-zinc-650 font-bold">✕</button>
                </div>
              )}

              {/* pricing details summary rows */}
              <div className="space-y-1.5 text-xs text-zinc-500 dark:text-zinc-400 font-sans">
                <div className="flex justify-between">
                  <span>Basket Subtotal</span>
                  <span className="font-mono text-zinc-800 dark:text-neutral-150">{formatPrice(itemsSubtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                    <span>Coupon Discount</span>
                    <span className="font-mono">-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Cold Shipping Fee</span>
                  <span className="font-mono text-zinc-800 dark:text-neutral-150">{formatPrice(deliveryFee)}</span>
                </div>
                <div className="flex justify-between text-sm text-zinc-950 dark:text-white font-extrabold pt-2 border-t border-zinc-200 dark:border-zinc-800">
                  <span>Grand Total</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 text-lg">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Checkout buttons */}
              <div className="pt-2 space-y-2">
                <button
                  onClick={handleGoToShipping}
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold rounded-xl text-xs transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4.5 h-4.5" />
                  Proceed to Secure Delivery Details
                </button>
                <p className="text-[9px] text-zinc-400 text-center flex items-center justify-center gap-1">
                  🛡️ 100% Secure Checkout. Same day cold guarantees.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
