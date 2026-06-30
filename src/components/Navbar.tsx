/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, MouseEvent } from 'react';
import { Building2, Phone, Menu, X, ShieldAlert, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onOpenDashboard: () => void;
  newLeadsCount: number;
}

export default function Navbar({ onOpenDashboard, newLeadsCount }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'الرئيسية', href: '#home' },
    { name: 'لماذا نحن', href: '#why-us' },
    { name: 'العروض المميزة', href: '#listings' },
    { name: 'تقييم مجاني', href: '#valuation' },
    { name: 'آراء العملاء', href: '#testimonials' },
    { name: 'آخر الأخبار', href: '#blog' },
  ];

  const handleScroll = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <header id="navbar-header" className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-md shadow-2xl" style={{ direction: 'rtl' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Right side: Logo & Brand */}
          <div className="flex items-center gap-2">
            <a href="#home" className="flex items-center gap-2 text-white font-bold text-lg tracking-tight">
              <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500 text-slate-950 shadow-md">
                <Building2 className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
                </span>
              </span>
              <div className="flex flex-col items-start leading-none">
                <span className="font-extrabold text-white tracking-tight text-sm">بَيْتِي نَايْس</span>
                <span className="text-[8px] text-amber-500 font-medium tracking-widest mt-1">لِلخِدْمَات العَقَارِيَّة</span>
              </div>
            </a>
          </div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className="text-slate-400 hover:text-amber-500 font-semibold text-[13px] transition-colors duration-200 relative py-2 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-amber-500 after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Left side: CTAs and Admin Panel Toggler */}
          <div className="hidden md:flex items-center gap-4">
            {/* Main Phone Call button */}
            <a
              href="tel:920001234"
              className="flex items-center gap-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2 text-xs font-bold shadow-lg shadow-amber-500/10 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <Phone className="h-3.5 w-3.5 text-slate-950 animate-pulse" />
              <span>اتصل بنا</span>
            </a>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-lg bg-white/5 p-2 text-white hover:bg-white/10 border border-white/10 focus:outline-none"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-slate-950/95 backdrop-blur-md"
          >
            <div className="space-y-1 px-4 py-4 sm:px-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="block rounded-lg px-3 py-2 text-sm font-bold text-slate-300 hover:bg-white/5 hover:text-amber-500"
                >
                  {link.name}
                </a>
              ))}
              <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-3">
                <a
                  href="tel:920001234"
                  className="flex items-center justify-center gap-2 rounded-xl bg-amber-500 text-slate-950 py-2.5 text-sm font-bold shadow-md hover:bg-amber-400"
                >
                  <Phone className="h-4 w-4 text-slate-950" />
                  <span>اتصل بنا</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
