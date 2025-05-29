importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyBp-RRJG8TfohwmEslmSsTbm8Adoq5o9Vs",
  authDomain: "task-2a56b.firebaseapp.com",
  projectId: "task-2a56b",
  storageBucket: "task-2a56b.firebasestorage.app",
  messagingSenderId: "991185823049",
  appId: "1:991185823049:web:113c6c49598fdca079a698",
  measurementId: "G-3L8RN2MVCF"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Background Message received:', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon-192x192.png',
    badge: '/icon-192x192.png',
    tag: 'auth-app-notification',
    data: payload.data
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});