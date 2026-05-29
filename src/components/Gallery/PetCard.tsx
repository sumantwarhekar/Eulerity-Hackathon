import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Pet } from '../../types';
import { slugify } from '../../utils/slugify';
import { Check } from 'lucide-react';

interface PetCardProps {
  pet: Pet;
  isSelected: boolean;
  onToggleSelect: (pet: Pet) => void;
}

const CardContainer = styled.div<{ $selected: boolean }>`
  position: relative;
  background: var(--card-bg);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border 0.2s ease;
  border: 2px solid ${({ $selected }) => ($selected ? 'var(--primary)' : 'transparent')};
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${CardContainer}:hover & {
    transform: scale(1.05);
  }
`;

const CheckboxContainer = styled.div<{ $selected: boolean }>`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: ${({ $selected }) => ($selected ? 'var(--primary)' : 'rgba(255,255,255,0.8)')};
  border: 2px solid ${({ $selected }) => ($selected ? 'var(--primary)' : 'var(--border)')};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.2s ease;
  z-index: 10;
  backdrop-filter: blur(4px);

  &:hover {
    background: ${({ $selected }) => ($selected ? 'var(--primary)' : 'white')};
    transform: scale(1.1);
  }
`;

const Content = styled.div`
  padding: 1.25rem;
`;

const Title = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-main);
  margin-bottom: 0.5rem;
`;

const Description = styled.p`
  font-size: 0.875rem;
  color: var(--text-muted);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const PetCard: React.FC<PetCardProps> = ({ pet, isSelected, onToggleSelect }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/pets/${slugify(pet.title)}`);
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    onToggleSelect(pet);
  };

  return (
    <CardContainer $selected={isSelected} onClick={handleCardClick}>
      <ImageContainer>
        <Image src={pet.url} alt={pet.title} loading="lazy" />
        <CheckboxContainer $selected={isSelected} onClick={handleCheckboxClick}>
          {isSelected && <Check size={16} strokeWidth={3} />}
        </CheckboxContainer>
      </ImageContainer>
      <Content>
        <Title>{pet.title}</Title>
        <Description>{pet.description}</Description>
      </Content>
    </CardContainer>
  );
};
