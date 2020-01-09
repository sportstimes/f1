import {useState} from 'react'
import Layout from "../components/Layout";
import Share from "../components/Share";
import { NextSeo } from 'next-seo';

function Generate(props) {
	
	const currentYear = '2020';
	
	const [form, setState] = useState({
	    p1: true,
	    p2: true,
	    p3: true,
	    quali: true,
	    race: true,
	    alarm: false,
	    mins: 20,
	    submitted: false,
	    webcalURL: '',
	    googleURL: '',
	    downloadURL: ''
	})
	
		
	const handleOnSubmit = async e => {
		e.preventDefault()
		
		setState({
			...form, 
			submitted: true, 
			webcalURL:`webcal://www.f1calendar.com/download/f1-calendar${form.p1 ? '_p1' : ''}${form.p2 ? '_p2' : ''}${form.p3 ? '_p3' : ''}${form.quali ? '_q' : ''}${form.race ? '_gp' : ''}.ics`, 
			googleURL:`https://www.f1calendar.com/download/f1-calendar${form.p1 ? '_p1' : ''}${form.p2 ? '_p2' : ''}${form.p3 ? '_p3' : ''}${form.quali ? '_q' : ''}${form.race ? '_gp' : ''}.ics?t=12345`,
			downloadURL:`https://www.f1calendar.com/download/f1-calendar${form.p1 ? '_p1' : ''}${form.p2 ? '_p2' : ''}${form.p3 ? '_p3' : ''}${form.quali ? '_q' : ''}${form.race ? '_gp' : ''}.ics` 
		})		
	}
	
	return (
		<>
			<NextSeo
				title={`F1 Calendar ${currentYear}  - Formula One Race Times and Dates`}
				description={`Formula One Calendar for ${currentYear} season with all F1 grand prix races, practice &amp; qualifying sessions. Set reminders feature. All world timezones. Download or subscribe.`}
				keywords={`F1, formula one, race times, races, reminder, alerts, grands prix, grand prix, calendar, dates, start times, qualifying, practice, ${currentYear}, London, Europe`}
				canonical="https://www.f1calendar.com/"
				twitter={{
					handle: '@f1cal',
					site: '@f1cal',
					cardType: 'summary_large_image',
				}}
			/>
			<Layout year={ props.year }>
				{form.submitted ?
					<>	
						<h3>Select Calendar Type</h3>	
										
						<section className="card" id="download_option_ical">							
							<h4>For Mobile or Desktop</h4>
							<p>Automatically updating calendar for apps like Outlook and macOS Calendar.</p>
							
							<p>
								<a href={form.webcalURL} className="button">
									Get
								</a>
							</p>
						</section>
						
						<section className="card" id="download_option_google">
							<h4>For Google Calendar</h4>
							<p>To add this calendar, copy and paste this URL into Google Calendar (<a href="https://support.google.com/calendar/answer/37100?hl=en" target="_blank">detailed instructions</a>):</p>
							<p className="copyable">{form.googleURL}</p>
						</section>
												
						<section className="card" id="download_option">
							<h4>Download ICS File</h4>
							<p>Non-updating calendar (.ics) for calendars that can’t handle updating subscriptions.</p>		
							<p>					
								<a href={form.downloadURL} className="button">
									Download
								</a>
							</p>
						</section>
					</>
				:				
					<>
						<h3>Generate Calendar</h3>
						<section className="card">
							<p>First, pick which F1 race weekend sessions you would like to add to your calendar:</p>
							
							<form id="download_subscribe" onSubmit={handleOnSubmit}>	
								<fieldset>
									<div className="field">
										<input type="checkbox" name="p1" id="p1" defaultValue="on" defaultChecked="checked" onChange={event => setState({...form, p1: event.target.checked })} />
										<label htmlFor="p1">Practice 1</label>
									</div>
		
									<div className="field">
										<input type="checkbox" name="p2" id="p2" defaultValue="on" defaultChecked="checked" onChange={event => setState({...form, p2: event.target.checked })} />
										<label htmlFor="p2">Practice 2</label>
									</div>
		
									<div className="field">
										<input type="checkbox" name="p3" id="p3" defaultValue="on" defaultChecked="checked" onChange={event => setState({...form, p3: event.target.checked })} />
										<label htmlFor="p3">Practice 3</label>
									</div>
		
									<div className="field">
										<input type="checkbox" name="q" id="q" defaultValue="on" defaultChecked="checked" onChange={event => setState({...form, quali: event.target.checked })} />
										<label htmlFor="q">Qualifying</label>
									</div>
		
									<div className="field">
										<input type="checkbox" name="gp" id="gp" defaultValue="on" defaultChecked="checked" onChange={event => setState({...form, race: event.target.checked })} />
										<label htmlFor="gp">Grand Prix</label>
									</div>
								</fieldset>
		
								<fieldset id="set_alarms">
									<div className="field">
										<input type="checkbox" name="alarm" id="alarm" value="off" onChange={event => setStatus(prevStatus => ({ ...form, alarm: event.target.checked }))} />
										<label htmlFor="alarm">Set a reminder</label> <input type="number" name="mins" id="alarm-mins" step="5" min="0" max="120" defaultValue="20" onChange={event => setStatus(prevStatus => ({ ...prevStatus, mins: event.target.value }))} /><label htmlFor="alarms-before">minutes before each event in your season calendar</label>
									</div>
								</fieldset>
								
								<fieldset id="buttons">
									<button type="submit">
							          {!form.submitted
							              ? 'Get Calendar'
							              : 'Submitted'}
							        </button>
								</fieldset>
							</form>
						</section>
					</>
				}
				<style jsx>{`
					.card {
						background:#141414;
						-webkit-border-radius: 15px;
						-moz-border-radius: 15px;
						padding:25px;
						margin-bottom:16px;
					}
					.card h4 {
						margin-top:0;	
					}
					.card p {
						margin-bottom:15px;
					}
					
					
					form {
					}
					fieldset {
						border:0;
						margin:0 0 15px 0;
						padding:0;	
					}
					
					p {
						margin-bottom: 15px;	
					}
					
					.copyable {
						font-family:monospace;
						color:#2a2a2a;
						background:#FFF;
						padding:.5em;
						border-radius:4px;
						margin-top:.5em;
						width:100%;
					}
					
					button {
						background: #1a8b73;
						-webkit-border-radius: 4px;
						-moz-border-radius: 4px;
						padding: 12px 15px;
						font-size:15px;
						border:0;
						color:#fff;
						cursor: pointer;
					}
					
					.button {
						background: #1a8b73;
						-webkit-border-radius: 4px;
						-moz-border-radius: 4px;
						padding: 12px 15px;
						font-size:15px;
						border:0;
						color:#fff;
						cursor: pointer;
					}
					
					section {
						
					}
					
					hr {
						border: 1px solid #151515;
						width: 25%;
						margin: 15px auto;		
					}
					
			    `}</style>
			</Layout>
		</>
	);
}

Generate.getInitialProps = async () => {
	return {
	    year: "2020"
	}
}


export default Generate;