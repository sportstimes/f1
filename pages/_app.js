import React from 'react';
import App from 'next/app';
import Router from 'next/router';
import UserContext from '../components/UserContext';
const moment = require('moment-timezone')

export default class F1App extends App {	
  state = {
    timezone: null
  };

  componentDidMount = () => {
    const timezone = localStorage.getItem('timezone');
    if (timezone) {
      this.setState({
        timezone: timezone
      });
    } else {
      this.setState({
        timezone: moment.tz.guess()
      });
    }
  };
  
  setTimezone = (timezone) => {
    localStorage.setItem('timezone', timezone);

    this.setState(
      {
        timezone: timezone
      },
      () => {
	      
      }
    );
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