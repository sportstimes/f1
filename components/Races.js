import {useContext} from 'react';
import UserContext from '../components/UserContext';
import dayjs from 'dayjs'
import Race from '../components/Race';
import styles from './Races.module.scss'
import useTranslation from 'next-translate/useTranslation'

const Races = (props) => {
    const {t} = useTranslation()

    let {timezone, locale} = useContext(UserContext)
    const races = props.races

    if(props.timezone){
        timezone = props.timezone;
    }

    if(props.locale){
        locale = props.locale;
    }

    // TODO Improve this isNextRace logic
    let isNextRace = false
    let nextRace = null

    return (
        <div className={styles.races}>

            {/*<div className={styles.notice}>*/}
            {/*    <p>{t('calendar:notice.text')}</p>*/}
            {/*    <a href="https://www.formula1.com/en/latest/article.f1-schedule-2020-latest-information.3P0b3hJYdFDm9xFieAYqCS.html" rel="noopener"*/}
            {/*       target="_blank" className={styles.link}>*/}
            {/*        {t('calendar:notice.link')}*/}
            {/*    </a>*/}
            {/*    <div className={styles.clear}></div>*/}
            {/*</div>*/}

            <table id="events-table">
                <thead>
                <tr className={styles.tableHead}>
                    <th scope="col" className={styles.icon_column}></th>
                    <th scope="col" className={styles.event_column}>{t('calendar:event')} {props.year}</th>
                    <th scope="col" className={styles.date_column}>{t('calendar:date')}</th>
                    <th scope="col" className={styles.time_column}>{t('calendar:time')}</th>
                </tr>
                </thead>

                {races.map((item, index) => {
                    isNextRace = false
                    if (item.sessions && dayjs(item.sessions.race).isAfter() && !nextRace && !item.canceled && !item.tbc) {
                        isNextRace = true
                        nextRace = item
                    }
                    return (
                        <Race item={item} index={index} timezone={timezone} locale={locale} key={item.slug} isNextRace={isNextRace}/>)
                })}
            </table>
        </div>
    );
};

export default Races;