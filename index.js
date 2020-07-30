const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const encrypt = require('mongoose-encryption');
const app = express();
// app.use("view engine","ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

mongoose.connect("mongodb+srv://:@mflix-t3llq.mongodb.net/Grocerys", {
  useNewUrlParser: true
});

const userSchema = {
  username: String,
  email: String,
  password: String
};

const GrocerySchema = new mongoose.Schema({

  name: String,

  Actual_price: Number,

  discount: Number,

  final_price: Number,

  count: Number,

  quantity: [String],

  Highlights: [
    String
  ],

  description: String,

  Specifications: [
    [String],
  ],

  images: [String],
  rating: Number,
  rating_count: Number

});

const User = mongoose.model("User", userSchema);


app.get("/", function(req, res) {
  res.render("home");
});

app.post("/register", function(req, res) {
  const newUser = new User({
    username: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  newUser.save(function(error) {
    if (error) {

    } else {

    }
  });

});

app.post("/login", function(req, res) {


  const email = req.body.email;
  const password = req.body.password;


  User.findOne({email: email}, function(error, foundUser){
    if (error) {
      console.log(error);
    } else {
      if (foundUser.password === password) {
        console.log("you are in");
      }
    }
  });

});


app.listen(2000, function() {
  console.log("connected");
});
