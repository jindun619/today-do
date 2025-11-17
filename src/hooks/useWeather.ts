import { useEffect, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { useSettings } from './useSettings';
import { fetchWeather, getCurrentLocation } from '../utils/api';
import type { Weather } from '../types';

const THIRTY_MINUTES = 30 * 60 * 1000; // 30 minutes in milliseconds

interface CachedWeather {
  data: Weather;
  fetchedAt: number;
  location: string; // Store location with cached data to validate
}

export function useWeather() {
  const { settings } = useSettings();
  const [location, setLocation] = useLocalStorage<string | null>('today-do-weather-location', null);
  const [cachedWeather, setCachedWeather] = useLocalStorage<CachedWeather | null>(
    'today-do-weather-data',
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize location on first load
  useEffect(() => {
    const initializeLocation = async () => {
      if (isInitialized) return;

      console.log('[useWeather] Initializing location...');

      // Priority: 1. Stored location → 2. Settings location → 3. Auto-detect
      if (!location) {
        // Check if user has set a location in settings
        if (settings.weatherLocation) {
          console.log('[useWeather] Using location from settings:', settings.weatherLocation);
          setLocation(settings.weatherLocation);
        } else {
          // Auto-detect location
          console.log('[useWeather] No location configured, attempting auto-detection...');
          try {
            const autoLocation = await getCurrentLocation();
            console.log('[useWeather] Auto-detected location:', autoLocation);
            setLocation(autoLocation);
          } catch (error) {
            console.error('[useWeather] Auto-detection failed:', error);
            // Fallback to Beijing
            console.log('[useWeather] Falling back to Beijing');
            setLocation('116.41,39.92');
          }
        }
      } else {
        console.log('[useWeather] Using stored location:', location);
      }

      setIsInitialized(true);
    };

    initializeLocation();
  }, [isInitialized, location, settings.weatherLocation, setLocation]);

  // Fetch weather when location is set
  useEffect(() => {
    if (!isInitialized || !location) {
      return;
    }

    const loadWeather = async () => {
      console.log('[useWeather] Loading weather for location:', location);

      // Check if we have cached weather data less than 30 minutes old
      if (
        cachedWeather &&
        cachedWeather.location === location &&
        Date.now() - cachedWeather.fetchedAt < THIRTY_MINUTES
      ) {
        console.log('[useWeather] Using cached weather data');
        setIsLoading(false);
        return;
      }

      // Fetch new weather data
      setIsLoading(true);
      setError(null);

      try {
        const weatherData = await fetchWeather(location);
        setCachedWeather({
          data: weatherData,
          location: location,
          fetchedAt: Date.now(),
        });
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : '날씨 정보를 가져오는 중 오류가 발생했습니다';
        setError(errorMessage);
        console.error('[useWeather] Weather fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadWeather();
  }, [location, isInitialized, setCachedWeather]);

  const updateLocation = (newLocation: string) => {
    setLocation(newLocation);
    setCachedWeather(null); // Clear cache when location changes
  };

  const refresh = async () => {
    setCachedWeather(null); // Force refresh
  };

  return {
    weather: cachedWeather?.data || null,
    isLoading,
    error,
    location,
    updateLocation,
    refresh,
  };
}
