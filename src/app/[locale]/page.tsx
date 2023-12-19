import Layout from "components/Layout/Layout";
import Notice from "components/Notice/Notice";
import OptionsBar from "components/OptionsBar/OptionsBar";
import Races from "components/Races/Races";
import RaceSchemas from 'components/RaceSchemas/RaceSchemas';

export default function Page() {
  const currentYear = process.env.NEXT_PUBLIC_CURRENT_YEAR;
  const year = require(`../../../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/${process.env.NEXT_PUBLIC_CURRENT_YEAR}.json`);

  return (
    <Layout showCTABar={true} year={currentYear}>
      <OptionsBar pickerShowing={false} />
      <Notice />
      <Races year={currentYear} races={year.races} />
    </Layout>
  )
}