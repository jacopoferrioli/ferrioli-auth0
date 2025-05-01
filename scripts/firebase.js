// Configurazione Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDitA_4JDkUTJvX7zrfsLgSCDhhWLgP9Cs",
            authDomain: "ferriolieu.firebaseapp.com",
            projectId: "ferriolieu",
            storageBucket: "ferriolieu.appspot.com",
            messagingSenderId: "373796791074",
            appId: "1:373796791074:web:7ed13883e89fcff932fb7b"
      
};

// Inizializza Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
