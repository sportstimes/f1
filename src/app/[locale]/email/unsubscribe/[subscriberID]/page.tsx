import Layout from 'components/Layout/Layout';
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Card from 'components/Card/Card';

export interface Props {
  params: { subscriberID: string; locale: string };
}

export default async function Unsubscribe({ params }: Props) {
  const { subscriberID, locale } = await params;
  setRequestLocale(locale);

  const { headers } = await import('next/headers');
  const headersList = headers();
  const host = headersList.get('host');
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const baseUrl = `${protocol}://${host}`;
  const res = await fetch(`${baseUrl}/api/email/unsubscribe/${subscriberID}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return (
    <Layout>
      <h3 className="text-xl mb-4">Sorry to see you go!</h3>
      <Card>
        <p>You have been unsubscribed.</p>
      </Card>
    </Layout>
  );
}
