require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate')
const GitHubStrategy = require('passport-github')
const OutlookStrategy = require('passport-outlook')

const app = express();
// app.use("view engine","ejs");

app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret: "",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


mongoose.connect("", {
  useNewUrlParser: true
});

mongoose.set("useCreateIndex", true);
mongoose.connection.on('open', function() {
  console.log('Connected to mongo server.');
  //trying to get collection names
  mongoose.connection.db.listCollections().toArray(function(err, names) {
    // [{ name: 'dbname.myCollection' }]
    module.exports.Collection = names;
  });
});


const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  googleId: String
});

userSchema.index({
  "username": 1
}, {
  sparse: true
})


userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);



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


const Shampoo = mongoose.model("Shampoo", GrocerySchema);
const HairColor = mongoose.model("HairColor", GrocerySchema);
const Conditioner = mongoose.model("Conditioner", GrocerySchema);
const HairSerum = mongoose.model("HairSerum", GrocerySchema);
const HairOil = mongoose.model("HairOil", GrocerySchema);
const HairCream = mongoose.model("HairCream", GrocerySchema);
const Dal = mongoose.model("Dal", GrocerySchema);
const Peanut = mongoose.model("Peanut", GrocerySchema);
const Groundnut = mongoose.model("Groundnut", GrocerySchema);
const Soya = mongoose.model("Soya", GrocerySchema);
const Oil = mongoose.model("Oil", GrocerySchema);
const Ghee = mongoose.model("Ghee", GrocerySchema);
const Staples = mongoose.model("Staples", GrocerySchema);
const Care = mongoose.model("Care", GrocerySchema);




const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.get("/", function(req, res) {
  // Oil.find({name : {$regex : new RegExp("nut", "i")}},function(err,values){
  //   console.log(values);
  // });

  res.render("home");
});



app.get('/auth/google',
  passport.authenticate('google', {
      scope: ['profile']
    }

  ));

app.get('/auth/google/Grocery_Kart',
  passport.authenticate('google', {
    failureRedirect: "/"
  }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("/main");
  });

app.get('/auth/github',
  passport.authenticate('github'));

app.get('/auth/github/Grocery_Kart',
  passport.authenticate('github', {
    failureRedirect: "/"
  }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/main');
  });


app.get('/auth/outlook',
  passport.authenticate('windowslive', {
    scope: [
      'openid',
      'profile',
      'offline_access',
      'https://outlook.office.com/Mail.Read'
    ]
  })
);

app.get('/auth/outlook/Grocery_Kart',
  passport.authenticate('windowslive', {
    failureRedirect: "/"
  }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect("/main");
  });


app.post("/register", function(req, res) {

  User.register({
    username: req.body.username
  }, req.body.password, function(err, user) {
    if (err) {
      // console.log(err);
    } else {
      passport.authenticate("local")(req, res, function() {
        // console.log("hello");
        res.redirect("/main");
      });
    }
  });



});
var objects_array = {
  "Dal": Dal,
  "Shampoo": Shampoo,
  "Conditioner": Conditioner,
  "Peanut": Peanut,
  "Groundnut": Groundnut,
  "Soya": Soya,
  "Oil": Oil,
  "Ghee": Ghee
};
var main_array = [Staples, Care];
var array = ['Staples', 'Personal & Baby Care', 'Snacks & Beverages', 'Packaged Food', 'Household Care', 'Dairy & Eggs'];
var array_collections = [
  [Dal, Peanut, Groundnut, Soya, Oil, Ghee],
  [],
  [],
  [],
  [],
  []
];
var array_name = [Staples, Care];
app.get("/main", function(req, res) {

  var grocery = [0,0,0,0,0,0];
  if (req.isAuthenticated()) {
    for (let i = 0; i < 2; i++) {
      array_name[i].find({
        discount: {
          $gte: 15
        }
      }, function(err, value) {
        if (err) {

        } else {
          grocery[i] =  value;
        }
      });
    }
    myVar = setTimeout(function() {
      // console.log(grocery);
      res.render("main", {
        array: array,
        grocery_array: grocery,
        array_collections: array_collections
      });
    }, 1000);


  } else {
    res.redirect("/");
  }
});

app.post("/login", function(req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, function(err) {
    if (err) {

    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/main");
      });
    }
  });
  //
  // app.get("/product",function(req,res){
  //   res.redirect("/main");
  // });
  //
  // app.get("/item",function(req,res){
  //   res.redirect("/main");
  // });







  //
  //   User.findOne({email: email}, function(error, foundUser) {
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       bcrypt.compare(password, foundUser.password).then(function(result) {
  //         if (result === true){
  //           console.log("you are welcome");
  //         }
  // });
  //     }
  //   });

});

app.post("/product", function(req, res) {
  // var products = req.body.name;
  // console.log(products);
  var body = req.body.name.split("#");
  // objects_array[products].find(function(err, values) {
  //   res.render("product", {
  //     grocery_array: values
  //   });
  // });
  main_array[Number(body[1])].find({
    name: {
      $regex: new RegExp(body[0], "i")
    }
  }, function(err, values) {
    res.render("product", {
      grocery_array: values,
      category: body[1]
    });
  });

});
app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

app.post("/product_item", function(req, res) {

});

app.post("/item", function(req, res) {
  // console.log(req.body.product_name);
  var body = req.body.product_name.split("#");
  array_name[Number(body[1])].find({
    name: body[0]
  }, function(err, value) {
    res.render("item", {
      product_details: value
    });
  });

});

app.get("/payment", function(req, res) {
  res.render("payment");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 9000;
}
app.listen(port, function() {
  console.log("connected");
});
