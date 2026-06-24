import { createI18n } from 'vue-i18n'
import pt from '../locales/pt.json'
import en from '../locales/en.json'
import es from '../locales/es.json'
import {
  applyDocumentLang,
  readStoredLocale,
  resolvePreferredLocale,
} from '@/utils/localePreference'

const initialLocale = resolvePreferredLocale(
  typeof localStorage !== 'undefined' ? readStoredLocale() : null,
  typeof navigator !== 'undefined' ? navigator.language : null,
  'pt',
)

const i18n = createI18n({
  legacy: false, // Set to false to use Composition API
  locale: initialLocale,
  fallbackLocale: 'pt',
  messages: {
    pt,
    en,
    es
  }
})

applyDocumentLang(initialLocale)

export default i18n
