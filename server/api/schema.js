const typeDefs = `
  type Item {
    itemid: Int!
    title: String!
    imageurl: String
    description: String
    itemowner: User!
    tags: [Tag]
    created: String!
    borrower: User
  }

  type User {
    userid: String!
    email: String!
    fullname: String!
    bio: String
    items: [Item]
    borrowed: [Item]
  }

  input AssignedTag {
    title: String!
    tagid: String!
  }

  input AssignedBorrower {
    userid: String!
  }

  type Tag {
    tagid: String!
    title: String!
  }

  # the schema allows the following queries:

  type Query {
    items: [Item]
    item(itemid: Int!): Item
    users: [User]
    user(userid: String!): User
    tags: [Tag]
  }

  # this schema allows the following mutation:

  type Mutation {
   
    addItem (
      title: String!
      imageurl: String
      ownerid: String!
      description: String
      tags: [AssignedTag]!
    ): Item

    requestItem (
      itemid: Int!
      borrower: AssignedBorrower!
    ): Item
  }
`;

export default typeDefs;
