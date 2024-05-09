import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'

import en from '../../resources/locales/en/translate.json'
import vi from '../../resources/locales/vi/translate.json'

const resources = {
  en: {
    translation: en
  },
  vi: {
    translation: vi
  }
}

i18n
  .use(Backend)
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en-US',
    debug: false,
    resources,
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
