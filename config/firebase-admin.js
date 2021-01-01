var admin = require("firebase-admin");
require('dotenv').config();

admin.initializeApp({
    credential: admin.credential.cert({
        "type": process.env.FIESEBASE_ADMIN_TYPE,
        "project_id": process.env.FIESEBASE_ADMIN_PROJECT_ID,
        "private_key_id": process.env.FIESEBASE_ADMIN_PRIVATE_KEY_ID,
        "private_key": process.env.FIESEBASE_ADMIN_PRIVATE_KEY,
        "client_email": process.env.FIESEBASE_ADMIN_CLIENT_EMAIL,
        "client_id": process.env.FIESEBASE_ADMIN_CLIENT_ID,
        "auth_uri": process.env.FIESEBASE_ADMIN_AUTH_URL,
        "token_uri": process.env.FIESEBASE_ADMIN_TOKEN_URL,
        "auth_provider_x509_cert_url": process.env.FIESEBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
        "client_x509_cert_url": process.env.FIESEBASE_ADMIN_CLIENT_X509_CERT_URL
      }),
    databaseURL: "https://node-todo-practice.firebaseio.com"
});

const db = admin.database()
module.exports = db;