// Todo types
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: number;
}

// Weather types
export interface Weather {
  temp: number;
  condition: string;
  icon: string;
  location: string;
  humidity?: number;
  windSpeed?: number;
}

// Quote types
export interface Quote {
  text: string;
  author: string;
}

// Note types
export interface Note {
  id: string;
  content: string;
  updatedAt: number;
}

// Pomodoro types
export interface PomodoroState {
  minutes: number;
  seconds: number;
  isActive: boolean;
  isBreak: boolean;
  sessions: number;
}

// Background image types
export interface BackgroundImage {
  url: string;
  photographer: string;
  photographerUrl: string;
  fetchedAt: number;
}

// Settings types
export interface AppSettings {
  // API Keys
  pexelsApiKey: string;
  qweatherApiKey: string;
  qweatherApiHost: string;

  // General Settings
  language: 'en' | 'ko';
  weatherLocation: string | null;

  // First-time setup
  isFirstTime: boolean;
}
