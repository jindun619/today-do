import { useState } from 'react';
import { useWeather } from '../../hooks/useWeather';
import { Cloud, CloudRain, CloudSnow, Sun, Wind, Droplets, RefreshCw, MapPin } from 'lucide-react';

const WeatherWidget = () => {
  const { weather, isLoading, error, location, updateLocation, refresh } = useWeather();
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [locationInput, setLocationInput] = useState(location || '');

  const handleLocationSubmit = () => {
    if (locationInput.trim()) {
      updateLocation(locationInput.trim());
      setIsEditingLocation(false);
    }
  };

  const getWeatherIcon = (condition: string) => {
    const lower = condition.toLowerCase();
    if (lower.includes('雨') || lower.includes('rain')) {
      return <CloudRain size={48} className="text-blue-300" />;
    }
    if (lower.includes('雪') || lower.includes('snow')) {
      return <CloudSnow size={48} className="text-blue-200" />;
    }
    if (lower.includes('晴') || lower.includes('sunny') || lower.includes('clear')) {
      return <Sun size={48} className="text-yellow-300" />;
    }
    return <Cloud size={48} className="text-gray-300" />;
  };

  if (error) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">날씨</h3>
          <button
            onClick={refresh}
            className="p-1 hover:bg-white/10 rounded transition-colors"
          >
            <RefreshCw size={16} className="text-white/70" />
          </button>
        </div>
        <div className="text-center py-4">
          <p className="text-white/50 text-sm">{error}</p>
          <p className="text-white/30 text-xs mt-2">브라우저 콘솔을 확인해주세요 (F12)</p>
          <button
            onClick={() => {
              setIsEditingLocation(true);
            }}
            className="mt-3 text-xs text-white/50 hover:text-white underline"
          >
            위치 변경하기
          </button>
        </div>
      </div>
    );
  }

  if (isLoading || !weather) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">날씨</h3>
        <div className="flex items-center justify-center py-8">
          <RefreshCw size={32} className="text-white/50 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">날씨</h3>
        <button
          onClick={refresh}
          className="p-1 hover:bg-white/10 rounded transition-colors"
          title="새로고침"
        >
          <RefreshCw size={16} className="text-white/70 hover:text-white" />
        </button>
      </div>

      {/* Location */}
      <div className="flex items-center gap-2">
        {isEditingLocation ? (
          <div className="flex-1 flex items-center gap-2">
            <input
              type="text"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleLocationSubmit();
                if (e.key === 'Escape') {
                  setLocationInput(location || '');
                  setIsEditingLocation(false);
                }
              }}
              className="flex-1 bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-sm focus:outline-none focus:border-white/40"
              autoFocus
            />
            <button
              onClick={handleLocationSubmit}
              className="text-xs text-white/70 hover:text-white"
            >
              확인
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditingLocation(true)}
            className="flex items-center gap-1 text-white/70 hover:text-white transition-colors"
          >
            <MapPin size={14} />
            <span className="text-sm">{weather.location}</span>
          </button>
        )}
      </div>

      {/* Temperature and icon */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-5xl font-bold text-white">
            {weather.temp}°
          </div>
          <div className="text-white/70 mt-1">{weather.condition}</div>
        </div>
        <div>
          {getWeatherIcon(weather.condition)}
        </div>
      </div>

      {/* Additional info */}
      {(weather.humidity !== undefined || weather.windSpeed !== undefined) && (
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
          {weather.humidity !== undefined && (
            <div className="flex items-center gap-2">
              <Droplets size={16} className="text-white/50" />
              <div>
                <div className="text-xs text-white/50">습도</div>
                <div className="text-sm text-white">{weather.humidity}%</div>
              </div>
            </div>
          )}
          {weather.windSpeed !== undefined && (
            <div className="flex items-center gap-2">
              <Wind size={16} className="text-white/50" />
              <div>
                <div className="text-xs text-white/50">바람</div>
                <div className="text-sm text-white">{weather.windSpeed} m/s</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
