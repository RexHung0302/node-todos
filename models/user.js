const firebaseDB = require('../config/firebase-admin');

module.exports = {
  getUsersList: () => {
    return firebaseDB.ref('users');
  },
  getUser: (uid) => {
    if(!uid) return;
    return firebaseDB.ref(`users/${uid}`);
  }
}