
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getFirestore,collection, getDocs,addDoc,deleteDoc,doc} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
import{ getAuth, onAuthStateChanged,signOut,deleteUser,} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";




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
const signOutBtn = document.getElementById("signOutBtn");





async function populateUserTable() {
    const userTableBody = document.getElementById("userTableBody");

  
    userTableBody.innerHTML = "";

   
    const querySnapshot = await getDocs(collection(db, "users"));

    querySnapshot.forEach((doc) => {
        const userData = doc.data();
        const firstName = userData.name;
        const email = userData.email;

        const row = document.createElement("tr");
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
            deleteUserFromFirestore(doc.id);
        });
        row.innerHTML = `
        <td>${firstName}</td>
        <td>${email}</td>
        <td></td>
    `;
    row.querySelector("td:last-child").appendChild(deleteButton);

    userTableBody.appendChild(row);
});
}




onAuthStateChanged(auth, (user) => {
    if (!user) {
        
        window.location.href = 'sign-in.html';
    } else {

        populateUserTable();
    }
});


async function deleteUserFromFirestore(userId) {
    try {
        await deleteDoc(doc(db, "users", userId));
        console.log("Document successfully deleted!");
        alert("Document successfully deleted!")
        populateUserTable();
    } catch (error) {
        console.error("Error deleting document: ", error);
        alert("An error occurred while deleting the user.");
    }
}



const userSignOut = () => {
  signOut(auth)
    .then(() => {
      console.log("user signed out");
      alert("user signed out successfully");
    })
    .catch((error) => {
      
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      alert(errorMessage);
    });
};

signOutBtn.addEventListener("click",userSignOut);
