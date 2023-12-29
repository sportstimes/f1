"use client"

import React, { useState, useCallback, useEffect } from "react";
import Layout from "components/Layout/Layout";
import Card from "components/Card/Card";
import {usePlausible} from "next-plausible";
import {useTranslations} from 'next-intl';
import {firebaseCloudMessaging} from "../../../../config/firebase";

export default function Form() {
  const currentYear = process.env.NEXT_PUBLIC_CURRENT_YEAR;
  const plausible = usePlausible();
  const t = useTranslations('All');
  
  const config = require(`/_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`);
  
  // Sessions
  var sessions = config.sessions;
  
  // Default form values...
  var defaults = {
		submitted: false
  };
  
  // Remove Sprint Qualifying
  sessions = sessions.filter(item => item !== "sprintQualifying");
  
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
		
		plausible("Saved Notification Settings");
  };
  
  const [permission, setPermission] = useState<"denied" | "default" | "granted">("denied")
	const [fcmToken, setFcmToken] = useState<string|undefined>(undefined);
  const [loaded, setLoaded] = useState<Boolean>(false)
  
  const getToken = useCallback(async () => {
		try {
			const token = await firebaseCloudMessaging.init();
			if (token) {
				const subscribeRes = await fetch('/api/notifications/subscribe', {
					body: JSON.stringify({
						identifier: localStorage.getItem("uuid"),
						token: token
					}),
					headers: {
						'Content-Type': 'application/json'
					},
					method: 'POST'
				});
	
				setFcmToken(token);
	
				await getSubscriptions();
			} else {
				console.log("No token?!?");
			}
		} catch (error) {
			console.log("err1:" + error);
		}
	}, []);
  
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
	  	if ('serviceWorker' in navigator) {
			navigator.serviceWorker.ready.then((registration) => {
		  	getToken();
			});
	  	}
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
  
  const delay = time => new Promise(res=>setTimeout(res,time));
  
  const handleRequestPermission = async () => {
		plausible("Enabled Notifications");
		
		await Notification.requestPermission();
		checkNotification()
  }
  
  const renderDeniedNotificationBlock = () => (
		<p>
	  	{t("notifications.permissions.denied")}
		</p>
  )
  
  const renderAllowNotificationBlock = () => (
		<>
	  	<p className="mb-4">{t("notifications.permissions.prompt")}</p>
	  	<p>
			<button type="button" className="btn" onClick={handleRequestPermission}>
		  	{t("notifications.permissions.button")}
			</button>	
	  	</p>
		</>
  )
  
  const renderGrantedNotificationBlock = () => (
		<>
	  	<p className="mb-4">{t("notifications.description")}</p>
	  	<p className="mb-8">{t("notifications.statement")}</p>
	  	
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
				  	{t(`schedule.${item}`)}
					</label>
			  	</div>
				);
		  	})}
			</fieldset>
	  	
			<fieldset id="buttons" key="buttons" className="flex gap-x-4">
		  	<button type="submit" className="btn">
				{!form.submitted
			  	? t("notifications.button")
			  	: t("notifications.buttonSubmitted")}
		  	</button>
			</fieldset>
	  	</form>
		</>
  )
  
  return (
		<>
			{permission === "denied" && renderDeniedNotificationBlock()}
		
			{permission === "default" && renderAllowNotificationBlock()}
		
			{permission === "granted" && loaded && renderGrantedNotificationBlock()}
			
			{permission === "granted" && !loaded && (
		  	<p>Loading</p>
			)}
		</>
  )
}