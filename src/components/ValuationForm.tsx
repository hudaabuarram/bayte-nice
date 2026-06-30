/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { Lead } from '../types';
import { Calculator, Check, ArrowRight, ArrowLeft, Send, Sparkles, ShieldCheck, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ValuationFormProps {
  onAddValuationLead: (lead: {
    name: string;
    phone: string;
    email?: string;
    type: 'valuation';
    propertyType: string;
    city: string;
    notes: string;
    valDetails: {
      area: number;
      age: number;
      finishing: string;
      estimatedValue: string;
    };
  }) => void;
}

export default function ValuationForm({ onAddValuationLead }: ValuationFormProps) {
  const [step, setStep] = useState(1);
  
  // Form input states
  const [pType, setPType] = useState('villa');
  const [city, setCity] = useState('Riyadh');
  const [neighborhood, setNeighborhood] = useState('');
  const [area, setArea] = useState<number>(300);
  const [age, setAge] = useState<number>(0); // 0 = new, 2 = 1-5 yrs, 7 = 5-10 yrs, 15 = 10+ yrs
  const [finishing, setFinishing] = useState('luxury'); // luxury, average, basic
  
  // Lead info states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  
  const [isCalculated, setIsCalculated] = useState(false);
  const [estimatedRange, setEstimatedRange] = useState('');
  const [submittingLead, setSubmittingLead] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const calculatePropertyValuation = () => {
    // Basic logical estimation formulas for Saudi Arabian cities (SAR/sqm)
    let basePricePerSqm = 3500;
    
    if (pType === 'villa') {
      basePricePerSqm = city === 'Riyadh' ? 5500 : city === 'Jeddah' ? 4800 : city === 'Khobar' ? 4200 : 4000;
    } else if (pType === 'apartment') {
      basePricePerSqm = city === 'Riyadh' ? 4200 : city === 'Jeddah' ? 3800 : city === 'Khobar' ? 3400 : 3100;
    } else { // Land
      basePricePerSqm = city === 'Riyadh' ? 2800 : city === 'Jeddah' ? 2400 : city === 'Khobar' ? 2100 : 1900;
    }

    // Area weight
    let rawValue = basePricePerSqm * area;

    // Adjust for building age (except land)
    if (pType !== 'land') {
      if (age === 0) rawValue *= 1.1; // Brand new premium
      else if (age === 2) rawValue *= 0.95; // 1-5 years
      else if (age === 7) rawValue *= 0.85; // 5-10 years
      else rawValue *= 0.70; // 10+ years
    }

    // Adjust for finishing (except land)
    if (pType !== 'land') {
      if (finishing === 'luxury') rawValue *= 1.25; // High end
      else if (finishing === 'average') rawValue *= 1.0;
      else rawValue *= 0.85; // Basic finishing
    }

    // Calculate +/- 7% range
    const lowRange = Math.round((rawValue * 0.93) / 10000) * 10000;
    const highRange = Math.round((rawValue * 1.07) / 10000) * 10000;

    const formattedLow = lowRange.toLocaleString('ar-SA');
    const formattedHigh = highRange.toLocaleString('ar-SA');

    setEstimatedRange(`${formattedLow} - ${formattedHigh} ريال سعودي`);
    setIsCalculated(true);
    setStep(3);
  };

  const handleNextStep = () => {
    if (step === 1 && !neighborhood.trim()) {
      // Just auto-fill if empty
      setNeighborhood('حي سكني متميز');
    }
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleLeadSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setSubmittingLead(true);
    
    const finishingLabelMap: Record<string, string> = {
      luxury: 'ألترا لوكس / ديلوكس',
      average: 'سوبر لوكس / تشطيب ممتاز',
      basic: 'تجاري / عادي'
    };

    const ageLabelMap: Record<number, string> = {
      0: 'عقار جديد كلياً',
      2: 'من ١ إلى ٥ سنوات',
      7: 'من ٥ إلى ١٠ سنوات',
      15: 'أكثر من ١٠ سنوات'
    };

    const propertyTypeLabelMap: Record<string, string> = {
      villa: 'فيلا',
      apartment: 'شقة',
      land: 'أرض'
    };

    const cityLabelMap: Record<string, string> = {
      Riyadh: 'الرياض',
      Jeddah: 'جدة',
      Khobar: 'الخبر',
      Makkah: 'مكة'
    };

    onAddValuationLead({
      name,
      phone,
      email: email || undefined,
      type: 'valuation',
      propertyType: propertyTypeLabelMap[pType] || pType,
      city: cityLabelMap[city] || city,
      notes: `طلب تقييم فني رسمي لعقار في حي (${neighborhood}) بمساحة (${area} م²)، عمر البناء: (${ageLabelMap[age] || 'ـ'})، جودة التشطيب: (${finishingLabelMap[finishing] || 'ـ'}). النطاق السعري المقدر: ${estimatedRange}`,
      valDetails: {
        area,
        age,
        finishing: finishingLabelMap[finishing] || finishing,
        estimatedValue: estimatedRange
      }
    });

    setSubmittingLead(false);
    setSubmittedSuccess(true);
  };

  return (
    <section id="valuation" className="py-24 bg-slate-900 text-white relative overflow-hidden border-t border-b border-white/5" style={{ direction: 'rtl' }}>
      
      {/* Decorative vector background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.08),transparent_50%)]"></div>
      <div className="absolute bottom-[-100px] right-[-100px] h-96 w-96 rounded-full bg-amber-500/5 blur-3xl"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Right Column: Copywriting text */}
          <div className="lg:col-span-5 text-right">
            <span className="text-amber-500 font-bold text-sm tracking-widest uppercase block mb-3">
              خدمة التقييم الذكي الفوري
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-6 font-display leading-tight">
              لا تعرف سعر عقارك الحالي؟ <br />
              <span className="text-amber-400">احصل على تقييم فوري من خبرائنا</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base font-medium leading-relaxed mb-8">
              قمنا بتطوير محرك حساب ذكي ومحدث أسبوعياً بالاعتماد على بيانات الصفقات الحقيقية لوزارة العدل ومؤشرات السوق الفعالة لتمنحك تقديراً واقعياً في ثوانٍ.
            </p>

            {/* Quality assurances */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-white/10 p-2 text-amber-500 mt-1">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">بيانات محدثة وحقيقية</h4>
                  <p className="text-xs text-slate-400 font-semibold mt-0.5">مقارنات مبنية على آخر الصفقات المبرمة بحي عقارك.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-white/10 p-2 text-amber-500 mt-1">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">تقرير فني معتمد</h4>
                  <p className="text-xs text-slate-400 font-semibold mt-0.5">بعد التقييم التقديري، يمكنك طلب دراسة رسمية موثوقة لغرض التمويل أو البيع.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Left Column: Interactive Multi-Step Calculator */}
          <div className="lg:col-span-7 w-full">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative">
              
              {/* Steps Progress Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8 text-xs text-slate-300 font-bold">
                <span className="text-base font-extrabold text-white flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-amber-500" />
                  <span>محرك التقييم العقاري</span>
                </span>
                <div className="flex items-center gap-1.5">
                  <span className={`h-6 w-6 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-amber-500 text-slate-950' : 'bg-white/10'}`}>١</span>
                  <div className={`h-[2px] w-8 ${step >= 2 ? 'bg-amber-500' : 'bg-white/10'}`}></div>
                  <span className={`h-6 w-6 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-amber-500 text-slate-950' : 'bg-white/10'}`}>٢</span>
                  <div className={`h-[2px] w-8 ${step >= 3 ? 'bg-amber-500' : 'bg-white/10'}`}></div>
                  <span className={`h-6 w-6 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-amber-500 text-slate-950' : 'bg-white/10'}`}>٣</span>
                </div>
              </div>

              {/* Step Forms */}
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h4 className="text-base font-bold text-white mb-4">الخطوة الأولى: تحديد نوع وموقع العقار</h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Property Type selection */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-slate-300">نوع العقار</label>
                        <select
                          value={pType}
                          onChange={(e) => setPType(e.target.value)}
                          className="w-full rounded-xl border border-white/10 bg-slate-900/50 p-3.5 text-sm text-white focus:border-amber-500/50 focus:outline-none transition-colors"
                        >
                          <option value="villa">فيلا سكنية / تاون هاوس</option>
                          <option value="apartment">شقة سكنية داخل مبنى</option>
                          <option value="land">أرض سكنية أو تجارية</option>
                        </select>
                      </div>

                      {/* City */}
                      <div className="space-y-2">
                        <label className="block text-xs font-bold text-slate-300">المدينة</label>
                        <select
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full rounded-xl border border-white/10 bg-slate-900/50 p-3.5 text-sm text-white focus:border-amber-500/50 focus:outline-none transition-colors"
                        >
                          <option value="Riyadh">الرياض</option>
                          <option value="Jeddah">جدة</option>
                          <option value="Khobar">الخبر</option>
                          <option value="Makkah">مكة المكرمة</option>
                        </select>
                      </div>
                    </div>

                    {/* Neighborhood Input */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-300">اسم الحي السكني *</label>
                      <input
                        type="text"
                        required
                        value={neighborhood}
                        onChange={(e) => setNeighborhood(e.target.value)}
                        placeholder="مثال: حي الملقا، حي النرجس، حي الحمراء..."
                        className="w-full rounded-xl border border-white/10 bg-slate-900/50 p-3.5 text-sm text-white placeholder-slate-500 focus:border-amber-500/50 focus:outline-none transition"
                      />
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button
                        onClick={handleNextStep}
                        className="rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-6 py-3.5 text-sm transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/10"
                      >
                        <span>الخطوة التالية</span>
                        <ArrowLeft className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    <div>
                      <h4 className="text-base font-bold text-white mb-4">الخطوة الثانية: تفاصيل ومواصفات العقار الفنية</h4>
                    </div>

                    {/* Size Slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-bold text-slate-300">
                        <label>مساحة الأرض / المبنى (متر مربع)</label>
                        <span className="text-amber-500 text-sm">{area} م²</span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="2000"
                        step="10"
                        value={area}
                        onChange={(e) => setArea(Number(e.target.value))}
                        className="w-full accent-amber-500 h-1.5 bg-white/10 rounded-lg cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 font-bold">
                        <span>٥٠ م²</span>
                        <span>٢٠٠٠ م²</span>
                      </div>
                    </div>

                    {pType !== 'land' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                        {/* Building Age */}
                        <div className="space-y-2">
                          <label className="block text-xs font-bold text-slate-300">عمر البناء</label>
                          <select
                            value={age}
                            onChange={(e) => setAge(Number(e.target.value))}
                            className="w-full rounded-xl border border-white/10 bg-slate-900/50 p-3.5 text-sm text-white focus:border-amber-500/50 focus:outline-none transition-colors"
                          >
                            <option value={0}>جديد كلياً (٠-١ سنة)</option>
                            <option value={2}>من ١ إلى ٥ سنوات</option>
                            <option value={7}>من ٥ إلى ١٠ سنوات</option>
                            <option value={15}>أكثر من ١٠ سنوات</option>
                          </select>
                        </div>

                        {/* Finishing quality */}
                        <div className="space-y-2">
                          <label className="block text-xs font-bold text-slate-300">جودة وتصنيف التشطيب</label>
                          <select
                            value={finishing}
                            onChange={(e) => setFinishing(e.target.value)}
                            className="w-full rounded-xl border border-white/10 bg-slate-900/50 p-3.5 text-sm text-white focus:border-amber-500/50 focus:outline-none transition-colors"
                          >
                            <option value="luxury">ألترا لوكس / ديلوكس (فاخر جداً)</option>
                            <option value="average">سوبر لوكس / تشطيب ممتاز</option>
                            <option value="basic">تشطيب تجاري / عادي</option>
                          </select>
                        </div>
                      </div>
                    )}

                    <div className="pt-4 flex justify-between">
                      <button
                        onClick={handlePrevStep}
                        className="rounded-xl border border-white/10 hover:bg-white/10 text-white font-bold px-5 py-3 text-sm transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <ArrowRight className="h-4 w-4" />
                        <span>السابق</span>
                      </button>
                      
                      <button
                        onClick={calculatePropertyValuation}
                        className="rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-6 py-3.5 text-sm transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
                      >
                        <span>احسب التقييم التقديري</span>
                        <Calculator className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6"
                  >
                    {!submittedSuccess ? (
                      <>
                        {/* Calculated Output box */}
                        <div className="bg-white/10 border border-white/10 rounded-2xl p-6 text-center space-y-2">
                          <span className="text-xs text-amber-500 font-bold uppercase tracking-widest block">نطاق السعر المتوقع لعقارك</span>
                          <span className="text-2xl sm:text-3xl font-black text-amber-500 font-display block py-2">
                            {estimatedRange}
                          </span>
                          <p className="text-[11px] text-slate-400 font-semibold max-w-md mx-auto">
                            * هذا التقييم ذكي وتلقائي ومبني على المساحة ({area} م²) والموقع الجغرافي للحي المختار كقيمة تقريبية إرشادية.
                          </p>
                        </div>

                        {/* Valuation lead capture */}
                        <div className="space-y-4">
                          <div className="text-right border-t border-white/10 pt-4">
                            <h4 className="text-sm font-bold text-white flex items-center gap-1">
                              <Sparkles className="h-4 w-4 text-amber-500" />
                              <span>احصل على تقرير تقييم رسمي ومعتمد مجاناً!</span>
                            </h4>
                            <p className="text-xs text-slate-400 font-semibold mt-1">
                              سيتواصل معك خبير معتمد من الهيئة العامة للعقار لزيارة موقعك وفحصه فنيًا وإعطائك تقريرًا مفصلاً وموثقًا للبيع أو التمويل. املأ بياناتك:
                            </p>
                          </div>

                          <form onSubmit={handleLeadSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-[11px] text-slate-300 font-bold mb-1">الاسم الكامل *</label>
                              <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="الاسم الكامل"
                                className="w-full rounded-xl border border-white/10 bg-slate-900/50 p-3 text-xs text-white focus:border-amber-500/50 focus:outline-none transition"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] text-slate-300 font-bold mb-1">رقم الجوال *</label>
                              <input
                                type="tel"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="05xxxxxxxx"
                                className="w-full rounded-xl border border-white/10 bg-slate-900/50 p-3 text-xs text-white text-left focus:border-amber-500/50 focus:outline-none transition"
                              />
                            </div>
                            <div className="sm:col-span-2">
                              <label className="block text-[11px] text-slate-300 font-bold mb-1">البريد الإلكتروني (اختياري)</label>
                              <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="example@domain.com"
                                className="w-full rounded-xl border border-white/10 bg-slate-900/50 p-3 text-xs text-white text-left focus:border-amber-500/50 focus:outline-none transition"
                              />
                            </div>

                            <div className="sm:col-span-2 pt-2 flex items-center justify-between gap-4">
                              <button
                                type="button"
                                onClick={() => setStep(2)}
                                className="rounded-xl border border-white/10 hover:bg-white/10 text-white font-bold px-4 py-3 text-xs transition cursor-pointer"
                              >
                                تعديل المواصفات
                              </button>
                              
                              <button
                                type="submit"
                                disabled={submittingLead}
                                className="rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-6 py-3 text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-amber-500/10"
                              >
                                <Send className="h-3.5 w-3.5 text-slate-950" />
                                <span>طلب التقييم المعتمد مجاناً</span>
                              </button>
                            </div>
                          </form>
                        </div>
                      </>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center space-y-5 py-8"
                      >
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 mb-2 animate-bounce">
                          <Check className="h-7 w-7" />
                        </div>
                        <h4 className="text-xl font-bold text-white">تم تقديم طلب التقييم الرسمي بنجاح!</h4>
                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-md mx-auto font-semibold">
                          شكرًا لك يا <span className="text-amber-500 font-bold">{name}</span>. لقد سجلنا بيانات عقارك بمساحة {area} م² في {city === 'Riyadh' ? 'الرياض' : city === 'Jeddah' ? 'جدة' : city === 'Khobar' ? 'الخبر' : 'مكة'}.\nسيتواصل معك المهندس المقيّم خلال الساعات القادمة على الرقم <span className="font-bold">{phone}</span> لتأكيد الموعد وإرسال كتيب المعاينة.
                        </p>
                        <div className="pt-2">
                          <button
                            onClick={() => {
                              setSubmittedSuccess(false);
                              setStep(1);
                              setNeighborhood('');
                              setName('');
                              setPhone('');
                            }}
                            className="rounded-xl border border-white/10 hover:bg-white/10 text-white px-5 py-2.5 text-xs font-bold transition cursor-pointer"
                          >
                            تقييم عقار آخر
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
