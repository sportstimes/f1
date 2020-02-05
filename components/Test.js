import { useState } from 'react';
import moment from 'moment'

class Test extends React.Component {
	render() {
		return (
			<tbody key={ this.props.item.name } className={`${this.props.index % 2 === 0 ? 'even' : 'odd'}`}>			
				<tr key={this.props.item.name} className="test">
					<td className="event-column">
						{ this.props.item.name }, { this.props.item.location }
					</td>
					<td className="date-column">
						{ this.props.item.startDate } - { this.props.item.endDate }
					</td>
				</tr>
				<style jsx>{`
				
				td, th {
				    padding:16px 0;
			    }
			    
			    .icon-column {
				    padding:0;
				    text-align:center;
					font-size:20px;
					width:5%;
					min-width:40px;
					color:#fff;   
			    }
			    
			    .event-column {
				    width:50%;
				    padding-left:24px;
			    }
			    
			    .date-column {
				    width:50%;
				    text-align:right;
				    padding-right:15px;
			    }
			    
			    .next-event .race {
				    color:#fff1aa;
			    }
			    .race { cursor: pointer; }
			    
			    .start-date-column { text-align:right; }
				
				.odd { background: #151515; }				
				`}</style>
			</tbody>
		);
	}
}

export default Test