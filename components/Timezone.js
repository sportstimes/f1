import { useState, useContext } from 'react';
import UserContext from '../components/UserContext';
import Link from 'next/link';
const moment = require('moment-timezone')

const Timezone = (props) => {
	
	const [showPicker, setShowPicker] = useState(false)
	const { setTimezone } = useContext(UserContext)
	const { timezone } = useContext(UserContext)
    
    const onChange = event => {
	    setTimezone(event.target.value);
    };
    
    // Picker Items
    const timezoneItems = []
	let zoneslist = moment.tz.names()
	for (let zone in zoneslist) {
		timezoneItems.push(<option key={zoneslist[zone]}>{zoneslist[zone]}</option>)
	}
    
	return (
		<div className="timezone">
			<div className="bar">
				{showPicker ?
					<div className="picker">
						Pick a timezone...
						
						<select onChange={onChange} value={timezone}>
							{timezoneItems}
						</select>
						
						<button onClick={() => setShowPicker(false)}>Done</button>
					</div>	
				:
					<div className="options">
						<div className="currentTimezone" onClick={() => setShowPicker(true)}>
							Showing times for <strong>{timezone && timezone.replace("_", " ")}</strong>.
						</div>
						<div className="calendar">
							<Link href="/generate">
								<a>Add these race dates & times to your mobile, calendar, Outlook or Google Calendar</a>
							</Link>
						</div>
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
						.calendar {
							display:none;
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

export default Timezone;