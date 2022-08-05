const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const route = require("./routes/route");


dotenv.config()
app.use(cors());
app.use(express.json());


const PORT =  process.env.PORT || 5000;
const DB_URI = process.env.DB_CONNECT
app.get("/", (req, res) => {
  res.send("hello");
});

app.use(route);

mongoose.connect(DB_URI, ()=> console.log("Connected to Db"))

app.listen(PORT, ()=> console.log("Server up and running"));