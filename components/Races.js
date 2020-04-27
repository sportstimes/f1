import { useState, useContext } from 'react';
import UserContext from '../components/UserContext';
import moment from 'moment'
import Race from '../components/Race';

const Races = (props) => {
	
	const { timezone } = useContext(UserContext)
	
	const races = props.races
	
	var nextRace
	
	return (
	<div className="Races">
	  <h2 className="heading">F1 Schedule 2020</h2>
	  
	  <div className="notice">
	    Dates below are likely to change once a revised 2020 calendar is confirmed. <a href="https://www.formula1.com/en/latest/article.statement-from-f1-ceo-chase-carey-target-is-to-begin-season-in-austria.5zn2chyMjrqC8n0BkEt9e.html" target="_blank">Latest News</a>.
    </div>
	  
		<table id="events-table">
			<thead>
				<tr className="table-head">
					<th scope="col" className="icon-column"></th>
					<th scope="col" className="event-column">Formula 1 Grand Prix Events {props.year}</th>
					<th scope="col" className="date-column">Date</th>
					<th scope="col" className="time-column">Time</th>
				</tr>
			</thead>
			
			{races && races.map((item, index) => {
  			// TODO Improve this isNextRace logic
				var isNextRace = false
				if(item.sessions && moment(item.sessions.race).isAfter() && !nextRace && !item.canceled && !item.tbc){
					isNextRace = true
					nextRace = item
				}
				return (<Race item={item} index={index} timezone={timezone} key={item.slug} isNextRace={isNextRace} />)
			})}   
	    </table>
	    <style jsx>{`
		    .notice {
  		    background:#f87639;
  		    padding: 10px 25px;
  		    margin-bottom: 16px;
  		    border-radius: 3px 3px 3px 3px;
					-moz-border-radius: 3px 3px 3px 3px;
					-webkit-border-radius: 3px 3px 3px 3px;
		    }
		    
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
	    `}</style>  
	</div>
	);
};

export default Races;