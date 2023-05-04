const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./src/route");

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api", userRouter);

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("Connected to db"))
  .catch((err) => console.log(err));

const port = process.env.PORT;

app.listen(port, () => console.log(`Server started on port ${port}`));

