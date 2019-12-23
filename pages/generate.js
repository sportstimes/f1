import {useState} from 'react'
import Layout from "../components/Layout";
import Share from "../components/Share";

function Generate() {
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
		<div>
			<Layout>
				{status.submitted ?
					<section>
					<p>Last Step: Select Calendar Type:</p>
					
					<ul id="download_options" class="alarms-disabled">
						<li id="download_option_ical">
							<a href="webcal://www.f1calendar.com/download/f1-calendar_p1_p2_p3_q_gp.ics">
								<h2>For Mobile or Desktop</h2>
								<p>Automatically updating calendar for apps like Outlook and OS X Calendar.</p>
								<button type="button">Go!</button>
							</a>
						</li>
						<li id="download_option_google">
							<div>
								<h2>For Google Calendar</h2>
								<p>To add this calendar, copy and paste this URL into Google Calendar (<a href="https://support.google.com/calendar/answer/37100?hl=en" target="_blank">detailed instructions</a>):</p>
								<p >https://www.f1calendar.com/download/f1-calendar_p1_p2_p3_q_gp.ics?t=1576929539</p>
							</div>
						</li>
						<li id="download_option">
							<a href="https://www.f1calendar.com/download/f1-calendar_p1_p2_p3_q_gp.ics">
								<h2>Download ICS File</h2>
								<p>Non-updating calendar (.ics) for calendars that can’t handle updating subscriptions.</p>
								<button type="button">Download</button>
							</a>
						</li>
					</ul>
					</section>
					
				:
					<section>
						<h3>Generate Calendar</h3>
						<p>First, pick which F1 races, practices & qualifying sessions you would like to add to your calendar:</p>
						
						<form id="download_subscribe" onSubmit={handleOnSubmit}>
							<div class="content">
		
								<div id="selection_advice">
									<h4>Download the Calendar for Outlook, Calendar for OSX &amp; Google Calendar</h4>
									<p>First, pick which F1 races, practices &amp; qualifying sessions you would like to add to your calendar:</p>
								</div>
		
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
								<div class="buttons">
									<button type="submit" disabled={status.submitting}>
							          {!status.submitting
							            ? !status.submitted
							              ? 'Get Calendar'
							              : 'Submitted'
							            : 'Submitting...'}
							        </button>
								</div>	
							</div>
		
						</form>
					</section>
				}
			</Layout>
		</div>
	);
}


export default Generate;