"use client";
import React, { createContext, useContext, useState } from 'react';

type AdminContextType = {
  adminLang: 'EN' | 'DE';
  setAdminLang: (lang: 'EN' | 'DE') => void;
};

const AdminContext = createContext<AdminContextType>({
  adminLang: 'EN',
  setAdminLang: () => {},
});

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [adminLang, setAdminLang] = useState<'EN' | 'DE'>('EN');

  return (
    <AdminContext.Provider value={{ adminLang, setAdminLang }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
