import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Pet } from '../types';

export const downloadImages = async (selectedPets: Pet[]) => {
  if (selectedPets.length === 0) return;

  const zip = new JSZip();

  // Show some loading state via a callback if needed in the future

  const promises = selectedPets.map(async (pet) => {
    try {
      const highResUrl = pet.url.replace('?format=tiny', '');
      const response = await fetch(highResUrl);
      if (!response.ok) throw new Error(`Failed to fetch ${pet.title}`);
      
      const blob = await response.blob();
      
      // Determine extension from content-type or URL
      const contentType = response.headers.get('content-type');
      let extension = 'jpg';
      if (contentType) {
        if (contentType.includes('png')) extension = 'png';
        if (contentType.includes('gif')) extension = 'gif';
        if (contentType.includes('webp')) extension = 'webp';
      }
      
      const safeFilename = pet.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      zip.file(`${safeFilename}.${extension}`, blob);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  });

  await Promise.all(promises);

  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, 'eulerity-pets.zip');
};
