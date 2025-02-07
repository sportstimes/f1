importScripts(
  'https://www.gstatic.com/firebasejs/9.17.1/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging-compat.js',
);

// https://stackoverflow.com/questions/37482366/is-it-safe-to-expose-firebase-apikey-to-the-public/37484053#37484053
firebase.initializeApp({
  apiKey: 'AIzaSyD-gSAj27EYbYc4eR_DtMzJ_BgnGreT414',
  authDomain: 'f1-calendar-678ba.firebaseapp.com',
  projectId: 'f1-calendar-678ba',
  storageBucket: 'f1-calendar-678ba.firebasestorage.app',
  messagingSenderId: '1086945121867',
  appId: '1:1086945121867:web:778ae86f34cfce99c95fce',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging.isSupported()
  ? firebase.messaging()
  : Promise.reject();
