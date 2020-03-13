import { useState, useContext } from 'react';
import UserContext from '../components/UserContext';
import Link from 'next/link';
const moment = require('moment-timezone')

class OptionsBar extends React.Component {
	static contextType = UserContext
	
	constructor(props) {
	   super(props)
	   
	   this.state = {
	       pickerShowing: true
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
		// Picker Items
		const timezoneItems = []
	    
    const scrubbedPrefixes = ['Antarctica', 'Arctic', 'Canada', 'Chile', 'Etc', 'Mexico', 'US'];
		const scrubbedSuffixes = ['ACT', 'East', 'Knox_IN', 'LHI', 'North', 'NSW', 'South', 'West'];

		const tzNames = moment.tz.names()
        .filter(name => name.indexOf('/') !== -1)
        .filter(name => !scrubbedPrefixes.includes(name.split('/')[0]))
        .filter(name => !scrubbedSuffixes.includes(name.split('/').slice(-1)[0]));
	    
	    tzNames.reduce((memo, tz) => {
				memo.push({
					name: tz,
					offset: moment.tz(tz).utcOffset()
				});
		
				return memo;
			}, [])
			.sort((a, b) => {
				return a.offset - b.offset
			})
			.reduce((memo, tz) => {
				const timezone = tz.offset ? moment.tz(tz.name).format('Z') : '';
		
				timezoneItems.push(<option value={tz.name} key={tz.name}>(GMT{timezone}) {tz.name.replace("_", " ")}</option>);
			}, "");
			
		return (
			<div className="timezone">
				<div className="bar">
					{this.state.pickerShowing ?
						<div className="picker">
							<form action="/" method="GET">
								<label htmlFor="timezone" className="picker-label">Pick a timezone...</label>
								
								<select id="timezone" onChange={this.onChange} name="timezone" value={this.context.timezone}>
									{timezoneItems}
								</select>
								
								<button onClick={this.togglePicker} type="submit">Done</button>
							</form>
						</div>	
					:
						<div className="options">
							<div className="currentTimezone">
								<a onClick={this.togglePicker}>
									Showing times for <strong>{this.context.timezone && this.context.timezone.replace("_", " ")}</strong>.
								</a>
							</div>
							{ this.props.showCalendarExport &&
							<div className="calendar">
								<a href="/generate">Add these race dates & times to your mobile, calendar, Outlook or Google Calendar</a>
							</div>
							}
						</div>
			        }	
					<style jsx>{`
						.bar {
							background:#1a8b73;
							color:#87f3dc;
							padding: 0 25px;	
							height:50px;
							line-height:50px;
							vertical-align:middle;
							margin:10px 0 15px 0;
							border-radius: 3px 3px 3px 3px;
							-moz-border-radius: 3px 3px 3px 3px;
							-webkit-border-radius: 3px 3px 3px 3px;
						}
						.bar a {
							color:#87f3dc;
						}
						.currentTimezone {
							cursor:pointer;
							float:left;
						}
						.calendar {
							float:right;
						}
						.calendar a {
							color: #fff;
							text-decoration:underline;	
						}
						strong {
							color:#fff;
							text-decoration:underline;	
						}
						select {
							margin: 0 5px;
						}
						button {
							background:#fff;
							color:#1a8b73;
							padding:3px;
							border:0;
							-webkit-border-radius: 3px;
							-moz-border-radius: 3px;
							border-radius: 3px;
							cursor:pointer;
						}
						@media screen and (max-width: 900px) {
							.currentTimezone {
								float:none;
								text-align:center;
							}
							
							.calendar {
								display:none;
							}
							
							.picker-label {
								display:none;
							}
							
							.picker {
								margin: 0 auto;
							}
							
							select {
								width:calc(100% - 90px);
							}
							button {
								width:80px;
							}
						}
						@media screen and (max-width: 500px) {
							.currentTimezone {
								font-size:11px;
							}
						}
				    `}</style>
				</div>
				
				
				<div className="mobile-calendar">
					<a href="/generate">Add these race dates & times to your mobile, calendar, Outlook or Google Calendar</a>					
					<style jsx>{`
						.mobile-calendar {
							display:none;
						}
						@media screen and (max-width: 900px) {
							.mobile-calendar {
								display:block;
								text-align:center;
								padding-bottom:12px;
							}	
							.mobile-calendar a {
								color: #fff;
								text-decoration:underline;
							}
						}
				    `}</style>
				</div>
			</div>
		);
	}
}

export default OptionsBar