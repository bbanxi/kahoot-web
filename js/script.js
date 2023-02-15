var firebaseConfig = {
    apiKey: "AIzaSyDTKnOMvWnjWO0GHcChg27Blx61UwbO32g",
    authDomain: "sprintfirebase7.firebaseapp.com",
    databaseURL: "https://sprintfirebase7-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "sprintfirebase7",
    storageBucket: "sprintfirebase7.appspot.com",
    messagingSenderId: "916216612960",
    appId: "1:916216612960:web:a3b4d478c81ad385c6db05",
};

firebase.initializeApp(firebaseConfig);

let database = firebase.database();
let randomVariable = "";

function generateRandomVariable() {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (let i = 0; i < 6; i++) {
        randomVariable += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return randomVariable;
}

function sendToFirebase(randomVariable) {
    database.ref("Games").child(randomVariable).set("");
    document.getElementById("code").innerHTML = randomVariable;
}

window.onbeforeunload = function () {
    database.ref("Games").child(randomVariable).remove();
};

window.onload = function () {

    let randomVariable = generateRandomVariable();
    sendToFirebase(randomVariable);
    console.log("Generated random variable: " + randomVariable);

    let userList = document.getElementById("user-list");

    database.ref("Games").child(randomVariable).on("value", function (snapshot) {
        userList.innerHTML = ""; // Limpiar la lista HTML antes de agregar nuevos elementos

        snapshot.forEach(function (childSnapshot) {
            let key = childSnapshot.key; // Obtener la clave del hijo
            let userItem = document.createElement("li");
            userItem.innerHTML = key;
            userList.appendChild(userItem);
        });
    });
}


