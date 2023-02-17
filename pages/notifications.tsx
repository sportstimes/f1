import {useState, useEffect} from "react";
import Layout from "../components/Layout/Layout";
import {NextSeo} from "next-seo";
import useTranslation from "next-translate/useTranslation";
import Card from "../components/Card/Card";
import {usePlausible} from "next-plausible";
import * as PusherPushNotifications from "@pusher/push-notifications-web";

let beamsClient: PusherPushNotifications.Client | undefined = undefined;

function Notifications() {
	const {t, lang} = useTranslation();
	const currentYear = process.env.NEXT_PUBLIC_CURRENT_YEAR;
	const plausible = usePlausible();

	const title = t(`localization:${process.env.NEXT_PUBLIC_SITE_KEY}.seo.title`, { year: currentYear }) + ' | ' + t("localization:form.title");
	const config = require(`../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`);

	var sessions = config.sessions;
	
	// Default form values...
	var defaults = {
		submitted: false
	};

	// Add sessions from config...
	sessions.forEach(function (session:String, index:Number) {
		defaults[session] = false;
	});

	let states = PusherPushNotifications.RegistrationState;
	const [registationState, setRegistrationState] = useState<PusherPushNotifications.RegistrationState>();

	const [form, setState] = useState();
	
	useEffect(() => {
		beamsClient = new PusherPushNotifications.Client({
			instanceId: process.env.NEXT_PUBLIC_PUSHER_INSTANCE,
		});
		
		checkState();
	}, []);

	function checkState() {
		beamsClient
			.getRegistrationState()
			.then((state) => {
				if(state === states.PERMISSION_GRANTED_REGISTERED_WITH_BEAMS){
					beamsClient
						.start()
						.then((beamsClient) => beamsClient.getDeviceId())
						.then((deviceId) =>
							console.log("Successfully registered with Beams. Device ID:", deviceId)
						)
						.then(() => beamsClient.getDeviceInterests())
						.then((interests) => {
							interests.forEach(function (interest, index) {
								defaults[interest] = true;
							});
							setState(defaults);
						})
						.catch(console.error);
				}
				
				setRegistrationState(state);
			});
	}

	const enableNotifications = (event: React.ChangeEvent<HTMLSelectElement>) => {
		beamsClient
			.start()
			.then((beamsClient) => beamsClient.getDeviceId())
			.then((deviceId) => {
				console.log("Successfully registered with Beams. Device ID:", deviceId)
				
				checkState()
			})
			.catch(console.error);
	};

	const handleOnSubmit = async (e) => {
		e.preventDefault();

		const sessions = config.sessions;
		const sessionMap = config.sessionMap;
		let interests = [];

		sessions.forEach(function (session, index) {
			if (form[session]) {
				interests.push(session);
			}
		});
		
		beamsClient.setDeviceInterests(interests)
			.then(() => beamsClient.getDeviceInterests())
			.then((interests) => {
				setState({
					...form,
					submitted: true,
				});
			})
			.catch(console.error);
	};
	
	if(registationState === states.PERMISSION_GRANTED_NOT_REGISTERED_WITH_BEAMS || registationState === states.PERMISSION_PROMPT_REQUIRED){
		return (
			<Layout year={currentYear}>
				<NextSeo title={title} />
				<h3 className="text-xl mb-4">
					{t("localization:notifications.title")}
				</h3>
				<Card>
					<p className="mb-4">{t("localization:notifications.permissions")}</p>
					<p>
						<button type="button" className="btn" onClick={enableNotifications}>
							{t("localization:notifications.permissionsButton")}
						</button>	
					</p>
				</Card>
			</Layout>
		);
	}
	
	if(registationState === states.PERMISSION_DENIED){
		return (
			<Layout year={currentYear}>
				<NextSeo title={title} />
				<h3 className="text-xl mb-4">
					{t("localization:notifications.title")}
				</h3>
				<Card>
					<p>Denied</p>
				</Card>
			</Layout>
		);
	}

	
	if(form === undefined){
		return (
			<Layout year={currentYear}>
				<NextSeo title={title} />
				<h3 className="text-xl mb-4">
					{t("localization:notifications.title")}
				</h3>
				
					
			</Layout>
		);
	}

	return (
		<Layout year={currentYear}>
			<NextSeo title={title} />
			<h3 className="text-xl mb-4">{t("localization:notifications.title")}</h3>
			<Card>
				<p className="mb-4">{t("localization:notifications.description")}</p>
				<p className="mb-8">{t("localization:notifications.statement")}</p>

				<form id="download_subscribe" onSubmit={handleOnSubmit}>
					<fieldset className="mb-6" key="options">
						{sessions.map((item, index) => {
							let defaultValue = form[item] ? "on" : "off";
							let defaultChecked = form[item] ? "checked" : "";
							
							return (
								<div className="mb-4">
									<input
										type="checkbox"
										className="form-tick mr-3 bg-white appearance-none checked:bg-light-green checked:border-transparent w-6 h-6 rounded-md border inline-block align-middle"
										name={item}
										id={item}
										defaultValue={defaultValue}
										defaultChecked={defaultChecked}
										onChange={async event => {
											setState({
												...form,
												[item]: event.target.checked
											})
										}}
									/>
									<label
										htmlFor={item}
										className="inline-block align-middle text-base"
									>
										{t(`localization:schedule.${item}`)}
									</label>
								</div>
							);
						})}
					</fieldset>

					<fieldset id="buttons" key="buttons">
						<button type="submit" className="btn">
							{!form.submitted
								? t("localization:notifications.button")
								: t("localization:notifications.buttonSubmitted")}
						</button>
					</fieldset>
				</form>
			</Card>
		</Layout>
	);
}

export async function getStaticProps() {
	return {
		props: {},
		revalidate: 3600
	}
}

export default Notifications;
