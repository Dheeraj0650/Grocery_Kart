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
  secret: "LifeIsVeryShortAlwaysBeHappy.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


mongoose.connect("mongodb+srv://Dheeru_0650:Kdheeraj@1234@mflix-t3llq.mongodb.net/Grocerys", {
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

const care1 = new Care({
  name: "NIVEA Creme  (60 ml)",
  Actual_price: 99,
  discount: 15,
  final_price: 84,
  count: 10,
  quantity: ["60ml @140/100ml"],
  Highlights: ["Application Area: Body", "For Women", "All Day Cream", "For All Skin Types", "Cream Form"],
  description: `Dry, oily or combination skin - with this Nivea Creme, you can pamper your skin and give it all the nourishment it requires.

Moisturizer for All Seasons

Don't let the change in the weather affect your skin. With this Nivea Cream, you can keep your skin nourished and moisturized all year long.

Gentle Moisturization

A dollop of this cream is all you need to get rid of dry skin and to give it the much-needed moisturization.`,
  Specifications: [
    ["Sales Package", "1 Cream Jar"],
    ["Model Name", "Creme"],
    ["Quantity", "60 ml"],
    ["Ideal For", "Women"],
    ["Form", "Cream"],
    ["Application Area", "Body"]
  ],

  images: ["https://rukminim1.flixcart.com/image/800/800/jxm5d3k0/moisturizer-cream/z/z/7/60-creme-nivea-cream-original-imafgfj3megpbmc9.jpeg?q=70",
    "https://rukminim1.flixcart.com/image/800/800/jxm5d3k0/moisturizer-cream/z/z/7/60-creme-nivea-cream-original-imafgfj3megpbmc9.jpeg?q=70",
    "https://rukminim1.flixcart.com/image/800/800/jxm5d3k0/moisturizer-cream/u/8/p/30-creme-nivea-cream-original-imafgfj5vtakxgjz.jpeg?q=70",
    "https://rukminim1.flixcart.com/image/800/800/jxm5d3k0/moisturizer-cream/u/8/p/30-creme-nivea-cream-original-imafgfj3taggthar.jpeg?q=70"
  ],
  rating: 0,
  rating_count: 0

});

// care1.save();


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
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRETS,
    callbackURL: "https://limitless-cove-52361.herokuapp.com/auth/google/Grocery_Kart",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({
      googleId: profile.id
    }, function(err, user) {
      return cb(err, user);
    });
  }
));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRETS,
    callbackURL: "https://limitless-cove-52361.herokuapp.com/auth/github/Grocery_Kart",
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({
      githubId: profile.id
    }, function(err, user) {
      return cb(err, user);
    });
  }
));

passport.use(new OutlookStrategy({
    clientID: process.env.OUTLOOK_CLIENT_ID,
    clientSecret: process.env.OUTLOOK_CLIENT_SECRETS,
    callbackURL: "https://limitless-cove-52361.herokuapp.com/auth/outlook/Grocery_Kart",
  },
  function(accessToken, refreshToken, profile, done) {
    var user = {
      outlookId: profile.id,
      name: profile.DisplayName,
      email: profile.EmailAddress,
      accessToken: accessToken
    };
    if (refreshToken)
      user.refreshToken = refreshToken;
    if (profile.MailboxGuid)
      user.mailboxGuid = profile.MailboxGuid;
    if (profile.Alias)
      user.alias = profile.Alias;
    User.findOrCreate(user, function(err, user) {
      return done(err, user);
    });
  }
));


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

  var grocery = [];
  if (req.isAuthenticated()) {
    for (let i = 0; i < 2; i++) {
      array_name[i].find({
        discount: {
          $gte: 15
        }
      }, function(err, value) {
        if (err) {

        } else {
          grocery.push(value);
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
