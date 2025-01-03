import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import React from 'react';
import Layout from 'components/Layout/Layout';
import Card from 'components/Card/Card';
import { usePlausible } from 'next-plausible';
import { notFound } from 'next/navigation';
import Form from './form';

export async function generateMetadata() {
  const t = await getTranslations('All');
  const currentYear = process.env.NEXT_PUBLIC_CURRENT_YEAR;

  return {
    title: `${t('subscribe.title')} - ${t(`${process.env.NEXT_PUBLIC_SITE_KEY}.seo.title`, { year: currentYear })}`,
    description: t(`${process.env.NEXT_PUBLIC_SITE_KEY}.seo.description`, {
      year: currentYear,
    }),
    keywords: t(`${process.env.NEXT_PUBLIC_SITE_KEY}.seo.keywords`, {
      year: currentYear,
    }),
  };
}

export async function generateStaticParams() {
  return [];
}

export default async function Subscribe({ children, params }) {
  const locale = (await params).locale;

  setRequestLocale(locale);

  const currentYear = process.env.NEXT_PUBLIC_CURRENT_YEAR;

  const config = require(
    `/_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`,
  );

  if (!config.supportsEmailReminders) {
    notFound();
  }

  const t = await getTranslations('All');

  return (
    <Layout showCTABar={true} year={currentYear}>
      <h3 className="text-xl mb-4">{t('subscribe.title')}</h3>
      <Card>
        <p className="pl-px pb-5">{t('subscribe.description')}</p>
        <Form />
      </Card>
    </Layout>
  );
}
