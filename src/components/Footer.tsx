"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useOrder } from "@/context/OrderContext";
import { useSettings } from "@/context/SettingsContext";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { openOrder } = useOrder();
  const settings = useSettings();
  const pathname = usePathname();
  const { t } = useLanguage();

  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-6 z-50 flex items-center gap-2 bg-surface-container-lowest/95 backdrop-blur-md p-2 rounded-full shadow-2xl border border-surface-container-high">
        <button
          onClick={() => openOrder("delivery")}
          className="flex items-center gap-2 bg-secondary hover:bg-on-secondary-fixed-variant text-on-secondary px-5 py-2.5 rounded-full font-label-lg text-label-lg shadow-md transition-all font-semibold"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
          <span className="">Order Now</span>
        </button>
        <a
          className="flex items-center gap-2 bg-primary hover:bg-primary-container text-on-primary px-5 py-2.5 rounded-full font-label-lg text-label-lg shadow-md transition-all font-semibold"
          href={`tel:${settings?.phone?.replace(/\s/g, "")}`}
        >
          <span className="material-symbols-outlined text-[20px]">call</span>
          <span className="">Call & Reserve</span>
        </a>
      </div>
      <footer className="w-full bg-surface-container-low">
        <div
          className="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop pt-space-3xl pb-space-4xl"
          id="location"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-space-xl">
            <div className="space-y-space-md">
              <div className="flex items-center gap-2">
                <Image
                  src={settings?.logo || "/images/logo.png"}
                  alt="Wok Garden Darmstadt Logo"
                  className="h-12 w-auto object-contain"
                  width={200}
                  height={48}
                />
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed whitespace-pre-line">
                {t(settings?.footerText) || "Premium Asian dining in Darmstadt."}
              </p>
              <div className="flex items-center gap-3 pt-space-xs">
                {settings?.instagram && (
                  <a
                    className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:text-secondary hover:bg-surface-container-high transition-colors shadow-xs"
                    href={settings.instagram}
                    rel="noopener noreferrer"
                    target="_blank"
                    title="Instagram"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      photo_camera
                    </span>
                  </a>
                )}
                {settings?.facebook && (
                  <a
                    className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:text-primary hover:bg-surface-container-high transition-colors shadow-xs"
                    href={settings.facebook}
                    rel="noopener noreferrer"
                    target="_blank"
                    title="Facebook"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      thumb_up
                    </span>
                  </a>
                )}
              </div>
            </div>
            <div className="space-y-space-sm">
              <h4 className="font-headline-sm text-headline-sm text-on-surface">
                Address & Contact
              </h4>
              <address className="not-italic font-body-sm text-body-sm text-on-surface-variant space-y-1 whitespace-pre-line">
                {settings?.address || "Bessunger Straße 91\n64285 Darmstadt\nDeutschland"}
              </address>
              <div className="pt-2 space-y-1 font-body-sm text-body-sm">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[18px]">
                    call
                  </span>
                  <a
                    className="text-on-surface hover:text-primary font-semibold transition-colors"
                    href={`tel:${settings?.phone?.replace(/\s/g, "")}`}
                  >
                    {settings?.phone || "+49 6151 893420"}
                  </a>
                </div>
              </div>
              <div className="pt-space-2xs">
                <a
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-container text-on-primary font-label-sm text-label-sm px-4 py-2 rounded shadow-sm transition-all"
                  href={settings?.mapLink || "https://maps.google.com/?q=Bessunger+Straße+91+64285+Darmstadt"}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    map
                  </span>
                  <span className="">Get Directions</span>
                </a>
              </div>
            </div>
            <div className="space-y-space-sm">
              <h4 className="font-headline-sm text-headline-sm text-on-surface">
                Opening Hours
              </h4>
              <div className="space-y-2 font-body-sm text-body-sm text-on-surface-variant">
                <div className="flex justify-between border-b border-surface-container pb-1">
                  <span className="">Di – So:</span>
                  <span className="font-medium text-on-surface">
                    11:30 – 15:00 & 17:30 – 22:30
                  </span>
                </div>
                <div className="flex justify-between text-secondary font-medium">
                  <span className="">Montag:</span>
                  <span className="">Ruhetag</span>
                </div>
              </div>
              <div className="pt-2 text-[12px] text-outline">
                Dine in, Takeaway Pickup & Home Delivery available.
              </div>
            </div>
            <div className="space-y-space-sm">
              <h4 className="font-headline-sm text-headline-sm text-on-surface">
                Navigation
              </h4>
              <ul className="space-y-space-xs font-body-sm text-body-sm">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  <Link
                    className="text-on-surface-variant hover:text-primary transition-colors"
                    href="/menu"
                  >
                    Full Menu
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  <Link
                    className="text-on-surface-variant hover:text-primary transition-colors"
                    href="/#signature-dishes"
                  >
                    Signature Dishes
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  <Link
                    className="text-on-surface-variant hover:text-primary transition-colors"
                    href="/ambiance"
                  >
                    Ambiance & Reviews
                  </Link>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  <Link
                    className="text-secondary font-semibold hover:underline transition-colors"
                    href="/location"
                  >
                    Location & Hours
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-space-2xl pt-space-lg border-t border-surface-container flex flex-col md:flex-row items-center justify-between gap-space-sm font-label-sm text-label-sm text-on-surface-variant">
            <p className="">
              © 2025 Asia Wok Garden Darmstadt. All rights reserved.
            </p>
            <p className="text-outline">
              Fresh Sushi & Authentic Wok Specialties
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
