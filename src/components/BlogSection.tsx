/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, MouseEvent } from 'react';
import { MOCK_ARTICLES } from '../data';
import { Article } from '../types';
import { Calendar, User, Clock, ArrowLeft, X, Share2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function BlogSection() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleShare = (id: string, e: MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}${window.location.pathname}?article=${id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <section id="blog" className="py-24 bg-slate-950" style={{ direction: 'rtl' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-amber-500 font-bold text-sm tracking-widest uppercase block mb-3">
            الوعي العقاري والتحليل
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-5 font-display">
            المدونة العقارية: نصائح الخبراء وتوجهات السوق
          </h2>
          <div className="h-1 w-20 bg-amber-500 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-300 text-base sm:text-lg font-medium leading-relaxed">
            مقالات ودراسات سوقية حصرية كتبها مستشارونا لمساعدتك على اتخاذ قرارك بوعي مالي وفني متكامل.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_ARTICLES.map((article, idx) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group flex flex-col bg-slate-900 rounded-3xl border border-white/10 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 h-full hover:border-amber-500/30"
            >
              
              {/* Media image */}
              <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-950 border-b border-white/10">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-4 right-4 bg-amber-500 text-slate-950 text-xs font-black px-3 py-1.5 rounded-full shadow-md">
                  {article.category}
                </span>
              </div>

              {/* Card Content */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Meta details */}
                <div className="flex items-center gap-4 text-[11px] text-slate-400 font-bold mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{article.date}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{article.readTime}</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-extrabold text-white mb-3 group-hover:text-amber-500 transition-colors line-clamp-2 leading-snug">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-slate-300 text-xs sm:text-sm font-semibold leading-relaxed mb-6 line-clamp-2">
                  {article.excerpt}
                </p>

                {/* Author and Read link */}
                <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-white/5 flex items-center justify-center text-amber-500 border border-white/10">
                      <User className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-300 line-clamp-1">{article.author.split(' (')[0]}</span>
                  </div>

                  <button
                    onClick={() => setSelectedArticle(article)}
                    className="flex items-center gap-1 text-xs text-amber-500 hover:text-amber-400 font-extrabold transition-all duration-200 cursor-pointer"
                  >
                    <span>اقرأ المقال</span>
                    <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

            </motion.article>
          ))}
        </div>

      </div>

      {/* Full Article Reader Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 overflow-y-auto" style={{ direction: 'rtl' }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArticle(null)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
            ></motion.div>

            <div className="flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-8">
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.95 }}
                className="relative w-full max-w-3xl rounded-3xl bg-slate-900 border border-white/10 shadow-2xl overflow-hidden z-10 text-white"
              >
                
                {/* Header / Media Image */}
                <div className="relative aspect-16/9 w-full bg-slate-950">
                  <img
                    src={selectedArticle.imageUrl}
                    alt={selectedArticle.title}
                    className="h-full w-full object-cover animate-fade-in"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Backdrop overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                  
                  {/* Close button inside media */}
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="absolute top-5 left-5 rounded-full bg-white/5 text-white hover:bg-white/10 border border-white/10 p-2.5 transition focus:outline-none cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </button>

                  {/* Category */}
                  <span className="absolute bottom-5 right-6 bg-amber-500 text-slate-950 font-black text-xs px-3.5 py-1.5 rounded-full shadow-md">
                    {selectedArticle.category}
                  </span>
                </div>

                {/* Content Area */}
                <div className="p-6 sm:p-10 space-y-6">
                  
                  {/* Meta header */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
                    <div className="flex flex-wrap gap-4 text-xs text-slate-400 font-bold">
                      <span className="flex items-center gap-1 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/10">
                        <Calendar className="h-4 w-4 text-slate-400" />
                        <span>نشر في: {selectedArticle.date}</span>
                      </span>
                      <span className="flex items-center gap-1 bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/10">
                        <Clock className="h-4 w-4 text-slate-400" />
                        <span>زمن القراءة: {selectedArticle.readTime}</span>
                      </span>
                    </div>

                    <button
                      onClick={(e) => handleShare(selectedArticle.id, e)}
                      className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white font-bold rounded-xl border border-white/10 hover:bg-white/5 px-3.5 py-2.5 transition-colors cursor-pointer"
                      title="نسخ الرابط لمشاركته"
                    >
                      {copiedId === selectedArticle.id ? (
                        <>
                          <Check className="h-4 w-4 text-emerald-400" />
                          <span className="text-emerald-400">تم نسخ الرابط!</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="h-4 w-4" />
                          <span>مشاركة المقال</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Main Title */}
                  <h2 className="text-xl sm:text-2xl font-black text-white font-display leading-snug">
                    {selectedArticle.title}
                  </h2>

                  {/* Author Box */}
                  <div className="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                    <div className="h-10 w-10 rounded-full bg-amber-500 flex items-center justify-center text-slate-950 font-black text-sm shadow-xs">
                      {selectedArticle.author.slice(3, 4)}
                    </div>
                    <div className="text-right text-xs">
                      <span className="text-slate-400 font-bold block">محرر وكاتب المقال</span>
                      <span className="text-amber-400 font-extrabold block mt-0.5">{selectedArticle.author}</span>
                    </div>
                  </div>

                  {/* Body paragraphs */}
                  <div className="text-slate-300 text-sm sm:text-base font-semibold leading-relaxed space-y-6 pt-2">
                    {selectedArticle.content.map((paragraph, index) => (
                      <p key={index} className="indent-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Read other suggestions closing */}
                  <div className="pt-6 border-t border-white/10 flex justify-end">
                    <button
                      onClick={() => setSelectedArticle(null)}
                      className="rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold px-6 py-3 text-sm transition cursor-pointer"
                    >
                      إغلاق القارئ
                    </button>
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
