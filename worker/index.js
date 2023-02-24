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

firebase.messaging();

//background notifications will be received here
firebase.messaging().onBackgroundMessage((payload) => {
  
  
  console.log(payload);
  
  const { title, body } = JSON.parse(payload.notification);
  var options = {
    body,
    icon: '/icons/apple-touch-icon.png',
  };
  registration.showNotification(title, options);
});
