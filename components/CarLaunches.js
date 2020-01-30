import { useState, useContext } from 'react';
import UserContext from '../components/UserContext';
import moment from 'moment'
import Launch from '../components/Launch';

class CarLaunches extends React.Component {
	static contextType = UserContext

	render() {
		var nextLaunch
		
		
		return (
		<div className="car-launches">
		
			<h3>{ this.props.year } Car Launch Dates</h3>
		
			<table id="launches-table">
				<thead>
					<tr className="table-head">
						<th scope="col" className="event-column">Formula 1 Car Launches {this.props.year}</th>
						<th scope="col" className="date-column">Date</th>
					</tr>
				</thead>
				
				{this.props.launches && this.props.launches.map((item, index) => {
					var isNextLaunch = false
					if(moment(item.date).isAfter() && !nextLaunch){
						isNextLaunch = true
						nextLaunch = item
					}
					return (<Launch item={item} index={index} timezone={this.context.timezone} key={item.slug} isNextLaunch={isNextLaunch} />)
				})}   
		    </table>
		    <style jsx>{`
			    
			    .car-launches {
				    margin-bottom:50px;
			    }
			    
			    table {
			    	width:100%;
			    	border-collapse: collapse;
			    	margin-bottom:25px;
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
	}
}

export default CarLaunches