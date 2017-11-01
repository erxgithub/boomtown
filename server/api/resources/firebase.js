import * as firebase from 'firebase';

export default function (app) {
  firebase.initializeApp({
    apiKey: app.get('FIREBASE_API_KEY'),
    authDomain: app.get('FIREBASE_AUTH_DOMAIN'),
    databaseURL: app.get('FIREBASE_DB_URL'),
  });

  const FirebaseDB = firebase.database();

  return {
    getUsers: () => (
      new Promise((resolve) => {
        FirebaseDB
          .ref('/users')
          .once('value')
          .then((snapshot) => {
            const userList = [];
            const users = snapshot.val();

            Object.keys(users)
              .forEach(id => userList.push({ ...users[id], id }));

            resolve(userList);
          })
          .catch(error => console.log(error));
      })
    ),
    getUser: id => (
      new Promise((resolve) => {
        FirebaseDB
          .ref(`/users/${id}`)
          .once('value')
          .then((snapshot) => {
            resolve({
              ...snapshot.val(),
              userid: id,
            });
          })
          .catch(error => console.log(error));
      })
    ),
  };
}
