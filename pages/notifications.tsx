import {useState, useEffect, useCallback} from "react";
import Layout from "../components/Layout/Layout";
import {NextSeo} from "next-seo";
import useTranslation from "next-translate/useTranslation";
import Card from "../components/Card/Card";
import {usePlausible} from "next-plausible";

import {firebaseCloudMessaging} from "../config/firebase";

function Notifications() {
	const {t, lang} = useTranslation();
	const currentYear = process.env.NEXT_PUBLIC_CURRENT_YEAR;
	const plausible = usePlausible();

	const title = t(`localization:${process.env.NEXT_PUBLIC_SITE_KEY}.seo.title`, { year: currentYear }) + ' | ' + t("localization:form.title");
	const config = require(`../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`);

	// Sessions
	var sessions = config.sessions;
	
	// Default form values...
	var defaults = {
		submitted: false
	};
	
	// Add sessions from config...
	sessions.forEach(function (session:String, index:Number) {
		defaults[session] = false;
	});
	
	const [form, setState] = useState(defaults);
	
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
	};

	
	const [permission, setPermission] = useState<"denied" | "default" | "granted">("denied")
    const [fcmToken, setFcmToken] = useState<string|undefined>(undefined);

	const getToken = async () => {
		try {
		  const token = await firebaseCloudMessaging.init()
		  if (token) {
			await firebaseCloudMessaging.getMessage()
			setFcmToken(token)
			
			if(!localStorage.getItem('tokenSubscribed')){
				console.log('Subscribe the token to the user');
				
				const res = await fetch('/api/notifications/subscribe', {
				  body: JSON.stringify({
					identifier: localStorage.getItem("uuid"),
					token: token
				  }),
				  headers: {
					'Content-Type': 'application/json'
				  },
				  method: 'POST'
				});
				
				const result = await res.json()
				
				localStorage.setItem("tokenSubscribed", String(true));
			}
		  }
		} catch (error) {
		  console.log(error)
		}
	  }

	const checkNotification = useCallback(async () => {
		const status = Notification.permission;
		setPermission(status)
		
		if(status === 'granted') {
			await getToken();
		}
	}, [getToken])
	
	useEffect(() => {
		if ('permissions' in navigator) {
			navigator.permissions.query({ name: 'notifications' }).then(function (notificationPerm) {
				notificationPerm.onchange = async function () {
					await checkNotification()
				};
			});
		}
		async function initialize() {
			await checkNotification()
		}
		initialize()
	}, [checkNotification])
	
	const handleRequestPermission = async () => {
	  await Notification.requestPermission();
	  await checkNotification();
	}
	
	
	const renderDeniedNotificationBlock = () => (
		<p>
			{'You have Denied Notification Permissions.\nPlease Reset your Permissions and Try Again.'}
		</p>
	)
	
	const renderAllowNotificationBlock = () => (
		<>
			<p className="mb-4">{t("localization:notifications.permissions")}</p>
			<p>
				<button type="button" className="btn" onClick={handleRequestPermission}>
					{t("localization:notifications.permissionsButton")}
				</button>	
			</p>
		</>
	)
	
	const renderGrantedNotificationBlock = () => (
		<>
			<p className="mb-4">{t("localization:notifications.description")}</p>
			<p className="mb-8">{t("localization:notifications.statement")}</p>
			
			<form id="download_subscribe" onSubmit={handleOnSubmit}>
				<fieldset className="mb-6" key="options">
					{sessions.map((item, index) => {
						let defaultValue = form[item] ? "on" : "off";
						let defaultChecked = form[item] ? "checked" : "";
						
						return (
							<div className="mb-4" key={item}>
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
			
				<fieldset id="buttons" key="buttons" className="flex gap-x-4">
					<button type="submit" className="btn">
						{!form.submitted
							? t("localization:notifications.button")
							: t("localization:notifications.buttonSubmitted")}
					</button>
					
					{ 
					/*
					<button type="button" className="destructive-btn" onClick={unsubscribeAllNotifications}>
						Disable All Notifications
					</button>
					*/
					}
				</fieldset>
			</form>
			
			
			{
				/*
				fcmToken && (
			   <>
				   <p>
					   Your FCM Token
				   </p>
				   <p style={{marginLeft: 10, marginRight: 10, background: '#e7e7e7', padding: 10, wordBreak: 'break-word'}}>{fcmToken}</p>
			   </>
			)
			*/}
		</>
	)
	
	return (
		<Layout year={currentYear}>
			<NextSeo title={title} />
			<h3 className="text-xl mb-4">
				{t("localization:notifications.title")}
			</h3>
			<Card>
	
			{permission === "denied" && renderDeniedNotificationBlock()}
	
			{permission === "default" && renderAllowNotificationBlock()}
	
			{permission === "granted" && renderGrantedNotificationBlock()}
		
			</Card>
		</Layout>
	)
}

export async function getStaticProps() {
	return {
		props: {},
		revalidate: 3600
	}
}

export default Notifications;
