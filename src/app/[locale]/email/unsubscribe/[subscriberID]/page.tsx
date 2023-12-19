import Layout from "components/Layout/Layout";
import {useTranslations} from 'next-intl';
import Card from "components/Card/Card";

export interface Props {
  params: { subscriberID: string };
}

export default async function Unsubscribe({params}: Props) {
  const config = require(`/_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`)
  
  const res = await fetch(`https://${config.url}/api/email/unsubscribe/${params.subscriberID}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  //const result = await res.json()
  
  return (
    <Layout>
      <h3 className="text-xl mb-4">Sorry to see you go!</h3>
      <Card>
        <p>You have been unsubscribed.</p>
      </Card>
    </Layout>
  );
}