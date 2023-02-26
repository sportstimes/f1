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
		let topics = [];
	
		sessions.forEach(function (session, index) {
			if (form[session]) {
				topics.push(session);
			}
		});
		
		setState({
			...form,
			submitted: true,
		});
		
		const res = await fetch('/api/notifications/update', {
		  body: JSON.stringify({
			identifier: localStorage.getItem("uuid"),
			topics: topics
		  }),
		  headers: {
			'Content-Type': 'application/json'
		  },
		  method: 'POST'
		});
		
		const result = await res.json()
		
		setState({
			...form,
			saved: true,
		});
	};

	const [permission, setPermission] = useState<"denied" | "default" | "granted">("denied")
    const [fcmToken, setFcmToken] = useState<string|undefined>(undefined);
	const [loaded, setLoaded] = useState<Boolean>(false)

	const getToken = async () => {
		try {
		  const token = await firebaseCloudMessaging.init()
		  if (token) {
			setFcmToken(token)
			
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
		  }
		} catch (error) {
		  console.log("err1:" +error)
		}
	}
	
	const getSubscriptions = async () => {
		try {
			const res = await fetch(`/api/notifications/subscriptions?identifier=${localStorage.getItem("uuid")}`);
			const result = await res.json()
			const subscriptions = result.subscriptions
			
			setState(subscriptions);
			setLoaded(true);
		} catch (error) {
		  console.log("err2:" + error)
		}
	}

	const checkNotification = useCallback(async () => {
		const status = Notification.permission;
		setPermission(status)
		
		if(status === 'granted') {
			await getToken();
			await getSubscriptions();
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
	}, [])
	
	const handleRequestPermission = async () => {
	  await Notification.requestPermission();
	}
	
	const renderDeniedNotificationBlock = () => (
		<p>
			{t("localization:notifications.permissions.denied")}
		</p>
	)
	
	const renderAllowNotificationBlock = () => (
		<>
			<p className="mb-4">{t("localization:notifications.permissions.prompt")}</p>
			<p>
				<button type="button" className="btn" onClick={handleRequestPermission}>
					{t("localization:notifications.permissions.button")}
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
									checked={defaultChecked}
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
				</fieldset>
			</form>
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
		
				{permission === "granted" && loaded && renderGrantedNotificationBlock()}
				
				{permission === "granted" && !loaded && (
					<p>Loading</p>
				)}
			</Card>
		</Layout>
	)
}

export default Notifications;
