import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import React from 'react';
import Layout from 'components/Layout/Layout';
import Card from 'components/Card/Card';
import { usePlausible } from 'next-plausible';
import Form from './form';

export async function generateMetadata() {
  const t = await getTranslations('All');
  const currentYear = process.env.NEXT_PUBLIC_CURRENT_YEAR;

  return {
    title: `${t('form.title')} - ${t(`${process.env.NEXT_PUBLIC_SITE_KEY}.title`)} ${currentYear}`,
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

export default async function Generate({ children, params }) {
  const locale = (await params).locale;

  setRequestLocale(locale);

  const currentYear = process.env.NEXT_PUBLIC_CURRENT_YEAR;

  return (
    <Layout showCTABar={true} year={currentYear}>
      <Form />
    </Layout>
  );
}
