import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User, ShieldCheck, RefreshCw } from 'lucide-react';
import { User as UserType } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserType) => void;
  initialMode?: 'login' | 'signup';
}

export default function AuthModal({ isOpen, onClose, onLoginSuccess, initialMode = 'login' }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [userRole, setUserRole] = useState<'customer' | 'farmer'>('customer');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    setIsLogin(initialMode === 'login');
    setError('');
    setSuccess('');
  }, [initialMode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!email || !password) {
      setError('Please provide both email and password.');
      setLoading(false);
      return;
    }

    if (!isLogin && !fullName) {
      setError('Please write your full name to register.');
      setLoading(false);
      return;
    }

    // Simulate Network Delay
    setTimeout(() => {
      try {
        const storedUsers = localStorage.getItem('natural_grocery_users');
        const users: (UserType & { password?: string })[] = storedUsers ? JSON.parse(storedUsers) : [];

        if (isLogin) {
          // Check credentials
          const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
          if (!foundUser) {
            // Check default user credentials for convenience
            if (email.toLowerCase() === 'customer@natural.com' && password === '123456') {
              const defaultUser: UserType = {
                id: 'u_default_cust',
                name: 'Jane Doe',
                email: 'customer@natural.com',
                phone: '+1 (555) 0192',
                address: '742 Evergreen Terrace, Portland, OR',
                role: 'customer'
              };
              localStorage.setItem('natural_grocery_current_user', JSON.stringify(defaultUser));
              onLoginSuccess(defaultUser);
              setSuccess('Welcome back, Jane!');
              setLoading(false);
              setTimeout(() => {
                onClose();
              }, 1200);
              return;
            } else if (email.toLowerCase() === 'farmer@natural.com' && password === '123456') {
              const defaultFarmer: UserType = {
                id: 'u_default_farm',
                name: 'Farmer John',
                email: 'farmer@natural.com',
                phone: '+1 (555) 0214',
                address: 'Green Valley Road, OR',
                role: 'farmer'
              };
              localStorage.setItem('natural_grocery_current_user', JSON.stringify(defaultFarmer));
              onLoginSuccess(defaultFarmer);
              setSuccess('Welcome back, Farmer John!');
              setLoading(false);
              setTimeout(() => {
                onClose();
              }, 1200);
              return;
            }
            throw new Error('No account found with this email. Please sign up first!');
          }

          localStorage.setItem('natural_grocery_current_user', JSON.stringify({
            id: foundUser.id,
            name: foundUser.name,
            email: foundUser.email,
            address: foundUser.address,
            phone: foundUser.phone,
            role: foundUser.role
          }));
          onLoginSuccess(foundUser);
          setSuccess(`Logged in successfully! Welcome back, ${foundUser.name}.`);
          setTimeout(() => {
            onClose();
          }, 1200);
        } else {
          // Validation
          const exists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
          if (exists) {
            throw new Error('This email address already exists. Try logging in.');
          }

          const newUser: UserType & { password?: string } = {
            id: 'u_' + Math.random().toString(36).substr(2, 9),
            name: fullName,
            email: email,
            phone: phone || '+1 (555) 123-4567',
            address: address || '123 Eco Way, Portland, OR',
            role: userRole,
            password: password
          };

          users.push(newUser);
          localStorage.setItem('natural_grocery_users', JSON.stringify(users));
          
          // Log user in automatically
          const cleanedUser: UserType = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone,
            address: newUser.address,
            role: newUser.role
          };
          localStorage.setItem('natural_grocery_current_user', JSON.stringify(cleanedUser));
          onLoginSuccess(cleanedUser);

          setSuccess(`Congratulations! Your ${userRole} account is active!`);
          setTimeout(() => {
            onClose();
          }, 1500);
        }
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred. Please check values.');
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden border border-emerald-100 dark:border-zinc-850 p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <h3 className="font-display text-xl font-bold text-zinc-900 dark:text-neutral-50">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Informative credentials for quick-login convenience */}
        <div className="mb-5 p-3 rounded-2xl bg-amber-50 dark:bg-zinc-800 border border-amber-200/50 dark:border-zinc-700 text-xs text-amber-800 dark:text-amber-300">
          <span className="font-semibold block mb-1">💡 Sandbox Quick Credentials:</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
            <div>
              <p className="font-medium">Standard Customer:</p>
              <code className="text-[10px] bg-white/70 dark:bg-black/30 px-1 rounded">customer@natural.com</code> / <code className="text-[10px] bg-white/70 dark:bg-black/30 px-1 rounded">123456</code>
            </div>
            <div>
              <p className="font-medium">Farmer Partner:</p>
              <code className="text-[10px] bg-white/70 dark:bg-black/30 px-1 rounded">farmer@natural.com</code> / <code className="text-[10px] bg-white/70 dark:bg-black/30 px-1 rounded">123456</code>
            </div>
          </div>
        </div>

        {/* Custom Notifications */}
        {error && (
          <div className="mb-4 p-3.5 text-xs font-medium text-rose-800 bg-rose-50 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-100 dark:border-rose-950 rounded-2xl">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-3.5 text-xs font-medium text-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-950 rounded-2xl">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
              EMAIL ADDRESS
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-400">
                <Mail className="w-4.5 h-4.5" />
              </span>
              <input
                required
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-neutral-50 rounded-2xl border border-zinc-200 dark:border-zinc-750 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 outline-hidden text-sm transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
              PASSWORD
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-400">
                <Lock className="w-4.5 h-4.5" />
              </span>
              <input
                required
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-neutral-50 rounded-2xl border border-zinc-200 dark:border-zinc-750 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 outline-hidden text-sm transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs font-medium text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* Registration specific fields */}
          {!isLogin && (
            <>
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
                  FULL NAME
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-400">
                    <User className="w-4.5 h-4.5" />
                  </span>
                  <input
                    required
                    type="text"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full pl-10 pr-4 py-3 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-neutral-50 rounded-2xl border border-zinc-200 dark:border-zinc-750 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 outline-hidden text-sm transition-all"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
                  PHONE NUMBER (OPTIONAL)
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+1 (555) 012-3456"
                  className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-neutral-50 rounded-2xl border border-zinc-200 dark:border-zinc-750 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 outline-hidden text-sm transition-all"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
                  DELIVERY / FARM ADDRESS
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="Street name, City, Zipcode"
                  className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-neutral-50 rounded-2xl border border-zinc-200 dark:border-zinc-750 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/15 outline-hidden text-sm transition-all"
                />
              </div>

              {/* Role Selection */}
              <div>
                <span className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-2">
                  ACCOUNT TYPE
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setUserRole('customer')}
                    className={`py-3 px-4 rounded-2xl border text-sm font-medium transition-all flex flex-col items-center justify-center gap-1 ${
                      userRole === 'customer'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 ring-2 ring-emerald-500/15'
                        : 'border-zinc-200 dark:border-zinc-750 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                    }`}
                  >
                    <span className="text-sm font-bold">🛒 Customer</span>
                    <span className="text-[10px] opacity-70">Buy fresh grocery</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserRole('farmer')}
                    className={`py-3 px-4 rounded-2xl border text-sm font-medium transition-all flex flex-col items-center justify-center gap-1 ${
                      userRole === 'farmer'
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 ring-2 ring-emerald-500/15'
                        : 'border-zinc-200 dark:border-zinc-750 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                    }`}
                  >
                    <span className="text-sm font-bold">👨‍🌾 Farmer Partner</span>
                    <span className="text-[10px] opacity-70">List organic harvest</span>
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white rounded-2xl font-semibold shadow-md active:translate-y-px transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading && <RefreshCw className="w-4 h-4 animate-spin" />}
            {isLogin ? 'Log In to Account' : 'Complete Registration'}
          </button>
        </form>

        {/* Footer Link toggling login/signup */}
        <div className="mt-6 pt-4 border-t border-zinc-150 dark:border-zinc-800 text-center text-xs text-zinc-500 dark:text-zinc-400">
          {isLogin ? (
            <p>
              New to Natural Grocery?{' '}
              <button
                onClick={() => setIsLogin(false)}
                className="font-semibold text-emerald-600 hover:text-emerald-700 underline"
              >
                Sign up now
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                onClick={() => setIsLogin(true)}
                className="font-semibold text-emerald-600 hover:text-emerald-700 underline"
              >
                Log in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
