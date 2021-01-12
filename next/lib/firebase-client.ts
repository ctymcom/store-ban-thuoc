// import firebase from "firebase/app";
// import "firebase/auth";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();
let firebase;

const initFirebase = async () => {
  firebase = await import("firebase/app").then((mod) => mod.default);
  await Promise.all([import("firebase/auth")]);
  firebase.initializeApp(JSON.parse(publicRuntimeConfig.firebaseView));
};

initFirebase();

export { firebase };
