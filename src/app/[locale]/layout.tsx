import { notFound } from 'next/navigation';
import './globals.css';
import { Metadata } from 'next';
import PlausibleProvider from 'next-plausible';
import Script from 'next/script';
import { UserContextProvider } from 'components/UserContext';
import { League_Spartan } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import {
  getTranslations,
  getMessages,
  setRequestLocale,
} from 'next-intl/server';
import i18nConfig from '../../i18nConfig.js';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations('All');
  const currentYear = process.env.NEXT_PUBLIC_CURRENT_YEAR;
  const config = require(
    `/_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`,
  );

  const { locales } = i18nConfig;

  const { locale } = await params;
  const currentLocale = locale || 'en';

  // Helper function to create language alternates
  const createLanguageAlternates = (path: string = '') => {
    const languages: { [key: string]: string } = {};

    locales.forEach((locale: string) => {
      // For the default locale (assuming it's 'en'), don't add the locale prefix
      const localePath = locale === 'en' ? path : `/${locale}${path}`;
      languages[locale] = `https://${config.url}${localePath}`;
    });

    languages['x-default'] = `https://${config.url}`;

    return languages;
  };

  let ogDescription = t(`${process.env.NEXT_PUBLIC_SITE_KEY}.seo.description`, {
    year: currentYear,
  });

  // Truncate if it exceeds 65 characters
  if (ogDescription.length > 65) {
    ogDescription = `${ogDescription.slice(0, 62)}...`;
  }

  // Generate canonical URL based on current locale
  const canonicalPath = currentLocale === 'en' ? '' : `/${currentLocale}`;
  const canonical = `https://${config.url}${canonicalPath}`;

  return {
    title: t(`${process.env.NEXT_PUBLIC_SITE_KEY}.seo.title`, {
      year: currentYear,
    }),
    description: t(`${process.env.NEXT_PUBLIC_SITE_KEY}.seo.description`, {
      year: currentYear,
    }),
    keywords: t(`${process.env.NEXT_PUBLIC_SITE_KEY}.seo.keywords`, {
      year: currentYear,
    }),
    alternates: {
      canonical,
      languages: createLanguageAlternates(),
    },
    manifest: '/manifest.json',
    twitter: {
      card: 'summary_large_image',
      creator: '@f1cal',
      creatorId: '1467726470533754880',
      images: [`https://${config.url}/share.png`],
    },
    openGraph: {
      title: t(`${process.env.NEXT_PUBLIC_SITE_KEY}.seo.title`, {
        year: currentYear,
      }),
      description: ogDescription,
      url: `https://${config.url}/`,
      siteName: t(`${process.env.NEXT_PUBLIC_SITE_KEY}.seo.title`, {
        year: currentYear,
      }),
      images: [`https://${config.url}/share.png`],
      type: 'website',
    },
    appleWebApp: {
      title: t(`${process.env.NEXT_PUBLIC_SITE_KEY}.seo.title`, {
        year: currentYear,
      }),
      statusBarStyle: 'black-translucent',
      capable: true,
    },
    other: {
      'twitter:site': '@f1cal',
    },
  };
}

const leagueSpartan = League_Spartan({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-league-spartan',
});

const locales = [
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
];

export default async function RootLayout({ children, params }) {
  const { locale } = await params;

  if (!locales.includes(locale as any)) notFound();

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <PlausibleProvider>
      <UserContextProvider>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <html lang={locale} className={leagueSpartan.className}>
            <head>
              <PlausibleProvider
                domain={process.env.NEXT_PUBLIC_PLAUSIBLE_KEY}
              />
              <script
                strategy="lazyOnload"
                data-name="BMC-Widget"
                data-cfasync="false"
                src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
                data-id="f1cal"
                data-description="Support F1 Calendar on Buy me a coffee!"
                data-message=""
                data-color="#d10f1e"
                data-position="Right"
                data-x_margin="18"
                data-y_margin="18"
                defer
              />

              <meta
                name="viewport"
                content="width=device-width, initial-scale=1, maximum-scale=5"
              />

              <meta name="msapplication-TileColor" content="#000000" />
              <meta name="theme-color" content="#03120f" />
              <meta name="format-detection" content="telephone=no" />
              <meta name="mobile-web-app-capable" content="yes" />

              {process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION && (
                <meta
                  name="google-site-verification"
                  content={process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION}
                />
              )}
            </head>
            <body>{children}</body>
          </html>
        </NextIntlClientProvider>
      </UserContextProvider>
    </PlausibleProvider>
  );
}
