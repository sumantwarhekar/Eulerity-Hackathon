import React, { createContext, useContext, ReactNode } from 'react';
import { usePetsData } from '../hooks/usePetsData';
import { Pet } from '../types';

interface PetsContextType {
  pets: Pet[];
  loading: boolean;
  error: string | null;
  empty: boolean;
}

const PetsContext = createContext<PetsContextType | undefined>(undefined);

export const PetsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { data: pets, loading, error, empty } = usePetsData();

  return (
    <PetsContext.Provider value={{ pets, loading, error, empty }}>
      {children}
    </PetsContext.Provider>
  );
};

export const usePets = () => {
  const context = useContext(PetsContext);
  if (context === undefined) {
    throw new Error('usePets must be used within a PetsProvider');
  }
  return context;
};
