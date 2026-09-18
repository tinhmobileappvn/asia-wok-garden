"use client";
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSettings } from '@/context/SettingsContext';
import { useLanguage } from '@/context/LanguageContext';
import { usePathname } from 'next/navigation';

export default function Header() {
  const settings = useSettings();
  const pathname = usePathname();
  const { lang, setLang } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop h-20 flex items-center justify-between gap-space-md">
        <Link className="flex items-center gap-2" href="/">
          <Image src={settings?.logo || "/images/logo.png"} alt="Wok Garden Darmstadt Logo" className="h-12 w-auto object-contain" width={200} height={48} />
        </Link>
        <nav className="hidden xl:flex items-center gap-space-lg font-medium text-body-sm">
          <Link className="text-on-surface-variant hover:text-primary transition-colors py-space-xs" href="/">Home</Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors py-space-xs" href="/menu">Menu</Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors py-space-xs" href="/ambiance">Ambiance</Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors py-space-xs" href="/location">Location & Hours</Link>
        </nav>
        <div className="flex items-center gap-space-md">
          <button className="xl:hidden p-2 text-on-surface hover:text-primary" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <span className="material-symbols-outlined text-[24px]">{isMobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
          <div className="inline-flex items-center bg-surface-container rounded-full p-1 border border-outline-variant text-[12px] font-semibold">
            <button 
              className={`px-2 py-0.5 rounded-full ${lang === 'DE' ? 'bg-primary text-on-primary shadow-xs' : 'text-on-surface-variant hover:text-on-surface'}`} 
              type="button"
              onClick={() => setLang('DE')}
            >
              DE
            </button>
            <span className="px-1 text-outline">|</span>
            <button 
              className={`px-2 py-0.5 rounded-full ${lang === 'EN' ? 'bg-primary text-on-primary shadow-xs' : 'text-on-surface-variant hover:text-on-surface'}`} 
              type="button"
              onClick={() => setLang('EN')}
            >
              EN
            </button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <nav className="xl:hidden absolute top-20 left-0 right-0 bg-surface shadow-lg border-t border-surface-container flex flex-col p-4 gap-4 font-medium text-body-lg z-50">
          <Link className="text-on-surface-variant hover:text-primary transition-colors" href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors" href="/menu" onClick={() => setIsMobileMenuOpen(false)}>Menu</Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors" href="/ambiance" onClick={() => setIsMobileMenuOpen(false)}>Ambiance</Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors" href="/location" onClick={() => setIsMobileMenuOpen(false)}>Location & Hours</Link>
        </nav>
      )}
    </header>
  );
}