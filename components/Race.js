import { useState } from 'react';
import moment from 'moment'

export default class Race extends React.Component {
		
	constructor(props) {
	   super(props)
	   this.state = {
	       collapsed: true
	   }
	}
	
	handleRowClick() {
		this.setState({
			collapsed: !this.state.collapsed
		})
	}
	
	render() {
		return (
			<tbody id={ this.props.item.slug } key={ this.props.item.slug } className={`${moment(this.props.item.sessions.race).isBefore() ? 'past' : 'future'} ${this.props.index % 2 === 0 ? 'even' : 'odd'}`}>			
				<tr key={this.props.item.slug} className="race" onClick={() => this.handleRowClick()}>
					<td className="icon-column"><i className="fal fa-flag-checkered"></i></td>
					<td className="event-column">
						{ this.props.item.name }
					</td>
					<td className="date-column">{ moment(this.props.item.sessions.race).tz(this.props.timezone).format('D MMM') }</td>
					<td className="time-column">{ moment(this.props.item.sessions.race).tz(this.props.timezone).format('HH:mm') }</td>
				</tr>
				<tr className={`free-practice-1 ${this.state.collapsed ? 'collapsed' : 'visible'}`}>
					<td className="icon-column"></td>
					<td className="event-column">
						Free Practice 1
					</td>
					<td className="date-column">{ moment(this.props.item.sessions.fp1).tz(this.props.timezone).format('D MMM') }</td>
					<td className="time-column">{ moment(this.props.item.sessions.fp1).tz(this.props.timezone).format('HH:mm') }</td>
				</tr>
				<tr className={`free-practice-2 ${this.state.collapsed ? 'collapsed' : 'visible'}`}>
					<td className="icon-column"></td>
					<td className="event-column">
						Free Practice 2
					</td>
					<td className="date-column">{ moment(this.props.item.sessions.fp2).tz(this.props.timezone).format('D MMM') }</td>
					<td className="time-column">{ moment(this.props.item.sessions.fp2).tz(this.props.timezone).format('HH:mm') }</td>
				</tr>
				<tr className={`free-practice-3 ${this.state.collapsed ? 'collapsed' : 'visible'}`}>
					<td className="icon-column"></td>
					<td className="event-column">
						Free Practice 3
					</td>
					<td className="date-column">{ moment(this.props.item.sessions.fp3).tz(this.props.timezone).format('D MMM') }</td>
					<td className="time-column">{ moment(this.props.item.sessions.fp3).tz(this.props.timezone).format('HH:mm') }</td>
				</tr>
				<tr className={`qualifying ${this.state.collapsed ? 'collapsed' : 'visible'}`}>
					<td className="icon-column"></td>
					<td className="event-column">
						Qualifying
					</td>
					<td className="date-column">{ moment(this.props.item.sessions.qualifying).tz(this.props.timezone).format('D MMM') }</td>
					<td className="time-column">{ moment(this.props.item.sessions.qualifying).tz(this.props.timezone).format('HH:mm') }</td>
				</tr>
				<style jsx>{`
				
				td, th {
				    padding:16px;
			    }
			    
			    .race { cursor: pointer; }
			    
			    .icon-column { width: 1px; }
			    .date-column, .time-column { text-align:right; }
				
				.odd { background: #151515; }
				.past {
					color: #aaa;
				}
					
				.collapsed {
					display:none;	
				}
				
				`}</style>
			</tbody>
		);
	}
}