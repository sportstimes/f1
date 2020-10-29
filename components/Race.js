import React, {useState} from 'react';
import styles from './Race.module.scss'
import withTranslation from 'next-translate/withTranslation'
import dayjs from 'dayjs'
import dayjsutc from "dayjs/plugin/utc";
import dayjstimezone from "dayjs/plugin/timezone";
import dayjslocalized from "dayjs/plugin/localizedFormat";

class Race extends React.Component {

    constructor(props) {
        super(props)

        dayjs.extend(dayjsutc)
        dayjs.extend(dayjstimezone)
        dayjs.extend(dayjslocalized)

        this.state = {
            collapsed: true
        }
    }

    handleRowClick() {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    componentDidMount() {
        this.setState({
            collapsed: true
        })
    }

    render() {
        const {t, lang} = this.props.i18n
        const localeKey = 'calendar:races.' + this.props.item.localeKey;

        if (lang === "en") {
            dayjs.locale(this.props.locale);
        } else {
            dayjs.locale(lang);
        }

        function badgeColumnLayout(props) {
            if (props.item.tbc) {
                return (<span title={t('calendar:badges.tbc_title')} className={styles.tbc}>{t('calendar:badges.tbc')}</span>);
            } else if (props.item.canceled) {
                return (<span className={styles.canceled}>{t('calendar:badges.canceled')}</span>);
            } else if (props.item.affiliate) {
                if (dayjs(props.item.sessions.race).isBefore()) {
                    return (<a className={styles.tickets}>{t('calendar:badges.tickets')}</a>);
                } else {
                    return (<a href={props.item.affiliate}
                               className={styles.ticketsOver}>{t('calendar:badges.tickets')}</a>);
                }
            } else {
                return (``);
            }
        }

        if (this.props.item.sessions == null) {
            return (
                <tbody id={this.props.item.slug} key={this.props.item.slug}
                       className={`${this.props.index % 2 === 0 ? 'even' : 'odd'} ${this.props.item.canceled ? styles.canceledWeekend : ''} ${this.props.item.tbc ? styles.tbcWeekend : ''}`}>
                <tr key={this.props.item.slug} className={styles.race}>
                    <td className={styles.iconColumn}>
                        <i class="fas fa-question fa-xs"></i>
                    </td>
                    <td className={styles.eventColumn}>
						<span>
						  {t(`calendar:races.${this.props.item.localeKey}`) != localeKey ? (
                              t(`calendar:races.${this.props.item.localeKey}`)
                          ) : (
                              this.props.item.name
                          )
                          }
						</span>
                    </td>
                    <td className={styles.dateColumn}></td>
                    <td className={styles.timeColumn}></td>
                    <td className={styles.badgeColumn}>
                        {ticketColumnLayout(this.props)}
                    </td>
                </tr>
                </tbody>
            );
        }

        return (
            <tbody id={this.props.item.slug} key={this.props.item.slug}
                   className={`${dayjs(this.props.item.sessions.race).add(2, 'hours').isBefore() ? styles.past : ''} ${this.props.index % 2 === 0 ? 'even' : styles.odd} ${this.props.isNextRace ? styles.nextEvent : ''} ${this.props.item.canceled ? styles.canceledWeekend : ''} ${this.props.item.tbc ? styles.tbcWeekend : ''}`}>
            <tr key={this.props.item.slug} className={styles.race} onClick={() => this.handleRowClick()}>
                <td className={styles.iconColumn}>
                    {this.state.collapsed ?
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 448"><path fill="white" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
                    :
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="white" d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"/></svg>
                    }


                    <i aria-hidden className={`${this.state.collapsed ? 'fas fa-caret-right fa-xs' : 'fas fa-caret-down fa-xs'}`}></i>
                </td>
                <td className={styles.eventColumn}>
						<span
                            className={`${!this.props.item.tbc && !this.props.item.canceled && dayjs(this.props.item.sessions.race).isAfter() ? styles.confirmedWeekend : ''}`}>
						  
						  {t(`calendar:races.${this.props.item.localeKey}`) != localeKey ? (
                              t(`calendar:races.${this.props.item.localeKey}`)
                          ) : (
                              this.props.item.name
                          )
                          }
						  
						</span>

                    {this.props.isNextRace && !this.props.item.tbc && !this.props.item.canceled &&
                    <span className={styles.next}>{t(`calendar:badges.next`)}</span>
                    }
                </td>
                <td className={styles.dateColumn}>{dayjs(this.props.item.sessions.race).tz(this.props.timezone).format('D MMM')}</td>
                <td className={styles.timeColumn}>{dayjs(this.props.item.sessions.race).tz(this.props.timezone).format('LT')}</td>
                <td className={styles.badgeColumn}>
                    {badgeColumnLayout(this.props)}
                </td>
            </tr>

            {this.props.item.sessions.fp1 &&
            <tr className={`free-practice-1 ${this.state.collapsed ? styles.collapsed : ''}`}>
                <td className={styles.iconColumn}></td>
                <td className={styles.eventColumn}>
                    {t('calendar:schedule.fp1')}
                </td>
                <td className={styles.dateColumn}>{dayjs(this.props.item.sessions.fp1).tz(this.props.timezone).format('D MMM')}</td>
                <td className={styles.timeColumn}>{dayjs(this.props.item.sessions.fp1).tz(this.props.timezone).format('LT')}</td>
                <td></td>
            </tr>
            }

            {this.props.item.sessions.fp2 &&
            <tr className={`free-practice-2 ${this.state.collapsed ? styles.collapsed : ''}`}>
                <td className={styles.iconColumn}></td>
                <td className={styles.eventColumn}>
                    {t('calendar:schedule.fp2')}
                </td>
                <td className={styles.dateColumn}>{dayjs(this.props.item.sessions.fp2).tz(this.props.timezone).format('D MMM')}</td>
                <td className={styles.timeColumn}>{dayjs(this.props.item.sessions.fp2).tz(this.props.timezone).format('LT')}</td>
                <td></td>
            </tr>
            }

            {this.props.item.sessions.fp3 &&
            <tr className={`free-practice-3 ${this.state.collapsed ? styles.collapsed : ''}`}>
                <td className={styles.iconColumn}></td>
                <td className={styles.eventColumn}>
                    {t('calendar:schedule.fp3')}
                </td>
                <td className={styles.dateColumn}>{dayjs(this.props.item.sessions.fp3).tz(this.props.timezone).format('D MMM')}</td>
                <td className={styles.timeColumn}>{dayjs(this.props.item.sessions.fp3).tz(this.props.timezone).format('LT')}</td>
                <td></td>
            </tr>
            }

            <tr className={`qualifying ${this.state.collapsed ? styles.collapsed : ''}`}>
                <td className={styles.iconColumn}></td>
                <td className={styles.eventColumn}>
                    {t('calendar:schedule.qualifying')}
                </td>
                <td className={styles.dateColumn}>{dayjs(this.props.item.sessions.qualifying).tz(this.props.timezone).format('D MMM')}</td>
                <td className={styles.timeColumn}>{dayjs(this.props.item.sessions.qualifying).tz(this.props.timezone).format('LT')}</td>
                <td></td>
            </tr>
            </tbody>
        );
    }
}

export default withTranslation(Race)