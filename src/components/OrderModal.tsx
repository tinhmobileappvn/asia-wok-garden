"use client";
import React from 'react';
import { useOrder } from '@/context/OrderContext';
import Image from 'next/image';

const PROVIDERS = {
  delivery: [
    { name: 'Wolt', url: 'https://wolt.com/en/deu/darmstadt/restaurant/asia-wok-garden', cost: 'Có thể phát sinh chi phí', time: '25 – 40 phút', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Wolt_logo_2020.svg/200px-Wolt_logo_2020.svg.png' },
    { name: 'UberEats', url: 'https://www.ubereats.com/', cost: 'Có thể phát sinh chi phí', time: '18 – 28 phút', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Uber_Eats_2020_logo.svg/512px-Uber_Eats_2020_logo.svg.png' },
    { name: 'Lieferando.de', url: 'https://www.lieferando.de/speisekarte/asia-wok-garden-darmstadt', cost: 'Có thể phát sinh chi phí', time: '20 – 40 phút', logo: 'https://images.crunchbase.com/image/upload/c_pad,f_auto,q_auto:eco,dpr_1/v1407338302/z4i1h5sllqtzsypokjls.png' }
  ],
  pickup: [
    { name: 'Wolt (Tự đến lấy)', url: 'https://wolt.com/en/deu/darmstadt/restaurant/asia-wok-garden', cost: 'Miễn phí lấy hàng', time: '15 – 20 phút', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Wolt_logo_2020.svg/200px-Wolt_logo_2020.svg.png' },
    { name: 'Lieferando.de (Pickup)', url: 'https://www.lieferando.de/speisekarte/asia-wok-garden-darmstadt', cost: 'Miễn phí lấy hàng', time: '15 – 25 phút', logo: 'https://images.crunchbase.com/image/upload/c_pad,f_auto,q_auto:eco,dpr_1/v1407338302/z4i1h5sllqtzsypokjls.png' }
  ]
};

export default function OrderModal() {
  const { isOpen, orderType, openOrder, closeOrder } = useOrder();
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={closeOrder}></div>
      
      <div className="bg-[#202124] text-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-white/10 relative flex flex-col z-10">
        {/* Header */}
        <div className="p-4 flex items-start justify-between border-b border-white/10">
          <div>
            <h2 className="text-xl font-medium text-white mb-1">Đặt qua mạng</h2>
            <p className="text-sm text-gray-400">Asia - Wok - Garden</p>
          </div>
          <button onClick={closeOrder} className="p-2 text-gray-400 hover:text-white rounded-full bg-white/5 transition-colors">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        
        {/* Tabs */}
        <div className="p-4 flex items-center gap-3 border-b border-white/10">
          <button 
            onClick={() => openOrder('pickup')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${orderType === 'pickup' ? 'bg-[#3b82f6] text-white flex items-center gap-1' : 'border border-white/20 text-gray-300 hover:bg-white/5'}`}
          >
            {orderType === 'pickup' && <span className="material-symbols-outlined text-[16px]">close</span>} Tự đến lấy
          </button>
          <button 
            onClick={() => openOrder('delivery')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${orderType === 'delivery' ? 'bg-[#3b82f6] text-white flex items-center gap-1' : 'border border-white/20 text-gray-300 hover:bg-white/5'}`}
          >
            {orderType === 'delivery' && <span className="material-symbols-outlined text-[16px]">close</span>} Giao tận nơi
          </button>
        </div>
        
        {/* Content */}
        <div className="p-4 bg-[#202124]">
          <div className="flex items-center justify-between text-gray-400 text-sm mb-3">
            <span>Đặt đồ ăn với:</span>
            <span className="material-symbols-outlined text-[18px]">info</span>
          </div>
          
          <div className="flex flex-col">
            {PROVIDERS[orderType].map((provider, idx) => (
              <a 
                key={idx} 
                href={provider.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 py-4 border-b border-white/10 last:border-0 hover:bg-white/5 transition-colors px-2 -mx-2 rounded-lg"
              >
                <div className="w-10 h-10 rounded-full bg-white overflow-hidden flex items-center justify-center p-1 shrink-0">
                  <Image src={provider.logo} alt={provider.name} width={40} height={40} className="object-contain" unoptimized />
                </div>
                <div className="flex-1">
                  <div className="text-white font-medium text-base mb-1">{provider.name}</div>
                  <div className="text-gray-400 text-sm">{provider.cost}</div>
                  <div className="text-gray-400 text-sm">{orderType === 'delivery' ? `Giao hàng trong vòng ${provider.time}` : `Sẵn sàng trong vòng ${provider.time}`}</div>
                </div>
                <span className="material-symbols-outlined text-gray-400">chevron_right</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
