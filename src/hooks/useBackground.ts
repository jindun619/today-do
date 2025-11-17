import { useEffect, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { fetchRandomBackground } from '../utils/api';
import type { BackgroundImage } from '../types';

const ONE_DAY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export function useBackground() {
  const [cachedBackground, setCachedBackground] = useLocalStorage<BackgroundImage | null>(
    'today-do-background',
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBackground = async () => {
      // Check if we have a cached background and if it's less than 24 hours old
      if (cachedBackground && Date.now() - cachedBackground.fetchedAt < ONE_DAY) {
        setIsLoading(false);
        return;
      }

      // Fetch new background
      try {
        const newBackground = await fetchRandomBackground();
        if (newBackground) {
          setCachedBackground(newBackground);
        }
      } catch (error) {
        console.error('Failed to load background:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBackground();
  }, [cachedBackground, setCachedBackground]);

  const refreshBackground = async () => {
    setIsLoading(true);
    try {
      const newBackground = await fetchRandomBackground();
      if (newBackground) {
        setCachedBackground(newBackground);
      }
    } catch (error) {
      console.error('Failed to refresh background:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    background: cachedBackground,
    isLoading,
    refreshBackground,
  };
}
