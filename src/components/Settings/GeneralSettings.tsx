import { useState } from 'react';
import { useSettings } from '../../hooks/useSettings';
import { useTranslation } from '../../hooks/useTranslation';
import { Check } from 'lucide-react';

const GeneralSettings = () => {
  const { settings, updateSettings } = useSettings();
  const { t } = useTranslation();
  const [weatherLocation, setWeatherLocation] = useState(settings.weatherLocation || '');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateSettings({
      weatherLocation: weatherLocation.trim() || null,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const hasChanges = weatherLocation !== (settings.weatherLocation || '');

  return (
    <div className="space-y-6">
      {/* Weather Location */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white">{t.weatherLocation}</h3>
        <p className="text-sm text-white/50">
          {t.weatherLocationDesc}
        </p>
        <input
          type="text"
          value={weatherLocation}
          onChange={(e) => setWeatherLocation(e.target.value)}
          placeholder={t.weatherLocationPlaceholder}
          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-white/40"
        />
        <p className="text-xs text-white/40">
          {t.weatherLocationFormat}
        </p>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-4">
        <button
          onClick={handleSave}
          disabled={!hasChanges}
          className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all ${
            hasChanges
              ? 'bg-blue-500 hover:bg-blue-600 text-white'
              : 'bg-white/10 text-white/30 cursor-not-allowed'
          }`}
        >
          {saved ? (
            <>
              <Check size={18} />
              {t.saved}
            </>
          ) : (
            t.saveSettings
          )}
        </button>
      </div>
    </div>
  );
};

export default GeneralSettings;
