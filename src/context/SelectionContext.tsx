import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Pet } from '../types';

interface SelectionContextType {
  selectedPets: Map<string, Pet>;
  toggleSelection: (pet: Pet) => void;
  selectAll: (pets: Pet[]) => void;
  clearSelection: () => void;
  totalSize: number;
}

const SelectionContext = createContext<SelectionContextType | undefined>(undefined);

const AVERAGE_FILE_SIZE = 200 * 1024; // 200 KB fallback

export const SelectionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedPets, setSelectedPets] = useState<Map<string, Pet>>(new Map());
  const [sizes, setSizes] = useState<Record<string, number>>({});

  const fetchSize = async (pet: Pet) => {
    if (sizes[pet.title]) return; 
    
    try {
      const highResUrl = pet.url.replace('?format=tiny', '');
      const response = await fetch(highResUrl, { method: 'HEAD' });
      const contentLength = response.headers.get('content-length');
      
      const size = contentLength ? parseInt(contentLength, 10) : AVERAGE_FILE_SIZE;
      
      setSizes(prev => ({ ...prev, [pet.title]: size }));
    } catch (e) {
      setSizes(prev => ({ ...prev, [pet.title]: AVERAGE_FILE_SIZE }));
    }
  };

  const toggleSelection = (pet: Pet) => {
    setSelectedPets(prev => {
      const next = new Map(prev);
      if (next.has(pet.title)) {
        next.delete(pet.title);
      } else {
        next.set(pet.title, pet);
        fetchSize(pet); 
      }
      return next;
    });
  };

  const selectAll = (pets: Pet[]) => {
    const newSelection = new Map<string, Pet>();
    pets.forEach(pet => {
      newSelection.set(pet.title, pet);
      fetchSize(pet); 
    });
    setSelectedPets(newSelection);
  };

  const clearSelection = () => {
    setSelectedPets(new Map());
  };

  const totalSize = Array.from(selectedPets.keys()).reduce((acc, title) => {
    return acc + (sizes[title] || AVERAGE_FILE_SIZE);
  }, 0);

  return (
    <SelectionContext.Provider
      value={{ selectedPets, toggleSelection, selectAll, clearSelection, totalSize }}
    >
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelection = () => {
  const context = useContext(SelectionContext);
  if (context === undefined) {
    throw new Error('useSelection must be used within a SelectionProvider');
  }
  return context;
};
