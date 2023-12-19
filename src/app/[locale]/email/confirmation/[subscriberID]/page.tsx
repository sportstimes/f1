import Notice from "../components/Notice/Notice";
import OptionsBar from "../components/OptionsBar/OptionsBar";
import Races from "../components/Races/Races";
import RaceSchemas from '../components/RaceSchemas/RaceSchemas';

export interface Props {
  params: { subscriberID: string };
}

export default async function Confirmation({params}: Props) {
  const config = require(`/_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`)
  
  const res = await fetch(`https://${config.url}/api/email/confirmation/${params.subscriberID}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  const result = await res.json()
  
  return (
    <Layout>
      <h3 className="text-xl mb-4">Awesome!</h3>
      <Card>
        <p>Your email has been confirmed.</p>
      </Card>
    </Layout>
  );
}