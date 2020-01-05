import { useState } from 'react';
import moment from 'moment'

class Race extends React.Component {
		
	constructor(props) {
	   super(props)
	   
	   this.state = {
	       collapsed: false
	   }
	}
	
	handleRowClick() {
		this.setState({
			collapsed: !this.state.collapsed
		})
	}
	
	componentDidMount() {
		this.setState({
			collapsed: true
		})
	}
	
	render() {
		return (
			<tbody id={ this.props.item.slug } key={ this.props.item.slug } className={`${moment(this.props.item.sessions.race).isBefore() ? 'past' : 'future'} ${this.props.index % 2 === 0 ? 'even' : 'odd'}`}>			
				<tr key={this.props.item.slug} className="race" onClick={() => this.handleRowClick()}>
					<td className="icon-column">
						<i className={`${this.state.collapsed ? 'fas fa-caret-right fa-xs' : 'fas fa-caret-down fa-xs'}`}></i>
					</td>
					<td className="event-column">
						{ this.props.item.tbc &&
							<span className="tbc">TBC</span>
						}
						{ this.props.item.name } Grand Prix
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
				    padding:16px 0;
			    }
			    
			    .icon-column {
				    padding:0;
				    text-align:center;
					font-size:20px;
					width:5%;
					color:#fff;   
			    }
			    
			    .event-column {
				    width:50%;
			    }
			    
			    .date-column {
				    width:25%;
			    }
			    
			    .time-column {
				    width:20%;
			    }
			    
			    .tbc {
				    border-radius: 3px 3px 3px 3px;
					-moz-border-radius: 3px 3px 3px 3px;
					-webkit-border-radius: 3px 3px 3px 3px;
					font-size:9px;
					font-weight:800;
				    display:inline-block;
				    background: yellow;
				    color: #000;
				    padding: 1px 3px;
				    margin-right:12px;
				    vertical-align:middle;
			    }
			    
			    .race { cursor: pointer; }
			    
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

export default Race