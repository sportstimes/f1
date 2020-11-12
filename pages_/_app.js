import React from 'react';
import App from 'next/app';
import UserContext from '../components/UserContext';
import dayjs from 'dayjs';
import dayjsutc from 'dayjs/plugin/utc';
import dayjstimezone from 'dayjs/plugin/timezone';
import { DefaultSeo } from 'next-seo';
import '../styles/style.scss'

export default class F1App extends App {
	
	constructor(props, context, query) {
		super();

		dayjs.extend(dayjsutc)
		dayjs.extend(dayjstimezone)

		let timezone =  dayjs.tz.guess()
		if(props.router.query.timezone){
			timezone = props.router.query.timezone.replace("-", "/")
		}

		let locale = "en";

		this.state = {
			timezone: timezone,
			locale: locale
		};
	};
	
	componentDidMount = (props) => {
		let timezone =  dayjs.tz.guess()
		if(localStorage.getItem('timezone')) {
			timezone = localStorage.getItem('timezone');
		}

		let locale = "en";
		if(window.navigator.userLanguage || window.navigator.language) {
			locale = window.navigator.userLanguage || window.navigator.language;
		}
		if(localStorage.getItem('locale')) {
			locale = localStorage.getItem('locale');
		}

		this.setState({
			timezone: timezone,
			locale: locale
		});
	};
	
	setTimezone = (timezone) => {
		if (typeof window !== 'undefined') {
			localStorage.setItem('timezone', timezone);
		}
	
		this.setState({
			timezone: timezone
		});
	};

	setLocale = (locale) => {
		if (typeof window !== 'undefined') {
			localStorage.setItem('locale', locale);
		}

		this.setState({
			locale: locale
		});
	};
	
	render() {
		const { Component, pageProps } = this.props;
	
		return (
			<UserContext.Provider value={{ timezone: this.state.timezone, setTimezone:this.setTimezone, locale: this.state.locale, setLocale:this.setLocale }}>
  			<DefaultSeo
          canonical="https://www.f1calendar.com/"
  				twitter={{
					handle: '@f1cal',
					site: '@f1cal',
					cardType: 'summary_large_image',
				}}
				openGraph={{
					url: "https://www.f1calendar.com/",
					title: "F1 Calendar 2020 - Formula One Race Times and Dates",
					description: "Formula One Calendar for 2020 season with all F1 grand prix races, practice &amp; qualifying sessions. Set reminders feature. All world timezones. Download or subscribe.",
					site_name: "F1 Calendar 2020",
					images: [
	          {
	            url: 'https://www.f1calendar.com/share.png',
	            width: 1200,
	            height: 628,
	            alt: 'F1 Calendar 2020',
	          },
	        ]
				}}
        />
				<Component {...pageProps} />
			</UserContext.Provider>
		);
	}
}