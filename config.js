
import Firebase from 'firebase';
let config = {
    apiKey: "AIzaSyBlzcsxl_cySHmEWWoSsKN8E-QyWlqJ6TE",
    authDomain: "projectnanastamarietherese.firebaseapp.com",
    databaseURL: "https://projectnanastamarietherese.firebaseio.com",
    projectId: "projectnanastamarietherese",
    storageBucket: "projectnanastamarietherese.appspot.com",
    messagingSenderId: "584007443636",
    appId: "1:584007443636:web:111dc004f83d26118963e1",
    measurementId: "G-8SBNR58JW2"
  };

let app = Firebase.initializeApp(config);
export const db = app.database();
