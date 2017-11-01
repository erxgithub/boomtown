import { Pool } from 'pg';

function tagsQueryString(tags, itemid, result) {
  const length = tags.length;
  return length === 0 ?
    `${result};` :
    tags.shift() && tagsQueryString(tags, itemid, `${result}($${tags.length + 1}, ${itemid})${length === 1 ? '' : ','}`);
}

export default function (app) {
  const pool = new Pool({
    user: app.get('PGUSER'),
    host: app.get('PGHOST'),
    database: app.get('PGDATABASE'),
    password: app.get('PGPASSWORD'),
  });

  return {
    getTags() {
      return pool.query('SELECT * FROM tags')
        .then(response => response.rows);
    },
    getItems() {
      return pool.query('SELECT * FROM items')
        .then(response => response.rows);
    },
    getItem(itemid) {
      const query = {
        text: 'SELECT * FROM items WHERE itemid = $1',
        values: [itemid],
      };
      return pool.query(query).then(response => response.rows[0]);
    },
    getUser(userid) {
      const query = {
        text: 'SELECT * FROM user_profiles WHERE userid = $1',
        values: [userid],
      };
      return pool.query(query).then(response => response.rows[0]);
    },
    getUsers() {
      return pool.query('SELECT * FROM user_profiles')
        .then(response => response.rows);
    },
    getUserOwnedItems(ownerid) {
      const query = {
        text: 'SELECT * FROM items WHERE ownerid = $1',
        values: [ownerid],
      };
      return pool.query(query).then(response => response.rows);
    },
    getUserBorrowedItems(borrowerid) {
      const query = {
        text: 'SELECT * FROM items WHERE borrowerid = $1',
        values: [borrowerid],
      };
      return pool.query(query)
        .then(response => response.rows);
    },
    getTagsForItem(itemid) {
      const query = {
        text: `
        select * from tags 
            inner join itemtags on itemtags.tagid=tags.tagid
            where itemtags.itemid=$1`,
        values: [itemid],
      };
      return pool.query(query)
        .then(response => response.rows);
    },
    filteredItemsByTag(tagid) {
      const query = {
        text: `
        select * from items
            inner join itemtags
            on itemtags.itemid=item.itemid
            where itemtags.tagid=$1`,
        values: [tagid],
      };
      return pool.query(query).then(response => response.rows);
    },
    async createItem({ title, imageurl, description, ownerid, tags }) {
      const newItemQuery = {
        text: 'INSERT INTO items (title, imageurl, description, ownerid) VALUES ($1,$2,$3,$4) RETURNING *',
        values: [title, imageurl, description, ownerid],
      };

      try {
        const newItem = await pool.query(newItemQuery);
        const itemid = newItem.rows[0].itemid;

        const addTagsQuery = {
          text: `INSERT INTO itemtags (tagid, itemid) VALUES ${tagsQueryString([...tags], itemid, '')}`,
          values: tags.map(tag => tag.tagid),
        };

        await pool.query(addTagsQuery);
        return newItem.rows[0];
      } catch (e) {
        console.log(e);
      }
    },
    requestItem(itemid, borrower) {
      const query = {
        text: 'UPDATE items SET borrowerid=$1 WHERE itemid=$2 RETURNING *',
        values: [borrower.userid, itemid],
      };
      return pool.query(query).then(response => response.rows[0]);
    },
  };
}

