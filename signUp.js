
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
  import { getFirestore,collection, addDoc,getDocs } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
  import{ getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged,signOut } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";




  const firebaseConfig = {
    apiKey: "AIzaSyBhbHiYrHtiZYbtl74QEkSn-dkWW7T22TY",
    authDomain: "firstfirebaseproject-44175.firebaseapp.com",
    projectId: "firstfirebaseproject-44175",
    storageBucket: "firstfirebaseproject-44175.appspot.com",
    messagingSenderId: "391775424641",
    appId: "1:391775424641:web:df66774c8b986d9ee8bd80"
  };


 
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const signUpBtn = document.getElementById("signUpBtn");

signUpBtn.addEventListener("click", signUp);

async function signUp() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
       
        await addDoc(collection(db, "users"), {
            name: name,
            email: email,
            uid: user.uid ,
            password:password,
        });

        alert("User signed up successfully!");
        window.location.href = 'sign-in.html';
    } catch (error) {
        console.error("Error signing up:", error.message);
        alert("Error signing up: " + error.message);
    }
}



