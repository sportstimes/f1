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
  	
  	function ticketColumnLayout(props) {
      if(props.item.tbc){
        return (
          <>
          <span className="tbc">TBC</span>
          <style jsx>{`
			    .tbc {
				    border-radius: 3px 3px 3px 3px;
					-moz-border-radius: 3px 3px 3px 3px;
					-webkit-border-radius: 3px 3px 3px 3px;
					font-size:12px;
					line-height:20px;
				    display:inline-block;
				    background: #999;
				    color: #000;
				    padding: 2px 5px;
				    margin-left:12px;
				    margin-right:12px;
				    vertical-align:middle;
			    }
			    `}</style>
			    </>
        );
      } else if(props.item.canceled){
        return (
          <>
          <span className="canceled">Canceled</span>
          <style jsx>{`
			    .canceled {
				    border-radius: 3px 3px 3px 3px;
					-moz-border-radius: 3px 3px 3px 3px;
					-webkit-border-radius: 3px 3px 3px 3px;
					font-family: 'LeagueSpartan';					font-size:10px;
					line-height:20px;
					letter-spacing:1px;
				    display:inline-block;
				    background: #e30010;
				    color: #000;
				    padding: 0 3px;
				    vertical-align:middle;
			    }
			    `}</style>
			    </>
        );
      } else if(props.item.affiliate) {
        if(moment(props.item.sessions.race).isBefore()){
          return (
            <>
            <a className="book">Tickets</a>
            <style jsx>{`
			    .book {
				    border-radius: 3px 3px 3px 3px;
					-moz-border-radius: 3px 3px 3px 3px;
					-webkit-border-radius: 3px 3px 3px 3px;
					font-size:12px;
					line-height:20px;
				    display:inline-block;
				    background: #333;
				    color: #fff;
				    padding: 2px 5px;
				    margin-left:12px;
				    margin-right:12px;
				    vertical-align:middle;
				    cursor: not-allowed;
				    opacity:0.5;
			    }
			    `}</style>
			    </>
          );
        } else {
          return (
             <>
            <a href={ props.item.affiliate } className="book">Tickets</a>
            <style jsx>{`
			    .book {
				    border-radius: 3px 3px 3px 3px;
					-moz-border-radius: 3px 3px 3px 3px;
					-webkit-border-radius: 3px 3px 3px 3px;
					font-size:12px;
					line-height:20px;
				    display:inline-block;
				    background: #1a8b73;
				    color: #fff;
				    padding: 2px 5px;
				    margin-left:12px;
				    margin-right:12px;
				    vertical-align:middle;
			    }
			    `}</style>
			    </>
          );
        }
      } else {
        return (
             <>
            <a href={ props.item.affiliate } className="book">Tickets</a>
            <style jsx>{`
              .book {
				    border-radius: 3px 3px 3px 3px;
  					-moz-border-radius: 3px 3px 3px 3px;
  					-webkit-border-radius: 3px 3px 3px 3px;
  					font-size:12px;
  					line-height:20px;
				    display:inline-block;
				    background: #333;
				    color: #fff;
				    padding: 2px 5px;
				    margin-left:12px;
				    margin-right:12px;
				    vertical-align:middle;
				    cursor: not-allowed;
				    opacity:0.5;
			    }
			    `}</style>
			    </>
        );
      }
    }

    if(this.props.item.sessions == null){
      return (
        <tbody id={ this.props.item.slug } key={ this.props.item.slug } className={`${this.props.index % 2 === 0 ? 'even' : 'odd'} ${this.props.item.canceled ? 'canceled-weekend' : ''} ${this.props.item.tbc ? 'tbc-weekend' : ''}`}>			
				<tr key={this.props.item.slug} className="race">
					<td className="icon-column">
						<i class="fas fa-question fa-xs"></i>
					</td>
					<td className="event-column">
						<span className="unconfirmed">
						  { this.props.item.name } Grand Prix
						</span>
					</td>
					<td className="date-column"></td>
					<td className="time-column"></td>
					<td className="ticket-column">
					  { ticketColumnLayout(this.props) }
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
          width:55%;
        }
        .event-column .confirmed {
          font-weight:bold; 
        }
        
        .date-column {
          width:20%;
        }
        
        .time-column {
          width:20%;
          padding-right:15px;
        }
        
        .ticket-column {
          text-align:center; 
        }
        
        .race { cursor: pointer; }
        
        .date-column, .time-column { text-align:right; }
        
        .odd { background: #151515; }
        
        .canceled {
          color: #aaa;
          text-decoration:line-through;
        }
        
        .tbc-weekend {
          color: #999;
        }
        
        .canceled-weekend {
          color: #999;
          text-decoration:line-through;
        }
        
        .collapsed {
          display:none;	
        }
        
        @media screen and (max-width: 500px) {
          .book {
            margin-left:0;
            margin-right:6px;
            font-size:10px;
          }
          .event-column .confirmed {
            font-weight:normal !important; 
          }
        }
        
        `}</style>
        </tbody>
      );
    }

  	
		return (
			<tbody id={ this.props.item.slug } key={ this.props.item.slug } className={`${moment(this.props.item.sessions.race).add(2, 'hours').isBefore() ? 'past' : 'future'} ${this.props.index % 2 === 0 ? 'even' : 'odd'} ${this.props.isNextRace ? 'next-event' : ''} ${this.props.item.canceled ? 'canceled-weekend' : ''} ${this.props.item.tbc ? 'tbc-weekend' : ''}`}>			
				<tr key={this.props.item.slug} className="race" onClick={() => this.handleRowClick()}>
					<td className="icon-column">
						<i className={`${this.state.collapsed ? 'fas fa-caret-right fa-xs' : 'fas fa-caret-down fa-xs'}`}></i>
					</td>
					<td className="event-column">
						<span className={`${!this.props.item.tbc && !this.props.item.canceled && moment(this.props.item.sessions.race).isAfter() ? 'confirmed' : 'unconfirmed'}`}>
						  { this.props.item.name } Grand Prix
						</span>
						
						{ this.props.isNextRace && !this.props.item.tbc && !this.props.item.canceled &&
							<span className="next">NEXT</span>
						}
					</td>
					<td className="date-column">{ moment(this.props.item.sessions.race).tz(this.props.timezone).format('D MMM') }</td>
					<td className="time-column">{ moment(this.props.item.sessions.race).tz(this.props.timezone).format('HH:mm') }</td>
					<td className="ticket-column">
					  { ticketColumnLayout(this.props) }
					</td>
				</tr>
				<tr className={`free-practice-1 ${this.state.collapsed ? 'collapsed' : 'visible'}`}>
					<td className="icon-column"></td>
					<td className="event-column">
						Free Practice 1
					</td>
					<td className="date-column">{ moment(this.props.item.sessions.fp1).tz(this.props.timezone).format('D MMM') }</td>
					<td className="time-column">{ moment(this.props.item.sessions.fp1).tz(this.props.timezone).format('HH:mm') }</td>
					<td></td>
				</tr>
				<tr className={`free-practice-2 ${this.state.collapsed ? 'collapsed' : 'visible'}`}>
					<td className="icon-column"></td>
					<td className="event-column">
						Free Practice 2
					</td>
					<td className="date-column">{ moment(this.props.item.sessions.fp2).tz(this.props.timezone).format('D MMM') }</td>
					<td className="time-column">{ moment(this.props.item.sessions.fp2).tz(this.props.timezone).format('HH:mm') }</td>
					<td></td>
				</tr>
				<tr className={`free-practice-3 ${this.state.collapsed ? 'collapsed' : 'visible'}`}>
					<td className="icon-column"></td>
					<td className="event-column">
						Free Practice 3
					</td>
					<td className="date-column">{ moment(this.props.item.sessions.fp3).tz(this.props.timezone).format('D MMM') }</td>
					<td className="time-column">{ moment(this.props.item.sessions.fp3).tz(this.props.timezone).format('HH:mm') }</td>
					<td></td>
				</tr>
				<tr className={`qualifying ${this.state.collapsed ? 'collapsed' : 'visible'}`}>
					<td className="icon-column"></td>
					<td className="event-column">
						Qualifying
					</td>
					<td className="date-column">{ moment(this.props.item.sessions.qualifying).tz(this.props.timezone).format('D MMM') }</td>
					<td className="time-column">{ moment(this.props.item.sessions.qualifying).tz(this.props.timezone).format('HH:mm') }</td>
					<td></td>
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
			    width:55%;
		    }
		    .event-column .confirmed {
			    font-weight:bold; 
		    }
		    
		    .date-column {
			    width:20%;
		    }
		    
		    .time-column {
			    width:20%;
			    padding-right:15px;
		    }
		    
		    .ticket-column {
			    text-align:center; 
		    }
		    
		    .next-event .race {
			    color:#f87639;
		    }
		    
		    .next {
          border-radius: 3px 3px 3px 3px;
          -moz-border-radius: 3px 3px 3px 3px;
          -webkit-border-radius: 3px 3px 3px 3px;
          font-family: 'LeagueSpartan';
          font-size:10px;
          line-height:20px;
          letter-spacing:1px;
			    display:inline-block;
			    background: #f87639;
			    color: #000;
			    padding: 0 3px;
			    margin-left:12px;
			    vertical-align:middle;
		    }
		    
		    .race { cursor: pointer; }
		    
		    .date-column, .time-column { text-align:right; }
				
				.odd { background: #151515; }
				
				.past {
					color: #aaa;
					text-decoration:line-through;
				}
				
				.canceled {
					color: #aaa;
					text-decoration:line-through;
				}
				
				.tbc-weekend {
					color: #999;
				}
				
				.canceled-weekend {
					color: #999;
					text-decoration:line-through;
				}
					
				.collapsed {
					display:none;	
				}
				
				@media screen and (max-width: 500px) {
					.next {
						display:none;
					}
					.book {
						margin-left:0;
				    margin-right:6px;
				    font-size:10px;
					}
					.event-column .confirmed {
  			    font-weight:normal !important; 
			    }
				}
				`}</style>
			</tbody>
		);
	}
}

export default Race