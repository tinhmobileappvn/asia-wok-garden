"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from '@/context/LanguageContext';

export default function MenuCard({ item }: { item: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const displayName = t(item.name);
  const displayDesc = t(item.description) || item.category;

  return (
    <>
      {/* CARD */}
      <div
        onClick={() => setIsOpen(true)}
        className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/30 flex flex-col group hover:shadow-md transition-all relative overflow-hidden cursor-pointer h-full"
      >
        <div className="relative h-48 w-full bg-surface-variant overflow-hidden">
          <Image
            src={item.image || "/images/fallback.jpg"}
            alt={displayName}
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute bottom-3 right-3 bg-surface-container-lowest/90 backdrop-blur-md px-2 py-1 rounded text-primary font-bold text-[16px]">
            € {Number(item.price).toFixed(2).replace(".", ",")}
          </div>
        </div>
        <div className="p-4 flex flex-col flex-1">
          <h3
            className="text-[18px] font-bold text-on-surface mb-1 group-hover:text-primary transition-colors line-clamp-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {displayName}
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant flex-1 line-clamp-2">
            {displayDesc}
          </p>
        </div>
      </div>

      {/* MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-scrim/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsOpen(false)}
          ></div>

          {/* Modal Content */}
          <div className="relative bg-[#161b26] w-full max-w-lg rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-10 bg-surface-container-high/50 hover:bg-surface-container-high text-on-surface p-2 rounded-full backdrop-blur-md transition-colors shadow-sm"
              aria-label="Close"
            >
              <span className="material-symbols-outlined text-[20px]">
                close
              </span>
            </button>

            {/* Modal Image */}
            <div className="relative w-full h-64 bg-surface-variant shrink-0">
              <Image
                src={item.image || "/images/fallback.jpg"}
                alt={displayName}
                className="object-cover"
                fill
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>

            {/* Modal Details */}
            <div className="p-6 overflow-y-auto">
              <h2 className="text-3xl font-bold text-white mb-2">
                {displayName}
              </h2>
              <div className="text-primary text-xl font-bold mb-6">
                €{Number(item.price).toFixed(2).replace(".", ",")}
              </div>
              <p className="text-[#a0a4ab] text-body-lg leading-relaxed whitespace-pre-wrap">
                {t(item.description) || "No description available."}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
