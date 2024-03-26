const express = require('express');
const app = express();
const mongoose = require("mongoose");
const stockRouter = require("./src/routes/stockRoutes")
const morgan = require("morgan")

app.use(express.json())

app.use(morgan("dev"))

mongoose
  .connect(
    "mongodb://127.0.0.1:27017/crud-task"
  )
  .then(() => {
    console.log('connected');  
  })
  .catch((err) => {
    console.log(err);
  });
app.use("/",stockRouter)
  
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
