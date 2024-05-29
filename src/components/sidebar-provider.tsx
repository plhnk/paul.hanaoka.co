'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Create the context
interface SidebarContextProps {
  collapsed: boolean;
  toggleCollapse: () => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebarContext must be used within a SidebarProvider');
  }
  return context;
};

// Create a provider component
interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(prevCollapsed => !prevCollapsed);
  };

  return (
    <SidebarContext.Provider value={{ collapsed, toggleCollapse }}>
      {children}
    </SidebarContext.Provider>
  );
};
