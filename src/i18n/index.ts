import { kn } from './kn';
import { en } from './en';
import { hi } from './hi';
import { mr } from './mr';
import type { SupportedLanguage } from '../services/healthService';

export const translations = {
  kn,
  en,
  hi,
  mr,
};

export type TranslationType = typeof kn;

export function getTranslation(lang: SupportedLanguage): TranslationType {
  return translations[lang] || translations.kn;
}
