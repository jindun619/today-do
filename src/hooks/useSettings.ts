import { useLocalStorage } from './useLocalStorage';
import type { AppSettings } from '../types';

const DEFAULT_SETTINGS: AppSettings = {
  // API Keys - empty by default
  pexelsApiKey: '',
  qweatherApiKey: '',
  qweatherApiHost: 'devapi.qweather.com',

  // General Settings
  language: 'ko',
  weatherLocation: null,

  // First-time setup
  isFirstTime: true,
};

export function useSettings() {
  const [settings, setSettings] = useLocalStorage<AppSettings>(
    'today-do-settings',
    DEFAULT_SETTINGS
  );

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings((prev) => ({
      ...prev,
      ...newSettings,
    }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  const completeFirstTimeSetup = () => {
    updateSettings({ isFirstTime: false });
  };

  return {
    settings,
    updateSettings,
    resetSettings,
    completeFirstTimeSetup,
  };
}
