import { ExternalLink, Heart } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

const AboutTab = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* App Info */}
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-white">{t.appName}</h3>
        <p className="text-white/50">{t.version} 1.0.0</p>
        <p className="text-white/70">
          {t.appDescription}
        </p>
      </div>

      {/* Features */}
      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-white">{t.features}</h4>
        <ul className="space-y-2 text-white/70 text-sm">
          <li>✅ {t.featuresList.todo}</li>
          <li>⏰ {t.featuresList.pomodoro}</li>
          <li>🌤️ {t.featuresList.weather}</li>
          <li>💭 {t.featuresList.quotes}</li>
          <li>📝 {t.featuresList.notes}</li>
          <li>🎨 {t.featuresList.background}</li>
        </ul>
      </div>

      {/* Credits */}
      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-white">{t.credits}</h4>
        <div className="text-sm text-white/70 space-y-2">
          <p>
            {t.backgroundsBy}{' '}
            <a
              href="https://www.pexels.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1"
            >
              Pexels
              <ExternalLink size={12} />
            </a>
          </p>
          <p>
            {t.weatherBy}{' '}
            <a
              href="https://www.qweather.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1"
            >
              QWeather
              <ExternalLink size={12} />
            </a>
          </p>
        </div>
      </div>

      {/* Support */}
      <div className="p-4 bg-pink-500/10 border border-pink-500/20 rounded-lg">
        <div className="flex items-start gap-3">
          <Heart size={20} className="text-pink-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-white/70">
            <p className="font-semibold text-white mb-1">{t.enjoyingApp}</p>
            <p>
              {t.enjoyingAppText}
            </p>
          </div>
        </div>
      </div>

      {/* License */}
      <div className="text-center text-xs text-white/40 pt-4 border-t border-white/10">
        <p>{t.license}</p>
      </div>
    </div>
  );
};

export default AboutTab;
