import type { Translation } from './ko';

export const en: Translation = {
  // App common
  settings: 'Settings',
  save: 'Save',
  cancel: 'Cancel',

  // Settings
  settingsTitle: 'Settings',
  apiSettings: 'API Settings',
  generalSettings: 'General',
  about: 'About',
  apiKeyInfo: 'Why do I need API keys?',
  apiKeyInfoText: 'This extension uses free APIs to fetch background images and weather data. You need to sign up for free accounts and paste your API keys here. Don\'t worry - both services offer generous free tiers!',
  pexelsApiKey: 'Pexels API Key',
  pexelsApiKeyDesc: 'Used for beautiful background images. Free tier: 200 requests/hour',
  qweatherApiKey: 'QWeather API Key',
  qweatherApiKeyDesc: 'Used for weather data. Free tier: 1,000 requests/day',
  getApiKey: 'Get API Key',
  enterApiKey: 'Enter your API key...',
  advancedSettings: 'Advanced: Custom QWeather API Host',
  advancedSettingsDesc: 'Only change this if you have a custom QWeather API endpoint',
  saveApiKeys: 'Save API Keys',
  saved: 'Saved!',

  // General Settings
  language: 'Language',
  languageDesc: 'Choose your preferred language for the interface',
  weatherLocation: 'Weather Location',
  weatherLocationDesc: 'Enter coordinates (lon,lat) or leave empty for auto-detection',
  weatherLocationPlaceholder: 'e.g., 121.409,31.029 or leave empty',
  weatherLocationFormat: 'Format: longitude,latitude (e.g., 121.409,31.029 for Shanghai)',
  saveSettings: 'Save Settings',

  // About
  appName: 'Today Do',
  version: 'Version',
  appDescription: 'A beautiful and productive Chrome new tab extension',
  features: 'Features',
  featuresList: {
    todo: 'Todo List with priorities',
    pomodoro: 'Pomodoro Timer (25/5 work/break cycles)',
    weather: 'Real-time Weather Widget',
    quotes: 'Daily Inspirational Quotes',
    notes: 'Quick Notes with auto-save',
    background: 'Beautiful Daily Background Images',
  },
  credits: 'Credits',
  backgroundsBy: 'Background images powered by',
  weatherBy: 'Weather data powered by',
  enjoyingApp: 'Enjoying Today Do?',
  enjoyingAppText: 'This is a free, open-source project. If you find it useful, consider starring the repository on GitHub or sharing it with friends!',
  madeWith: 'Made with ❤️ for productivity',
  license: 'MIT License © 2024',

  // Clock
  today: 'Today',

  // Todo
  todayTasks: 'Today\'s Tasks',
  addTodo: 'Add a task...',
  priority: {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
  },

  // Weather
  weather: 'Weather',
  humidity: 'Humidity',
  wind: 'Wind',
  refresh: 'Refresh',
  changeLocation: 'Change location',
  confirm: 'Confirm',

  // Pomodoro
  focusTime: 'Focus Time',
  start: 'Start',
  pause: 'Pause',
  reset: 'Reset',
  workSession: 'Work Session',
  breakTime: 'Break Time',

  // Quote
  dailyQuote: 'Daily Quote',

  // Notes
  quickNotes: 'Quick Notes',
  notePlaceholder: 'Type a note...',
  saving: 'Saving...',
  savedAgo: (time: string) => `Saved ${time} ago`,
  justSaved: 'Just saved',

  // Errors
  weatherError: 'Failed to fetch weather information',
  checkConsole: 'Please check browser console (F12)',
  apiKeyNotConfigured: 'API key is not configured',
  pleaseConfigureApiKey: 'Please add your API key in Settings',
};
