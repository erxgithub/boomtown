export default function ({
  // jsonResources: {
  //    getItems,
  //    requestItem,
  //    createItem,
  // },
  pgResources: {
    getTags,
    getItems,
    requestItem,
    createItem,
  },
  firebaseResources: {
    getUsers,
  },
}) {
  return {
    Query: {
      item(root, { itemid }, context) {
        return context.loaders.Item.load(itemid);
      },
      items() {
        return getItems();
      },
      user(root, { userid }, context) {
        return context.loaders.User.load(userid);
      },
      users(root, { args }, context) {
        return getUsers();
      },
      tags() {
        return getTags();
      },
    },

    Mutation: {
      addItem: (root, { title, imageurl, description, ownerid, tags }) => {
        createItem({ title, imageurl, description, ownerid, tags });
      },
      requestItem: (root, { itemid, borrower }) => requestItem(itemid, borrower),
    },

    Item: {
      tags: (item, args, context) => context.loaders.ItemTags.load(item.itemid),
      itemowner: (item, args, context) => context.loaders.User.load(item.ownerid),
      borrower: (item, args, context) => {
        if (!item.borrowerid) return null;
        return context.loaders.User.load(item.borrowerid);
      },
    },

    User: {
      items: (user, args, context) => context.loaders.UserOwnedItems.load(user.userid),
      borrowed: (user, args, context) => context.loaders.UserBorrowedItems.load(user.userid),
    },
  };
}
