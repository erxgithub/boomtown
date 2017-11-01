import DataLoader from 'dataloader';

export default function ({
  // jsonResources: {
  //   getItem,
  //   getTagsForItem,
  //   getUserOwnedItems,
  //   getUserBorrowedItems,
  // },
  pgResources: {
    getItem,
    getTagsForItem,
    getUserOwnedItems,
    getUserBorrowedItems,
  },
  firebaseResources: {
    getUser,
  },
}) {
  return {
    Item: new DataLoader(ids => (
      Promise.all(ids.map(id => getItem(id)),
      ))),

    ItemTags: new DataLoader(ids => (
      Promise.all(ids.map(id => getTagsForItem(id)),
      ))),

    UserOwnedItems: new DataLoader(ids => (
      Promise.all(ids.map(id => getUserOwnedItems(id)),
      ))),

    UserBorrowedItems: new DataLoader(ids => (
      Promise.all(ids.map(id => getUserBorrowedItems(id)),
      ))),

    User: new DataLoader(ids => (
      Promise.all(ids.map(id => getUser(id)),
      ))),
  };
}
