import Head from 'next/head';
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CookieConsent from "react-cookie-consent";
import styles from './Layout.module.scss'
import useTranslation from 'next-translate/useTranslation'

const Layout = props => {
    const {t, lang} = useTranslation()

    function setGoogleTags() {
        return {
            __html: `(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    		  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    		  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    		  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    		
    		  ga('create', 'UA-91583-25', 'auto');
    		  ga('require', 'displayfeatures');
    		  ga('send', 'pageview');`
        };
    }

    return (
        <div className={styles.content}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5"/>
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                <link rel="manifest" href="/site.webmanifest"/>
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#eb000f"/>
                <link rel="preload" as="script" href="//www.google-analytics.com/analytics.js"/>
                <meta name="msapplication-TileColor" content="#000000"/>
                <meta name="theme-color" content="#ffffff"/>

                <script dangerouslySetInnerHTML={setGoogleTags()}/>
            </Head>

            <noscript>
                <div className="noscript">{t('common:javascript')}</div>
            </noscript>

            <Header showCTABar={props.showCTABar} year={props.year}/>

            <div className={styles.main_content}>{props.children}</div>

            <Footer/>

            <CookieConsent
                location="bottom"
                buttonText={t('common:cookies.button')}
                cookieName="f1cal"
                style={{background: "#0E5143", zIndex: 999999, padding: "5px 0"}}
                buttonStyle={{color: "#000000", background: "#ffffff", fontSize: "13px"}}
                expires={150}
            >
                {t('common:cookies.title')}
            </CookieConsent>
        </div>
    );
};

export default Layout;