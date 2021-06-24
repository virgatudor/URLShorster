const express = require('express')
const cors = require('cors');
const app = express()
const port = 8080
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const shortURL = require('./routes/ApplicationRoutes'); 
const uri =
  "mongodb+srv://admin:swag1234@cluster0.f55kl.mongodb.net/URLShorster?retryWrites=true&w=majority";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use("/", shortURL);

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})

module.exports = {
  app : app,
  uri: uri
}