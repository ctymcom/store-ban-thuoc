import firebase from "firebase/app";
import "firebase/auth";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
if (typeof window !== "undefined" && firebase.apps.length == 0) {
  firebase.initializeApp(JSON.parse(publicRuntimeConfig.firebaseView));
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
}

export { firebase };
