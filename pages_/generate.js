import {useState} from 'react'
import Layout from "../components/Layout";
import { NextSeo } from 'next-seo';
import useTranslation from 'next-translate/useTranslation'

function Generate(props) {
  const { t, lang } = useTranslation()
  const title = t('common:title')
  const subtitle = t('common:subtitle')
  
  const currentYear = '2020';
  const metaDescription = t('common:meta.description', { year: currentYear })
  const metaKeywords = t('common:meta.keywords', { year: currentYear })
	
	const [form, setState] = useState({
	    p1: true,
	    p2: true,
	    p3: true,
	    quali: true,
	    race: true,
	    virtual: false,
	    alarm: false,
	    mins: 30,
	    submitted: false,
	    webcalURL: '',
	    googleURL: '',
	    downloadURL: ''
	})
		
	const handleOnSubmit = async e => {
		e.preventDefault()
		
		if(!form.p1 && !form.p2 && !form.p3 && !form.quali && !form.race && !form.virtual){
			alert(t('generate:form.nonOptionsSelected'))
			return
		}
		
/*
		if(lang != "en"){
  		setState({
  			...form, 
  			submitted: true, 
  			webcalURL:`webcal://${props.domain}/${lang}/download/f1-calendar${form.p1 ? '_p1' : ''}${form.p2 ? '_p2' : ''}${form.p3 ? '_p3' : ''}${form.quali ? '_q' : ''}${form.race ? '_gp' : ''}${form.virtual ? '_virtual' : ''}${form.alarm ? '_alarm' : ''}${form.alarm ? '-'+form.mins : ''}.ics`, 
  			googleURL:`https://${props.domain}/${lang}/download/f1-calendar${form.p1 ? '_p1' : ''}${form.p2 ? '_p2' : ''}${form.p3 ? '_p3' : ''}${form.quali ? '_q' : ''}${form.race ? '_gp' : ''}${form.virtual ? '_virtual' : ''}${form.alarm ? '_alarm' : ''}${form.alarm ? '-'+form.mins : ''}.ics?t=${ Date.now() }`,
  			downloadURL:`https://${props.domain}/${lang}/download/f1-calendar${form.p1 ? '_p1' : ''}${form.p2 ? '_p2' : ''}${form.p3 ? '_p3' : ''}${form.quali ? '_q' : ''}${form.race ? '_gp' : ''}${form.virtual ? '_virtual' : ''}${form.alarm ? '_alarm' : ''}${form.alarm ? '-'+form.mins : ''}.ics` 
  		})
		} else {
*/
  		setState({
  			...form, 
  			submitted: true, 
  			webcalURL:`webcal://${props.domain}/download/f1-calendar${form.p1 ? '_p1' : ''}${form.p2 ? '_p2' : ''}${form.p3 ? '_p3' : ''}${form.quali ? '_q' : ''}${form.race ? '_gp' : ''}${form.virtual ? '_virtual' : ''}${form.alarm ? '_alarm' : ''}${form.alarm ? '-'+form.mins : ''}.ics`, 
  			googleURL:`https://${props.domain}/download/f1-calendar${form.p1 ? '_p1' : ''}${form.p2 ? '_p2' : ''}${form.p3 ? '_p3' : ''}${form.quali ? '_q' : ''}${form.race ? '_gp' : ''}${form.virtual ? '_virtual' : ''}${form.alarm ? '_alarm' : ''}${form.alarm ? '-'+form.mins : ''}.ics?t=${ Date.now() }`,
  			downloadURL:`https://${props.domain}/download/f1-calendar${form.p1 ? '_p1' : ''}${form.p2 ? '_p2' : ''}${form.p3 ? '_p3' : ''}${form.quali ? '_q' : ''}${form.race ? '_gp' : ''}${form.virtual ? '_virtual' : ''}${form.alarm ? '_alarm' : ''}${form.alarm ? '-'+form.mins : ''}.ics` 
  		})
		//}
	}
	
	return (
		<>
			<NextSeo
				title={`${title} ${currentYear}  - ${subtitle}`}
				description={metaDescription}
				keywords={metaKeywords}
			/>
			<Layout year={ props.year }>
				{form.submitted ?
					<>	
						<h3>{ t('generate:download.title') }</h3>	
										
						<section className="card" id="download_option_ical">							
							<h4>{ t('generate:download.webcalTitle') }</h4>
							<p>{ t('generate:download.webcalDescription') }</p>
							
							<p>
								<a href={form.webcalURL} className="button">
									{ t('generate:download.webcalButton') }
								</a>
							</p>
						</section>
						
						<section className="card" id="download_option_google">
							<h4>{ t('generate:download.gcalTitle') }</h4>
							<p>{ t('generate:download.gcalDescription') } (<a href="https://support.google.com/calendar/answer/37100" target="_blank">{ t('generate:download.gcalDescriptionLink') }</a>):</p>
							<p className="copyable">{form.googleURL}</p>
						</section>
												
						<section className="card" id="download_option">
							<h4>{ t('generate:download.icsTitle') }</h4>
							<p>{ t('generate:download.icsDescription') }</p>		
							<p>					
								<a href={form.downloadURL} className="button">
									{ t('generate:download.icsButton') }
								</a>
							</p>
						</section>
					</>
				:				
					<>
						<h3>{ t('generate:form.title') }</h3>
						<section className="card">
							<p>{ t('generate:form.description') }</p>
							
							<form id="download_subscribe" onSubmit={handleOnSubmit}>	
								<fieldset>
									<div className="field">
										<input type="checkbox" name="p1" id="p1" defaultValue="on" defaultChecked="checked" onChange={event => setState({...form, p1: event.target.checked })} />
										<label htmlFor="p1">{ t('generate:form.fp1') }</label>
									</div>
		
									<div className="field">
										<input type="checkbox" name="p2" id="p2" defaultValue="on" defaultChecked="checked" onChange={event => setState({...form, p2: event.target.checked })} />
										<label htmlFor="p2">{ t('generate:form.fp2') }</label>
									</div>
		
									<div className="field">
										<input type="checkbox" name="p3" id="p3" defaultValue="on" defaultChecked="checked" onChange={event => setState({...form, p3: event.target.checked })} />
										<label htmlFor="p3">{ t('generate:form.fp3') }</label>
									</div>
		
									<div className="field">
										<input type="checkbox" name="q" id="q" defaultValue="on" defaultChecked="checked" onChange={event => setState({...form, quali: event.target.checked })} />
										<label htmlFor="q">{ t('generate:form.qualifying') }</label>
									</div>
		
									<div className="field">
										<input type="checkbox" name="gp" id="gp" defaultValue="on" defaultChecked="checked" onChange={event => setState({...form, race: event.target.checked })} />
										<label htmlFor="gp">{ t('generate:form.grandPrix') }</label>
									</div>
								</fieldset>
		
								<fieldset id="set_alarms">
									<div className="field">
										<input type="checkbox" name="alarm" id="alarm" value="off" onChange={event => setState({...form, alarm: event.target.checked })} />
										<label htmlFor="alarm">{ t('generate:form.reminder') }</label> <input type="number" name="mins" id="alarm-mins" step="30" min="0" max="120" defaultValue="30" onChange={event => setState({...form, mins: event.target.value })} /><label htmlFor="alarms-before">{ t('generate:form.reminderContinued') }</label>
									</div>
								</fieldset>
								
								<fieldset id="buttons">
									<button type="submit">
							          {!form.submitted
							              ? t('generate:form.button')
							              : t('generate:form.buttonSubmitted')}
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
						padding:25px 25px 10px 25px;
						margin-bottom:16px;
					}
					.card h4 {
						margin-top:0;
						font-size:18px;
						margin-bottom:8px;
					}
					.card p {
						margin-bottom:15px;
					}
					
					
					form {
					}
					fieldset {
						border:0;
						margin:0 0 20px 0;
						padding:0;	
  					vertical-align:middle;
					}
					
					fieldset label {
  					padding-left:5px;
					}
					fieldset label a {
  				  	color: #1a8b73;
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

export default Generate;

export const getStaticProps = async ({ params }) => {

	const url = process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}` : 'f1calendar.com'

	return {
		props: {
			domain: url,
			year: "2020"
		}
	}
};
