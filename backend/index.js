const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./routes/AuthRouter");
const ProductRouter = require("./routes/ProductRouter");
require("dotenv").config();
require("./models/DB");

// const PORT = process.env.PORT || 3000;

app.get("/ping", (request, response) => {
  response.send("PONG");
});

app.use(bodyParser.json());
app.use(cors());
app.use("/auth", AuthRouter);
app.use("/products", ProductRouter);

app.listen(() => {
  console.log(`server is running on https://auth-on-mern.vercel.app`);
});


