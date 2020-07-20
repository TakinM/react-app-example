import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCmDokPhhmgG6llxY_psifk14BHMtXvVAs",
  authDomain: "hub-marketplace2020.firebaseapp.com",
  databaseURL: "https://hub-marketplace2020.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
