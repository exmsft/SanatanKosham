import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from './config';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !locales.includes(locale as typeof locales[number])) {
    locale = defaultLocale;
  }

  const userMessages = (await import(`../../messages/${locale}.json`)).default;

  if (locale !== defaultLocale) {
    const enMessages = (await import('../../messages/en.json')).default;
    return {
      locale,
      messages: { ...enMessages, ...userMessages },
    };
  }

  return { locale, messages: userMessages };
});
