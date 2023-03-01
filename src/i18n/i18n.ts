import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import * as en from './translations/en.json';
import * as it from './translations/it.json';

const resources = {
  en: {
    translation: en,
  },
  it: {
    translation: it,
  },
};

let fallback = { languageTag: 'en', isRTL: false };
let { languageTag, isRTL } =
  RNLocalize.findBestAvailableLanguage(Object.keys(resources)) || fallback;

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: languageTag,
  compatibilityJSON: 'v3',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
