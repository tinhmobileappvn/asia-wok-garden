"use client";

import React, { useState, useEffect } from "react";
import MenuCard from "@/components/MenuCard";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function HomeMenuPreview({ allItems, categories }: { allItems: any[], categories: any[] }) {
  const [activeTab, setActiveTab] = useState("");
  const { t } = useLanguage();

  useEffect(() => {
    if (categories && categories.length > 0 && !activeTab) {
      setActiveTab(categories[0].name?.EN || categories[0].name);
    }
  }, [categories, activeTab]);

  const getFilteredItems = () => {
    if (!activeTab) return [];
    const filtered = allItems.filter((i) => i.category === activeTab);
    return filtered
      .sort((a, b) => (b.image ? 1 : 0) - (a.image ? 1 : 0))
      .slice(0, 8); // Still max 8 items per category preview
  };

  const filteredItems = getFilteredItems();

  if (!categories || categories.length === 0) {
    return (
      <div className="text-center text-on-surface-variant py-12 italic bg-surface-container-lowest rounded-xl border border-outline-variant">
        No categories selected for the homepage.
        <br/>Please go to Admin &gt; Categories and check "Show on Homepage".
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-space-xs mb-space-2xl">
        {categories.map((cat) => {
          const val = cat.name?.EN || cat.name;
          return (
          <button
            key={val}
            onClick={() => setActiveTab(val)}
            className={`px-space-md py-2 rounded-full font-label-lg text-label-lg shadow-sm font-semibold transition-colors flex items-center gap-2 ${
              activeTab === val
                ? "bg-primary text-on-primary"
                : "bg-surface-container-lowest text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
            }`}
            type="button"
          >
            {t(cat.name)}
          </button>
        )})}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg mb-12">
        {filteredItems.map((item: any) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>

      <div className="flex justify-center">
        <Link
          href="/menu"
          className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-on-secondary-fixed-variant text-on-secondary font-label-lg text-label-lg px-8 py-4 rounded-full shadow-lg transition-all hover:-translate-y-1"
        >
          <span className="material-symbols-outlined">menu_book</span>
          View Complete Menu
        </Link>
      </div>
    </>
  );
}
