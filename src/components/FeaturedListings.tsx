/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, MouseEvent, FormEvent } from 'react';
import { Property, Lead } from '../types';
import { MapPin, BedDouble, Bath, Maximize2, Share2, Heart, HelpCircle, Phone, X, Check, Calculator, Building, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FeaturedListingsProps {
  properties: Property[];
  onAddInquiry: (lead: {
    name: string;
    phone: string;
    email?: string;
    type: 'inquiry';
    propertyType?: string;
    city?: string;
    notes?: string;
  }) => void;
  activeFilters: {
    type: string;
    city: string;
    beds: string;
    priceRange: string;
  };
  onResetFilters: () => void;
}

export default function FeaturedListings({
  properties,
  onAddInquiry,
  activeFilters,
  onResetFilters,
}: FeaturedListingsProps) {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Mortgage Calculator state
  const [downPaymentPercent, setDownPaymentPercent] = useState(30); // 30% default
  const [loanTerm, setLoanTerm] = useState(20); // 20 years default
  const [interestRate, setInterestRate] = useState(4.5); // 4.5% annual interest

  // Lead Form state
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadMessage, setLeadMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Filter labels mapping
  const getFilterLabels = () => {
    const labels = [];
    if (activeFilters.type !== 'all') {
      const types: Record<string, string> = { villa: 'فلل', apartment: 'شقق', land: 'أراضي' };
      labels.push(`نوع العقار: ${types[activeFilters.type] || activeFilters.type}`);
    }
    if (activeFilters.city !== 'all') {
      const cities: Record<string, string> = { Riyadh: 'الرياض', Jeddah: 'جدة', Khobar: 'الخبر', Makkah: 'مكة' };
      labels.push(`المدينة: ${cities[activeFilters.city] || activeFilters.city}`);
    }
    if (activeFilters.beds !== 'all') {
      labels.push(`غرف النوم: ${activeFilters.beds}`);
    }
    if (activeFilters.priceRange !== 'all') {
      const prices: Record<string, string> = {
        'under1.5m': 'أقل من ١.٥ مليون ر.س',
        '1.5m-3m': '١.٥ - ٣ مليون ر.س',
        'over3m': 'أكثر من ٣ مليون ر.س',
      };
      labels.push(`السعر: ${prices[activeFilters.priceRange] || activeFilters.priceRange}`);
    }
    return labels;
  };

  const isFiltered =
    activeFilters.type !== 'all' ||
    activeFilters.city !== 'all' ||
    activeFilters.beds !== 'all' ||
    activeFilters.priceRange !== 'all';

  const toggleFavorite = (id: string, e: MouseEvent) => {
    e.stopPropagation();
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const shareProperty = (id: string, e: MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}${window.location.pathname}?property=${id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleOpenDetails = (property: Property) => {
    setSelectedProperty(property);
    setFormSubmitted(false);
    setLeadName('');
    setLeadPhone('');
    setLeadEmail('');
    setLeadMessage(`السلام عليكم، أرغب في الاستفسار عن عقار "${property.title}" المروض بقيمة ${property.price.toLocaleString('ar-SA')} ريال سعودي وترتيب موعد للمعاينة.`);
  };

  const handleInquirySubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone) return;

    onAddInquiry({
      name: leadName,
      phone: leadPhone,
      email: leadEmail || undefined,
      type: 'inquiry',
      propertyType: selectedProperty?.typeAr,
      city: selectedProperty?.cityAr,
      notes: leadMessage,
    });

    setFormSubmitted(true);
  };

  // Mortgage Calculator Logic
  const calculateMortgage = () => {
    if (!selectedProperty) return { monthly: 0, downPayment: 0, loanAmount: 0 };
    
    const totalPrice = selectedProperty.price;
    const downPayment = totalPrice * (downPaymentPercent / 100);
    const loanAmount = totalPrice - downPayment;
    
    // Monthly interest rate
    const r = (interestRate / 100) / 12;
    // Total payments
    const n = loanTerm * 12;
    
    let monthly = 0;
    if (r === 0) {
      monthly = loanAmount / n;
    } else {
      monthly = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }
    
    return {
      monthly: Math.round(monthly),
      downPayment: Math.round(downPayment),
      loanAmount: Math.round(loanAmount),
    };
  };

  const mortgageResult = calculateMortgage();

  return (
    <section id="listings" className="py-24 bg-slate-950 text-white border-t border-white/5" style={{ direction: 'rtl' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="text-right">
            <span className="text-amber-500 font-bold text-sm tracking-widest uppercase block mb-3">
              عروضنا الفاخرة المتاحة
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 font-display">
              تصفح العقارات المميزة والفرص الحالية
            </h2>
            <p className="text-slate-300 text-base max-w-2xl font-medium">
              مجموعة مختارة بعناية من الفلل، الشقق والأراضي السكنية والتجارية مع كامل تفاصيل المساحات والضمانات.
            </p>
          </div>

          {/* Quick Stats of Filtered */}
          {isFiltered && (
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={onResetFilters}
                className="text-xs bg-white/5 text-slate-200 hover:bg-white/10 border border-white/10 font-bold px-4 py-2.5 rounded-xl transition duration-200 cursor-pointer"
              >
                إعادة ضبط البحث ×
              </button>
              {getFilterLabels().map((label, i) => (
                <span
                  key={i}
                  className="text-xs bg-amber-500/10 text-amber-500 border border-amber-500/20 font-bold px-3 py-2 rounded-xl"
                >
                  {label}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Property Grid */}
        {properties.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-12 text-center max-w-lg mx-auto"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-slate-300 mb-4">
              <Building className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">عذراً، لا توجد نتائج مطابقة لمواصفات بحثك</h3>
            <p className="text-slate-400 text-sm font-medium mb-6">
              جرّب تغيير خيارات التصفية أو التصفح بدون شروط لمشاهدة جميع الفرص العقارية الممتازة.
            </p>
            <button
              onClick={onResetFilters}
              className="rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 px-6 py-3 text-sm font-bold shadow-md transition-all cursor-pointer"
            >
              عرض جميع العقارات المتاحة
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {properties.map((property, idx) => (
                <motion.div
                  key={property.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="group rounded-3xl border border-white/10 bg-white/5 overflow-hidden shadow-2xl hover:shadow-amber-500/10 hover:border-amber-500/40 transition-all duration-300 flex flex-col h-full backdrop-blur-md"
                >
                  
                  {/* Card Media Wrapper */}
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-900">
                    <img
                      src={property.imageUrl}
                      alt={property.title}
                      className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Dark gradient shadow bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>

                    {/* Tags */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <span className="rounded-full bg-amber-500 text-slate-950 text-xs font-extrabold px-3 py-1.5 backdrop-blur-md">
                        {property.typeAr}
                      </span>
                    </div>

                    <div className="absolute top-4 left-4 flex gap-2">
                      {/* Favorite Button */}
                      <button
                        onClick={(e) => toggleFavorite(property.id, e)}
                        className={`rounded-full p-2 backdrop-blur-md transition-colors cursor-pointer ${
                          favorites.includes(property.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-slate-950/80 text-slate-200 border border-white/10 hover:bg-slate-950'
                        }`}
                      >
                        <Heart className="h-4 w-4 fill-current" />
                      </button>

                      {/* Share Button */}
                      <button
                        onClick={(e) => shareProperty(property.id, e)}
                        className="rounded-full bg-slate-950/80 text-slate-200 border border-white/10 p-2 hover:bg-slate-950 backdrop-blur-md transition-colors cursor-pointer"
                        title="نسخ رابط العقار"
                      >
                        {copiedId === property.id ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <Share2 className="h-4 w-4" />
                        )}
                      </button>
                    </div>

                    {/* Location Badge on Image */}
                    <div className="absolute bottom-4 right-4 flex items-center gap-1.5 text-white font-bold text-sm">
                      <MapPin className="h-4 w-4 text-amber-500" />
                      <span>{property.location}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    {/* Price and area */}
                    <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-3">
                      <span className="text-xl font-extrabold text-amber-500 font-display">
                        {property.price.toLocaleString('ar-SA')} <span className="text-xs font-semibold">ريال</span>
                      </span>
                      <span className="text-xs bg-white/5 text-slate-300 border border-white/10 font-bold px-2.5 py-1 rounded-md">
                        {property.size} م²
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-slate-100 mb-2 leading-snug hover:text-amber-500 transition-colors">
                      {property.title}
                    </h3>

                    {/* Description excerpt */}
                    <p className="text-slate-400 text-xs sm:text-sm font-semibold leading-relaxed mb-6 line-clamp-2">
                      {property.description}
                    </p>

                    {/* Specs / Features icons */}
                    <div className="mt-auto pt-4 border-t border-white/10 grid grid-cols-3 gap-2 text-center text-xs text-slate-300 font-bold">
                      <div className="flex flex-col items-center gap-1">
                        <BedDouble className="h-4 w-4 text-amber-500" />
                        <span>{property.beds > 0 ? `${property.beds} غرف` : 'ـ'}</span>
                      </div>
                      <div className="flex flex-col items-center gap-1 border-x border-white/10">
                        <Bath className="h-4 w-4 text-amber-500" />
                        <span>{property.baths > 0 ? `${property.baths} دورات` : 'ـ'}</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <Maximize2 className="h-4 w-4 text-amber-500" />
                        <span>{property.size} م²</span>
                      </div>
                    </div>

                    {/* Button CTA */}
                    <button
                      onClick={() => handleOpenDetails(property)}
                      className="w-full mt-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold py-3 text-sm transition-all shadow-md hover:shadow-lg hover:shadow-amber-500/10 cursor-pointer text-center block"
                    >
                      شاهد التفاصيل العقارية
                    </button>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

      </div>

      {/* Property Details Modal with Slide Over Backdrop */}
      <AnimatePresence>
        {selectedProperty && (
          <div className="fixed inset-0 z-50 overflow-y-auto" style={{ direction: 'rtl' }}>
            {/* Dark glass backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProperty(null)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            ></motion.div>

            {/* Modal Body Container */}
            <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="relative w-full max-w-5xl rounded-3xl bg-slate-900 shadow-2xl overflow-hidden z-10 border border-white/10"
              >
                
                {/* Close Button absolute */}
                <button
                  onClick={() => setSelectedProperty(null)}
                  className="absolute top-5 left-5 z-20 rounded-full bg-white/5 text-white hover:bg-white/10 border border-white/10 p-2.5 transition-colors focus:outline-none cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 text-white">
                  
                  {/* Right Half: Images & Information */}
                  <div className="lg:col-span-7 p-6 sm:p-8 border-l border-white/10">
                    
                    {/* Media view */}
                    <div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-slate-950 mb-6 shadow-xs border border-white/5">
                      <img
                        src={selectedProperty.imageUrl}
                        alt={selectedProperty.title}
                        className="h-full w-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 right-4 bg-amber-500 text-slate-950 font-extrabold text-xs px-3.5 py-2 rounded-full shadow-lg">
                        {selectedProperty.typeAr}
                      </div>
                    </div>

                    {/* Headers & Price */}
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h2 className="text-2xl font-extrabold text-white leading-snug font-display">
                          {selectedProperty.title}
                        </h2>
                        <p className="flex items-center gap-1.5 text-slate-300 font-bold text-sm mt-1.5">
                          <MapPin className="h-4 w-4 text-amber-500" />
                          <span>{selectedProperty.location}</span>
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black text-amber-500 font-display">
                          {selectedProperty.price.toLocaleString('ar-SA')} <span className="text-xs font-bold">ريال سعودي</span>
                        </div>
                        <span className="text-xs text-slate-400 font-bold block mt-1">سعر البيع النهائي للوحدة</span>
                      </div>
                    </div>

                    {/* Long Description */}
                    <p className="text-slate-300 text-sm font-semibold leading-relaxed mb-6">
                      {selectedProperty.description}
                    </p>

                    {/* Technical specifications blocks */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white/5 rounded-2xl p-4 mb-6 text-center text-xs sm:text-sm text-slate-200 font-bold border border-white/10">
                      <div>
                        <span className="text-slate-400 text-xs block mb-1">المساحة الإجمالية</span>
                        <span className="text-white text-base font-extrabold">{selectedProperty.size} م²</span>
                      </div>
                      <div className="border-r border-white/10">
                        <span className="text-slate-400 text-xs block mb-1">غرف النوم</span>
                        <span className="text-white text-base font-extrabold">{selectedProperty.beds > 0 ? `${selectedProperty.beds} غرف` : 'لا ينطبق'}</span>
                      </div>
                      <div className="border-r border-white/10">
                        <span className="text-slate-400 text-xs block mb-1">دورات المياه</span>
                        <span className="text-white text-base font-extrabold">{selectedProperty.baths > 0 ? `${selectedProperty.baths} حمامات` : 'لا ينطبق'}</span>
                      </div>
                      <div className="border-r border-white/10">
                        <span className="text-slate-400 text-xs block mb-1">نوع المعاملة</span>
                        <span className="text-amber-500 text-base font-extrabold">للبيع المباشر</span>
                      </div>
                    </div>

                    {/* Key features chips */}
                    <h4 className="text-base font-extrabold text-slate-200 mb-3">مميزات وخدمات العقار:</h4>
                    <div className="flex flex-wrap gap-2 mb-8">
                      {selectedProperty.features.map((feature, i) => (
                        <span
                          key={i}
                          className="flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl px-3 py-1.5 text-xs font-bold"
                        >
                          <Check className="h-3 w-3 text-emerald-400" />
                          <span>{feature}</span>
                        </span>
                      ))}
                    </div>

                    {/* Interactive Mortgage Calculator Sub-Module */}
                    <div className="border-t border-white/10 pt-6">
                      <div className="flex items-center gap-2 mb-4 bg-white/5 border border-white/10 rounded-xl p-3">
                        <Calculator className="h-5 w-5 text-amber-500" />
                        <h4 className="text-base font-extrabold text-white">حاسبة التمويل العقاري التقديرية</h4>
                      </div>
                      
                      <div className="space-y-4 bg-white/5 rounded-2xl p-5 border border-white/10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Down payment Percent */}
                          <div>
                            <label className="text-xs font-extrabold text-slate-300 block mb-2">
                              الدفعة الأولى: {downPaymentPercent}% ({mortgageResult.downPayment.toLocaleString('ar-SA')} ر.س)
                            </label>
                            <input
                              type="range"
                              min="10"
                              max="80"
                              step="5"
                              value={downPaymentPercent}
                              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                              className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                            />
                          </div>
                          
                          {/* Loan Term */}
                          <div>
                            <label className="text-xs font-extrabold text-slate-300 block mb-2">
                              مدة التمويل: {loanTerm} سنة
                            </label>
                            <input
                              type="range"
                              min="5"
                              max="30"
                              step="5"
                              value={loanTerm}
                              onChange={(e) => setLoanTerm(Number(e.target.value))}
                              className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                            />
                          </div>
                        </div>

                        {/* Calculated monthly fee display */}
                        <div className="bg-slate-950 rounded-xl p-4 border border-white/10 text-center">
                          <span className="text-xs text-slate-400 font-bold block mb-1">القسط الشهري التقديري</span>
                          <span className="text-2xl font-black text-amber-500 font-display block">
                            ~ {mortgageResult.monthly.toLocaleString('ar-SA')} <span className="text-sm font-semibold text-slate-300">ريال / شهرياً</span>
                          </span>
                          <p className="text-[10px] text-slate-400 font-semibold mt-1">
                            * مع احتساب هامش ربح بنكي {interestRate}%، لا تشمل الرسوم الإضافية والتأمين.
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Left Half: Contact Lead Capturing Form */}
                  <div className="lg:col-span-5 bg-slate-950 p-6 sm:p-8 flex flex-col justify-center border-t lg:border-t-0 lg:border-r border-white/10">
                    
                    {!formSubmitted ? (
                      <div className="space-y-6">
                        <div className="text-right">
                          <h3 className="text-lg font-bold text-white mb-1">هل ترغب في شراء هذا العقار؟</h3>
                          <p className="text-xs text-slate-400 font-bold leading-relaxed">
                            املأ النموذج أدناه ليتواصل معك مستشار مبيعات معتمد خلال ٢٤ ساعة لمناقشة التفاصيل وتنسيق زيارة ميدانية.
                          </p>
                        </div>

                        <form onSubmit={handleInquirySubmit} className="space-y-4">
                          <div>
                            <label className="block text-xs font-bold text-slate-300 mb-1">الاسم الكامل *</label>
                            <input
                              type="text"
                              required
                              value={leadName}
                              onChange={(e) => setLeadName(e.target.value)}
                              placeholder="مثال: محمد بن علي العتيبي"
                              className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/30 transition placeholder-slate-500"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-300 mb-1">رقم الجوال *</label>
                            <input
                              type="tel"
                              required
                              value={leadPhone}
                              onChange={(e) => setLeadPhone(e.target.value)}
                              placeholder="مثال: 0555555555"
                              className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white text-left focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/30 transition placeholder-slate-500"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-300 mb-1">البريد الإلكتروني (اختياري)</label>
                            <input
                              type="email"
                              value={leadEmail}
                              onChange={(e) => setLeadEmail(e.target.value)}
                              placeholder="example@domain.com"
                              className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white text-left focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/30 transition placeholder-slate-500"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-slate-300 mb-1">تفاصيل الرسالة</label>
                            <textarea
                              rows={3}
                              value={leadMessage}
                              onChange={(e) => setLeadMessage(e.target.value)}
                              className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/30 transition resize-none placeholder-slate-500"
                            ></textarea>
                          </div>

                          <button
                            type="submit"
                            className="w-full rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold p-3.5 text-sm transition-all shadow-lg hover:shadow-amber-500/10 flex items-center justify-center gap-2 cursor-pointer mt-2"
                          >
                            <Send className="h-4 w-4 text-slate-950" />
                            <span>أرسل طلب الشراء والمعاينة</span>
                          </button>
                        </form>

                        <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                          <a
                            href="https://wa.me/966555123456"
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center gap-2 text-emerald-400 hover:text-emerald-300 bg-white/5 border border-emerald-500/20 hover:bg-white/10 rounded-xl py-3 text-sm font-bold transition-all cursor-pointer"
                          >
                            <Phone className="h-4 w-4 text-emerald-400" />
                            <span>تواصل فوري عبر الواتساب</span>
                          </a>
                        </div>
                      </div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center space-y-4 py-8"
                      >
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4 animate-bounce">
                          <Check className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold text-white">تم استلام طلبك بنجاح!</h3>
                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-semibold">
                          نشكرك على تواصلك معنا يا <span className="text-amber-500 font-extrabold">{leadName}</span>.<br />
                          تم تدوين اهتمامك بعقار <span className="text-amber-500 font-extrabold">{selectedProperty.title}</span> وسيتصل بك أحد مستشارينا المعتمدين على الرقم <span className="font-bold">{leadPhone}</span> خلال الدقائق القادمة لتحديد موعد الزيارة والرد على كامل استفساراتك.
                        </p>
                        <button
                          onClick={() => setFormSubmitted(false)}
                          className="text-xs text-amber-400 hover:text-amber-300 underline font-bold cursor-pointer"
                        >
                          إرسال طلب استفسار آخر لهذا العقار
                        </button>
                      </motion.div>
                    )}

                  </div>

                </div>

              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
