// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
import {getMessaging, getToken, onMessage} from 'firebase/messaging';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseCloudMessaging = {
	//checking whether token is available in indexed DB
	tokenInlocalforage: async () => {
		return localStorage.getItem('fcm_token')
	},
	//initializing firebase app
	init: async function () {
		if (!firebase.getApps().length) {
				
			firebase.initializeApp({
				apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
				authDomain: process.env.NEXT_PUBLIC_FIREBAE_AUTH_DOMAIN,
				projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
				storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
				messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_ID,
				appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
			})
			
			try {
				const messaging = getMessaging()
				const tokenInLocalForage = await this.tokenInlocalforage()
				//if FCM token is already there just return the token
				if (tokenInLocalForage !== null) {
					return tokenInLocalForage
				}
				//requesting notification permission from browser
				const status = await Notification.requestPermission()
				if (status && status === 'granted') {
					//getting token from FCM
					const fcm_token = await getToken(messaging,{
						vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY
					})
					if (fcm_token) {
						//setting FCM token in indexed db using localforage
						localStorage.setItem('fcm_token', fcm_token)
						//return the FCM token after saving it
						return fcm_token
					}
				}
			} catch (error) {
				console.error(error)
				return null
			}
		}else {
			try {
				const tokenInLocalForage = await this.tokenInlocalforage()
				//if FCM token is already there just return the token
				if (tokenInLocalForage !== null) {
					return tokenInLocalForage
				}
				const messaging = getMessaging()
				const status = await Notification.requestPermission()
				if (status && status === 'granted') {
					//getting token from FCM
					const fcm_token = await getToken(messaging,{
						vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY
					})
					if (fcm_token) {
						//setting FCM token in indexed db using localforage
						localStorage.setItem('fcm_token', fcm_token)
						//return the FCM token after saving it
						return fcm_token
					}
				}
			}catch (error) {
				console.error(error)
				return null;
			}
		}
	},
	getMessage: async function() {
		if(firebase.getApps().length > 0) {
			try {
				const messaging = getMessaging();
				onMessage(messaging, (payload) => {
					console.log("Message Received", payload)
				} )

			}catch (error) {

			}
		}
	}
}
export { firebaseCloudMessaging }