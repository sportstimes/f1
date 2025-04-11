import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: [
    'ar',
    'cs',
    'da',
    'de',
    'el',
    'en',
    'es',
    'fi',
    'fr',
    'hr',
    'hu',
    'id',
    'it',
    'ja',
    'lv',
    'nl',
    'no',
    'pl',
    'pt',
    'pt-BR',
    'ro',
    'ru',
    'sk',
    'sl',
    'sq',
    'sr',
    'sv',
    'ta',
    'tr',
    'uk',
    'zh',
    'zh-HK',
  ],

  // Used when no locale matches
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});
