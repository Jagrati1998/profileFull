require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/UserRouter");
const cors = require("cors");

const app = express();

// Middlware
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(`/api`, userRouter);

app.listen(3001, () => {
  console.log("Application Serving at Port 3001");
});

// Mongo DB Connection
mongoose.connect(
  `mongodb://${process.env.Mongo_IP}/${process.env.MOngo_DB}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);

module.exports = app;
