// backend/server.js

const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/api/auth",
  require("./routes/auth")
);

app.use(
  "/api/request",
  require("./routes/requestRoutes")
);

mongoose.connect(
  "mongodb://127.0.0.1:27017/dailyworker"
)

.then(() => {

  console.log(
    "MongoDB Connected"
  );

})

.catch((err) =>
  console.log(err)
);

app.listen(5000, () => {

  console.log(
    "Server Running on Port 5000"
  );

});