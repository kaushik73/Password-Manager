const getCollection = require("./database");
const passowordCollectionName = process.env.PASSWORD_COLLECTION_NAME;
const { ObjectId } = require("mongodb");

const savePassword = async (req, res) => {
  const password = req.body;
  const findResult = await getCollection(passowordCollectionName).insertOne(
    password
  );
  console.log("password saved");
  res.send({ success: true, result: findResult });
};

const deletePassword = async (req, res) => {
  const password = req.body;
  const findResult = await getCollection(passowordCollectionName).deleteOne(
    password
  );
  console.log("password deleted");
  res.send({ success: true, result: findResult });
};

const getAllPasswords = async (req, res) => {
  const { ownerEmail } = req.query;

  const findResult = await getCollection(passowordCollectionName)
    .find({ ownerEmail: ownerEmail })
    .toArray();
  console.log("get all password");
  res.send(findResult);
};

const updatePassword = async (req, res) => {
  try {
    const { _id, ...newPasswordData } = req.body;

    if (!_id || !ObjectId.isValid(_id)) {
      return res.status(400).json({ error: "Invalid _id provided" });
    }

    if (Object.keys(newPasswordData).length === 0) {
      return res.status(400).json({ error: "No fields to update provided" });
    }

    // const db = client.db(DB_NAME);
    // const collection = db.collection("passwords");

    const updateResult = await getCollection(passowordCollectionName).updateOne(
      { _id: new ObjectId(_id) },
      { $set: newPasswordData }
    );

    if (updateResult.matchedCount === 0) {
      return res.status(404).json({ error: "Document not found" });
    }

    console.log("Update result:", updateResult);

    res.json({ success: true, message: "Document updated successfully" });
  } catch (error) {
    console.error("Error updating document:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
};

const onePassowrd = async (req, res) => {
  const { id: _id } = req.query;
  console.log(`id: ${_id} type: ${typeof _id}`);
  // const db = client.db(DB_NAME);
  // const collection = db.collection("passwords");
  const findResult = await getCollection(passowordCollectionName).findOne({
    _id: new ObjectId(_id),
  });
  console.log("get one password");
  res.send(findResult);
};

module.exports = {
  savePassword,
  deletePassword,
  getAllPasswords,
  updatePassword,
  onePassowrd,
};
