import { useState } from 'react';
import { useSettings } from '../../hooks/useSettings';
import { useTranslation } from '../../hooks/useTranslation';
import { ExternalLink, Check, AlertCircle } from 'lucide-react';

const APISettings = () => {
  const { settings, updateSettings } = useSettings();
  const { t } = useTranslation();
  const [pexelsKey, setPexelsKey] = useState(settings.pexelsApiKey);
  const [qweatherKey, setQweatherKey] = useState(settings.qweatherApiKey);
  const [qweatherHost, setQweatherHost] = useState(settings.qweatherApiHost);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateSettings({
      pexelsApiKey: pexelsKey,
      qweatherApiKey: qweatherKey,
      qweatherApiHost: qweatherHost,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const hasChanges =
    pexelsKey !== settings.pexelsApiKey ||
    qweatherKey !== settings.qweatherApiKey ||
    qweatherHost !== settings.qweatherApiHost;

  return (
    <div className="space-y-6">
      <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertCircle size={20} className="text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-white/70">
            <p className="font-semibold text-white mb-1">{t.apiKeyInfo}</p>
            <p>{t.apiKeyInfoText}</p>
          </div>
        </div>
      </div>

      {/* Pexels API */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">{t.pexelsApiKey}</h3>
          <a
            href="https://www.pexels.com/api/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            {t.getApiKey}
            <ExternalLink size={14} />
          </a>
        </div>
        <p className="text-sm text-white/50">
          {t.pexelsApiKeyDesc}
        </p>
        <input
          type="text"
          value={pexelsKey}
          onChange={(e) => setPexelsKey(e.target.value)}
          placeholder={t.enterApiKey}
          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-white/40"
        />
      </div>

      {/* QWeather API */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">{t.qweatherApiKey}</h3>
          <a
            href="https://dev.qweather.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            {t.getApiKey}
            <ExternalLink size={14} />
          </a>
        </div>
        <p className="text-sm text-white/50">
          {t.qweatherApiKeyDesc}
        </p>
        <input
          type="text"
          value={qweatherKey}
          onChange={(e) => setQweatherKey(e.target.value)}
          placeholder={t.enterApiKey}
          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-white/40"
        />
      </div>

      {/* QWeather API Host */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white">QWeather API Host</h3>
        <p className="text-sm text-white/50">
          QWeather API 서버 주소 (필수)
        </p>
        <input
          type="text"
          value={qweatherHost}
          onChange={(e) => setQweatherHost(e.target.value)}
          placeholder="devapi.qweather.com"
          className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-white/40"
        />
        <p className="text-xs text-white/40">
          일반적으로 devapi.qweather.com 또는 사용자 정의 엔드포인트
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
            t.saveApiKeys
          )}
        </button>
      </div>
    </div>
  );
};

export default APISettings;
