import React from 'react';
import styled from 'styled-components';
import { Search, CheckSquare, XSquare } from 'lucide-react';
import { SortOption } from '../../types';

interface ToolbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  onSelectAll: () => void;
  onClearSelection: () => void;
}

const ToolbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-bottom: 1px solid var(--border);

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  flex: 1;
  width: 100%;
  
  @media (min-width: 768px) {
    max-width: 400px;
  }

  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-muted);
  }

  input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    border: 1px solid var(--border);
    border-radius: 8px;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;

    &:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    }
  }
`;

const ActionsWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
`;

const Select = styled.select`
  padding: 0.75rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background-color: white;
  font-size: 0.875rem;
  outline: none;
  cursor: pointer;

  &:focus {
    border-color: var(--primary);
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background-color: white;
  color: var(--text-main);
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background-color: var(--bg-color);
    border-color: var(--text-muted);
  }
`;

export const Toolbar: React.FC<ToolbarProps> = ({
  searchQuery,
  setSearchQuery,
  sortOption,
  setSortOption,
  onSelectAll,
  onClearSelection,
}) => {
  return (
    <ToolbarContainer>
      <SearchWrapper>
        <Search size={18} />
        <input
          type="text"
          placeholder="Search by title or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchWrapper>
      <ActionsWrapper>
        <Select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value as SortOption)}
        >
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
          <option value="date-new">Date (Newest First)</option>
          <option value="date-old">Date (Oldest First)</option>
        </Select>
        <ActionButton onClick={onSelectAll}>
          <CheckSquare size={16} />
          Select All
        </ActionButton>
        <ActionButton onClick={onClearSelection}>
          <XSquare size={16} />
          Clear
        </ActionButton>
      </ActionsWrapper>
    </ToolbarContainer>
  );
};
