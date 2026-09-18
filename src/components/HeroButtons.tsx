"use client";
import React from 'react';
import { useOrder } from '@/context/OrderContext';

export default function HeroButtons() {
  const { openOrder } = useOrder();
  return (
    <div className="flex flex-wrap items-center gap-space-md">
      <button 
        onClick={() => openOrder('delivery')}
        className="inline-flex items-center justify-center gap-space-xs bg-secondary hover:bg-on-secondary-fixed-variant text-on-secondary font-label-lg text-label-lg px-space-xl py-3 rounded shadow-lg transition-all"
      >
        <span className="material-symbols-outlined text-[20px]">moped</span>
        <span className="">Delivery</span>
      </button>
      <button 
        onClick={() => openOrder('pickup')}
        className="inline-flex items-center justify-center gap-space-xs bg-surface-container-lowest/15 backdrop-blur-md border-2 border-surface-container-lowest text-surface-container-lowest hover:bg-surface-container-lowest hover:text-on-surface font-label-lg text-label-lg px-space-xl py-3 rounded shadow-sm transition-all"
      >
        <span className="material-symbols-outlined text-[20px]">takeout_dining</span>
        <span className="">Pickup</span>
      </button>
      <div className="flex items-center gap-2 bg-inverse-surface/80 backdrop-blur-md px-3 py-2 rounded-full border border-surface-container-high/20 text-surface-container-high text-body-sm">
        <span className="material-symbols-outlined text-primary-fixed text-[20px]">verified</span>
        <span className="font-medium">Bessunger Str. 91, Darmstadt</span>
      </div>
    </div>
  );
}
