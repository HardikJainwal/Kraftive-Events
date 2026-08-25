'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface EventModalContextType {
  isOpen: boolean;
  selectedService: string;
  openPlanModal: (serviceName?: string) => void;
  closePlanModal: () => void;
}

const EventModalContext = createContext<EventModalContextType | undefined>(undefined);

export function EventModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  // 7-second auto popup on landing page initial visit
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if auto popup has already run during this session
    const hasTriggered = sessionStorage.getItem('kraftive_plan_modal_auto_triggered');

    if (!hasTriggered) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('kraftive_plan_modal_auto_triggered', 'true');
      }, 7000);

      return () => clearTimeout(timer);
    }
  }, []);

  const openPlanModal = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    } else {
      setSelectedService('');
    }
    setIsOpen(true);
  };

  const closePlanModal = () => {
    setIsOpen(false);
  };

  return (
    <EventModalContext.Provider
      value={{
        isOpen,
        selectedService,
        openPlanModal,
        closePlanModal,
      }}
    >
      {children}
    </EventModalContext.Provider>
  );
}

export function useEventModal() {
  const context = useContext(EventModalContext);
  if (!context) {
    throw new Error('useEventModal must be used within an EventModalProvider');
  }
  return context;
}
