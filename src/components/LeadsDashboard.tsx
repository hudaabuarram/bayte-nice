/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Lead } from '../types';
import { X, Search, Phone, MessageSquare, Trash2, CheckCircle, Clock, Archive, Plus, ShieldAlert, BadgeAlert, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LeadsDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  leads: Lead[];
  onUpdateStatus: (id: string, status: Lead['status']) => void;
  onDeleteLead: (id: string) => void;
  onAddSimulatedLead: () => void;
}

export default function LeadsDashboard({
  isOpen,
  onClose,
  leads,
  onUpdateStatus,
  onDeleteLead,
  onAddSimulatedLead,
}: LeadsDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | Lead['status']>('all');
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);

  // Filter and search logic
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.includes(searchQuery) ||
      lead.phone.includes(searchQuery) ||
      (lead.email && lead.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (lead.notes && lead.notes.includes(searchQuery)) ||
      (lead.propertyType && lead.propertyType.includes(searchQuery)) ||
      (lead.city && lead.city.includes(searchQuery));

    const matchesStatus = activeFilter === 'all' ? true : lead.status === activeFilter;

    return matchesSearch && matchesStatus;
  });

  // Count helper stats
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === 'new').length;
  const valuationLeads = leads.filter((l) => l.type === 'valuation').length;
  const inquiryLeads = leads.filter((l) => l.type === 'inquiry').length;

  const getStatusBadge = (status: Lead['status']) => {
    switch (status) {
      case 'new':
        return <span className="inline-flex items-center gap-1 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-extrabold px-2 py-1">جديد</span>;
      case 'contacted':
        return <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-extrabold px-2 py-1">تم التواصل</span>;
      case 'completed':
        return <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-extrabold px-2 py-1">مكتمل</span>;
      case 'archived':
        return <span className="inline-flex items-center gap-1 rounded-md bg-white/5 text-slate-400 border border-white/10 text-xs font-extrabold px-2 py-1">مؤرشف</span>;
      default:
        return null;
    }
  };

  const getLeadTypeBadge = (type: Lead['type']) => {
    switch (type) {
      case 'valuation':
        return <span className="inline-flex items-center rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[11px] font-bold px-2 py-0.5">حساب تقييم</span>;
      case 'inquiry':
        return <span className="inline-flex items-center rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-bold px-2 py-0.5">طلب شراء</span>;
      case 'consultation':
        return <span className="inline-flex items-center rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[11px] font-bold px-2 py-0.5">استشارة عامة</span>;
      default:
        return null;
    }
  };

  const formatLeadTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('ar-SA', {
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" style={{ direction: 'rtl' }}>
      {/* Dark backdrop */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity" onClick={onClose} />

      <div className="fixed inset-y-0 left-0 max-w-full flex">
        {/* Sliding Panel Body */}
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-screen max-w-4xl bg-slate-950 border-r border-white/10 shadow-2xl flex flex-col h-full text-white"
        >
          {/* Header Panel */}
          <div className="bg-slate-900 px-6 py-5 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-2">
              <Award className="h-6 w-6 text-amber-500" />
              <div>
                <h2 className="text-lg font-bold text-white">لوحة متابعة العملاء المتوقعين</h2>
                <p className="text-[10px] text-slate-400 font-bold">بوابة المستشار العقاري - CRM Portal</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white p-2 transition focus:outline-none cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Body Dashboard area */}
          <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-slate-950">
            
            {/* Info warning for demo developers */}
            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 text-amber-200 text-xs font-semibold leading-relaxed flex items-start gap-2">
              <ShieldAlert className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-extrabold text-amber-400">بيئة اختبار ومراجعة تفاعلية (Sandbox):</span><br />
                تم تصميم هذه اللوحة لمساعدتك على مراقبة استلام الطلبات. عند قيامك بالتقييم المجاني أو تعبئة استفسار عن أي عقار، تضاف البيانات فوراً هنا وتخزن تلقائياً في <code className="bg-white/10 text-white px-1 py-0.5 rounded">localStorage</code> لتتمكن من تجربة تغيير الحالات أو الأرشفة أو الحذف في الوقت الحقيقي.
              </div>
            </div>

            {/* Quick Summary Cards Widgets */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-900 rounded-2xl p-4 border border-white/10 shadow-xs text-center">
                <span className="text-[10px] text-slate-400 font-extrabold block">إجمالي الطلبات</span>
                <span className="text-2xl font-black text-white font-display block mt-1">{totalLeads}</span>
              </div>
              <div className="bg-slate-900 rounded-2xl p-4 border border-white/10 shadow-xs text-center">
                <span className="text-[10px] text-red-400 font-extrabold block flex items-center justify-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse"></span>
                  <span>طلبات جديدة</span>
                </span>
                <span className="text-2xl font-black text-red-500 font-display block mt-1">{newLeads}</span>
              </div>
              <div className="bg-slate-900 rounded-2xl p-4 border border-white/10 shadow-xs text-center">
                <span className="text-[10px] text-blue-400 font-extrabold block">حسابات التقييم</span>
                <span className="text-2xl font-black text-blue-500 font-display block mt-1">{valuationLeads}</span>
              </div>
              <div className="bg-slate-900 rounded-2xl p-4 border border-white/10 shadow-xs text-center">
                <span className="text-[10px] text-emerald-400 font-extrabold block">استفسارات الشراء</span>
                <span className="text-2xl font-black text-emerald-500 font-display block mt-1">{inquiryLeads}</span>
              </div>
            </div>

            {/* Controls Bar: Search & Status Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-900 rounded-2xl p-4 border border-white/10 shadow-xs">
              
              {/* Search */}
              <div className="relative flex-grow max-w-md">
                <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث بالاسم، الهاتف، المدينة..."
                  className="w-full rounded-xl border border-white/10 bg-slate-950 pr-10 pl-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-amber-500/50 focus:outline-none transition"
                />
              </div>

              {/* Simulation Quick Insert Button */}
              <button
                onClick={onAddSimulatedLead}
                className="flex items-center justify-center gap-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/25 px-4 py-2.5 text-xs font-bold transition cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>إضافة عميل تجريبي سريع</span>
              </button>
            </div>

            {/* Status Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold text-slate-500 scrollbar-none">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-xl border shrink-0 transition cursor-pointer ${activeFilter === 'all' ? 'bg-amber-500 text-slate-950 border-amber-500 font-black' : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'}`}
              >
                الكل ({leads.length})
              </button>
              <button
                onClick={() => setActiveFilter('new')}
                className={`px-4 py-2 rounded-xl border shrink-0 transition cursor-pointer ${activeFilter === 'new' ? 'bg-rose-600 text-white border-rose-600 font-black' : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'}`}
              >
                الجديد ({leads.filter((l) => l.status === 'new').length})
              </button>
              <button
                onClick={() => setActiveFilter('contacted')}
                className={`px-4 py-2 rounded-xl border shrink-0 transition cursor-pointer ${activeFilter === 'contacted' ? 'bg-amber-500 text-slate-950 border-amber-500 font-black' : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'}`}
              >
                تم التواصل ({leads.filter((l) => l.status === 'contacted').length})
              </button>
              <button
                onClick={() => setActiveFilter('completed')}
                className={`px-4 py-2 rounded-xl border shrink-0 transition cursor-pointer ${activeFilter === 'completed' ? 'bg-emerald-600 text-white border-emerald-600 font-black' : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'}`}
              >
                مكتمل ({leads.filter((l) => l.status === 'completed').length})
              </button>
              <button
                onClick={() => setActiveFilter('archived')}
                className={`px-4 py-2 rounded-xl border shrink-0 transition cursor-pointer ${activeFilter === 'archived' ? 'bg-slate-600 text-white border-slate-600 font-black' : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'}`}
              >
                المؤرشف ({leads.filter((l) => l.status === 'archived').length})
              </button>
            </div>

            {/* Lead Logs Table/Cards */}
            {filteredLeads.length === 0 ? (
              <div className="bg-slate-900 rounded-3xl p-12 text-center border border-white/10 shadow-xs max-w-sm mx-auto">
                <span className="text-3xl block mb-2">📭</span>
                <h4 className="text-sm font-bold text-white mt-3 mb-1">لا توجد طلبات مطابقة للبحث</h4>
                <p className="text-slate-400 text-[11px] font-semibold">تأكد من كتابة أحرف صحيحة أو إضافة عميل تجريبي بالزر أعلاه للتحقق.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredLeads.map((lead) => {
                  const isExpanded = selectedLeadId === lead.id;
                  
                  return (
                    <motion.div
                      key={lead.id}
                      layout
                      className={`rounded-2xl border bg-slate-900 shadow-xs transition-all duration-300 overflow-hidden ${isExpanded ? 'border-amber-500 ring-1 ring-amber-500/20' : 'border-white/10 hover:border-white/20'}`}
                    >
                      {/* Main card row clickable */}
                      <div
                        onClick={() => setSelectedLeadId(isExpanded ? null : lead.id)}
                        className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
                      >
                        {/* Name & Badge details */}
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 rounded-full bg-white/5 text-amber-500 border border-white/10 flex items-center justify-center font-black text-sm shrink-0">
                            {lead.name.slice(0, 1)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap text-right">
                              <h4 className="text-sm font-extrabold text-white">{lead.name}</h4>
                              {getLeadTypeBadge(lead.type)}
                              {getStatusBadge(lead.status)}
                            </div>
                            <span className="text-[10px] text-slate-400 font-bold block mt-1.5 text-right">{formatLeadTime(lead.createdAt)}</span>
                          </div>
                        </div>

                        {/* Contacts / CTA links */}
                        <div className="flex items-center gap-2 flex-wrap" onClick={(e) => e.stopPropagation()}>
                          <a
                            href={`tel:${lead.phone}`}
                            className="flex items-center gap-1 text-[11px] font-bold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-2.5 py-1.5 transition"
                            title="اتصال جوال"
                          >
                            <Phone className="h-3.5 w-3.5" />
                            <span>{lead.phone}</span>
                          </a>

                          <a
                            href={`https://wa.me/966${lead.phone.replace(/^0/, '')}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1 text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg px-2.5 py-1.5 transition"
                            title="مراسلة واتساب"
                          >
                            <MessageSquare className="h-3.5 w-3.5" />
                            <span>واتساب</span>
                          </a>
                        </div>
                      </div>

                      {/* Expandable Panel */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-t border-white/10 bg-slate-950/40 p-5 space-y-4"
                          >
                            
                            {/* Notes and parameters content */}
                            <div className="text-xs text-slate-300 font-semibold leading-relaxed bg-white/5 border border-white/10 rounded-xl p-4 text-right">
                              <span className="text-[10px] text-slate-400 font-extrabold block mb-1">تفاصيل وملاحظات الطلب الوارد:</span>
                              {lead.notes || 'لا يوجد تفاصيل إضافية مكتوبة.'}
                            </div>

                            {/* Specific Valuation block if type == valuation */}
                            {lead.valDetails && (
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-amber-500/5 border border-amber-500/25 rounded-xl p-3.5 text-center text-xs text-amber-300 font-bold">
                                <div>
                                  <span className="text-[10px] text-slate-400 block mb-0.5">المساحة</span>
                                  <span>{lead.valDetails.area} م²</span>
                                </div>
                                <div>
                                  <span className="text-[10px] text-slate-400 block mb-0.5">عمر العقار</span>
                                  <span>{lead.valDetails.age === 0 ? 'جديد' : `${lead.valDetails.age} سنوات`}</span>
                                </div>
                                <div>
                                  <span className="text-[10px] text-slate-400 block mb-0.5">التشطيب</span>
                                  <span className="line-clamp-1">{lead.valDetails.finishing}</span>
                                </div>
                                <div>
                                  <span className="text-[10px] text-slate-400 block mb-0.5">التقييم المقدر</span>
                                  <span className="text-amber-400 font-extrabold line-clamp-1">{lead.valDetails.estimatedValue.split(' ')[0]} ر.س</span>
                                </div>
                              </div>
                            )}

                            {/* Action Operations panel */}
                            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
                              
                              {/* Change Status select */}
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] text-slate-400 font-extrabold">تعديل حالة المتابعة:</span>
                                <div className="flex gap-1.5 flex-wrap">
                                  <button
                                    onClick={() => onUpdateStatus(lead.id, 'new')}
                                    className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition cursor-pointer ${lead.status === 'new' ? 'bg-rose-600 text-white' : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10'}`}
                                  >
                                    جديد
                                  </button>
                                  <button
                                    onClick={() => onUpdateStatus(lead.id, 'contacted')}
                                    className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition cursor-pointer ${lead.status === 'contacted' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10'}`}
                                  >
                                    تم التواصل
                                  </button>
                                  <button
                                    onClick={() => onUpdateStatus(lead.id, 'completed')}
                                    className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition cursor-pointer ${lead.status === 'completed' ? 'bg-emerald-600 text-white' : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10'}`}
                                  >
                                    مكتمل
                                  </button>
                                  <button
                                    onClick={() => onUpdateStatus(lead.id, 'archived')}
                                    className={`px-2.5 py-1 rounded-md text-[10px] font-bold transition cursor-pointer ${lead.status === 'archived' ? 'bg-slate-600 text-white' : 'bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10'}`}
                                  >
                                    مؤرشف
                                  </button>
                                </div>
                              </div>

                              {/* Delete action */}
                              <button
                                onClick={() => onDeleteLead(lead.id)}
                                className="flex items-center gap-1 text-[11px] font-bold text-red-400 hover:text-white hover:bg-red-600 border border-red-500/20 hover:border-red-600 rounded-lg px-2.5 py-1.5 transition cursor-pointer"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                                <span>حذف الطلب</span>
                              </button>

                            </div>

                          </motion.div>
                        )}
                      </AnimatePresence>

                    </motion.div>
                  );
                })}
              </div>
            )}

          </div>

          {/* Footer of sliding CRM panel */}
          <div className="bg-slate-900 px-6 py-4 border-t border-white/10 text-center text-[10px] text-slate-400 font-bold">
            نظام إدارة علاقات العملاء بيتي نايس v1.4 • جميع التغييرات تحفظ مباشرة في المتصفح المحلّي.
          </div>
        </motion.div>
      </div>
    </div>
  );
}
