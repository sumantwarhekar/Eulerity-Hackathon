import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { Pet } from '../../types';
import { PetCard } from './PetCard';
import { useSelection } from '../../context/SelectionContext';

interface GalleryGridProps {
  pets: Pet[];
}

const GridContainer = styled.div`
  display: grid;
  gap: 1rem;
  padding: 1rem;
  
  /* Responsive constraints */
  grid-template-columns: 1fr; /* Mobile: 1 column */
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* Tablet: 2 columns */
    gap: 2rem;
    padding: 2rem;
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr); /* Desktop: 4 columns */
  }
`;

const ObserverTarget = styled.div`
  height: 20px;
  width: 100%;
`;

const ITEMS_PER_PAGE = 8;

export const GalleryGrid: React.FC<GalleryGridProps> = ({ pets }) => {
  const { selectedPets, toggleSelection } = useSelection();
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [pets]);
  
  const observerTarget = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();
      if (node) {
        observer.current = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, pets.length));
            }
          },
          { threshold: 0.1 }
        );
        observer.current.observe(node);
      }
    },
    [pets.length]
  );

  const visiblePets = pets.slice(0, visibleCount);

  if (pets.length === 0) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        No pets found matching your criteria.
      </div>
    );
  }

  return (
    <>
      <GridContainer>
        {visiblePets.map((pet) => (
          <PetCard
            key={pet.title}
            pet={pet}
            isSelected={selectedPets.has(pet.title)}
            onToggleSelect={toggleSelection}
          />
        ))}
      </GridContainer>
      {visibleCount < pets.length && <ObserverTarget ref={observerTarget} />}
    </>
  );
};
