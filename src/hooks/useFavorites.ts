import { useState, useEffect } from 'react';
import { Producto } from '../types';

const useFavorites = () => {
  const [favorites, setFavorites] = useState<Producto[]>([]);
  const [isInitialized, setIsInitialized] = useState(false); 

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      const parsedFavorites = JSON.parse(storedFavorites);
      setFavorites(parsedFavorites);
    }
    setIsInitialized(true); 
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites, isInitialized]); 

  const addFavorite = (product: Producto) => {
    let parsedFavorites = [];
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
       parsedFavorites = JSON.parse(storedFavorites);
    }

    setFavorites(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (!exists) {
        const updatedFavorites = [...parsedFavorites, product]; 
        return updatedFavorites;
      }
      return prev;
    });
  };

  const removeFavorite = (productId: number) => {
    setFavorites(prev => {
      const updatedFavorites = prev.filter(item => item.id !== productId);
      return updatedFavorites;
    });
  };

  const isFavorite = (productId: number) => {
    const result = favorites.some(item => item.id === productId);
    return result;
  };

  return { favorites, addFavorite, removeFavorite, isFavorite };
};

export default useFavorites;
