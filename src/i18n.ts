import {getRequestConfig} from 'next-intl/server';
import {IntlErrorCode} from 'next-intl';
 
export default getRequestConfig(async ({locale}) => ({
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
}));