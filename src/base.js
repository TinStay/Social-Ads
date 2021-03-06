import * as firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth';
import 'firebase/database';
import "firebase/storage";


const app = firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
});

const facebookProvider = new firebase.auth.FacebookAuthProvider();

export const db = firebase.database();

export const storage = firebase.storage()

export const doSignInWithFacebook = () =>
    app.auth().signInWithPopup(facebookProvider)
    .then( registeredUser => {
        // console.log("registeredUser", registeredUser)
        return registeredUser
    })



export default app;
