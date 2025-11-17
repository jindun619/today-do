import { useSettings } from './useSettings';
import { ko } from '../i18n/ko';
import { en } from '../i18n/en';

const translations = {
  ko,
  en,
};

export function useTranslation() {
  const { settings } = useSettings();
  const language = settings.language || 'ko';

  const t = translations[language];

  return { t, language };
}
