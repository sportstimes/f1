import React from 'react';
import UserContext from '../components/UserContext';
import Link from 'next/link';
import dayjs from 'dayjs';
import dayjsutc from 'dayjs/plugin/utc';
import dayjstimezone from 'dayjs/plugin/timezone';
import styles from './OptionsBar.module.scss';
import withTranslation from 'next-translate/withTranslation';
import fixHref from 'next-translate/fixHref';
import ct from 'countries-and-timezones';

class OptionsBar extends React.Component {
    static contextType = UserContext

    constructor(props) {
        super(props)

        dayjs.extend(dayjsutc)
        dayjs.extend(dayjstimezone)

        this.state = {
            pickerShowing: false
        }
    }

    componentDidMount() {
        this.setState({
            pickerShowing: false
        })
    }

    onChange = event => {
        this.context.setTimezone(event.target.value);
    }

    togglePicker = event => {
        event.preventDefault()

        this.setState({
            pickerShowing: !this.state.pickerShowing
        })
    }

    render() {
        const {t, lang} = this.props.i18n


        // Picker Items
        const scrubbedPrefixes = ['Antarctica', 'Arctic', 'Canada', 'Chile', 'Etc', 'Mexico', 'US'];
        const scrubbedSuffixes = ['ACT', 'East', 'Knox_IN', 'LHI', 'North', 'NSW', 'South', 'West'];

        const allTimezones = ct.getAllTimezones();
        let timezoneNames = Object.keys(ct.getAllTimezones());
        const timezoneItems = []

        timezoneNames = timezoneNames.filter(name => name.indexOf('/') !== -1)
            .filter(name => !scrubbedPrefixes.includes(name.split('/')[0]))
            .filter(name => !scrubbedSuffixes.includes(name.split('/').slice(-1)[0]));

        timezoneNames.reduce((memo, tz) => {
            memo.push({
                name: tz,
                offset: allTimezones[tz].utcOffset,
                offsetString: allTimezones[tz].utcOffsetStr
            });

            return memo;
        }, [])
            .sort((a, b) => {
                return a.offset - b.offset
            })
            .reduce((memo, tz) => {
                timezoneItems.push(<option value={tz.name}
                                           key={tz.name}>(GMT{tz.offsetString}) {tz.name.replace("_", " ")}</option>);
            }, "");

        return (
            <div className={styles.options}>
                <div className={styles.bar}>
                    {this.state.pickerShowing ?
                        <div className={styles.picker}>
                            <form action="/" method="GET" id="timezone-picker">
                                <label htmlFor="timezone"
                                       className={styles.pickerLabel}>{t('common:options.timezonePicker.pick')}</label>
                                <select id="timezone" onChange={this.onChange} name="timezone"
                                        value={this.context.timezone}>
                                    {timezoneItems}
                                </select>

                                <button onClick={this.togglePicker}
                                        type="submit">{t('common:options.timezonePicker.button')}</button>
                                <noscript>
                                    <style>{`#timezone-picker { display:none; } `}</style>
                                </noscript>
                            </form>
                            <noscript>
                                <a href="/timezones">{t('common:options.timezonePicker.pick')}</a>
                            </noscript>
                        </div>
                        :
                        <div className={styles.options}>
                            <div className={styles.currentTimezone}>
                                <a onClick={this.togglePicker}>
                                    {t('common:options.timezonePicker.showing')} <strong>{this.context.timezone && this.context.timezone.replace("_", " ")}</strong>.
                                </a>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default withTranslation(OptionsBar)