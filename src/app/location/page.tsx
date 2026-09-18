"use client";
import React, { useEffect, useState } from "react";
import { useSettings } from "@/context/SettingsContext";
import { useLanguage } from "@/context/LanguageContext";

export default function LocationPage() {
  const settings = useSettings();
  const { t, lang } = useLanguage();
  const [currentDay, setCurrentDay] = useState<string>("");

  useEffect(() => {
    // Get current day of week in English lowercase to match openingHours keys
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = new Date().getDay();
    setCurrentDay(days[today]);
  }, []);

  const daysOfWeek = [
    { key: "monday", label: { EN: "Monday", DE: "Montag" } },
    { key: "tuesday", label: { EN: "Tuesday", DE: "Dienstag" } },
    { key: "wednesday", label: { EN: "Wednesday", DE: "Mittwoch" } },
    { key: "thursday", label: { EN: "Thursday", DE: "Donnerstag" } },
    { key: "friday", label: { EN: "Friday", DE: "Freitag" } },
    { key: "saturday", label: { EN: "Saturday", DE: "Samstag" } },
    { key: "sunday", label: { EN: "Sunday", DE: "Sonntag" } },
  ];

  return (
    <main className="w-full pb-16 bg-surface min-h-screen">
      {/* Thin Banner Header */}
      <section className="relative w-full overflow-hidden pt-32 pb-24 mb-12">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/ambiance.jpg')" }}
        ></div>
        <div className="absolute inset-0 z-0 bg-black/60 backdrop-blur-sm"></div>
        <div className="relative z-10 max-w-[1280px] mx-auto px-gutter-desktop text-center py-12">
          <h1 className="font-display-lg text-display-lg text-white mb-4 shadow-sm">
            {t({ EN: "Location & Hours", DE: "Standort & Öffnungszeiten" })}
          </h1>
          <p className="font-body-lg text-white/90 max-w-2xl mx-auto">
            {t({ 
              EN: "Find us in the heart of Darmstadt-Bessungen. We look forward to welcoming you.", 
              DE: "Besuchen Sie uns im Herzen von Darmstadt-Bessungen. Wir freuen uns auf Sie." 
            })}
          </p>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-gutter-desktop">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left Column: Information & Hours */}
          <div className="flex flex-col space-y-12">
            
            {/* Contact Info */}
            <div className="space-y-6">
              <h2 className="font-serif-editorial text-2xl text-on-surface border-b border-outline-variant/30 pb-3">
                {t({ EN: "Contact & Address", DE: "Kontakt & Adresse" })}
              </h2>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary mt-1">pin_drop</span>
                <div>
                  <p className="font-bold text-on-surface">Asia Wok Garden</p>
                  <p className="text-on-surface-variant">{settings?.address || "Bessunger Straße 91, 64285 Darmstadt"}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary mt-1">phone_in_talk</span>
                <div>
                  <p className="font-bold text-on-surface">{t({ EN: "Phone", DE: "Telefon" })}</p>
                  <a href={`tel:${settings?.phone}`} className="text-primary hover:underline font-medium">
                    {settings?.phone || "+49 6151 6086915"}
                  </a>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="space-y-6">
              <h2 className="font-serif-editorial text-2xl text-on-surface border-b border-outline-variant/30 pb-3">
                {t({ EN: "Opening Hours", DE: "Öffnungszeiten" })}
              </h2>
              <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/50 overflow-hidden">
                {daysOfWeek.map((day, idx) => {
                  const isToday = currentDay === day.key;
                  // @ts-ignore
                  const time = settings?.openingHours?.[day.key] || "Closed";
                  const isClosed = time.toLowerCase().includes("ruhetag") || time.toLowerCase().includes("closed");

                  return (
                    <div 
                      key={day.key} 
                      className={`flex justify-between items-center p-4 ${idx !== daysOfWeek.length - 1 ? 'border-b border-outline-variant/30' : ''} ${isToday ? 'bg-primary/10' : ''}`}
                    >
                      <span className={`font-medium ${isToday ? 'text-primary font-bold' : 'text-on-surface'}`}>
                        {t(day.label as any)}
                        {isToday && <span className="ml-2 text-xs bg-primary text-on-primary px-2 py-0.5 rounded-full uppercase tracking-wider">{t({ EN: "Today", DE: "Heute" })}</span>}
                      </span>
                      <span className={`${isToday ? 'text-primary font-bold' : (isClosed ? 'text-error' : 'text-on-surface-variant')}`}>
                        {time}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Map & Transit */}
          <div className="flex flex-col space-y-6">
            <div className="w-full h-[400px] lg:h-full min-h-[500px] bg-surface-container rounded-2xl overflow-hidden shadow-sm relative border border-outline-variant/30">
              <iframe 
                src="https://maps.google.com/maps?q=Bessunger+Stra%C3%9Fe+91,+64285+Darmstadt&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              ></iframe>
            </div>

            {/* Quick Transit Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary">tram</span>
                <div>
                  <p className="font-bold text-sm text-on-surface uppercase tracking-wider mb-1">
                    {t({ EN: "Public Transit", DE: "ÖPNV-Halt" })}
                  </p>
                  <p className="text-sm text-on-surface-variant">
                    {t({ EN: 'Tram 3 - Stop "Bessunger Platz"', DE: 'Tram 3 - Haltestelle "Bessunger Platz"' })}
                  </p>
                </div>
              </div>
              <div className="bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/30 flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary">local_parking</span>
                <div>
                  <p className="font-bold text-sm text-on-surface uppercase tracking-wider mb-1">
                    {t({ EN: "Parking", DE: "Parken" })}
                  </p>
                  <p className="text-sm text-on-surface-variant">
                    {t({ EN: "Available on street & private yard", DE: "Eigene Hofplätze & Straße" })}
                  </p>
                </div>
              </div>
            </div>
            
            <a 
              href={settings?.mapLink || "https://maps.app.goo.gl/JT57LPNGd7wAdWwp8"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-primary hover:text-primary-container font-medium transition-colors p-2"
            >
              {t({ EN: "Open in Google Maps", DE: "In Google Maps öffnen" })}
              <span className="material-symbols-outlined text-sm">open_in_new</span>
            </a>
          </div>

        </div>
      </div>
    </main>
  );
}
