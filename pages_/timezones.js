import Layout from "../components/Layout";
import {NextSeo} from 'next-seo';
import Link from 'next/link';

const moment = require('moment-timezone')
import useTranslation from 'next-translate/useTranslation'

function Timezones() {
    const {t, lang} = useTranslation()
    const title = t('common:title')
    const subtitle = t('common:subtitle')
    const currentYear = '2020';
    const metaDescription = t('common:meta.description', {year: currentYear})
    const metaKeywords = t('common:meta.keywords', {year: currentYear})

    // Picker Items
    const timezoneItems = []
    let zoneslist = moment.tz.names()
    for (let zone in zoneslist) {
        let timezoneSlug = zoneslist[zone].replace(/\//g, "-");
        timezoneItems.push(<li key={zoneslist[zone]}><Link href={`timezone/${timezoneSlug}`}><a>{zoneslist[zone]}</a></Link></li>)
    }

    return (
        <>
            <NextSeo
                title={`${title} ${currentYear} - ${subtitle}`}
                description={metaDescription}
                keywords={metaKeywords}
            />
            <Layout>
                    <h3>{t('timezones:title')}</h3>
                <section className="card">
                    <p>
                        <ul>
                            {timezoneItems}
                        </ul>
                    </p>
                </section>

                <style jsx>{`
					a {
						color:#1a8b73;
					}
					
					.card {
						background:#141414;
						-webkit-border-radius: 15px;
						-moz-border-radius: 15px;
						padding:25px 25px 10px 25px;
						margin-bottom:16px;
					}
					
					.card ul {
					    list-style:none;
					    margin:0;
					    padding: 0;
					}
					
					.card p {
						margin-bottom:15px;
					}
					
			    `}</style>
            </Layout>
        </>
    );
}

export default Timezones;