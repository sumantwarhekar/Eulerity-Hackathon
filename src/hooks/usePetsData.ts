import { useState, useEffect } from 'react';
import { Pet } from '../types';

interface UsePetsDataReturn {
  data: Pet[];
  loading: boolean;
  error: string | null;
  empty: boolean;
}

const PETS_API_URL = 'https://eulerity-hackathon.appspot.com/pets';

export const usePetsData = (): UsePetsDataReturn => {
  const [data, setData] = useState<Pet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(PETS_API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const json = await response.json();
        if (Array.isArray(json)) {
          setData(json);
        } else {
          throw new Error('API did not return an array');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch pets data');
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  return {
    data,
    loading,
    error,
    empty: !loading && !error && data.length === 0,
  };
};
