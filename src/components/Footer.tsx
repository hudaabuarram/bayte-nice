/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Building2, Phone, Mail, MapPin, MessageSquare, ExternalLink, Calendar, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScroll = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="footer-container" className="bg-slate-950 text-slate-300 pt-20 pb-10 border-t border-white/10" style={{ direction: 'rtl' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Column 1: Brand details (Lg: 4/12) */}
          <div className="lg:col-span-4 flex flex-col items-start text-right">
            <div className="flex items-center gap-2 mb-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500 text-slate-950 shadow-md">
                <Building2 className="h-6 w-6 text-slate-950" />
              </span>
              <div className="flex flex-col items-start leading-none">
                <span className="font-extrabold text-white text-xl tracking-tight">بيتي نايس العقارية</span>
                <span className="text-[10px] text-amber-500 font-bold tracking-widest mt-1">لِلخِدْمَات العَقَارِيَّة</span>
              </div>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm font-semibold leading-relaxed mb-6">
              نحن مؤسسة وطنية سعودية مرخصة رائدة، نقدم حلولاً عقارية متكاملة وموثوقة تجمع بين الدقة الفنية، والنزاهة القانونية والشفافية التامة لضمان مصلحة عملائنا الكرام.
            </p>
            <div className="flex flex-col gap-3 font-semibold text-xs sm:text-sm text-slate-300 w-full">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4.5 w-4.5 text-amber-500" />
                <span>رخصة فال العقارية: ١٢٠٠٠١٨٤٩٠</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4.5 w-4.5 text-amber-500" />
                <span>رخصة وساطة معتمدة من الهيئة العامة للعقار</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (Lg: 2/12) */}
          <div className="lg:col-span-2 text-right">
            <h4 className="text-white font-bold text-base mb-6 pb-2 border-b border-white/10">روابط سريعة</h4>
            <ul className="space-y-3 font-bold text-sm text-slate-400">
              <li>
                <button onClick={() => handleScroll('#home')} className="hover:text-amber-500 transition cursor-pointer">الرئيسية</button>
              </li>
              <li>
                <button onClick={() => handleScroll('#why-us')} className="hover:text-amber-500 transition cursor-pointer">لماذا نحن</button>
              </li>
              <li>
                <button onClick={() => handleScroll('#listings')} className="hover:text-amber-500 transition cursor-pointer">العروض المميزة</button>
              </li>
              <li>
                <button onClick={() => handleScroll('#valuation')} className="hover:text-amber-500 transition cursor-pointer">تقييم مجاني</button>
              </li>
              <li>
                <button onClick={() => handleScroll('#testimonials')} className="hover:text-amber-500 transition cursor-pointer">آراء العملاء</button>
              </li>
              <li>
                <button onClick={() => handleScroll('#blog')} className="hover:text-amber-500 transition cursor-pointer">المدونة العقارية</button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details (Lg: 3/12) */}
          <div className="lg:col-span-3 text-right">
            <h4 className="text-white font-bold text-base mb-6 pb-2 border-b border-white/10">قنوات الاتصال المباشر</h4>
            <div className="space-y-4 font-semibold text-xs sm:text-sm text-slate-300">
              <a href="tel:920001234" className="flex items-center gap-3 hover:text-amber-500 transition">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-amber-500">
                  <Phone className="h-4.5 w-4.5" />
                </span>
                <div>
                  <span className="text-slate-400 text-xs block font-bold">الرقم الموحد المجاني</span>
                  <span className="font-extrabold block mt-0.5">٩٢٠٠٠١٢٣٤</span>
                </div>
              </a>

              <a href="https://wa.me/966555123456" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-amber-500 transition">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-emerald-400">
                  <MessageSquare className="h-4.5 w-4.5" />
                </span>
                <div>
                  <span className="text-slate-400 text-xs block font-bold">تواصل واتساب فوري</span>
                  <span className="font-extrabold block mt-0.5">٠٥٥٥١٢٣٤٥٦</span>
                </div>
              </a>

              <a href="mailto:info@sarh-realestate.sa" className="flex items-center gap-3 hover:text-amber-500 transition">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-slate-400">
                  <Mail className="h-4.5 w-4.5" />
                </span>
                <div>
                  <span className="text-slate-400 text-xs block font-bold">البريد الإلكتروني الرسمي</span>
                  <span className="font-extrabold block mt-0.5">info@sarh-realestate.sa</span>
                </div>
              </a>
            </div>
          </div>

          {/* Column 4: Interactive Office Address / Map (Lg: 3/12) */}
          <div className="lg:col-span-3 text-right">
            <h4 className="text-white font-bold text-base mb-6 pb-2 border-b border-white/10">المقر الرئيسي وموقعنا</h4>
            
            {/* Styled Mock Interactive Map */}
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-slate-900/50 p-4 relative space-y-4 shadow-lg">
              
              {/* Map background grid simulation */}
              <div className="h-28 rounded-xl bg-slate-950 relative overflow-hidden flex items-center justify-center">
                {/* SVG Mockup Street Lines */}
                <svg className="absolute inset-0 h-full w-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                  <line x1="10" y1="0" x2="10" y2="200" stroke="white" strokeWidth="2" />
                  <line x1="60" y1="0" x2="60" y2="200" stroke="white" strokeWidth="1" />
                  <line x1="150" y1="0" x2="150" y2="200" stroke="white" strokeWidth="3" />
                  <line x1="0" y1="30" x2="300" y2="30" stroke="white" strokeWidth="1.5" />
                  <line x1="0" y1="80" x2="300" y2="80" stroke="white" strokeWidth="2" />
                </svg>
                {/* Animated Pulse Pin */}
                <span className="absolute flex h-5 w-5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-5 w-5 bg-amber-500 flex items-center justify-center">
                    <MapPin className="h-3 w-3 text-slate-950" />
                  </span>
                </span>
                <span className="absolute bottom-2 left-2 bg-slate-950/80 text-white font-mono text-[9px] px-1.5 py-0.5 rounded-md backdrop-blur-md">
                  24.8115° N, 46.6284° E
                </span>
              </div>

              {/* Address detail */}
              <div className="flex gap-2 text-xs">
                <MapPin className="h-4.5 w-4.5 text-amber-500 shrink-0 mt-0.5" />
                <p className="text-slate-400 font-semibold leading-relaxed">
                  برج بيتي نايس، طريق الملك فهد الفرعي، حي الصحافة، الرياض، المملكة العربية السعودية.
                </p>
              </div>

              {/* Action buttons */}
              <a
                href="https://maps.google.com/?q=24.8115,46.6284"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white p-2.5 text-xs font-bold transition-all"
              >
                <span>افتح في خرائط جوجل</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

            </div>
          </div>

        </div>

        {/* Footer bottom */}
        <div className="border-t border-white/10 pt-8 mt-8 flex items-center justify-center text-center text-xs text-slate-500 font-bold">
          <p>
            © 2026 All rights reserved by{' '}
            <a
              href="https://oxa-code-website.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-400 transition-colors"
              id="oxa-code-link"
            >
              oxa code
            </a>
            . Made with love and care.
          </p>
        </div>

      </div>
    </footer>
  );
}
