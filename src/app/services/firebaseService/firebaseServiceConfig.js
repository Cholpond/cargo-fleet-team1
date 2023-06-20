const prodConfig = {
  apiKey: "AIzaSyCTfmXdSTIDciaux7w1IvVdrRvDqkg_Yug",
  authDomain: "cargo-fleet-test.firebaseapp.com",
  databaseURL: "https://cargo-fleet-test-default-rtdb.firebaseio.com",
  projectId: "cargo-fleet-test",
  storageBucket: "cargo-fleet-test.appspot.com",
  messagingSenderId: "316762921556",
  appId: "1:316762921556:web:6deeb63c4b0f45669e6bc1"
};

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


// Initialize Firebase


const devConfig = {
  apiKey: "AIzaSyCTfmXdSTIDciaux7w1IvVdrRvDqkg_Yug",
  authDomain: "cargo-fleet-test.firebaseapp.com",
  databaseURL: "https://cargo-fleet-test-default-rtdb.firebaseio.com",
  projectId: "cargo-fleet-test",
  storageBucket: "cargo-fleet-test.appspot.com",
  messagingSenderId: "316762921556",
  appId: "1:316762921556:web:6deeb63c4b0f45669e6bc1"
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export default config;
