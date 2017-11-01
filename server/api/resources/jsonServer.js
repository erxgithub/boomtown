import fetch from 'node-fetch';

export default function (app) {
  const DEV_JSON_SERVER = app.get('DEV_JSON_SERVER');

  return {
    getItems() {
      return fetch(`${DEV_JSON_SERVER}/items/`)
        .then(response => response.json())
        .catch(errors => console.log(errors));
    },
    getUsers() {
      return fetch(`${DEV_JSON_SERVER}/users/`)
        .then(response => response.json())
        .catch(errors => console.log(errors));
    },
    getUser(id) {
      return fetch(`${DEV_JSON_SERVER}/users/${id}`)
        .then(response => response.json())
        .catch(errors => console.log(errors));
    },
    getUserOwnedItems(id) {
      return fetch(`${DEV_JSON_SERVER}/items/?itemowner=${id}`)
        .then(response => response.json())
        .catch(errors => console.log(errors));
    },
    getUserBorrowedItems(id) {
      return fetch(`${DEV_JSON_SERVER}/items/?borrower=${id}`)
        .then(response => response.json())
        .catch(errors => console.log(errors));
    },
    createItem(title, imageurl, description, itemowner, tags) {
      const newItem = {
        title,
        imageurl,
        description,
        itemowner,
        tags,
        created: Math.floor(Date.now() / 1000),
        available: true,
        borrower: null,
      };
      return fetch(`${DEV_JSON_SERVER}/items`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      })
        .then(response => response.json())
        .catch(errors => console.log(errors));
    },
    updateItemBorrow(id, borrower) {
      return fetch(`${DEV_JSON_SERVER}/items/${id}`, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ available: false, borrower }),
      })
        .then(response => response.json())
        .catch(errors => console.log(errors));
    },
  };
}
