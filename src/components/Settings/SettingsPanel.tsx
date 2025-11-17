import { useState } from 'react';
import { X, Key, Globe, Info } from 'lucide-react';
import APISettings from './APISettings';
import GeneralSettings from './GeneralSettings';
import AboutTab from './AboutTab';
import { useTranslation } from '../../hooks/useTranslation';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

type Tab = 'api' | 'general' | 'about';

const SettingsPanel = ({ isOpen, onClose }: SettingsPanelProps) => {
  const [activeTab, setActiveTab] = useState<Tab>('api');
  const { t } = useTranslation();

  if (!isOpen) return null;

  const tabs = [
    { id: 'api' as Tab, label: t.apiSettings, icon: Key },
    { id: 'general' as Tab, label: t.generalSettings, icon: Globe },
    { id: 'about' as Tab, label: t.about, icon: Info },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="glass w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-white">{t.settingsTitle}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Close settings"
          >
            <X size={24} className="text-white/70 hover:text-white" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-white text-white'
                  : 'border-transparent text-white/50 hover:text-white/70'
              }`}
            >
              <tab.icon size={18} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {activeTab === 'api' && <APISettings />}
          {activeTab === 'general' && <GeneralSettings />}
          {activeTab === 'about' && <AboutTab />}
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
