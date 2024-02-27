import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import AuthContextProvider from './context/AuthContext';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import store from './store';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import './i18n';
import './styles/index.css';
import '/node_modules/flag-icons/css/flag-icons.min.css';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import languageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import translationEN from './assets/locale/en/translation.json';
import translationAR from './assets/locale/ar/translation.json';
import App from './App.jsx';
import i18next from 'i18next';
import { BrowserRouter } from 'react-router-dom';
const queryClient = new QueryClient();

const resources = {
  en: {
    translation: translationEN,
  },
  ar: {
    translation: translationAR,
  },
};

i18next
  .use(languageDetector)
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    resources,
    lng: document.querySelector('html').lang,
    fallbackLang: 'ar',
    supportedLangs: ['ar', 'en'],
    detection: {
      order: ['cookie', 'path', 'htmlTag', 'localStorage', 'subdomain'],
      caches: ['cookie'],
    },
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json',
    },
    interpolation: {
      escapeValue: false,
    },
  });

const loadingMarkup = (
  <div className="py-4 text-center">
    <h3>Loading..</h3>
  </div>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Suspense fallback={loadingMarkup}>
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <React.StrictMode>
              <BrowserRouter>
                <I18nextProvider i18n={i18next}>
                  <App />
                </I18nextProvider>
              </BrowserRouter>
            </React.StrictMode>
          </QueryClientProvider>
        </Provider>
      </ThemeProvider>
    </AuthContextProvider>
  </Suspense>
);
