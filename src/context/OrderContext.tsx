"use client";
import React, { createContext, useContext, useState } from 'react';

type OrderType = 'delivery' | 'pickup';

interface OrderContextType {
  isOpen: boolean;
  orderType: OrderType;
  openOrder: (type: OrderType) => void;
  closeOrder: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [orderType, setOrderType] = useState<OrderType>('delivery');

  const openOrder = (type: OrderType) => {
    setOrderType(type);
    setIsOpen(true);
  };

  const closeOrder = () => setIsOpen(false);

  return (
    <OrderContext.Provider value={{ isOpen, orderType, openOrder, closeOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrder must be used within OrderProvider');
  return context;
}
