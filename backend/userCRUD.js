const getCollection = require("./database");
const userCollectionname = process.env.USER_COLLECTION_NAME;


const findUser = async (req, res) => {
  try {
    const { ownerEmail, collectionName } = req.query;
    console.log({ ownerEmail, collectionName });
    console.log(ownerEmail);
    // const db = client.db(DB_NAME);
    // const collection = db.collection(collectionName);
    const findResult = await getCollection(userCollectionname).findOne({
      ownerEmail: ownerEmail,
    });
    if (findResult !== null) {
      res.send({ Result: findResult, UserFound: true });
    } else {
      res.send({ UserFound: false });
    }
    console.log("find user", findResult);
  } catch (error) {
    console.error("Error finding user:", error);
    res.status(500).send("Internal Server Error");
  }
};

const saveUser = async (req, res) => {
  const user = req.body;
  const findResult = await getCollection(userCollectionname).insertOne(user);
  console.log("user saved");
  res.send({ success: true, result: findResult });
};

module.exports = { findUser, saveUser };
