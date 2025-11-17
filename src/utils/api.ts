import type { BackgroundImage, AppSettings } from '../types';

// Pexels API configuration
const PEXELS_API_URL = 'https://api.pexels.com/v1';

// Helper function to get settings from localStorage
function getSettings(): AppSettings | null {
  const settingsJson = localStorage.getItem('today-do-settings');
  if (!settingsJson) return null;
  try {
    return JSON.parse(settingsJson);
  } catch {
    return null;
  }
}

export async function fetchRandomBackground(): Promise<BackgroundImage | null> {
  const settings = getSettings();
  const PEXELS_API_KEY = settings?.pexelsApiKey;

  if (!PEXELS_API_KEY || PEXELS_API_KEY.trim() === '') {
    console.warn('[Pexels] API key not configured. Using gradient fallback.');
    console.warn('[Pexels] Please add your Pexels API key in Settings.');
    return null;
  }

  try {
    const categories = ['nature', 'landscape', 'minimal', 'sky', 'mountain', 'ocean', 'forest'];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];

    const response = await fetch(
      `${PEXELS_API_URL}/search?query=${randomCategory}&per_page=20&orientation=landscape`,
      {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch background image');
    }

    const data = await response.json();

    if (!data.photos || data.photos.length === 0) {
      return null;
    }

    const randomPhoto = data.photos[Math.floor(Math.random() * data.photos.length)];

    return {
      url: randomPhoto.src.original,
      photographer: randomPhoto.photographer,
      photographerUrl: randomPhoto.photographer_url,
      fetchedAt: Date.now(),
    };
  } catch (error) {
    console.error('[Pexels] Error fetching background image:', error);
    return null;
  }
}

// ============================================================================
// QWeather API Configuration
// ============================================================================

// Helper function to build QWeather API URLs
function getQWeatherBaseURL(): string {
  const settings = getSettings();
  const host = settings?.qweatherApiHost || 'devapi.qweather.com';
  return `https://${host}`;
}

// ============================================================================
// TypeScript Interfaces (based on official QWeather API documentation)
// ============================================================================

/**
 * GeoAPI - City Lookup Response
 * Reference: https://dev.qweather.com/docs/api/geoapi/city-lookup/
 */
interface QWeatherGeoCityLookupResponse {
  code: string; // Status code: "200" for success
  location?: Array<{
    name: string; // Location name
    id: string; // Location ID (required for weather queries)
    lat: string; // Latitude
    lon: string; // Longitude
    adm2: string; // Superior administrative division
    adm1: string; // First-level administrative region
    country: string; // Country name
    tz: string; // Timezone
    utcOffset: string; // UTC offset
    isDst: string; // Daylight saving time: "1" or "0"
    type: string; // Location type (e.g., "city")
    rank: string; // Location rank
    fxLink: string; // Forecast page URL
  }>;
  refer?: {
    sources: string[]; // Data sources
    license: string[]; // License information
  };
}

/**
 * Weather API - Real-time Weather Response
 * Reference: https://dev.qweather.com/docs/api/weather/weather-now/
 */
interface QWeatherNowResponse {
  code: string; // Status code: "200" for success
  updateTime?: string; // Last update time (ISO 8601)
  fxLink?: string; // Forecast page URL
  now?: {
    obsTime: string; // Observation time (ISO 8601)
    temp: string; // Temperature (Celsius)
    feelsLike?: string; // Feels like temperature
    icon: string; // Weather icon code
    text: string; // Weather condition text
    wind360: string; // Wind direction (360 degrees)
    windDir: string; // Wind direction name
    windScale: string; // Wind scale
    windSpeed: string; // Wind speed (km/h)
    humidity: string; // Relative humidity (%)
    precip: string; // Precipitation
    pressure: string; // Atmospheric pressure
    vis?: string; // Visibility
    cloud?: string; // Cloud cover (%)
    dew?: string; // Dew point
  };
  refer?: {
    sources: string[]; // Data sources
    license: string[]; // License information
  };
}

/**
 * QWeather Error Codes Mapping
 * Reference: https://dev.qweather.com/docs/resource/status-code/
 */
const QWEATHER_ERROR_MESSAGES: Record<string, string> = {
  '200': '요청 성공',
  '204': '요청 성공하였으나 해당 지역의 데이터가 없습니다',
  '400': '요청 파라미터가 잘못되었습니다',
  '401': 'API 인증 실패 - API 키를 확인해주세요',
  '402': 'API 사용량 초과 또는 잔액 부족',
  '403': '접근이 거부되었습니다',
  '404': '요청한 데이터를 찾을 수 없습니다',
  '429': 'API 호출 한도를 초과했습니다. 잠시 후 다시 시도해주세요',
  '500': 'QWeather 서버 내부 오류',
};

// ============================================================================
// Weather Fetching Functions
// ============================================================================

/**
 * Fetches weather data for a given location
 *
 * This function performs two API calls:
 * 1. GeoAPI City Lookup - converts city name or coordinates to location ID
 * 2. Weather Now API - fetches real-time weather for the location
 *
 * @param location - City name (e.g., "北京") or coordinates (e.g., "116.41,39.92")
 * @returns Weather data or null on error
 */
export async function fetchWeather(location: string) {
  const settings = getSettings();
  const QWEATHER_API_KEY = settings?.qweatherApiKey;

  // Validate API key
  if (!QWEATHER_API_KEY || QWEATHER_API_KEY.trim() === '') {
    console.error('[QWeather] API key not configured');
    throw new Error('QWeather API key is not configured. Please add it in Settings.');
  }

  try {
    console.log('[QWeather] 🌍 Fetching weather for:', location);

    // ========================================================================
    // Step 1: GeoAPI City Lookup
    // Convert city name or coordinates to location ID
    // ========================================================================
    const locationData = await lookupCityLocation(location);
    console.log('[QWeather] 📍 Found location:', locationData);

    // ========================================================================
    // Step 2: Weather Now API
    // Fetch real-time weather using location ID
    // ========================================================================
    const weatherData = await fetchWeatherNow(locationData.id);
    console.log('[QWeather] ✅ Weather data fetched successfully');

    // ========================================================================
    // Step 3: Process and Return Data
    // Convert wind speed from km/h to m/s
    // ========================================================================
    if (!weatherData.now) {
      throw new Error('날씨 데이터가 응답에 포함되지 않았습니다');
    }

    const windSpeedKmh = parseFloat(weatherData.now.windSpeed);
    const windSpeedMs = windSpeedKmh / 3.6; // km/h to m/s conversion

    return {
      temp: parseInt(weatherData.now.temp),
      condition: weatherData.now.text,
      icon: weatherData.now.icon,
      location: locationData.name,
      humidity: parseInt(weatherData.now.humidity),
      windSpeed: Math.round(windSpeedMs * 10) / 10, // Round to 1 decimal place
    };
  } catch (error) {
    console.error('[QWeather] ❌ Error fetching weather:', error);

    // Re-throw the error so the UI can handle it
    if (error instanceof Error) {
      throw error;
    }

    throw new Error('날씨 정보를 가져오는 중 알 수 없는 오류가 발생했습니다');
  }
}

/**
 * Looks up a city location using QWeather GeoAPI
 *
 * Reference: https://dev.qweather.com/docs/api/geoapi/city-lookup/
 * Endpoint: GET /geo/v2/city/lookup
 *
 * @param location - City name (e.g., "北京") or coordinates (e.g., "116.41,39.92")
 * @returns Location information with ID
 */
async function lookupCityLocation(location: string): Promise<{
  id: string;
  name: string;
  country: string;
  adm1: string;
  adm2: string;
}> {
  const settings = getSettings();
  const QWEATHER_API_KEY = settings?.qweatherApiKey || '';
  const QWEATHER_BASE_URL = getQWeatherBaseURL();
  const QWEATHER_GEO_API = `${QWEATHER_BASE_URL}/geo/v2/city/lookup`;

  // Build URL with query parameters
  const url = new URL(QWEATHER_GEO_API);
  url.searchParams.append('location', location);
  url.searchParams.append('key', QWEATHER_API_KEY);
  url.searchParams.append('lang', 'zh'); // Chinese language

  console.log('[QWeather] 🔍 GeoAPI City Lookup URL:', url.toString().replace(QWEATHER_API_KEY, '***'));
  console.log('[QWeather] 🔍 Looking up location:', location);

  // Make API request
  const response = await fetch(url.toString());

  // Check HTTP status
  if (!response.ok) {
    throw new Error(`City lookup HTTP error: ${response.status} ${response.statusText}`);
  }

  // Parse JSON response
  const data: QWeatherGeoCityLookupResponse = await response.json();
  console.log('[QWeather] 📡 City lookup response code:', data.code);

  // Check API response code
  if (data.code !== '200') {
    const errorMsg = QWEATHER_ERROR_MESSAGES[data.code] || `알 수 없는 오류 (코드: ${data.code})`;
    throw new Error(errorMsg);
  }

  // Validate response data
  if (!data.location || data.location.length === 0) {
    throw new Error(`'${location}' 위치를 찾을 수 없습니다. 다른 도시 이름이나 좌표를 시도해주세요`);
  }

  // Return first match (sorted by relevance)
  const foundLocation = data.location[0];
  return {
    id: foundLocation.id,
    name: foundLocation.name,
    country: foundLocation.country,
    adm1: foundLocation.adm1,
    adm2: foundLocation.adm2,
  };
}

/**
 * Fetches real-time weather data using QWeather Weather API
 *
 * Reference: https://dev.qweather.com/docs/api/weather/weather-now/
 * Endpoint: GET /v7/weather/now
 *
 * @param locationId - Location ID from GeoAPI lookup
 * @returns Real-time weather data
 */
async function fetchWeatherNow(locationId: string): Promise<QWeatherNowResponse> {
  const settings = getSettings();
  const QWEATHER_API_KEY = settings?.qweatherApiKey || '';
  const QWEATHER_BASE_URL = getQWeatherBaseURL();
  const QWEATHER_WEATHER_API = `${QWEATHER_BASE_URL}/v7/weather/now`;

  // Build URL with query parameters
  const url = new URL(QWEATHER_WEATHER_API);
  url.searchParams.append('location', locationId);
  url.searchParams.append('key', QWEATHER_API_KEY);
  url.searchParams.append('lang', 'zh'); // Chinese language
  url.searchParams.append('unit', 'm'); // Metric units

  console.log('[QWeather] 🌡️ Weather API v7 URL:', url.toString().replace(QWEATHER_API_KEY, '***'));

  // Make API request
  const response = await fetch(url.toString());

  // Check HTTP status
  if (!response.ok) {
    throw new Error(`Weather API HTTP error: ${response.status} ${response.statusText}`);
  }

  // Parse JSON response
  const data: QWeatherNowResponse = await response.json();
  console.log('[QWeather] 📡 Weather API response code:', data.code);

  // Check API response code
  if (data.code !== '200') {
    const errorMsg = QWEATHER_ERROR_MESSAGES[data.code] || `알 수 없는 오류 (코드: ${data.code})`;
    throw new Error(errorMsg);
  }

  // Validate response data
  if (!data.now) {
    throw new Error('응답에 날씨 데이터가 없습니다');
  }

  return data;
}

/**
 * Gets current user location using multiple methods
 * Priority: 1) Browser Geolocation → 2) IP-based → 3) Default Beijing
 *
 * @returns Coordinates string "lon,lat"
 */
export async function getCurrentLocation(): Promise<string> {
  console.log('[Location] 🌍 Starting location detection...');

  // Method 1: Try browser Geolocation API first
  try {
    const coords = await getBrowserLocation();
    if (coords) {
      console.log('[Location] ✅ Using browser geolocation:', coords);
      return coords;
    }
  } catch (error) {
    console.warn('[Location] Browser geolocation failed:', error);
  }

  // Method 2: Try IP-based geolocation
  try {
    const coords = await getIPBasedLocation();
    if (coords) {
      console.log('[Location] ✅ Using IP-based location:', coords);
      return coords;
    }
  } catch (error) {
    console.warn('[Location] IP-based location failed:', error);
  }

  // Method 3: Fallback to Beijing coordinates
  console.warn('[Location] ⚠️ All location methods failed, using Beijing as fallback');
  return '116.41,39.92';
}

/**
 * Gets location using browser Geolocation API
 */
async function getBrowserLocation(): Promise<string | null> {
  return new Promise((resolve) => {
    // Check if Geolocation API is available
    if (!navigator.geolocation) {
      console.warn('[Geolocation] ❌ API not available in this browser');
      resolve(null);
      return;
    }

    // Check if running in secure context (HTTPS or localhost)
    if (!window.isSecureContext && window.location.hostname !== 'localhost') {
      console.warn('[Geolocation] ❌ Geolocation requires HTTPS or localhost');
      console.warn('[Geolocation] Current URL:', window.location.href);
      resolve(null);
      return;
    }

    console.log('[Geolocation] 📍 Requesting permission...');
    console.log('[Geolocation] Secure context:', window.isSecureContext);
    console.log('[Geolocation] Protocol:', window.location.protocol);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lon = position.coords.longitude;
        const lat = position.coords.latitude;
        const accuracy = position.coords.accuracy;
        const coordinates = `${lon},${lat}`;

        console.log('[Geolocation] ✅ Success!');
        console.log('[Geolocation] 📍 Coordinates:', coordinates);
        console.log('[Geolocation] 🎯 Accuracy:', Math.round(accuracy), 'meters');
        console.log('[Geolocation] 🕐 Timestamp:', new Date(position.timestamp).toLocaleString());

        resolve(coordinates);
      },
      (error) => {
        // Detailed error logging
        console.error('[Geolocation] ❌ Error occurred');
        console.error('[Geolocation] Error code:', error.code);
        console.error('[Geolocation] Error message:', error.message);

        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.error('[Geolocation] 🚫 User denied location permission');
            console.error('[Geolocation] → Please allow location access in browser settings');
            break;
          case error.POSITION_UNAVAILABLE:
            console.error('[Geolocation] 📍 Location information unavailable');
            console.error('[Geolocation] → Check if location services are enabled');
            break;
          case error.TIMEOUT:
            console.error('[Geolocation] ⏱️ Request timed out');
            console.error('[Geolocation] → Network or GPS signal may be weak');
            break;
          default:
            console.error('[Geolocation] ❓ Unknown error');
        }

        resolve(null);
      },
      {
        enableHighAccuracy: false, // Faster, uses network-based location
        timeout: 10000, // 10 second timeout (increased from 5s)
        maximumAge: 300000, // Cache for 5 minutes
      }
    );
  });
}

/**
 * Gets location using IP-based geolocation service
 * Uses ipapi.co free API (no key required, 1000 requests/day)
 */
async function getIPBasedLocation(): Promise<string | null> {
  try {
    console.log('[IP Location] 🌐 Fetching location from IP...');

    const response = await fetch('https://ipapi.co/json/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.reason || 'IP geolocation failed');
    }

    const lon = data.longitude;
    const lat = data.latitude;
    const city = data.city;
    const country = data.country_name;

    if (!lon || !lat) {
      throw new Error('Invalid coordinates in response');
    }

    const coordinates = `${lon},${lat}`;
    console.log('[IP Location] ✅ Success!');
    console.log('[IP Location] 📍 Coordinates:', coordinates);
    console.log('[IP Location] 🏙️ Detected location:', `${city}, ${country}`);
    console.log('[IP Location] 🌐 IP:', data.ip);

    return coordinates;
  } catch (error) {
    console.error('[IP Location] ❌ Failed:', error instanceof Error ? error.message : error);
    return null;
  }
}
