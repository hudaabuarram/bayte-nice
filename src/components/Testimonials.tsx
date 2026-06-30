/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Star, Quote, Play, User, Check, X, Volume2, Maximize } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Testimonials() {
  const [activeVideoTestimonial, setActiveVideoTestimonial] = useState<string | null>(null);

  const reviews = [
    {
      id: 'test-1',
      name: 'م. أحمد بن سليمان',
      role: 'مستثمر عقاري ومدير مشاريع',
      avatarColor: 'from-amber-600 to-amber-800',
      badge: 'اشترى شقة بنتهاوس في جدة',
      stars: 5,
      comment: 'تجربتي مع بيتي نايس العقارية كانت استثنائية بكل المعايير. منذ أول مكالمة وحتى استلام صك الملكية لشقة البنتهاوس بجدة، كان الفريق متعاوناً للغاية ومنظماً. حاسبة التمويل كانت دقيقة جداً ومطابقة للعرض البنكي النهائي، وخدمة ما بعد البيع في المتابعة مع المطور أراحتني من عناء كبير. أنصح بهم بشدة لكل باحث عن الجودة والأمان.',
      videoUrl: 'ahmed_testimonial',
      videoPlaceholder: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'test-2',
      name: 'أ. سارة الرويلي',
      role: 'أخصائية موارد بشرية وشريكة سكن',
      avatarColor: 'from-amber-500 to-amber-700',
      badge: 'اشترت فيلا الملقا بالرياض',
      stars: 5,
      comment: 'البحث عن فيلا سكنية مناسبة في شمال الرياض كان رحلة شاقة استمرت ٦ أشهر، حتى تواصلت مع المستشار هنا. وفّروا لي فلتر فحص معتمد كشف لي جودة البناء والعزل قبل الشراء. الصدق والشفافية في شرح العيوب قبل الميزات هو ما جعلني أثق بهم بالكامل. والآن نقيم في بيتنا الجديد بسعادة تامة.',
      videoUrl: 'sara_testimonial',
      videoPlaceholder: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'test-3',
      name: 'د. خالد الشهراني',
      role: 'عضو هيئة تدريس جامعي',
      badge: 'استفاد من خدمة التقييم الفني',
      avatarColor: 'from-amber-400 to-amber-600',
      stars: 5,
      comment: 'استخدمت محرك التقييم العقاري الذكي بالمنصة لتقييم فيلا العائلة القديمة في مكة. تفاجأت بدقة السعر المقدر بمقارنة السوق. طلبت تقييماً معتمداً وحضر المهندس في الموعد وقدم لنا دراسة مفصلة ساعدتنا في بيع العقار بسعر عادل وممتاز وبسرعة قياسية. احترافية عالية تستحق الإشادة.',
      videoUrl: 'khaled_testimonial',
      videoPlaceholder: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-slate-950 relative overflow-hidden" style={{ direction: 'rtl' }}>
      
      {/* Background patterns */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 rounded-full bg-amber-500/5 blur-3xl"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-amber-500 font-bold text-sm tracking-widest uppercase block mb-3">
            قصص نجاح شركائنا
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-5 font-display">
            ماذا يقول عملاؤنا السعداء؟
          </h2>
          <div className="h-1 w-20 bg-amber-500 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-300 text-base sm:text-lg font-medium">
            نفخر بكوننا جزءاً من قصص نجاح أكثر من ٥٠٠ عائلة ومستثمر حققوا أهدافهم العقارية بكل يسر وأمان.
          </p>
        </div>

        {/* Testimonials grid with custom video-review elements */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col bg-slate-900 rounded-3xl border border-white/10 p-8 shadow-xs hover:shadow-amber-500/5 hover:-translate-y-1 transition-all duration-300 relative hover:border-amber-500/30"
            >
              <Quote className="absolute top-6 left-6 h-10 w-10 text-white/5 rotate-180" />

              {/* Stars */}
              <div className="flex gap-1 mb-4 text-amber-500">
                {Array.from({ length: review.stars }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>

              {/* Written review text */}
              <p className="text-slate-300 text-xs sm:text-sm font-semibold leading-relaxed mb-6 flex-grow">
                "{review.comment}"
              </p>

              {/* Bottom Info: User details */}
              <div className="flex items-center gap-4 border-t border-white/10 pt-4 mt-auto">
                {/* Simulated Avatar or initials */}
                <div className={`h-12 w-12 rounded-full bg-gradient-to-tr ${review.avatarColor} text-slate-950 font-black flex items-center justify-center shadow-xs`}>
                  {review.name.split(' ')[1]?.slice(0, 1) || <User className="h-5 w-5" />}
                </div>
                <div className="text-right">
                  <h4 className="text-sm font-bold text-white">{review.name}</h4>
                  <span className="text-[11px] text-slate-400 font-bold block mt-0.5">{review.role}</span>
                  
                  {/* Verified badge */}
                  <span className="inline-flex items-center gap-1 text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold rounded-md px-1.5 py-0.5 mt-1">
                    <Check className="h-3 w-3 text-emerald-400" />
                    <span>{review.badge}</span>
                  </span>
                </div>
              </div>

              {/* Video play badge overlay inside card as interactive secondary feature */}
              <button
                onClick={() => setActiveVideoTestimonial(review.name)}
                className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 p-3 text-xs font-bold transition-all duration-300 border border-white/10 cursor-pointer"
              >
                <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-slate-950 shadow-xs">
                  <Play className="h-2.5 w-2.5 fill-current text-slate-950" />
                </span>
                <span>مشاهدة شهادة الفيديو القصيرة</span>
              </button>

            </motion.div>
          ))}
        </div>

      </div>

      {/* Video Testimonial Mock Player Modal */}
      <AnimatePresence>
        {activeVideoTestimonial && (
          <div className="fixed inset-0 z-50 overflow-y-auto" style={{ direction: 'rtl' }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveVideoTestimonial(null)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            ></motion.div>

            <div className="flex min-h-screen items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative w-full max-w-xl rounded-3xl bg-slate-900 border border-white/10 shadow-2xl overflow-hidden z-10 p-4"
              >
                {/* Header info */}
                <div className="flex items-center justify-between text-white border-b border-white/10 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="text-xs font-extrabold text-slate-300">مراجعة مرئية مسجلة لعقود معتمدة</span>
                  </div>
                  <button
                    onClick={() => setActiveVideoTestimonial(null)}
                    className="text-slate-400 hover:text-white rounded-full bg-white/5 p-1.5 transition cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Mock Video Container */}
                <div className="relative aspect-9/16 max-h-[60vh] mx-auto rounded-2xl overflow-hidden bg-black flex items-center justify-center shadow-lg border border-white/5">
                  
                  {/* Mock Video Frame background - using high-quality profile portrait */}
                  <img
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80"
                    alt="Mock video preview"
                    className="absolute inset-0 h-full w-full object-cover object-center brightness-75 filter blur-xs"
                    referrerPolicy="no-referrer"
                  />

                  {/* Play interface centered */}
                  <div className="relative z-10 text-center text-white p-6 space-y-4">
                    <span className="h-16 w-16 mx-auto rounded-full bg-amber-500 flex items-center justify-center text-slate-950 shadow-2xl animate-pulse">
                      <Play className="h-7 w-7 fill-current text-slate-950 ml-0.5" />
                    </span>
                    <h4 className="text-lg font-bold text-white font-display mt-2">{activeVideoTestimonial}</h4>
                    <p className="text-xs text-slate-300 font-bold max-w-xs leading-relaxed">
                      "المنصة قدمت لي أفضل تجربة وساطة على الإطلاق في تملك عقاري الأول"
                    </p>
                  </div>

                  {/* Progress Indicator and Controls overlay */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/40 to-transparent p-4 flex flex-col gap-2.5 text-white text-xs font-bold">
                    {/* Progress Slider */}
                    <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full w-3/4"></div>
                    </div>
                    {/* Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Volume2 className="h-4 w-4 text-slate-300 hover:text-white cursor-pointer" />
                        <span>0:45 / 1:00</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="bg-red-600 rounded-md text-[10px] px-1.5 py-0.5">مباشر</span>
                        <Maximize className="h-4 w-4 text-slate-300 hover:text-white cursor-pointer" />
                      </div>
                    </div>
                  </div>

                </div>

                {/* Subtitle notes */}
                <p className="text-[11px] text-slate-400 font-semibold text-center mt-3">
                  * تم تسجيل وبث هذه الشهادة بموافقة خطية موثقة من العميل لأغراض توثيق جودة الخدمة.
                </p>

              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
