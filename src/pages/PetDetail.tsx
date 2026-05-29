import React from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Download } from 'lucide-react';
import { usePets } from '../context/PetsContext';
import { useSelection } from '../context/SelectionContext';
import { slugify } from '../utils/slugify';
import { downloadImages } from '../utils/downloadImages';

const DetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-muted);
  margin-bottom: 2rem;
  transition: color 0.2s;

  &:hover {
    color: var(--primary);
  }
`;

const ContentGrid = styled.div`
  display: grid;
  gap: 3rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const ImageWrapper = styled.div`
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const InfoPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-main);
`;

const Description = styled.p`
  font-size: 1.125rem;
  color: var(--text-muted);
  line-height: 1.6;
`;

const Meta = styled.div`
  font-size: 0.875rem;
  color: var(--text-muted);
  padding: 1rem;
  background: var(--bg-color);
  border-radius: 8px;
  border: 1px solid var(--border);
`;

const Actions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const ActionButton = styled.button<{ $primary?: boolean; $selected?: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.2s;
  
  ${({ $primary, $selected }) => {
    if ($primary) {
      return `
        background: var(--primary);
        color: white;
        &:hover { background: var(--primary-hover); transform: translateY(-2px); }
      `;
    }
    if ($selected) {
      return `
        background: var(--bg-color);
        border: 2px solid var(--primary);
        color: var(--primary);
        &:hover { background: white; transform: translateY(-2px); }
      `;
    }
    return `
      background: white;
      border: 2px solid var(--border);
      color: var(--text-main);
      &:hover { border-color: var(--primary); transform: translateY(-2px); }
    `;
  }}
`;

export const PetDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { pets, loading } = usePets();
  const { selectedPets, toggleSelection } = useSelection();

  if (loading) return null;

  const pet = pets.find(p => slugify(p.title) === slug);

  if (!pet) {
    return (
      <DetailContainer>
        <BackButton onClick={() => navigate('/')}><ArrowLeft size={20} /> Back to Gallery</BackButton>
        <h2>Pet not found.</h2>
      </DetailContainer>
    );
  }

  const isSelected = selectedPets.has(pet.title);
  const highResUrl = pet.url.replace('?format=tiny', '');
  const dateObj = new Date(pet.created);

  return (
    <DetailContainer>
      <BackButton onClick={() => navigate('/')}>
        <ArrowLeft size={20} /> Back to Gallery
      </BackButton>
      
      <ContentGrid>
        <ImageWrapper>
          <Image src={highResUrl} alt={pet.title} />
        </ImageWrapper>
        
        <InfoPanel>
          <div>
            <Title>{pet.title}</Title>
          </div>
          
          <Description>{pet.description}</Description>
          
          <Meta>
            <strong>Added to Eulerity:</strong> {dateObj.toLocaleDateString()} at {dateObj.toLocaleTimeString()}
          </Meta>

          <Actions>
            <ActionButton 
              $selected={isSelected} 
              onClick={() => toggleSelection(pet)}
            >
              <Check size={20} />
              {isSelected ? 'Selected' : 'Select'}
            </ActionButton>
            
            <ActionButton 
              $primary 
              onClick={() => downloadImages([pet])}
            >
              <Download size={20} />
              Download
            </ActionButton>
          </Actions>
        </InfoPanel>
      </ContentGrid>
    </DetailContainer>
  );
};
