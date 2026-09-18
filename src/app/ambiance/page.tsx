import React from 'react';
import AmbianceGallery from '@/components/AmbianceGallery';
import Link from 'next/link';
import Trans from '@/components/Trans';
import { getSettings } from '@/lib/db';

export default async function Page() {
  const settings: any = await getSettings();
  const ambiance = settings.ambiance;

  if (!ambiance) return null;

  return (
    <>
      <main className="w-full bg-surface">
        <div className="flex flex-col w-full">
          {/* Immersive Full-Screen Hero */}
          <section className="relative w-full h-screen min-h-[90vh] flex flex-col justify-center items-center overflow-hidden bg-inverse-surface text-on-primary">
            <div className="absolute inset-0 z-0 bg-cover bg-center scale-105 transition-transform duration-1000 ease-out" style={{ backgroundImage: `url('${ambiance.heroImage}')` }}></div>
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/75 via-black/50 to-black/85"></div>
            <div className="relative z-10 max-w-[1280px] mx-auto px-gutter-desktop text-center flex flex-col items-center space-y-space-md">
              <div className="inline-flex items-center gap-space-xs px-space-md py-space-2xs rounded-full bg-surface-container-lowest/15 backdrop-blur-md border border-white/20 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary-fixed font-semibold">Ambiance &amp; Gallery</span>
              </div>
              <h1 className="font-serif-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-on-primary max-w-5xl leading-[1.1] whitespace-pre-line">
                <Trans content={ambiance.heroTitle} />
              </h1>
              <p className="font-body-lg text-body-lg md:text-xl text-white/90 max-w-2xl font-light tracking-wide pt-space-xs whitespace-pre-line">
                <Trans content={ambiance.heroSubtitle} />
              </p>
            </div>
            {/* Animated scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/80 hover:text-white transition-colors cursor-pointer animate-bounce">
              <span className="font-label-sm text-[11px] uppercase tracking-widest font-medium">Scroll to Explore</span>
              <span className="material-symbols-outlined text-2xl">keyboard_arrow_down</span>
            </div>
          </section>

          {/* The Story (Intro Section) */}
          <section className="w-full bg-[#faf8f5] py-space-4xl border-b border-outline-variant/20">
            <div className="max-w-[1280px] mx-auto px-gutter-desktop">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-2xl lg:gap-space-3xl items-center">
                {/* Left Column */}
                <div className="lg:col-span-12 space-y-space-lg text-center md:text-left">
                  <div className="inline-block">
                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">The Philosophy</span>
                  </div>
                  <h2 className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl text-on-surface font-normal leading-[1.15] whitespace-pre-line">
                    <Trans content={ambiance.philosophyTitle} />
                  </h2>
                  <p className="font-body-lg text-lg sm:text-xl text-on-surface-variant leading-relaxed max-w-2xl whitespace-pre-line">
                    <Trans content={ambiance.philosophyDesc} />
                  </p>
                  
                  {ambiance.highlights && ambiance.highlights.length > 0 && (
                    <div className="pt-space-md flex flex-wrap items-center justify-center md:justify-start gap-space-lg border-t border-outline-variant/30 mt-8">
                      {ambiance.highlights.map((h: any, i: number) => (
                        <React.Fragment key={i}>
                          <div className="flex flex-col">
                            <span className={`font-serif-editorial text-3xl sm:text-4xl font-medium ${i % 2 === 0 ? 'text-primary' : (i % 3 === 0 ? 'text-on-surface' : 'text-secondary')}`}>
                              <Trans content={h.value} />
                            </span>
                            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mt-1">
                              <Trans content={h.label} />
                            </span>
                          </div>
                          {i < ambiance.highlights.length - 1 && (
                            <div className="h-10 w-px bg-outline-variant/40 hidden sm:block"></div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Bento / Masonry Image Gallery */}
          <section className="w-full py-space-4xl bg-surface">
            <div className="max-w-[1280px] mx-auto px-gutter-desktop space-y-space-2xl">
              {/* Section Header */}
              <div className="text-center max-w-2xl mx-auto space-y-space-2xs mb-12">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">Curated Perspectives</span>
                <h2 className="font-serif-editorial text-4xl sm:text-5xl text-on-surface font-normal">The Gallery</h2>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Atmosphere, artistry, and authentic moments captured across our restaurant.
                </p>
              </div>
              
              <AmbianceGallery gallery={ambiance.gallery || []} />
              
            </div>
          </section>

          {/* Final Call-to-Action */}
          <section className="w-full bg-[#f4f3f0] py-space-4xl border-t border-outline-variant/20">
            <div className="max-w-[1280px] mx-auto px-gutter-desktop text-center space-y-space-lg">
              <div className="max-w-2xl mx-auto space-y-space-xs">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-bold">A Warm Welcome Awaits</span>
                <h2 className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl text-on-surface font-normal">
                  Join us at the table.
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed pt-space-2xs">
                  Experience the unique ambiance of Asia Wok Garden in Darmstadt-Bessungen. We look forward to welcoming you.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-space-md pt-space-xs">
                <Link href="/location" className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs bg-[#1f9a7b] text-on-primary px-space-xl py-space-sm rounded-lg font-label-lg text-label-lg font-semibold hover:bg-primary-container transition-all shadow-md hover:shadow-lg">
                  <span className="material-symbols-outlined text-xl">location_on</span>
                  <span>Get Directions</span>
                </Link>
                <Link href="/menu" className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs bg-secondary text-on-secondary px-space-xl py-space-sm rounded-lg font-label-lg text-label-lg font-semibold hover:bg-secondary-container transition-all shadow-md hover:shadow-lg">
                  <span className="material-symbols-outlined text-xl">restaurant_menu</span>
                  <span>View Menu</span>
                </Link>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant pt-space-2xs">
                Or reserve a table directly: <a className="font-semibold text-primary hover:underline" href="tel:+496151893420">+49 6151 893420</a>
              </p>
            </div>
          </section>

          {/* Floating Quick Action Buttons */}
          <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-space-xs">
            <a className="flex items-center gap-space-xs bg-primary text-on-primary px-space-md py-space-xs rounded-full shadow-lg hover:bg-primary-container transition-all text-label-sm font-label-sm font-semibold" href="tel:+496151893420">
              <span className="material-symbols-outlined text-base">phone_in_talk</span>
              <span className="hidden sm:inline">Anrufen &amp; Reservieren</span>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}