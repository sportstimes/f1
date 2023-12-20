import {ReactNode} from 'react';
import {getTranslations} from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('All');

  const config = require(`/_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`)
  const currentYear = process.env.NEXT_PUBLIC_CURRENT_YEAR;

  return {
    twitter: {
      card: 'summary_large_image',
      creator: '@f1cal',
      creatorId: '1467726470533754880',
      images: [`https://${config.url}/share.png`],
    },
    openGraph: {
      title: t(`${process.env.NEXT_PUBLIC_SITE_KEY}.seo.title`, {year: currentYear}),
      description: t(`${process.env.NEXT_PUBLIC_SITE_KEY}.seo.description`, {year: currentYear}),
      url: `https://${config.url}/`,
      siteName: t(`${process.env.NEXT_PUBLIC_SITE_KEY}.seo.title`, {year: currentYear}),
      images: [`https://${config.url}/share.png`],
      type: 'website'
    },
    appleWebApp: {
      title: t(`${process.env.NEXT_PUBLIC_SITE_KEY}.seo.title`, {year: currentYear}),
      statusBarStyle: 'black-translucent',
    }
  }
}

type Props = {
  children: ReactNode;
};

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({children}: Props) {
  return children;
}
