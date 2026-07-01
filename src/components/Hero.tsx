/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { Search, Building, MapPin, BedDouble, CircleDollarSign, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onSearch: (filters: {
    type: string;
    city: string;
    beds: string;
    priceRange: string;
  }) => void;
}

export default function Hero({ onSearch }: HeroProps) {
  const [type, setType] = useState('all');
  const [city, setCity] = useState('all');
  const [beds, setBeds] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    onSearch({ type, city, beds, priceRange });
    
    // Smooth scroll to listings section
    const listingsSection = document.getElementById('listings');
    if (listingsSection) {
      listingsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="home" className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-slate-950 py-12 md:py-20 text-white">
      
      {/* Background Image with elegant overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_luxury_villa_1782852766190.jpg"
          alt="Luxury architectural villa"
          className="h-full w-full object-cover object-center opacity-65 scale-105 animate-[subtle-zoom_20s_infinite_alternate]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-slate-950 via-transparent to-transparent z-10"></div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Right Column: Hero Headline & Badges */}
          <div className="lg:col-span-7 flex flex-col items-start text-right order-1 lg:order-2" style={{ direction: 'rtl' }}>
            
            {/* Trust tag */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-amber-500 font-bold text-xs sm:text-sm mb-6"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>أكثر من ٥٠٠ صفقة عقارية ناجحة في العام الماضي</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white mb-6 font-display"
            >
              بيت أحلامك <br className="hidden sm:inline" />
              <span className="bg-gradient-to-l from-amber-400 to-amber-600 bg-clip-text text-transparent">
                يبدأ من هنا
              </span>
            </motion.h1>

            {/* Subtitle description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-300 text-base sm:text-lg lg:text-xl font-medium leading-relaxed max-w-2xl mb-8"
            >
              نقدم لك باقة من أفخم الفلل والوحدات السكنية والاستثمارية المصممة بعناية فائقة لتلائم تطلعاتك بمختلف أحياء المملكة، مع استشارات عقارية مجانية وتغطية قانونية متكاملة.
            </motion.p>

            {/* Trust factors quick indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap gap-x-8 gap-y-4 text-slate-300 font-semibold text-sm border-t border-white/10 pt-6 w-full"
            >
              <div className="flex items-center gap-2">
                <span className="text-amber-500 text-lg font-bold">★ ٤.٩</span>
                <span>تقييم العملاء</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-500 text-lg font-bold">١٠٠٪</span>
                <span>أمان وشفافية</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-500 text-lg font-bold">٢٤ ساعة</span>
                <span>دعم واستشارات</span>
              </div>
            </motion.div>
          </div>

          {/* Left Column: Fast Search Bar Container */}
          <div className="lg:col-span-5 w-full order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 shadow-2xl backdrop-blur-xl"
              style={{ direction: 'rtl' }}
            >
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
                <Search className="h-4.5 w-4.5 text-amber-500" />
                <span>أداة البحث العقاري السريع</span>
              </h3>

              <form onSubmit={handleSearch} className="space-y-4">
                
                {/* 1. Property Type */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <Building className="h-3.5 w-3.5 text-amber-500" />
                    <span>نوع العقار المطلوب</span>
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-slate-900/80 p-2.5 text-xs text-white focus:border-amber-500/50 focus:outline-none transition-colors"
                  >
                    <option value="all" className="bg-slate-900 text-white">كل العقارات</option>
                    <option value="villa" className="bg-slate-900 text-white">فيلا مستقلة / تاون هاوس</option>
                    <option value="apartment" className="bg-slate-900 text-white">شقة سكنية فاخرة</option>
                    <option value="land" className="bg-slate-900 text-white">أرض سكنية أو تجارية</option>
                  </select>
                </div>

                {/* 2. City / Location */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-300 flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-amber-500" />
                    <span>المدينة / المنطقة</span>
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-slate-900/80 p-2.5 text-xs text-white focus:border-amber-500/50 focus:outline-none transition-colors"
                  >
                    <option value="all" className="bg-slate-900 text-white">جميع المدن والمناطق</option>
                    <option value="Riyadh" className="bg-slate-900 text-white">الرياض (الشمال والشرق)</option>
                    <option value="Jeddah" className="bg-slate-900 text-white">جدة (الكورنيش والأحياء الراقية)</option>
                    <option value="Khobar" className="bg-slate-900 text-white">الخبر (الحزام والساحل)</option>
                    <option value="Makkah" className="bg-slate-900 text-white">مكة المكرمة (العوالي)</option>
                  </select>
                </div>

                {/* Grid for rooms and price */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* 3. Bed rooms */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <BedDouble className="h-3.5 w-3.5 text-amber-500" />
                      <span>عدد الغرف</span>
                    </label>
                    <select
                      value={beds}
                      onChange={(e) => setBeds(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-slate-900/80 p-2.5 text-xs text-white focus:border-amber-500/50 focus:outline-none transition-colors"
                    >
                      <option value="all" className="bg-slate-900 text-white">الكل</option>
                      <option value="3" className="bg-slate-900 text-white">٣ غرف نوم</option>
                      <option value="4" className="bg-slate-900 text-white">٤ غرف نوم</option>
                      <option value="5" className="bg-slate-900 text-white">٥ غرف أو أكثر</option>
                    </select>
                  </div>

                  {/* 4. Price Bracket */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <CircleDollarSign className="h-3.5 w-3.5 text-amber-500" />
                      <span>السعر المتوقع</span>
                    </label>
                    <select
                      value={priceRange}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-slate-900/80 p-2.5 text-xs text-white focus:border-amber-500/50 focus:outline-none transition-colors"
                    >
                      <option value="all" className="bg-slate-900 text-white">كل الميزانيات</option>
                      <option value="under1.5m" className="bg-slate-900 text-white">أقل من ١.٥ مليون ر.س</option>
                      <option value="1.5m-3m" className="bg-slate-900 text-white">١.٥ - ٣ مليون ر.س</option>
                      <option value="over3m" className="bg-slate-900 text-white">أكثر من ٣ مليون ر.س</option>
                    </select>
                  </div>
                </div>

                {/* Submit button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full mt-2 rounded-xl bg-amber-500 hover:bg-amber-400 p-3 font-bold text-sm text-slate-950 shadow-lg shadow-amber-500/20 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Search className="h-4 w-4 text-slate-950" />
                  <span>ابحث الآن في العروض المتاحة</span>
                </motion.button>
              </form>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Animation custom styles */}
      <style>{`
        @keyframes subtle-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.08); }
        }
      `}</style>
    </section>
  );
}
