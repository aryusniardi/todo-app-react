import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDSIPpE7YIIwFak6ZJYCRUgHkhpK_RPs54",
    authDomain: "todo-app-react-d58a2.firebaseapp.com",
    databaseURL: "https://todo-app-react-d58a2.firebaseio.com",
    projectId: "todo-app-react-d58a2",
    storageBucket: "todo-app-react-d58a2.appspot.com",
    messagingSenderId: "902593098940",
    appId: "1:902593098940:web:a2a291967ac40b6f9c0cb9",
    measurementId: "G-110X4DDPEY"
})

const firestore = firebaseApp.firestore()

export default firestore