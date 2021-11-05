import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

//this config is being used for both development and production environment. Though, it is a best practice creating a second project and have two configs: one for production (prodConfig) and another for development (devConfig), so you choose the config based on the environment.

const config = {
  apiKey: "AIzaSyDmEK4ak-0gU0Md6HBh2oLFPA0b6Qn-26E",
  authDomain: "stdev-9be64.firebaseapp.com",
  databaseURL: "https://stdev-9be64-default-rtdb.firebaseio.com",
  projectId: "stdev-9be64",
  storageBucket: "stdev-9be64.appspot.com",
  messagingSenderId: "381512828340",
  appId: "1:381512828340:web:6083a4b1d2bdd26d159ee1",
};

if (!firebase.apps.length) {
  //initializing with the config object
  firebase.initializeApp(config);
}

//separting database API and authentication
const db = firebase.database();
const auth = firebase.auth();

const facebookProvider = new firebase.auth.FacebookAuthProvider();

export { db, auth, facebookProvider };
