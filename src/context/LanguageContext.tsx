"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

type LanguageContextType = {
  lang: 'EN' | 'DE';
  setLang: (lang: 'EN' | 'DE') => void;
  t: (dictionary: any) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  lang: 'EN',
  setLang: () => {},
  t: (dict) => dict['EN']
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<'EN' | 'DE'>('EN');

  useEffect(() => {
    // Check localStorage or browser language on mount
    const saved = localStorage.getItem('site_lang');
    if (saved === 'DE' || saved === 'EN') {
      setLangState(saved);
    } else {
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (tz === 'Europe/Berlin') {
          setLangState('DE');
        }
      } catch (e) {}
    }
  }, []);

  const setLang = (newLang: 'EN' | 'DE') => {
    setLangState(newLang);
    localStorage.setItem('site_lang', newLang);
  };

  const t = (dict: any) => {
    if (typeof dict === 'string') return dict;
    if (!dict) return '';
    return dict[lang] || dict['EN'] || '';
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
