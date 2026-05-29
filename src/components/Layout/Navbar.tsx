import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Download, Cloud, Info } from 'lucide-react';
import { useSelection } from '../../context/SelectionContext';
import { formatSize } from '../../utils/formatSize';
import { downloadImages } from '../../utils/downloadImages';

const NavbarContainer = styled.nav`
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  @media (min-width: 768px) {
    padding: 1rem 2rem;
  }
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const NavLink = styled(Link)`
  font-weight: 500;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: color 0.2s;

  &:hover {
    color: var(--primary);
  }
`;

const SelectionHub = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--bg-color);
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  border: 1px solid var(--border);
`;

const Stat = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-main);
`;

const DownloadButton = styled.button<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--primary);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-weight: 600;
  font-size: 0.875rem;
  transition: background-color 0.2s, transform 0.1s;
  opacity: \${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: \${({ disabled }) => (disabled ? 'none' : 'auto')};

  &:hover {
    background-color: var(--primary-hover);
    transform: translateY(-1px);
  }
`;

export const Navbar: React.FC = () => {
  const { selectedPets, totalSize } = useSelection();
  const [downloading, setDownloading] = React.useState(false);

  const handleDownload = async () => {
    if (selectedPets.size === 0) return;
    setDownloading(true);
    await downloadImages(Array.from(selectedPets.values()));
    setDownloading(false);
  };

  return (
    <NavbarContainer>
      <Logo to="/">
        <Cloud size={24} />
        PetBrowser
      </Logo>

      <NavLinks>
        <NavLink to="/about">
          <Info size={18} />
          About
        </NavLink>
        <SelectionHub>
          <Stat>{selectedPets.size} Selected</Stat>
          <Stat>~{formatSize(totalSize)}</Stat>
          <DownloadButton 
            onClick={handleDownload} 
            disabled={selectedPets.size === 0 || downloading}
          >
            <Download size={16} />
            {downloading ? 'Downloading...' : 'Download'}
          </DownloadButton>
        </SelectionHub>
      </NavLinks>
    </NavbarContainer>
  );
};
