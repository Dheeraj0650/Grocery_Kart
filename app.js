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

app.use(express.static(__dirname+'public'));
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
  console.log("hi");
  mongoose.connection.db.listCollections().toArray(function(err, names) {
    console.log(names); // [{ name: 'dbname.myCollection' }]
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
// passport.use(new GoogleStrategy({
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRETS,
//     callbackURL: "http://localhost:3000/auth/google/Grocery_Kart",
//     userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     console.log(profile);
//     User.findOrCreate({
//       googleId: profile.id
//     }, function(err, user) {
//       return cb(err, user);
//     });
//   }
// ));
//
// passport.use(new GitHubStrategy({
//     clientID: process.env.GITHUB_CLIENT_ID,
//     clientSecret: process.env.GITHUB_CLIENT_SECRETS,
//     callbackURL: "http://localhost:3000/auth/github/Grocery_Kart",
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({
//       githubId: profile.id
//     }, function(err, user) {
//       return cb(err, user);
//     });
//   }
// ));
//
// passport.use(new OutlookStrategy({
//     clientID: process.env.OUTLOOK_CLIENT_ID,
//     clientSecret: process.env.OUTLOOK_CLIENT_SECRETS,
//     callbackURL: "http://localhost:3000/auth/outlook/Grocery_Kart",
//   },
//   function(accessToken, refreshToken, profile, done) {
//     var user = {
//       outlookId: profile.id,
//       name: profile.DisplayName,
//       email: profile.EmailAddress,
//       accessToken: accessToken
//     };
//     if (refreshToken)
//       user.refreshToken = refreshToken;
//     if (profile.MailboxGuid)
//       user.mailboxGuid = profile.MailboxGuid;
//     if (profile.Alias)
//       user.alias = profile.Alias;
//     User.findOrCreate(user, function(err, user) {
//       return done(err, user);
//     });
//   }
// ));
//

app.get(__dirname + "/", function(req, res) {
  // Oil.find({name : {$regex : new RegExp("nut", "i")}},function(err,values){
  //   console.log(values);
  // });

  res.render("home");
});



// app.get('/auth/google',
//   passport.authenticate('google', {
//       scope: ['profile']
//     }
//
//   ));
//
// app.get('/auth/google/Grocery_Kart',
//   passport.authenticate('google', {
//     failureRedirect: __dirname + "/"
//   }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect(__dirname + "/main");
//   });
//
// app.get('/auth/github',
//   passport.authenticate('github'));
//
// app.get('/auth/github/Grocery_Kart',
//   passport.authenticate('github', {
//     failureRedirect: __dirname + "/"
//   }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect(__dirname + '/main');
//   });
//
//
// app.get('/auth/outlook',
//   passport.authenticate('windowslive', {
//     scope: [
//       'openid',
//       'profile',
//       'offline_access',
//       'https://outlook.office.com/Mail.Read'
//     ]
//   })
// );
//
// app.get('/auth/outlook/Grocery_Kart',
//   passport.authenticate('windowslive', {
//     failureRedirect: __dirname + "/"
//   }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect(__dirname + "/main");
//   });


app.post(__dirname + "/register", function(req, res) {

  User.register({
    username: req.body.username
  }, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function() {
        console.log("hello");
        res.redirect(__dirname + "/main");
      });
    }
  });



});

var array = ['Staples', 'Snacks & Beverages', 'Packaged Food', 'Personal & Baby Care', 'Household Care', 'Dairy & Eggs'];
var array_collections = [
  [Dal, Peanut, Groundnut, Soya, Oil, Ghee],
  [],
  [],
  [],
  [],
  []
];
var array_name = [Staples];
app.get(__dirname + "/main", function(req, res) {

  var grocery = [];
  if (req.isAuthenticated()) {
    for (let i = 0; i < 1; i++) {
      array_name[i].find(function(err, shampoos) {
        if (err) {

        } else {
          grocery.push(shampoos);
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
    }, 7000);


  } else {
    res.redirect(__dirname + "/");
  }
});

app.post(__dirname + "/login", function(req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, function(err) {
    if (err) {

    } else {
      passport.authenticate("local")(req, res, function() {
        res.redirect(__dirname + "/main");
      });
    }
  });


  app.post(__dirname + "/product", function(req, res) {
    Shampoo.find(function(err, values) {
      res.render("product", {
        grocery_array: values
      });
    });

  });






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

app.get(__dirname + "/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

app.post(__dirname + "/item", function(req, res) {
  console.log(req.body.product_name);
  var body = req.body.product_name.split("#");
  array_name[Number(body[1])].find({
    name: body[0]
  }, function(err, value) {
    res.render("item", {
      product_details: value
    });
  });

});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);

app.listen(port, function() {
  console.log("connected");
});
