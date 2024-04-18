import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getFirestore,collection, addDoc,getDocs } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import{ getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";




const firebaseConfig = {
  apiKey: "AIzaSyBhbHiYrHtiZYbtl74QEkSn-dkWW7T22TY",
  authDomain: "firstfirebaseproject-44175.firebaseapp.com",
  projectId: "firstfirebaseproject-44175",
  storageBucket: "firstfirebaseproject-44175.appspot.com",
  messagingSenderId: "391775424641",
  appId: "1:391775424641:web:df66774c8b986d9ee8bd80"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const signInBtn = document.getElementById("signInBtn");

signInBtn.addEventListener("click", signIn);

async function signIn() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        alert("User signed in successfully!");
      
        
        window.location.href = 'userPage.html';
    } catch (error) {
        console.error("Error signing in:", error.message);
        alert("Error signing in: " + error.message);
    }
}