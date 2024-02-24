import {getRequestConfig} from 'next-intl/server';
import {IntlErrorCode} from 'next-intl';
import {notFound} from 'next/navigation';
 
export default getRequestConfig(async ({locale}) => {
  
  const locales = [
    "ar",
    "cs",
    "da",
    "de",
    "el",
    "en",
    "es",
    "fi",
    "fr",
    "hr",
    "hu",
    "id",
    "it",
    "ja",
    "lv",
    "nl",
    "no",
    "pl",
    "pt",
    "pt-BR",
    "ro",
    "ru",
    "sk",
    "sl",
    "sq",
    "sr",
    "sv",
    "ta",
    "tr",
    "uk",
    "zh",
    "zh-HK"
  ];
  
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();
 
  return {
    onError(error) {
      //console.error(error);
    },
    getMessageFallback({namespace, key, error}) {
      const path = [namespace, key].filter((part) => part != null).join('.');
   
      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        return path + ' is not yet translated';
      } else {
        return 'Dear developer, please fix this message: ' + path;
      }
    },
    messages: (await import(`../locales/${locale}/localization.json`)).default
  };
});