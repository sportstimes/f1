import React from 'react';
import App from 'next/app';
import UserContext from '../components/UserContext';
const moment = require('moment-timezone')
import { DefaultSeo } from 'next-seo';
import '../styles/style.scss'

export default class F1App extends App {
	
	constructor(props, context, query) {
		super(props, context, query);

		var timezone = moment.tz.guess()
		if(props.router.query.timezone){
			timezone = props.router.query.timezone.replace("-", "/")
		}
		
		this.state = {
			timezone: timezone
		};
	};
	
	componentDidMount = (props) => {
		var timezone = moment.tz.guess()
		if(localStorage.getItem('timezone')) {
			timezone = localStorage.getItem('timezone');
		}
		
		this.setState({
			timezone: timezone
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
	
	render() {
		const { Component, pageProps } = this.props;
	
		return (
			<UserContext.Provider value={{ timezone: this.state.timezone, setTimezone:this.setTimezone }}>
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