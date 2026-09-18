"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext<any>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<any>({
    logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcEsCBF9_Jip9ym7C04VIeMwxgCo1FFNyBX4Bid0IXu6KxCcd6FqN4z2T9kZUpMnjI4HXdJL_g97sZILF1TbB9UfF9GZHhwp7N_cPiiJfIV5X-Xg_9elqzAoLhtjOQGF6UakKnVmggyQEySLFvjsEaUuGErvfix7uhz3gBdfMoAp1_sSuY5P-Bx0AuI20ajmF2KHRl3K7mnKkxO57eMSytwvv8GSfIegAVpGfrmfUL3srl-IMlm2Lw0B_Va18vWFLuxg',
    footerText: 'Authentic Asian cuisine in Darmstadt. Order online for delivery or pickup.',
    phone: '+49 6151 6086915',
    address: 'Bessunger Straße 91, 64285 Darmstadt',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=Asia+Wok+Garden+Bessunger+Straße+91+64285+Darmstadt',
    heroBgImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDW6YTWhBztnKhSL47EhDi37XUUPfOa1VpAReX3hOZ-ZmRF0evK0HJ4ofmHVXnlBmFMClaMctBtH6OZW4UXaaYrNPVFL1s52rgHaJFnUwT5LyNxklwjhpmRghm97h3_hIvsNSfHxm5q8v10k45pl8vfIwL6DjgaogzNT--jX-qrLJ6J54bbiJplJOrhNKOtOa7xZWyMN2SEaZm0i6xIrYPtgiaOOKtjFJ80KYP4PAk4Keeh_92B5o7x',
    heroTitle: 'Lửa Wok Rực Cháy,\nTrọn Vị Á Châu.',
    heroSubtitle: 'Thưởng thức nghệ thuật ẩm thực Chảo Lửa truyền thống và Sushi tươi sống trong không gian vườn thực vật độc đáo giữa lòng Darmstadt.',
    openingHours: {
      monday: '11:00 - 22:30',
      tuesday: '11:00 - 22:30',
      wednesday: '11:00 - 22:30',
      thursday: '11:00 - 22:30',
      friday: '11:00 - 23:00',
      saturday: '12:00 - 23:00',
      sunday: '12:00 - 22:30'
    },
  });

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (!data.error) setSettings(data);
      })
      .catch(console.error);
  }, []);

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
