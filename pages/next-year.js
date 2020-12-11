import Layout from "../components/Layout";
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation'
import styles from "../components/Subscribe.module.scss";

function NextYear() {
    const { t } = useTranslation()

    return (
        <>
            <NextSeo
                title={`F1 Calendar - Formula One Race Times and Dates`}
                description={`Formula One Calendar Archive with all F1 grand prix races, practice &amp; qualifying sessions. Set reminders feature. All world timezones. Download or subscribe.`}
                keywords={`F1, formula one, race times, races, reminder, alerts, grands prix, grand prix, calendar, dates, start times, qualifying, practice, London, Europe`}
                canonical="https://www.f1calendar.com/"
                twitter={{
                    handle: '@f1cal',
                    site: '@f1cal',
                    cardType: 'summary_large_image',
                }}
            />
            <Layout year='2020'>

                <section className={styles.subscribe}>
                    <h3>Our plans for 2021</h3>
                    <p>2020 has been quite a year to keep up with, not only did the site get completely rewritten but we&#39;ve added support for canceled races, virtual GPs and with the help of the community we&#39;ve even added 19 different languages.</p>
                    
                    <p>We&#39;ve already got the <a href="https://f1calendar.com/year/2021">2021 provisional calendar</a> live on the site but we have bigger plans in the works. We&#39;ll be adding new calendars to the family including F2, F3, Formula E and W Series. Each with the same functionality allowing you to never miss a session.</p>
                    
                    <p>The site will continue to be <a href="https://github.com/sportstimes/f1">open source</a>, allowing anyone to suggest or even contribute brand new motorsport series or entirely different sports. We&#39;re hoping to make it super flexible.</p>
                    
                    <p>Watch out in the coming months as we transition the site to 2021 and roll out the additional calendars.</p>
                    
                    <p>Also, a huge thanks to everyone who has supported the site by <a href="https://www.buymeacoffee.com/f1cal">buying a coffee</a> or three. We&#39;ve been able to add email reminders and purchase a few new domain names for our new 2021 calendar lineup as well as a few coffees to fuel development. Also thanks to <a href="https://vercel.com/?utm_source=sportstimes">Vercel</a> who host the site and kindly sponsored the site in 2020.</p>
                    
                    <p>Thanks for joining us for 2020, see you next year!</p>
                    
                    <p>- Andy, Andy & Si</p>
                    
                </section>
            </Layout>
        </>
    );
}


export default NextYear;