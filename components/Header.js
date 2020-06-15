import React, {Component} from 'react';
import Logo from "./Logo";
import OptionsBar from "./OptionsBar";
import styles from './Header.module.scss'
import withTranslation from 'next-translate/withTranslation'
import Link from 'next-translate/Link'
import i18nConfig from '../i18n.json'
import Router from 'next-translate/Router'
import fixHref from 'next-translate/fixHref'

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

        Router.pushI18n({url: adjustedURL, options: {lang: event.target.value}})
    }

    render() {
        const {t, lang} = this.props.i18n
        const title = t('common:title')
        const {allLanguages} = i18nConfig

        // Picker Items
        const languageItems = []

        allLanguages.map((lng) => {
            languageItems.push(<option value={lng} key={lng}>{lng.toUpperCase()}</option>);
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
                                    <a>
                                        {title}&nbsp;
                                        {this.props.year &&
                                        <span>{this.props.year}</span>
                                        }

                                        {lang != "en" &&
                                        <span> | {lang.toUpperCase()}</span>
                                        }
                                    </a>
                                </Link>
                            </h1>
                            <h2><Link href="/"><a>{t('common:subtitle')}</a></Link></h2>
                        </div>
                        <div className={styles.clear}></div>
                    </div>

                    <div className={styles.languageSelector}>
                        <label for="language" className={styles.languageSelectorLabel}>{ t('common:languageSelector') }</label>
                        <select id="language" name="language" value={lang} onChange={this.onChange}>
                            {languageItems}
                        </select>
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