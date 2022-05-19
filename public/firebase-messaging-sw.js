// importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// // // Initialize the Firebase app in the service worker by passing in
// // // your app's Firebase config object.
// // // https://firebase.google.com/docs/web/setup#config-object
// firebase.initializeApp({
//   apiKey: "AIzaSyDTVH8fDXdgPh1vzMVd6_ihrSVCeYO6I4Q",
//   authDomain: "onit-a1529.firebaseapp.com",
//   projectId: "onit-a1529",
//   storageBucket: "onit-a1529.appspot.com",
//   messagingSenderId: "738179248047",
//   appId: "1:738179248047:web:e52348a2b26ef46381495a",
//   measurementId: "G-4BH9SHC3SD",
//   databaseURL: "https://onit-a1529-default-rtdb.asia-southeast1.firebasedatabase.app",
// });

// // Retrieve an instance of Firebase Messaging so that it can handle background
// // messages.
// const messaging = firebase.messaging();
// messaging.onBackgroundMessage(function(payload) {
//   console.log('Received background message ', payload);
//   // Customize notification here
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: '192x192.png'
//   };
//   self.registration.showNotification(notificationTitle,
//     notificationOptions);
// });

/* eslint-disable no-restricted-globals */
self.addEventListener('install', e => {
  console.log('서비스워커 install함!', e);
});
self.addEventListener('activate', e => {
  console.log('서비스워커 activate 시작됨!', e);
});
self.addEventListener('fetch', e => {
  // console.log("데이터 요청!(fetch)", e.request);
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    // console.log('message', event);
    self.skipWaiting();
  }
});

// Any other custom service worker logic can go here.
self.addEventListener('push', function (event) {
  // console.log(event);
  // console.log(event.data.json());
  const title = event.data.json().notification.title
  const options = {
    body: event.data.json().notification.body,
    icon: 'favicon.ico',
  };

  // event.waitUntil(self.registration.showNotification(title, options)); // showNotification을 통해 푸시 알림을 생성, Promise가 반환되며 waitUntil을 통해 이벤트를 연장 시켜야함
  event.waitUntil(self.registration.showNotification(title, options)); // showNotification을 통해 푸시 알림을 생성, Promise가 반환되며 waitUntil을 통해 이벤트를 연장 시켜야함
});

self.addEventListener('notificationclick', function (event) {
  // console.log('notificationclick', event);

  event.notification.close();
  // event.waitUntil(
  //   self.clients.openWindow(
  //     ``,
  //     // /plan/${
  //     //   event.notification.body.split('!\n')[1]
  //     // }`,
  //   ),
  //   // self.clients.openWindow(event.notification.data.url),
  // );
});