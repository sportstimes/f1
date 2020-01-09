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
	    
	    moment.tz.names().reduce((memo, tz) => {
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
		
				timezoneItems.push(<option value={tz.name}>(GMT{timezone}) {tz.name}</option>);
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
								<Link href="/generate">
									<a>Add these race dates & times to your mobile, calendar, Outlook or Google Calendar</a>
								</Link>
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
					<Link href="/generate">
						<a>Add these race dates & times to your mobile, calendar, Outlook or Google Calendar</a>
					</Link>
					
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