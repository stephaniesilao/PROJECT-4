import { initializeApp } from "firebase/app";

//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMSt16anuX3bOfAjlef6iUh0m8zLH2E0Q",
  authDomain: "employee-management-dash-51d9e.firebaseapp.com",
  projectId: "employee-management-dash-51d9e",
  storageBucket: "employee-management-dash-51d9e.appspot.com",
  messagingSenderId: "699067613610",
  appId: "1:699067613610:web:a3bf476fb68c70ec572bd3"
};


  //Initialized firebase
  const app = initializeApp(firebaseConfig);

  export default app;