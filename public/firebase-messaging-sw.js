importScripts("https://www.gstatic.com/firebasejs/9.17.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCLr1lbSPNkbpdC0Jswk86YowVWxH-ofPE",
  authDomain: "f1-calendar-678ba.firebaseapp.com",
  projectId: "f1-calendar-678ba",
  storageBucket: "f1-calendar-678ba.appspot.com",
  messagingSenderId: "1086945121867",
  appId: "1:1086945121867:web:86b2bbac85cad3c2c95fce"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging.isSupported()
  ? firebase.messaging()
  : Promise.reject();