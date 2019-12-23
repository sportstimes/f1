import { useState, useContext } from 'react';
import UserContext from '../components/UserContext';
import data from '../db/2019.json'
import moment from 'moment'

const Races = (props) => {
	
	const { timezone } = useContext(UserContext)
	
	return (
	<div className="Races">
		{ timezone ? 
		<table id="events-table">
			<thead>
				<tr className="table-head">
					<th scope="col" className="icon-column"></th>
					<th scope="col" className="event-column">Formula 1 Grand Prix Events {props.year}</th>
					<th scope="col" className="date-column">Date</th>
					<th scope="col" className="time-column">Time</th>
				</tr>
			</thead>
			
			{data.races && data.races.map((item, index) =>
				
				<tbody id={ item.slug } key={ item.slug } className={`${moment(item.sessions.race).isBefore() ? 'past' : 'future'} ${index % 2 === 0 ? 'even' : 'odd'}`}>			
					<tr className="race" onClick={() => handleRowClick(item.slug)}>
						<td className="icon-column"><i className="fal fa-flag-checkered"></i></td>
						<td className="event-column">
							{ item.name }
						</td>
						<td className="date-column">{ moment(item.sessions.race).tz(timezone).format('D MMM') }</td>
						<td className="time-column">{ moment(item.sessions.race).tz(timezone).format('HH:mm') }</td>
					</tr>
					<tr className='free-practice-1 hidden'>
					<td className="icon-column"></td>
						<td className="event-column">
							Free Practice 1
						</td>
						<td className="date-column">{ moment(item.sessions.fp1).tz(timezone).format('D MMM') }</td>
						<td className="time-column">{ moment(item.sessions.fp1).tz(timezone).format('HH:mm') }</td>
					</tr>
					<tr className="free-practice-2 hidden">
						<td className="icon-column"></td>
						<td className="event-column">
							Free Practice 2
						</td>
						<td className="date-column">{ moment(item.sessions.fp2).tz(timezone).format('D MMM') }</td>
						<td className="time-column">{ moment(item.sessions.fp2).tz(timezone).format('HH:mm') }</td>
					</tr>
					<tr className="free-practice-3 hidden">
						<td className="icon-column"></td>
						<td className="event-column">
							Free Practice 3
						</td>
						<td className="date-column">{ moment(item.sessions.fp3).tz(timezone).format('D MMM') }</td>
						<td className="time-column">{ moment(item.sessions.fp3).tz(timezone).format('HH:mm') }</td>
					</tr>
					<tr className="qualifying hidden">
						<td className="icon-column"></td>
						<td className="event-column">
							Qualifying
						</td>
						<td className="date-column">{ moment(item.sessions.qualifying).tz(timezone).format('D MMM') }</td>
						<td className="time-column">{ moment(item.sessions.qualifying).tz(timezone).format('HH:mm') }</td>
					</tr>
				</tbody>
			)}    
		    <style jsx>{`
			    table {
			    	width:100%;
			    	border-collapse: collapse;
			    }
			    tr {
				}
			    td, th {
				    padding:16px;
			    }
			    table caption {
				    text-indent:-9999px;
			    }
			    .table-head {
				    display:none;
				}
				.icon-column { width: 20px; }
			    .date-column, .time-column { text-align:right; }
				.hidden { display:none; }
				.odd { background: #151515; }
				.past {
					color: #aaa;
				}
		    `}</style>
	    </table> 
	    :
	    <div>Loading</div>
	    }
	</div>
	);
};

export default Races;