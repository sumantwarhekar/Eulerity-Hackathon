import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { usePets } from '../context/PetsContext';
import { useSelection } from '../context/SelectionContext';
import { Toolbar } from '../components/Controls/Toolbar';
import { GalleryGrid } from '../components/Gallery/GalleryGrid';
import { SortOption } from '../types';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.main`
  flex: 1;
`;

const MessageState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
  font-size: 1.25rem;
  color: var(--text-muted);
`;

export const Home: React.FC = () => {
  const { pets, loading, error, empty } = usePets();
  const { selectAll, clearSelection } = useSelection();

  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('name-asc');

  const filteredAndSortedPets = useMemo(() => {
    let result = [...pets];

    // Filter
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(
        (pet) =>
          pet.title.toLowerCase().includes(lowerQuery) ||
          pet.description.toLowerCase().includes(lowerQuery)
      );
    }

    // Sort
    result.sort((a, b) => {
      if (sortOption === 'name-asc') {
        return a.title.localeCompare(b.title);
      }
      if (sortOption === 'name-desc') {
        return b.title.localeCompare(a.title);
      }
      if (sortOption === 'date-new' || sortOption === 'date-old') {
        const timeA = new Date(a.created).getTime();
        const timeB = new Date(b.created).getTime();
        
        if (sortOption === 'date-new') {
          return timeB - timeA;
        } else {
          return timeA - timeB;
        }
      }
      return 0;
    });

    return result;
  }, [pets, searchQuery, sortOption]);

  const handleSelectAll = () => {
    selectAll(filteredAndSortedPets);
  };

  if (loading) {
    return <MessageState>Loading amazing pets...</MessageState>;
  }

  if (error) {
    return <MessageState style={{ color: 'var(--danger)' }}>Error: {error}</MessageState>;
  }

  if (empty) {
    return <MessageState>No pets found from the API.</MessageState>;
  }

  return (
    <HomeContainer>
      <Toolbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortOption={sortOption}
        setSortOption={setSortOption}
        onSelectAll={handleSelectAll}
        onClearSelection={clearSelection}
      />
      <Content>
        <GalleryGrid pets={filteredAndSortedPets} />
      </Content>
    </HomeContainer>
  );
};
