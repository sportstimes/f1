import React from 'react';
import App from 'next/app';
import Router from 'next/router';
import UserContext from '../components/UserContext';
const moment = require('moment-timezone')

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
				<Component {...pageProps} />
			</UserContext.Provider>
		);
	}
}