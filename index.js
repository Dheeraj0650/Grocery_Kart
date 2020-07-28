

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://Dheeru_0650:@mflix-t3llq.mongodb.net/Grocerys", {useNewUrlParser:true});

const GrocerySchema = new mongoose.Schema({
  name:String,
  rating:Number,
  cost:Number
});

const Grocery = mongoose.model("Grocery",GrocerySchema);

const grocery = new Grocery({
  name:"sunflower oil",
  rating:5,
  cost:20
});

grocery.save();
const app = express();
// app.use("view engine","ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine','ejs');

app.get("/",function(req,res){
  res.render("item",{});
});

app.listen(2000,function(){
  console.log("server started");
});
