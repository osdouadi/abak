import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import languageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import translationEN from './assets/locale/en/translation.json';
import translationAR from './assets/locale/ar/translation.json';

const resources = {
  en: {
    translation: translationEN,
  },
  ar: {
    translation: translationAR,
  },
};

const initializeI18n = async () => {
  await i18n
  .use(languageDetector)
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    resources,
    lng: document.querySelector('html').lang,
    fallbackLang: 'en',
    supportedLangs: ['ar', 'en'],
    detection: {
      order: ['path', 'cookie', 'htmlTag', 'localStorage', 'subdomain'],
      caches: ['cookie'],
    },
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json',
    },
    interpolation: {
      escapeValue: false,
    },
  });
}

export {initializeI18n}
export default i18n;
