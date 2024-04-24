const { MongoClient } = require("mongodb");

const MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.b5rkan9.mongodb.net`;
const DB_NAME = process.env.DB_NAME;
const client = new MongoClient(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db;
function getDB() {
  client.connect();
  return client.db(DB_NAME);
}

module.exports = function getCollection(collectionName) {
  if (!db) {
    db = getDB();
  }
  return db.collection(collectionName);
};
