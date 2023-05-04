const express = require("express");
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("./controllers/user");

const router = express.Router();

router.get("/read", getUsers);

router.post("/create", createUser);

router.put("/update/:phone", updateUser);

router.delete("/delete/:phone", deleteUser);

module.exports = router;
