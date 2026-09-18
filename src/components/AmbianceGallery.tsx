"use client";
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function AmbianceGallery({ gallery }: { gallery: any[] }) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const { t } = useLanguage();

  if (!gallery || gallery.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-md auto-rows-[280px]">
        {gallery.map((img: any, idx: number) => {
          // Dynamic span logic to create a bento-like masonry feel
          let spanClass = "col-span-1 row-span-1";
          if (idx === 0) spanClass = "sm:col-span-2 lg:col-span-2 row-span-2";
          else if (idx === 3) spanClass = "sm:col-span-1 lg:col-span-2 row-span-1";
          else if (idx === 4) spanClass = "sm:col-span-2 lg:col-span-1 row-span-2";
          
          return (
            <article 
              key={img.id || idx}
              onClick={() => setSelectedImage(idx)}
              className={`${spanClass} relative rounded-2xl overflow-hidden shadow-sm group hover:scale-[1.02] hover:shadow-2xl transition-all duration-500 cursor-pointer`}
            >
              <img 
                src={img.url} 
                alt={t(img.title) || "Ambiance image"} 
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-space-md left-space-md right-space-md text-on-primary translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <h3 className="font-serif-editorial text-2xl text-white font-medium">{t(img.title)}</h3>
                <p className="font-body-sm text-white/80">{t(img.description)}</p>
              </div>
            </article>
          );
        })}
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 sm:p-8">
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all z-50"
          >
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); setSelectedImage((selectedImage - 1 + gallery.length) % gallery.length); }}
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all z-50 hidden sm:block"
          >
            <span className="material-symbols-outlined text-3xl">arrow_back_ios_new</span>
          </button>

          <button 
            onClick={(e) => { e.stopPropagation(); setSelectedImage((selectedImage + 1) % gallery.length); }}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-all z-50 hidden sm:block"
          >
            <span className="material-symbols-outlined text-3xl">arrow_forward_ios</span>
          </button>

          <div className="relative w-full max-w-5xl aspect-[4/3] sm:aspect-video flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl flex items-center justify-center">
              <img 
                src={gallery[selectedImage].url}
                alt={t(gallery[selectedImage].title) || "Gallery image"}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            
            {(gallery[selectedImage].title || gallery[selectedImage].description) && (
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 sm:p-8 pt-12 text-center rounded-b-xl">
                {gallery[selectedImage].title && (
                  <h2 className="text-2xl sm:text-3xl font-serif-editorial text-white mb-2">{t(gallery[selectedImage].title)}</h2>
                )}
                {gallery[selectedImage].description && (
                  <p className="text-white/80 font-body-lg text-sm sm:text-base max-w-2xl mx-auto">{t(gallery[selectedImage].description)}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
