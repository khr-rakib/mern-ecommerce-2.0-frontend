import firebase from 'firebase'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyARFZFfLacD8yBhpZ99guY1LyPuz2Exy_s",
    authDomain: "mern-ecommerce-3d66f.firebaseapp.com",
    projectId: "mern-ecommerce-3d66f",
    storageBucket: "mern-ecommerce-3d66f.appspot.com",
    messagingSenderId: "47480646024",
    appId: "1:47480646024:web:83283057f099a6ee6a723d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { auth, googleAuthProvider }