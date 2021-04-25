import {useState, useContext, useEffect} from 'react';
import UserContext from 'components/UserContext';
import Layout from 'components/Layout/Layout'
import Races from 'components/Races/Races';
import {NextSeo} from 'next-seo';
import useTranslation from "next-translate/useTranslation";
import RaceSchema from "components/RaceSchema/RaceSchema";
import Link from "next/link";
import {useRouter} from 'next/router'
import Notice from "components/Notice/Notice";

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
  
  var timezone = props.timezone ? props.timezone.replace("-", "/") : "";
  var displayTimezone = timezone;
  
  if(timezone == "Europe/Kyiv"){
    timezone = "Europe/Kiev";
  }
  
  const config = require(`../../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`);
  
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        keywords={keywords}
      />
      <Layout showCalendarExport='true' year={props.year} timezone={timezone}>
        <h3 className="text-xl mb-4">{displayTimezone}</h3>
        
        {router.isFallback ?
          <>
            <div>Loading...</div>
            <noscript>
              <meta httpEquiv="refresh" content="5"/>
            </noscript>
          </>
          :
          <>
            
            <p><Link href="/timezones"><a className="text-green-600">{t('common:options.timezonePicker.pick')}</a></Link><br/><br/></p>
            
            { config.notice != null &&
              <Notice />
            }
            
            {props.races &&
            <Races year={currentYear} races={props.races} timezone={timezone}/>
            }
  
            {props.races && config.siteKey == "f1" && props.races.map((item, index) => {
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
    const res = await fetch(`https://f1calendar.com/api/year/` + currentYear + ``);
    const data = await res.json();
    
    let timezone = params.timezone;
    if(timezone == "Europe/Kiev"){
      timezone = "Europe/Kyiv";
    }

    return {
      revalidate: 3600,
      props: {
        races: data.races,
        timezone: timezone
      }
    }
  } catch (error) {
    return {
      revalidate: 3600,
      props: {
        year: currentYear
      }
    };
  }
}