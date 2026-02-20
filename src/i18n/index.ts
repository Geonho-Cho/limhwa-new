import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import koCommon from './locales/ko/common.json';
import enCommon from './locales/en/common.json';

const resources = {
  ko: {
    common: koCommon,
  },
  en: {
    common: enCommon,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ko', // 기본 언어
    fallbackLng: 'ko',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
