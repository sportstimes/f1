import Layout from 'components/Layout/Layout';
import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Card from 'components/Card/Card';

export interface Props {
  params: { subscriberID: string; locale: string };
}

export default async function Confirmation({ params }: Props) {
  const { subscriberID, locale } = await params;
  setRequestLocale(locale);

  const config = require(
    `/_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`,
  );

  const res = await fetch(
    `https://${config.url}/api/email/confirmation/${subscriberID}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  return (
    <Layout>
      <h3 className="text-xl mb-4">Awesome!</h3>
      <Card>
        <p>Your email has been confirmed.</p>
      </Card>
    </Layout>
  );
}
