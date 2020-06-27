import React, {Component} from 'react';
import Logo from "./Logo";
import OptionsBar from "./OptionsBar";
import styles from './Header.module.scss'
import withTranslation from 'next-translate/withTranslation'
import Link from 'next-translate/Link'
import i18nConfig from '../i18n.json'
import Router from 'next-translate/Router'
import ISO6391 from 'iso-639-1'
import fixHref from "next-translate/fixHref";
import CTABar from "./CTABar";

class Header extends React.Component {
    onChange = event => {
        if(event.target.value === "add"){
            document.location.href = 'https://github.com/sportstimes/f1/tree/master/locales';
            return;
        }

        let adjustedURL = Router.pathname

        if (this.props != null && this.props.i18n != null && this.props.i18n.lang != null) {
            adjustedURL = adjustedURL.replace("/" + this.props.i18n.lang, "");
        }

        if (adjustedURL == "") {
            adjustedURL = "/";
        }

        if(adjustedURL.includes("[timezone]")){
            adjustedURL = "/timezones/"
        }

        Router.pushI18n({url: adjustedURL, options: {lang: event.target.value}})
    }

    render() {
        const {t, lang} = this.props.i18n
        const title = t('common:title')
        const {allLanguages} = i18nConfig

        // Picker Items
        const languageItems = []

        allLanguages.map((lng) => {
            languageItems.push(<option value={lng} key={lng}>{ISO6391.getNativeName(lng)}</option>);
        })

        languageItems.push(<option value="add" key="Add">{ t('common:contribute') } +</option>);

        return (
            <header className={styles.header}>
                <div className={styles.container}>
                    <div className={styles.branding}>
                        <div className={styles.logomark}>
                            <Logo/>
                        </div>
                        <div className={ lang == "ru" ? styles.brandingTextFallback : styles.brandingText}>
                            <h1>
                                <Link href="/">
                                    <a name={title}>
                                        {title}&nbsp;
                                        {this.props.year &&
                                        <span>{this.props.year}</span>
                                        }

                                        {lang != "en" &&
                                        <span> | {ISO6391.getNativeName(lang)}</span>
                                        }
                                    </a>
                                </Link>
                            </h1>
                            <h2><Link href="/"><a name={title}>{t('common:subtitle')}</a></Link></h2>
                        </div>
                        <div className={styles.clear}></div>
                    </div>

                    <div className={styles.languageSelector}>
                        <label htmlFor="languageSelector">{ t('common:languageSelector') }</label>
                        <select id="languageSelector" name="language" value={lang} onChange={this.onChange}>
                            {languageItems}
                        </select>
                    </div>

                    <div className={styles.social}>
                        <a href="https://twitter.com/f1cal" target="_blank" rel="noopener"><svg className={styles.twitter} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#1DA1F2" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/></svg></a>
                        {/*<a href=""><svg className={styles.facebook} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="#2670ff" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/></svg></a>*/}
                    </div>

                    <div className={styles.clear}></div>

                    { this.props.showCTABar &&
                        <CTABar />
                    }

                </div>
            </header>
        )
    }
}

export default withTranslation(Header)