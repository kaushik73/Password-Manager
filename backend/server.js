const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const { saveUser, findUser } = require("./userCRUD");
const {
  savePassword,
  deletePassword,
  getAllPasswords,
  updatePassword,
  onePassowrd,
} = require("./passwordsCRUD");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// -----------------------API's-----------------------

// save a user
app.post("/saveUser", async (req, res) => {
  await saveUser(req, res);
});

// find User
app.get("/findUser", async (req, res) => {
  await findUser(req, res);
});

// save a passoword
app.post("/savePassword", async (req, res) => {
  await savePassword(req, res);
});

// delete a passoword
app.delete("/deletePassword", async (req, res) => {
  await deletePassword(req, res);
});

// get all passowords
app.get("/getPasswords", async (req, res) => {
  await getAllPasswords(req, res);
});

// update a password
app.put("/edit", async (req, res) => {
  await updatePassword(req, res);
});

// get single Password
app.get("/onePassword", async (req, res) => {
  await onePassowrd(req, res);
});

app.listen(port, () => {
  console.log(`app listning on ${port}`);
});
