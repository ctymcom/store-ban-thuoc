import firebase from "firebase/app";
import "firebase/auth";
import getConfig, { setConfig } from "next/config";

const { publicRuntimeConfig } = getConfig();
setConfig({ publicRuntimeConfig });
if (typeof window !== "undefined" && firebase.apps.length == 0) {
  console.log("publicRuntimeConfig", publicRuntimeConfig);
  if (publicRuntimeConfig.firebaseView && publicRuntimeConfig.firebaseView.length > 0) {
    firebase.initializeApp(JSON.parse(publicRuntimeConfig.firebaseView));
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
  }
}

export { firebase };
