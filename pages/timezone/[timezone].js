import {useState, useContext, useEffect} from 'react';
import UserContext from 'components/UserContext';
import Layout from 'components/Layout/Layout'
import Races from 'components/Race/Race';
import {NextSeo} from 'next-seo';
import useTranslation from "next-translate/useTranslation";
import RaceSchema from "components/RaceSchema/RaceSchema";
import Link from "next/link";
import {useRouter} from 'next/router'

const Timezone = (props) => {
  const router = useRouter()
  
  const {t, lang} = useTranslation()
  
  const currentYear = process.env.NEXT_PUBLIC_CURRENT_YEAR;

  const title = t(`${process.env.NEXT_PUBLIC_SITE_KEY}:seo.title`, {
    year: currentYear
  });
  const description = t(`${process.env.NEXT_PUBLIC_SITE_KEY}:seo.description`, {
    year: currentYear
  });
  const keywords = t(`${process.env.NEXT_PUBLIC_SITE_KEY}:seo.keywords`, {
    year: currentYear
  });
  
  const timezone = props.timezone ? props.timezone.replace("-", "/") : "";
  
  
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        keywords={keywords}
      />
      <Layout showCalendarExport='true' year={props.year} timezone={timezone}>
        <h3 className="text-xl mb-4">{timezone}</h3>
        <p><Link href="/timezones"><a>{t('common:options.timezonePicker.pick')}</a></Link><br/><br/></p>
  
        {router.isFallback ?
          <>
            <div>Loading...</div>
            <noscript>
              <meta httpEquiv="refresh" content="5"/>
            </noscript>
          </>
          :
          <>
  
            {props.races &&
            <Races year={props.year} races={props.races} timezone={timezone}/>
            }
  
            {props.races && props.races.map((item, index) => {
              if (item.sessions) {
                return (<RaceSchema item={item} key={item.name}/>)
              }
            })}
          </>
        }
      </Layout>
    </>
  );
}

export default Timezone;

export async function getStaticPaths() {
    return ({
        paths: [],
        fallback: true
    })
}

export async function getStaticProps({params}) {
  const currentYear = process.env.NEXT_PUBLIC_CURRENT_YEAR;

  try {
    const res = await fetch(`https://` + process.env.VERCEL_URL + `/api/year/` + currentYear + ``);
    const data = await res.json();

    return {
      props: {
        races: data.races,
        timezone: params.timezone
      }
    }
  } catch (error) {
    return {
      props: {
        year: currentYear
      }
    };
  }
}