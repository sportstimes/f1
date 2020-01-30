import { useState, useContext } from 'react';
import UserContext from '../components/UserContext';
import moment from 'moment'
import Test from '../components/Test';

class Testing extends React.Component {
	static contextType = UserContext

	render() {
		return (
		<div className="testing">
		
			<h3>{ this.props.year } Pre-Season Testing</h3>
		
			<table id="launches-table">
				<thead>
					<tr className="table-head">
						<th scope="col" className="event-column">Pre-Season Testing {this.props.year}</th>
						<th scope="col" className="date-column">Date</th>
					</tr>
				</thead>
				
				{this.props.testing && this.props.testing.map((item, index) => {
					return (<Test item={item} index={index} timezone={this.context.timezone} key={item.slug} />)
				})}   
		    </table>
		    <style jsx>{`
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

export default Testing