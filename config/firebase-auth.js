var firebase = require("firebase");
require('dotenv').config();

var firebaseConfig = {
	apiKey: process.env.FIESEBASE_API_KEY,
	authDomain: process.env.FIESEBASE_AUTH_DOMAIN,
	databaseURL: process.env.FIESEBASE_DATABASE_URL,
	projectId: process.env.FIESEBASE_PROJECT_ID,
	storageBucket: process.env.FIESEBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIESEBASE_MESSAGING_SENDER_ID,
	appId: process.env.FIESEBASE_APP_ID,
};

// Initialize Firebase
const firebaseInit = firebase.initializeApp(firebaseConfig);
const firebaseAuth = firebaseInit.auth();

module.exports = firebaseAuth;