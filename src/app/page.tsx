import HomeMenuPreview from '@/components/HomeMenuPreview';
import MenuCard from '@/components/MenuCard';
import React from "react";
import Link from 'next/link';
import Trans from '@/components/Trans';
import { getSettings, getMenu } from '@/lib/db';

export default async function Home() {
  const allItems: any = await getMenu();
  const signatureItems = allItems.filter((i: any) => i.isSignature);

  const settings: any = await getSettings();

  const heroBgImages = settings.heroBgImages || [
    '/images/ambiance_interior.jpg',
    '/images/ambiance_wok.jpg',
    '/images/ambiance_sushi.jpg'
  ];

  return (
    <>
      <main className="w-full pt-20 bg-surface min-h-screen">
        <div className="flex flex-col w-full">
          <section className="relative w-full overflow-hidden bg-inverse-surface text-surface -mt-20 pt-32 pb-space-3xl lg:pb-space-4xl group/hero cursor-pointer">
            <div className="absolute inset-0 w-full h-full">
              <div
                className="hero-slide-1 absolute group-hover/hero:scale-105 transition-transform duration-1000 ease-out inset-0 w-full h-full bg-cover bg-center will-change-transform"
                style={{
                  backgroundImage: `url('${heroBgImages[0]}')`,
                }}
              ></div>
              <div
                className="hero-slide-2 absolute group-hover/hero:scale-105 transition-transform duration-1000 ease-out inset-0 w-full h-full bg-cover bg-center will-change-transform opacity-0"
                style={{
                  backgroundImage: `url('${heroBgImages[1] || heroBgImages[0]}')`,
                }}
              ></div>
              <div
                className="hero-slide-3 absolute group-hover/hero:scale-105 transition-transform duration-1000 ease-out inset-0 w-full h-full bg-cover bg-center will-change-transform opacity-0"
                style={{
                  backgroundImage: `url('${heroBgImages[2] || heroBgImages[0]}')`,
                }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface via-inverse-surface/80 to-inverse-surface/60"></div>
            </div>
            <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary/20 blur-3xl pointer-events-none"></div>
            <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-secondary/20 blur-3xl pointer-events-none"></div>
            <div className="relative max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop z-10 flex flex-col justify-center min-h-[540px] py-space-xl group-hover/hero:-translate-y-2 transition-transform duration-1000 ease-out">
              <div className="max-w-3xl pt-space-md">
                <div className="inline-flex items-center gap-space-xs px-3 py-1 rounded-full bg-surface-container-lowest/10 backdrop-blur-md border border-surface-container-lowest/20 mb-space-md shadow-md">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-surface-container-lowest font-semibold">
                    Darmstadt • Artisanal Sushi &amp; Searing Wok
                  </span>
                </div>
                <h1
                  className="text-[36px] sm:text-[46px] lg:text-[56px] leading-[1.12] text-surface-container-lowest font-bold mb-space-md tracking-tight whitespace-pre-line"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  <Trans content={settings.heroTitle} />
                </h1>
                <p className="font-body-lg text-body-lg text-surface-container max-w-2xl leading-relaxed mb-space-xl">
                  <Trans content={settings.heroSubtitle} />
                </p>
                <div className="flex flex-wrap items-center gap-space-md">
                  <a
                    className="inline-flex items-center justify-center gap-space-xs bg-secondary hover:bg-on-secondary-fixed-variant text-on-secondary font-label-lg text-label-lg px-space-xl py-3 rounded shadow-lg transition-all"
                    href="#menu"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      moped
                    </span>
                    <span className="">Delivery</span>
                  </a>
                  <a
                    className="inline-flex items-center justify-center gap-space-xs bg-surface-container-lowest/15 backdrop-blur-md border-2 border-surface-container-lowest text-surface-container-lowest hover:bg-surface-container-lowest hover:text-on-surface font-label-lg text-label-lg px-space-xl py-3 rounded shadow-sm transition-all"
                    href="#menu"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      takeout_dining
                    </span>
                    <span className="">Pickup</span>
                  </a>
                  <div className="flex items-center gap-2 bg-inverse-surface/80 backdrop-blur-md px-3 py-2 rounded-full border border-surface-container-high/20 text-surface-container-high text-body-sm">
                    <span className="material-symbols-outlined text-primary-fixed text-[20px]">
                      verified
                    </span>
                    <span className="font-medium">
                      Bessunger Str. 91, Darmstadt
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section
            className="w-full py-space-3xl lg:py-space-4xl bg-surface"
            id="signature-dishes"
          >
            <div className="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-2xl gap-space-md">
                <div>
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-semibold">
                    Bestsellers &amp; Chef Recommends
                  </span>
                  <h2
                    className="text-[28px] lg:text-[40px] tracking-tight text-on-surface mt-space-2xs"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Signature Dishes
                  </h2>
                </div>
                <div className="flex items-center gap-space-xs font-label-sm text-label-sm text-on-surface-variant">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="">
                    Fresh daily sashimi-grade seafood &amp; bio vegetables
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
                {signatureItems.length > 0 ? (
                  signatureItems.map((item: any) => (
                    <MenuCard key={item.id} item={item} />
                  ))
                ) : (
                  <div className="col-span-full py-12 text-center text-on-surface-variant italic">
                    No signature dishes selected. Please mark items with a star in the admin panel.
                  </div>
                )}
              </div>
            </div>
          </section>
          {settings.showCompleteMenuOnHomepage !== false && (
            <section
              className="w-full py-space-3xl lg:py-space-4xl bg-surface-container-low"
              id="menu"
            >
              <div className="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop">
                <div className="text-center max-w-2xl mx-auto mb-space-xl">
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">
                    Apothecary of Asian Flavors
                  </span>
                  <h2
                    className="text-[28px] lg:text-[40px] text-on-surface mt-space-2xs mb-space-xs"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Our Complete Menu
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Crafted with pride using master wok hei techniques and freshly
                    caught premium fish.
                  </p>
                </div>
                <HomeMenuPreview 
                  allItems={allItems} 
                  categories={settings.categories?.filter((c: any) => c.showOnHomepage === true) || []} 
                />
              </div>
            </section>
          )}
          <section
            className="w-full py-space-3xl lg:py-space-4xl bg-surface"
            id="ambiance"
          >
            <div className="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop">
              <div className="text-center max-w-2xl mx-auto mb-space-2xl">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">
                  Vibe &amp; Craft
                </span>
                <h2
                  className="text-[28px] lg:text-[40px] text-on-surface mt-space-2xs mb-space-xs"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Ambiance &amp; Social Proof
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  An urban sanctuary in Darmstadt combining lush indoor
                  botanicals, high-heat exhibition woks, and artisanal sushi
                  mastercraft.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-space-md mb-space-2xl">
                {settings.ambiance?.gallery?.filter((img: any) => img.showOnHomepage).map((img: any, index: number) => (
                  <div key={img.id || index} className="rounded-xl overflow-hidden h-72 shadow-md relative group">
                    <img
                      alt={img.title?.EN || "Ambiance image"}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      src={img.url}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-transparent p-space-md flex flex-col justify-end text-surface">
                      <span className="font-label-sm text-label-sm text-primary-fixed uppercase tracking-wider font-semibold">
                        <Trans content={img.title} />
                      </span>
                      <span className="font-bold text-[17px]">
                        <Trans content={img.description} />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mb-space-2xl">
                <Link
                  href="/ambiance"
                  className="inline-flex items-center justify-center gap-2 bg-surface-container-lowest border border-outline-variant hover:border-primary hover:text-primary text-on-surface font-label-lg text-label-lg px-8 py-3 rounded-full shadow-sm transition-all hover:-translate-y-1"
                >
                  <span className="material-symbols-outlined">collections</span>
                  Explore Gallery
                </Link>
              </div>
              <div className="w-full max-w-container-max mx-auto">
                <div className="flex flex-col items-center justify-center mb-space-xl text-center">
                  <div className="inline-flex flex-wrap items-center justify-center gap-2 bg-surface-container-lowest border border-surface-container-high px-4 py-2 rounded-full shadow-sm">
                    <div className="flex items-center gap-0.5 text-[#f59e0b]">
                      <span className="material-symbols-outlined text-[20px]">
                        star
                      </span>
                      <span className="material-symbols-outlined text-[20px]">
                        star
                      </span>
                      <span className="material-symbols-outlined text-[20px]">
                        star
                      </span>
                      <span className="material-symbols-outlined text-[20px]">
                        star
                      </span>
                      <span className="material-symbols-outlined text-[20px]">
                        star
                      </span>
                    </div>
                    <span className="font-bold text-on-surface text-[15px]">
                      4.8 / 5.0
                    </span>
                    <span className="text-outline text-[13px]">•</span>
                    <span className="text-body-sm text-on-surface-variant font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-primary text-[17px]">
                        verified
                      </span>{" "}
                      Über 350+ verifizierte Google-Bewertungen
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg mb-space-xl">
                  <div className="bg-surface-container-lowest border border-surface-container-high/50 rounded-xl p-space-lg shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    <div className="space-y-space-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-0.5 text-[#f59e0b]">
                          <span className="material-symbols-outlined text-[18px]">
                            star
                          </span>
                          <span className="material-symbols-outlined text-[18px]">
                            star
                          </span>
                          <span className="material-symbols-outlined text-[18px]">
                            star
                          </span>
                          <span className="material-symbols-outlined text-[18px]">
                            star
                          </span>
                          <span className="material-symbols-outlined text-[18px]">
                            star
                          </span>
                        </div>
                        <span className="material-symbols-outlined text-surface-container-high text-[28px]">
                          format_quote
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface leading-relaxed italic">
                        "Ein echtes Highlight in Darmstadt! Das Sushi hat
                        erstklassige Frische wie in Düsseldorf, und die
                        Wok-Gerichte haben dieses authentische Wok-Hei-Aroma.
                        Absolut empfehlenswert."
                      </p>
                    </div>
                    <div className="pt-space-md border-t border-surface-container mt-space-md flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-[14px]">
                        MB
                      </div>
                      <div>
                        <div className="font-semibold text-on-surface text-[14px]">
                          Maximilien B.
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-outline">
                          <span className="material-symbols-outlined text-[13px] text-primary">
                            verified
                          </span>
                          <span className="">
                            Local Guide • Google Verifiziert
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-surface-container-lowest border border-surface-container-high/50 rounded-xl p-space-lg shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    <div className="space-y-space-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-0.5 text-[#f59e0b]">
                          <span className="material-symbols-outlined text-[18px]">
                            star
                          </span>
                          <span className="material-symbols-outlined text-[18px]">
                            star
                          </span>
                          <span className="material-symbols-outlined text-[18px]">
                            star
                          </span>
                          <span className="material-symbols-outlined text-[18px]">
                            star
                          </span>
                          <span className="material-symbols-outlined text-[18px]">
                            star
                          </span>
                        </div>
                        <span className="material-symbols-outlined text-surface-container-high text-[28px]">
                          format_quote
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface leading-relaxed italic">
                        "Wunderschönes botanisches Ambiente mit stimmungsvollem
                        Licht. Das Pad Thai und die Spicy Tuna Roll waren
                        perfekt zubereitet. Auch der Service war super
                        aufmerksam."
                      </p>
                    </div>
                    <div className="pt-space-md border-t border-surface-container mt-space-md flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-secondary/10 text-secondary font-bold flex items-center justify-center text-[14px]">
                        SL
                      </div>
                      <div>
                        <div className="font-semibold text-on-surface text-[14px]">
                          Sophie L.
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-outline">
                          <span className="material-symbols-outlined text-[13px] text-primary">
                            verified
                          </span>
                          <span className="">
                            Vor-Ort-Gast • Google Verifiziert
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-surface-container-lowest border border-surface-container-high/50 rounded-xl p-space-lg shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                    <div className="space-y-space-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-0.5 text-[#f59e0b]">
                          <span className="material-symbols-outlined text-[18px]">
                            star
                          </span>
                          <span className="material-symbols-outlined text-[18px]">
                            star
                          </span>
                          <span className="material-symbols-outlined text-[18px]">
                            star
                          </span>
                          <span className="material-symbols-outlined text-[18px]">
                            star
                          </span>
                          <span className="material-symbols-outlined text-[18px]">
                            star
                          </span>
                        </div>
                        <span className="material-symbols-outlined text-surface-container-high text-[28px]">
                          format_quote
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface leading-relaxed italic">
                        "Der knusprige Enten-Wok und die Trüffel Gyoza sind
                        unschlagbar. Schnelle Zubereitung bei Takeaway und beim
                        Vor-Ort-Essen fühlt man sich wie in einem modernen
                        Asia-Bistro in Berlin."
                      </p>
                    </div>
                    <div className="pt-space-md border-t border-surface-container mt-space-md flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-[14px]">
                        MK
                      </div>
                      <div>
                        <div className="font-semibold text-on-surface text-[14px]">
                          Markus K.
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-outline">
                          <span className="material-symbols-outlined text-[13px] text-primary">
                            verified
                          </span>
                          <span className="">Verifizierter Gast • Google</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <a
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container border border-surface-container-high text-on-surface hover:text-primary hover:bg-surface-container-lowest text-label-lg font-label-lg font-semibold shadow-xs transition-all"
                    href={settings?.mapLink || "https://maps.google.com/?q=Bessunger+Stra%C3%9Fe+91+64285+Darmstadt"}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="material-symbols-outlined text-primary text-[18px]">
                      star_half
                    </span>
                    <span className="">
                      Alle 350+ Bewertungen auf Google ansehen
                    </span>
                    <span className="material-symbols-outlined text-[16px]">
                      open_in_new
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <div className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-6 z-50 flex items-center gap-2 bg-surface-container-lowest/95 backdrop-blur-md p-2 rounded-full shadow-2xl border border-surface-container-high">
        <a
          className="flex items-center gap-2 bg-secondary hover:bg-on-secondary-fixed-variant text-on-secondary px-5 py-2.5 rounded-full font-label-lg text-label-lg shadow-md transition-all font-semibold"
          href="#menu"
        >
          <span className="material-symbols-outlined text-[20px]">
            shopping_bag
          </span>
          <span className="">Order Now</span>
        </a>
        <a
          className="flex items-center gap-2 bg-primary hover:bg-primary-container text-on-primary px-5 py-2.5 rounded-full font-label-lg text-label-lg shadow-md transition-all font-semibold"
          href="tel:+496151893420"
        >
          <span className="material-symbols-outlined text-[20px]">call</span>
          <span className="">Call &amp; Reserve</span>
        </a>
      </div>
      </>
  );
}