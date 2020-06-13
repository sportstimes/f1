import {useEffect} from 'react'
import {useRouter} from 'next/router'
import Layout from '../components/Layout';
import Races from '../components/Races';
import {NextSeo} from 'next-seo';
import Link from 'next/link';
import RaceSchema from '../components/RaceSchema';
import useTranslation from 'next-translate/useTranslation'

const Index = (props) => {
    const {t, lang} = useTranslation()
    const title = t('common:title')
    const subtitle = t('common:subtitle')

    const currentYear = '2020';
    const metaDescription = t('common:meta.description', {year: currentYear})
    const metaKeywords = t('common:meta.keywords', {year: currentYear})

    return (
        <>
            <NextSeo
                title={`${title} ${props.year} - ${subtitle}`}
                description={metaDescription}
                keywords={metaKeywords}
            />
            <Layout showOptions='true' showCalendarExport='true' year={props.year}>
                <Races year={props.year} races={props.races}/>
                {props.races && props.races.map((item, index) => {
                    if (item.sessions) {
                        return (<RaceSchema item={item} key={item.name}/>)
                    }
                })}
            </Layout>
        </>
    );
}

export default Index;

export const getStaticPaths = async () => {
    return ({
        paths: [],
        fallback: false,
    })
}

export const getStaticProps = async ({params}) => {
    const currentYear = '2020';

    const data = await import(`../db/` + currentYear + `.json`)

    return {
        props: {
            year: currentYear,
            races: data.races
        }
    }
};