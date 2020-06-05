import { useState } from 'react';
import moment from 'moment'
import styles from './Race.module.scss'

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
  	function badgeColumnLayout(props) {
      if(props.item.tbc){
        return (<span className={styles.tbc}>TBC</span>);
      } else if(props.item.canceled){
        return (<span className={styles.canceled}>Canceled</span>);
      } else if(props.item.affiliate) {
        if(moment(props.item.sessions.race).isBefore()){
          return (<a className={styles.tickets}>Tickets</a>);
        } else {
          return (<a href={ props.item.affiliate } className={styles.ticketsOver}>Tickets</a>);
        }
      } else {
        return (<a href={ props.item.affiliate } className={styles.ticketsOver}>Tickets</a>);
      }
    }

    if(this.props.item.sessions == null){
      return (
        <tbody id={ this.props.item.slug } key={ this.props.item.slug } className={`${this.props.index % 2 === 0 ? 'even' : 'odd'} ${this.props.item.canceled ? styles.canceledWeekend : ''} ${this.props.item.tbc ? styles.tbcWeekend : ''}`}>			
				<tr key={this.props.item.slug} className={styles.race}>
					<td className={styles.iconColumn}>
						<i class="fas fa-question fa-xs"></i>
					</td>
					<td className={styles.eventColumn}>
						<span>
						  { this.props.item.name } Grand Prix
						</span>
					</td>
					<td className={styles.dateColumn}></td>
					<td className={styles.timeColumn}></td>
					<td className={styles.badgeColumn}>
					  { ticketColumnLayout(this.props) }
					</td>
				</tr>
        </tbody>
      );
    }

  	
		return (
			<tbody id={ this.props.item.slug } key={ this.props.item.slug } className={`${moment(this.props.item.sessions.race).add(2, 'hours').isBefore() ? styles.past : ''} ${this.props.index % 2 === 0 ? 'even' : styles.odd } ${this.props.isNextRace ? styles.nextEvent : ''} ${this.props.item.canceled ? styles.canceledWeekend : ''} ${this.props.item.tbc ? styles.tbcWeekend : ''}`}>			
				<tr key={this.props.item.slug} className={styles.race} onClick={() => this.handleRowClick()}>
					<td className={styles.iconColumn}>
						<i className={`${this.state.collapsed ? 'fas fa-caret-right fa-xs' : 'fas fa-caret-down fa-xs'}`}></i>
					</td>
					<td className={styles.eventColumn}>
						<span className={`${!this.props.item.tbc && !this.props.item.canceled && moment(this.props.item.sessions.race).isAfter() ? styles.confirmedWeekend : ''}`}>
						  { this.props.item.name } Grand Prix
						</span>
						
						{ this.props.isNextRace && !this.props.item.tbc && !this.props.item.canceled &&
							<span className={styles.next}>NEXT</span>
						}
					</td>
					<td className={styles.dateColumn}>{ moment(this.props.item.sessions.race).tz(this.props.timezone).format('D MMM') }</td>
					<td className={styles.timeColumn}>{ moment(this.props.item.sessions.race).tz(this.props.timezone).format('HH:mm') }</td>
					<td className={styles.badgeColumn}>
					  { badgeColumnLayout(this.props) }
					</td>
				</tr>
				<tr className={`free-practice-1 ${this.state.collapsed ? styles.collapsed : styles.visible }`}>
					<td className={styles.iconColumn}></td>
					<td className={styles.eventColumn}>
						Free Practice 1
					</td>
					<td className={styles.dateColumn}>{ moment(this.props.item.sessions.fp1).tz(this.props.timezone).format('D MMM') }</td>
					<td className={styles.timeColumn}>{ moment(this.props.item.sessions.fp1).tz(this.props.timezone).format('HH:mm') }</td>
					<td></td>
				</tr>
				<tr className={`free-practice-2 ${this.state.collapsed ? styles.collapsed : styles.visible }`}>
					<td className={styles.iconColumn}></td>
					<td className={styles.eventColumn}>
						Free Practice 2
					</td>
					<td className={styles.dateColumn}>{ moment(this.props.item.sessions.fp2).tz(this.props.timezone).format('D MMM') }</td>
					<td className={styles.timeColumn}>{ moment(this.props.item.sessions.fp2).tz(this.props.timezone).format('HH:mm') }</td>
					<td></td>
				</tr>
				<tr className={`free-practice-3 ${this.state.collapsed ? styles.collapsed : styles.visible }`}>
					<td className={styles.iconColumn}></td>
					<td className={styles.eventColumn}>
						Free Practice 3
					</td>
					<td className={styles.dateColumn}>{ moment(this.props.item.sessions.fp3).tz(this.props.timezone).format('D MMM') }</td>
					<td className={styles.timeColumn}>{ moment(this.props.item.sessions.fp3).tz(this.props.timezone).format('HH:mm') }</td>
					<td></td>
				</tr>
				<tr className={`qualifying ${this.state.collapsed ? styles.collapsed : styles.visible }`}>
					<td className={styles.iconColumn}></td>
					<td className={styles.eventColumn}>
						Qualifying
					</td>
					<td className={styles.dateColumn}>{ moment(this.props.item.sessions.qualifying).tz(this.props.timezone).format('D MMM') }</td>
					<td className={styles.timeColumn}>{ moment(this.props.item.sessions.qualifying).tz(this.props.timezone).format('HH:mm') }</td>
					<td></td>
				</tr>
			</tbody>
		);
	}
}

export default Race