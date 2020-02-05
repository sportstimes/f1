import { useState } from 'react';
import moment from 'moment'

class Launch extends React.Component {
	render() {
		return (
			<tbody id={ this.props.item.slug } key={ this.props.item.slug } className={`${this.props.index % 2 === 0 ? 'even' : 'odd'} ${this.props.isNextLaunch ? 'next-event' : ''}`}>			
				<tr key={this.props.item.slug} className="launch">
					<td className="event-column">
						{ this.props.item.team }
						
						{ this.props.isNextRace && !this.props.item.tbc &&
							<span className="next">NEXT</span>
						}
					</td>
					<td className="date-column">
						{ this.props.item.tbc &&
							<span className="tbc">TBC</span>
						}
						{ !this.props.item.tbc &&
							this.props.item.date
						}
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
				    text-align: right;
				    padding-right:15px;
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
				    background: #fff1aa;
				    color: #000;
				    padding: 0 3px;
				    margin-left:12px;
				    vertical-align:middle;
			    }
			    
			    .tbc {
				    border-radius: 3px 3px 3px 3px;
					-moz-border-radius: 3px 3px 3px 3px;
					-webkit-border-radius: 3px 3px 3px 3px;
					font-family: 'LeagueSpartan';
					font-size:10px;
					line-height:20px;
					letter-spacing:1px;
				    display:inline-block;
				    background: yellow;
				    color: #000;
				    padding: 0 3px;
				    margin-right:12px;
				    vertical-align:middle;
			    }
			    
				.odd { background: #151515; }
				.past {
					color: #aaa;
				}
				
				`}</style>
			</tbody>
		);
	}
}

export default Launch