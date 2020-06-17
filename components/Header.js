import React, {Component} from 'react';
import Logo from "./Logo";
import OptionsBar from "./OptionsBar";
import styles from './Header.module.scss'
import withTranslation from 'next-translate/withTranslation'
import Link from 'next-translate/Link'
import i18nConfig from '../i18n.json'
import Router from 'next-translate/Router'
import ISO6391 from 'iso-639-1'

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
                        <div className={styles.brandingText}>
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
                        <label htmlFor="language"><span>{ t('common:languageSelector') }</span>
                            <select id="language" name="language" value={lang} onChange={this.onChange}>
                                {languageItems}
                            </select>
                        </label>
                    </div>

                    <div className={styles.clear}></div>
                    {this.props.showOptions &&
                    	<OptionsBar showCalendarExport={this.props.showCalendarExport}/>
                    }
                </div>
            </header>
        )
    }
}

export default withTranslation(Header)