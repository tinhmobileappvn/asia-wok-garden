import Image from "next/image";
import React from "react";
import MenuCard from "@/components/MenuCard";
import Trans from "@/components/Trans";
import { getMenu, getSettings } from "@/lib/db";

export default async function Page() {
  const menuItems: any = await getMenu();
  const settings: any = await getSettings();
  const categoryOrder = settings.categoryOrder || [];

  // Group by category
  const groupedMenu = menuItems.reduce((acc: any, item: any) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});
  
  const sortedCategories = Object.keys(groupedMenu).sort((a, b) => {
      const idxA = categoryOrder.indexOf(a);
      const idxB = categoryOrder.indexOf(b);
      if (idxA === -1 && idxB === -1) return a.localeCompare(b);
      if (idxA === -1) return 1;
      if (idxB === -1) return -1;
      return idxA - idxB;
  });

  return (
    <>
      <main className="w-full pt-20 bg-surface">
        <div className="flex flex-col w-full">
          <section className="relative w-full overflow-hidden -mt-20 pt-32 pb-24">
            <div 
              className="absolute inset-0 z-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/images/menu-bg.jpg')" }}
            ></div>
            <div className="absolute inset-0 z-0 bg-black/60 backdrop-blur-sm"></div>
            <div className="relative z-10 max-w-[1280px] mx-auto px-gutter-desktop text-center py-12">
              <h1 className="font-display-lg text-display-lg text-white mb-4 shadow-sm">
                Our Menu
              </h1>
              <p className="font-body-lg text-body-lg text-white/90 max-w-2xl mx-auto shadow-sm">
                From flaming woks bringing pure Asian flavors. All dishes are prepared with the freshest ingredients.
              </p>
            </div>
          </section>

          <section className="w-full py-16">
            <div className="max-w-[1280px] mx-auto px-gutter-desktop">
              {sortedCategories.map((category) => {
                const categoryObj = settings.categories?.find((c: any) => (c.name?.EN || c.name) === category);
                const titleToDisplay = categoryObj ? categoryObj.name : category;
                return (
                  <div key={category} className="mb-16">
                    <h2 className="font-headline-lg text-headline-lg text-primary border-b border-primary/20 pb-2 mb-8 uppercase tracking-wider">
                      <Trans content={titleToDisplay} />
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {groupedMenu[category].map((item: any) => (
                      <MenuCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
