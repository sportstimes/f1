// Import the functions you need from the SDKs you need
import * as firebase from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseCloudMessaging = {
  //checking whether token is available in indexed DB
  tokenInlocalforage: async () => {
    return localStorage.getItem('fcm_token');
  },
  //initializing firebase app
  init: async function () {
    if ('Notification' in window) {
      if (!firebase.getApps().length) {
        firebase.initializeApp({
          apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
          authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_ID,
          appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        });
      }

      try {
        const messaging = getMessaging();
        const tokenInLocalForage = await this.tokenInlocalforage();

        // If we have the token in storage, return it.
        if (tokenInLocalForage !== null) {
          return tokenInLocalForage;
        }

        // If permission is granted, then fetch a token from FCM
        const status = Notification.permission;
        if (status && status === 'granted') {
          const fcm_token = await getToken(messaging, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID,
          });

          if (fcm_token) {
            // Store the token
            localStorage.setItem('fcm_token', fcm_token);

            // return the token
            return fcm_token;
          }
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  },
  getMessage: async function () {
    if (firebase.getApps().length > 0) {
      try {
        const messaging = getMessaging();
        onMessage(messaging, (payload) => {
          console.log('Message Received', payload);
        });
      } catch (error) {}
    }
  },
};
export { firebaseCloudMessaging };
