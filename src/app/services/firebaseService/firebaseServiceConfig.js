const prodConfig = {
apiKey: "AIzaSyC_kPY8LcomY5Buq0XKXjK4Aav_Bxmnyio",
authDomain: "cargo-fleet-team-one.firebaseapp.com",
databaseURL: "https://cargo-fleet-team-one-default-rtdb.firebaseio.com",
projectId: "cargo-fleet-team-one",
storageBucket: "cargo-fleet-team-one.appspot.com",
messagingSenderId: "1088797512516",
appId: "1:1088797512516:web:d72b6e7137f10950a53d11"};

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


// Initialize Firebase


const devConfig =  {
  apiKey: "AIzaSyC_kPY8LcomY5Buq0XKXjK4Aav_Bxmnyio",
  authDomain: "cargo-fleet-team-one.firebaseapp.com",
  databaseURL: "https://cargo-fleet-team-one-default-rtdb.firebaseio.com",
  projectId: "cargo-fleet-team-one",
  storageBucket: "cargo-fleet-team-one.appspot.com",
  messagingSenderId: "1088797512516",
  appId: "1:1088797512516:web:d72b6e7137f10950a53d11"};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export default config;
