const express = require("express");
const app = express();
const mongoose = require("mongoose");
const stockRouter = require("./src/routes/stockRoutes");
const morgan = require("morgan");
const cors = require("cors");

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());



mongoose
  .connect("mongodb://127.0.0.1:27017/crud-task")
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });
app.use("/", stockRouter);

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
