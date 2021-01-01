const firebaseDB = require('../config/firebase-admin');

module.exports = {
  getTodosList: () => {
    return firebaseDB.ref('todos');
  },
  getTodo: (uid) => {
    if(!uid) return;
    return firebaseDB.ref(`users/${uid}`);
  }
}