/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Award, Users, Map, ShieldCheck, HeartHandshake } from 'lucide-react';
import { motion } from 'motion/react';

export default function Stats() {
  const points = [
    {
      id: 'stat-1',
      icon: <Award className="h-8 w-8 text-amber-500" />,
      number: '+١٠ سنوات',
      title: 'خبرة عقارية عريقة',
      description: 'عقد كامل من التميز والريادة في توجيه العملاء وتوفير أفخم الحلول السكنية والاستثمارية بالمملكة.',
    },
    {
      id: 'stat-2',
      icon: <Users className="h-8 w-8 text-amber-500" />,
      number: '١٠٠٪ معتمدين',
      title: 'فريق استشاري مرخص',
      description: 'نخبة من خبراء العقار والوسطاء المعتمدين من الهيئة العامة للعقار لمساعدتك في اتخاذ القرار الأمثل.',
    },
    {
      id: 'stat-3',
      icon: <Map className="h-8 w-8 text-amber-500" />,
      number: 'شاملة',
      title: 'تغطية واسعة للأحياء',
      description: 'نغطي أرقى الأحياء السكنية والتجارية الواعدة لضمان تنوع الخيارات الاستثمارية والشرائية.',
    },
    {
      id: 'stat-4',
      icon: <HeartHandshake className="h-8 w-8 text-amber-500" />,
      number: 'متواصلة',
      title: 'خدمة ما بعد البيع',
      description: 'علاقتنا لا تنتهي بإتمام الصفقة؛ نرافقك في خدمات التسجيل، الضمانات، وإدارة الأملاك مستقبلاً.',
    },
  ];

  return (
    <section id="why-us" className="bg-slate-900 py-20 sm:py-28 text-white border-t border-b border-white/5" style={{ direction: 'rtl' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-amber-500 font-bold text-sm tracking-widest uppercase block mb-3">
            شريكك العقاري الموثوق
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-5 font-display">
            لماذا يختار المستثمرون والباحثون عن السكن خدماتنا؟
          </h2>
          <div className="h-1 w-20 bg-amber-500 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-300 text-base sm:text-lg font-medium leading-relaxed">
            نحن ندمج التكنولوجيا الحديثة بالاستشارات الواقعية لنقدم لك صفقة سلسة وآمنة تماماً وخالية من التعقيدات.
          </p>
        </div>

        {/* 4 Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {points.map((point, index) => (
            <motion.div
              key={point.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.3), 0 8px 10px -6px rgb(0 0 0 / 0.3)' }}
              className="relative overflow-hidden rounded-2xl bg-white/5 p-8 border border-white/10 hover:border-amber-500/40 shadow-sm transition-all duration-300 group flex flex-col items-start backdrop-blur-xl"
            >
              {/* Highlight effect on card top */}
              <div className="absolute top-0 right-0 h-[3px] w-0 bg-amber-500 transition-all duration-300 group-hover:w-full"></div>

              {/* Icon Container with subtle zoom */}
              <div className="rounded-2xl bg-white/5 p-4 mb-6 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300 border border-white/5">
                <div className="group-hover:scale-110 transition-transform duration-300">
                  {point.icon}
                </div>
              </div>

              {/* Number/Badge */}
              <span className="text-2xl font-extrabold text-amber-500 mb-2 block font-display">
                {point.number}
              </span>

              {/* Title */}
              <h3 className="text-lg font-bold text-slate-100 mb-3 group-hover:text-amber-500 transition-colors">
                {point.title}
              </h3>

              {/* Description */}
              <p className="text-slate-400 text-sm font-semibold leading-relaxed">
                {point.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Brand achievements list banner */}
        <div className="mt-16 sm:mt-24 rounded-3xl bg-slate-950 text-white p-8 sm:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Decorative background circle */}
          <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-amber-500/10 blur-xl"></div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center relative z-10">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-500 font-display mb-2">٥٠٠+</div>
              <div className="text-slate-300 text-xs sm:text-sm font-bold">عائلة حصلت على بيت أحلامها</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-500 font-display mb-2">٢.٤ مليار+</div>
              <div className="text-slate-300 text-xs sm:text-sm font-bold">إجمالي المبيعات العقارية (ريال)</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-500 font-display mb-2">٩٨٪</div>
              <div className="text-slate-300 text-xs sm:text-sm font-bold">نسبة رضا وثقة عملائنا الاستثماريين</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-500 font-display mb-2">١٥+</div>
              <div className="text-slate-300 text-xs sm:text-sm font-bold">حي سكني مغطى بالكامل</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
