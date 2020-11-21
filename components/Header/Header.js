import React, {Component} from 'react';
import Logo from "../Logo/Logo";
import withTranslation from 'next-translate/withTranslation'
import i18nConfig from '../../i18n.json'
import Router from 'next-translate/Router'
import CTABar from '../CTABar/CTABar'
import Link from 'next-translate/Link'
import {HeaderBar, Branding} from "./HeaderStyles";
import SiteSwitcher from "@/f1/components/SiteSwitcher/SiteSwitcher";

class Header extends React.Component {
    render() {
        const {t, lang} = this.props.i18n;
        const title = t(process.env.NEXT_PUBLIC_LOCALE_PREFIX + `:title`);

        const {languageNames} = i18nConfig;

        return (
            <>
                <SiteSwitcher/>
                <HeaderBar>
                    <div className="container">
                        <Branding>
                            <div className="logomark">
                                <Logo/>
                            </div>
                            <div className={lang == "ru" ? "brandingTextFallback" : "brandingText"}>
                                <h1>
                                    <Link href="/">
                                        <a name={title}>
                                            {title}&nbsp;
                                            {this.props.year &&
                                            <span>{this.props.year}</span>
                                            }

                                            {lang != "en" &&
                                            <span> | {languageNames[lang]}</span>
                                            }
                                        </a>
                                    </Link>
                                </h1>
                                <h2><Link href="/"><a name={title}>{t('common:subtitle')}</a></Link></h2>
                            </div>
                            <div className="clear"></div>
                        </Branding>
                        <div className="clear"></div>

                        {this.props.showCTABar &&
                        <CTABar/>
                        }

                    </div>
                </HeaderBar>
            </>
        )
    }
}

export default withTranslation(Header)