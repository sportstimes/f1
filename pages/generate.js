import {useState} from 'react'
import Layout from "../components/Layout";
import Share from "../components/Share";
import { NextSeo } from 'next-seo';

function Generate() {
	
	const currentYear = '2019';
	
	const [status, setStatus] = useState({
	    submitted: false,
	    submitting: false,
	    info: { error: false, msg: null }
	})
	
	const [inputs, setInputs] = useState({
		p1: true,
		p2: true,
		p3: true,
		q: true,
		gp: true,
		mins: 20
	})
	
	const handleOnSubmit = async e => {
		e.preventDefault()
		setStatus(prevStatus => ({ ...prevStatus, submitted: true }))
		
		console.log(JSON.stringify(inputs))
		
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
			<Layout>
				{status.submitted ?
					<section className="download">
						<h3>Select Calendar Type</h3>						
						<section id="download_option_ical">							
							<h4>For Mobile or Desktop</h4>
							<p>Automatically updating calendar for apps like Outlook and OS X Calendar.</p>
							
							<a href="webcal://www.f1calendar.com/download/f1-calendar_p1_p2_p3_q_gp.ics" className="button">
								Get
							</a>
						</section>
						
						<hr />
						
						<section id="download_option_google">
							<h4>For Google Calendar</h4>
							<p>To add this calendar, copy and paste this URL into Google Calendar (<a href="https://support.google.com/calendar/answer/37100?hl=en" target="_blank">detailed instructions</a>):</p>
							<p >https://www.f1calendar.com/download/f1-calendar_p1_p2_p3_q_gp.ics?t=1576929539</p>
						</section>
						
						<hr />
						
						<section id="download_option">
							<h4>Download ICS File</h4>
							<p>Non-updating calendar (.ics) for calendars that can’t handle updating subscriptions.</p>							
							<a href="https://www.f1calendar.com/download/f1-calendar_p1_p2_p3_q_gp.ics" className="button">
								Download
							</a>

						</section>
					</section>
				:
					<section>
						<h3>Generate Calendar</h3>
						<p>First, pick which F1 race weekend sessions you would like to add to your calendar:</p>
						
						<form id="download_subscribe" onSubmit={handleOnSubmit}>	
							<fieldset>
								<div class="field">
									<input type="checkbox" name="p1" id="p1" value="on" checked="checked" />
									<label for="p1">Practice 1</label>
								</div>
	
								<div class="field">
									<input type="checkbox" name="p2" id="p2" value="on" checked="checked" />
									<label for="p2">Practice 2</label>
								</div>
	
								<div class="field">
									<input type="checkbox" name="p3" id="p3" value="on" checked="checked" />
									<label for="p3">Practice 3</label>
								</div>
	
								<div class="field">
									<input type="checkbox" name="q" id="q" value="on" checked="checked" />
									<label for="q">Qualifying</label>
								</div>
	
								<div class="field">
									<input type="checkbox" name="gp" id="gp" value="on" checked="checked" />
									<label for="gp">Grand Prix</label>
								</div>
							</fieldset>
	
							<fieldset id="set_alarms">
								<div class="field">
									<input type="checkbox" name="alarm" id="alarm" value="on" />
									<label for="alarm">Set a reminder</label> <input type="number" name="mins" id="alarm-mins" step="5" min="0" max="120" value="20" /><label for="alarms-before">minutes before each event in your season calendar</label>
								</div>
							</fieldset>
							
							<fieldset id="buttons">
								<button type="submit" disabled={status.submitting}>
						          {!status.submitting
						            ? !status.submitted
						              ? 'Get Calendar'
						              : 'Submitted'
						            : 'Submitting...'}
						        </button>
							</fieldset>
						</form>
					</section>
				}
				<style jsx>{`
					form {
						border: 1px solid #151515;
						margin-bottom: 25px;
						-webkit-border-radius: 4px;
						-moz-border-radius: 4px;
						border-radius: 4px;
						vertical-align:middle;
					}
					fieldset {
						border:0;	
					}
					
					p {
						margin-bottom: 15px;	
					}
					
					button {
						background: #1a8b73;
						margin-bottom: 25px;
						-webkit-border-radius: 4px;
						-moz-border-radius: 4px;
						padding: 12px;
						font-size:15px;
						border:0;
						color:#fff;
						cursor: pointer;
					}
					
					.button {
						background: #1a8b73;
						margin-bottom: 25px;
						-webkit-border-radius: 4px;
						-moz-border-radius: 4px;
						padding: 12px;
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


export default Generate;