require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const app = express();
// app.use("view engine","ejs");

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

<<<<<<< HEAD
app.use(session({

  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


mongoose.connect("mongodb+srv:@mflix-t3llq.mongodb.net/Grocerys", {
=======
mongoose.connect("mongodb+srv://Grocerys", {
>>>>>>> e0caf550d5d3202bd1c0cc228f0fb8712a2e92c3
  useNewUrlParser: true
});

mongoose.set("useCreateIndex", true);
mongoose.connection.on('open', function () {
    console.log('Connected to mongo server.');
    //trying to get collection names
    console.log("hi");
    mongoose.connection.db.listCollections().toArray(function (err, names) {
        console.log(names); // [{ name: 'dbname.myCollection' }]
        module.exports.Collection = names;
    });
});


const userSchema = new mongoose.Schema({
  email: String,
  password: String
});


userSchema.plugin(passportLocalMongoose);

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
const Dal = mongoose.model("Dal",GrocerySchema);
const Peanut = mongoose.model("Peanut",GrocerySchema);
const Groundnut = mongoose.model("Groundnut",GrocerySchema);
const Soya = mongoose.model("Soya",GrocerySchema);

//
// const dal = new Dal({
// name: "Toor Dal",
// Actual_price: 100,
// discount: 40,
// final_price: 60,
// count: 10,
// quantity: ["500 g @120/kg"],
// Highlights: [""],
// description: "",
// Specifications: [
// ["Brand", "Un Branded"],
// ["Type", "Toor Dal"],
// ["Quantity", "500 g"],
// ["Form", "NA"],
// ["Common Name", "Dal"],
// ["Polished", "No"],
// ["Organic", "No"],
// ["Container Type", "Pouch"],
// ["Maximum Shelf Life", "6 Months"],
// ["Model Name", "Toor Dal/Arhar Dal (Desi)"]
// ],
// images:["https://rukminim1.flixcart.com/image/800/800/j8rnpu80/pulses/q/g/w/500-toor-dal-arhar-dal-desi-arhar-dal-un-branded-original-imaeymjgrjw8xgvw.jpeg?q=70",
// "https://rukminim1.flixcart.com/image/800/800/j8t35ow0/pulses/q/g/w/500-toor-dal-arhar-dal-desi-arhar-dal-un-branded-original-imaeymjgdcrexbkg.jpeg?q=70",
// "https://rukminim1.flixcart.com/image/800/800/k6b2snk0/pulses/q/g/w/500-toor-dal-arhar-dal-desi-toor-dal-un-branded-original-imafzsexythkccfu.jpeg?q=70",
// "https://rukminim1.flixcart.com/image/800/800/jd1z9u80/pulses/3/f/q/2-toor-dal-arhar-dal-desi-arhar-dal-flipkart-supermart-select-original-imaeymjjxgbxzzhr.jpeg?q=70",
// "https://rukminim1.flixcart.com/image/800/800/k6dxocw0/pulses/q/g/w/500-toor-dal-arhar-dal-desi-toor-dal-un-branded-original-imafzsex6tw3zbmr.jpeg?q=70"
// ],
// rating: 0,
// rating_count: 0
//
// });


// const dal1 = new Dal({
// name: "Urad Dal White (Whole)",
// Actual_price: 210,
// discount: 33,
// final_price: 139,
// count: 10,
// quantity: ["500 g @148/kg","1 kg @139/kg"],
// Highlights: [""],
// description: "",
// Specifications: [
// ["Brand", "Un Branded"],
// ["Type", "Urad Dal"],
// ["Quantity", "1 kg"],
// ["Form", "Whole"],
// ["Common Name", "Dal"],
// ["Polished", "No"],
// ["Organic", "No"],
// ["Container Type", "Pouch"],
// ["Maximum Shelf Life", "6 Months"],
// ["Model Name", "Urad Dal Whole"]
// ],
// images:["https://rukminim1.flixcart.com/image/800/800/j9d3bm80/pulses/a/w/u/500-urad-dal-whole-urad-dal-un-branded-original-imaeymjg6fbx8cb6.jpeg?q=70",
// "https://rukminim1.flixcart.com/image/800/800/j9d3bm80/pulses/a/w/u/500-urad-dal-whole-urad-dal-un-branded-original-imaeymjgsztvdavh.jpeg?q=70",
// "https://rukminim1.flixcart.com/image/800/800/k5fn3ww0/pulses/j/j/y/1-urad-dal-whole-urad-dal-un-branded-original-imafzyz8urgzjzyx.jpeg?q=70",
// "https://rukminim1.flixcart.com/image/800/800/jd3epow0/pulses/n/j/8/2-urad-dal-whole-urad-dal-flipkart-supermart-select-original-imaeymjgh9tyk6je.jpeg?q=70",
// "https://rukminim1.flixcart.com/image/800/800/k5fn3ww0/pulses/j/j/y/1-urad-dal-whole-urad-dal-un-branded-original-imafzyz8hgde3yeu.jpeg?q=70"
// ],
// rating: 0,
// rating_count: 0
//
// });
//
// const dal2 = new Dal({
// name: "Moong Dal Yellow (Split)",
// Actual_price: 240,
// discount: 40,
// final_price: 142,
// count: 10,
// quantity: ["500 g @154/kg","1 kg @142/kg"],
// Highlights: [""],
// description: "",
// Specifications: [
// ["Brand", "Un Branded"],
// ["Type", "Moong Dal"],
// ["Quantity", "1 kg"],
// ["Form", "Split"],
// ["Common Name", "Dal"],
// ["Polished", "No"],
// ["Organic", "No"],
// ["Container Type", "Pouch"],
// ["Maximum Shelf Life", "6 Months"],
// ["Model Name", "Moong Dal"]
// ],
// images:["https://rukminim1.flixcart.com/image/800/800/j8rnpu80/pulses/m/j/c/1-moong-dal-moong-dal-un-branded-original-imaeymjgdha3wqts.jpeg?q=70",
// "https://rukminim1.flixcart.com/image/800/800/j8t35ow0/pulses/6/f/c/500-moong-dal-moong-dal-un-branded-original-imaeymjgyqjmhhgb.jpeg?q=70",
// "https://rukminim1.flixcart.com/image/800/800/k5bcscw0/pulses/m/j/c/1-moong-dal-moong-dal-un-branded-original-imafzyphxcgayrgh.jpeg?q=70",
// "https://rukminim1.flixcart.com/image/800/800/k5fn3ww0/pulses/m/j/c/1-moong-dal-moong-dal-un-branded-original-imafzyphmc45q4h7.jpeg?q=70",
// "https://rukminim1.flixcart.com/image/800/800/jd3epow0/pulses/5/p/z/2-moong-dal-dhuli-moong-dal-flipkart-supermart-select-original-imaeymjghngqbnz4.jpeg?q=70"
// ],
// rating: 0,
// rating_count: 0
//
// });
//
// const dal3 = new Dal({
// name: "Chana Brown",
// Actual_price: 130,
// discount: 43,
// final_price: 74,
// count: 10,
// quantity: ["500 g @88/kg","1 kg @74/kg"],
// Highlights: [""],
// description: "",
// Specifications: [
// ["Brand", "Un Branded"],
// ["Type", "Chana"],
// ["Quantity", "1 kg"],
// ["Form", "NA"],
// ["Common Name", "Chana"],
// ["Polished", "No"],
// ["Organic", "No"],
// ["Container Type", "Pouch"],
// ["Maximum Shelf Life", "6 Months"],
// ["Model Name", "Channa Brown"]
// ],
// images:["https://rukminim1.flixcart.com/image/800/800/j8ndea80/pulses/w/r/y/500-channa-brown-chana-flipkart-channa-dal-original-imaeymjjzzzn6xz9.jpeg?q=70",
// "https://rukminim1.flixcart.com/image/800/800/j8rnpu80/pulses/w/r/y/500-channa-brown-chana-un-branded-original-imaeymjjczwuxgjf.jpeg?q=70",
// "https://rukminim1.flixcart.com/image/800/800/k5bcscw0/pulses/x/d/d/1-channa-brown-chana-un-branded-original-imafzyzcwrqupprh.jpeg?q=70",
// "https://rukminim1.flixcart.com/image/800/800/ja73ki80/pulses/z/6/d/500-channa-brown-chana-flipkart-supermart-select-original-imaeymjkx3e752ch.jpeg?q=70",
// "https://rukminim1.flixcart.com/image/800/800/k5cs87k0/pulses/x/d/d/1-channa-brown-chana-un-branded-original-imafzyzcksq9yrcz.jpeg?q=70"
// ],
// rating: 0,
// rating_count: 0
//
// });
//
//
// const dal4 = new Dal({
// name: "Masoor Dal Black (Whole)",
// Actual_price: 70,
// discount: 24,
// final_price: 50,
// count: 10,
// quantity: ["500 g @106/kg"],
// Highlights: [""],
// description: "",
// Specifications: [
// ["Brand", "Un Branded"],
// ["Type", "Masoor Dal"],
// ["Quantity", "500 g"],
// ["Form", "Whole"],
// ["Common Name", "Dal"],
// ["Polished", "No"],
// ["Organic", "No"],
// ["Container Type", "Pouch"],
// ["Maximum Shelf Life", "6 Months"],
// ["Model Name", "Masoor Black Whole/Sabut"]
// ],
// images:["https://rukminim1.flixcart.com/image/800/800/j9d3bm80/pulses/n/z/x/500-masoor-black-whole-sabut-masoor-dal-un-branded-original-imaeymjj5nwuecep.jpeg?q=70",
// "https://rukminim1.flixcart.com/image/800/800/j9d3bm80/pulses/n/z/x/500-masoor-black-whole-sabut-masoor-dal-un-branded-original-imaeymjjdythkesy.jpeg?q=70",
// "https://rukminim1.flixcart.com/image/800/800/j9d3bm80/pulses/n/z/x/500-masoor-black-whole-sabut-masoor-dal-un-branded-original-imaez6g9qxhyzfmc.jpeg?q=70",
// "https://rukminim1.flixcart.com/image/800/800/ja9yg7k0/pulses/y/t/5/500-masoor-black-whole-masoor-dal-flipkart-supermart-select-original-imaeymjjb2vzkzpw.jpeg?q=70",
// "https://rukminim1.flixcart.com/image/800/800/j9n3ekw0/pulses/n/z/x/500-masoor-black-whole-sabut-masoor-dal-un-branded-original-imaez6g9smedrymt.jpeg?q=70"
// ],
// rating: 0,
// rating_count: 0
//
// });

// const peanut = new Peanut({
// name: "Double Swastik Peanut (Whole)",
// Actual_price: 180,
// discount: 31,
// final_price: 123,
// count: 10,
// quantity: ["1 kg @123/kg"],
// Highlights: [""],
// description: "",
// Specifications: [
// ["Brand", "Double Swastik"],
// ["Type", "Peanut"],
// ["Quantity", "1 kg"],
// ["Form", "Whole"],
// ["Common Name", ""],
// ["Polished", "No"],
// ["Organic", "No"],
// ["Container Type", ""],
// ["Maximum Shelf Life", "2 Months"],
// ["Model Name", "Peanut"]
// ],
// images:["https://rukminim1.flixcart.com/image/800/800/kd4uj680/pulses/h/e/a/1-peanut-peanut-double-swastik-original-imafu3pabbumgbc8.jpeg?q=70",
// "https://rukminim1.flixcart.com/image/800/800/kd4uj680/pulses/h/e/a/1-peanut-peanut-double-swastik-original-imafu3pahzdz6yzt.jpeg?q=70",
// "https://rukminim1.flixcart.com/image/800/800/kd4uj680/pulses/h/e/a/1-peanut-peanut-double-swastik-original-imafu3pagpjn7nzx.jpeg?q=70",
// "https://rukminim1.flixcart.com/image/800/800/kd4uj680/pulses/k/y/4/500-peanut-peanut-double-swastik-original-imafu3p7dtgm5bs9.jpeg?q=70"
// ],
// rating: 0,
// rating_count: 0
//
// });

// Dal.insertMany([dal1,dal2,dal3,dal4],function(err,){
//
// })
//
// const peanut = new Peanut({
// name: "Origo Fresh Brown Raw Peanut (Whole)",
// Actual_price: 65,
// discount: 26,
// final_price: 48,
// count: 10,
// quantity: ["250 g @192/kg"],
// Highlights: [""],
// description: "",
// Specifications: [
// ["Brand", "Origo Fresh"],
// ["Type", "Raw Peanut"],
// ["Quantity", "250 g"],
// ["Form", "Whole"],
// ["Common Name", ""],
// ["Polished", "No"],
// ["Organic", "No"],
// ["Container Type", "Pouch"],
// ["Maximum Shelf Life", "4 Months"],
// ["Model Name", "Raw Peanut Regular"]
// ],
// images:["https://rukminim1.flixcart.com/image/800/800/k7f34i80/pulses/f/f/s/250-raw-peanut-regular-raw-peanut-origo-fresh-original-imafpnz9myjkg699.jpeg?q=70",
// "https://rukminim1.flixcart.com/image/800/800/k7f34i80/pulses/f/f/s/250-raw-peanut-regular-raw-peanut-origo-fresh-original-imafpnz897hnskux.jpeg?q=70",
// "https://rukminim1.flixcart.com/image/800/800/k7f34i80/pulses/f/f/s/250-raw-peanut-regular-raw-peanut-origo-fresh-original-imafpnz8huxvcsff.jpeg?q=70"
// ],
// rating: 0,
// rating_count: 0
//
// });
// peanut.save();
//
// const groundnut = new Groundnut({
// name: "Safe Harvest Peanut (Whole)",
// Actual_price: 129,
// discount: 8,
// final_price: 118,
// count: 10,
// quantity: ["250 g @76/kg","500 g @236/kg"],
// Highlights: [""],
// description: "",
// Specifications: [
// ["Brand", "Safe Harvest"],
// ["Type", "Peanut"],
// ["Quantity", "500 g"],
// ["Form", "Whole"],
// ["Common Name", "Groundnut"],
// ["Polished", "No"],
// ["Organic", "No"],
// ["Container Type", "Pouch"],
// ["Maximum Shelf Life", "9 Months"],
// ["Model Name", "Groundnut"]
// ],
// images:["https://rukminim1.flixcart.com/image/800/800/jtx9evk0/pulses/p/7/b/500-groundnut-peanut-safe-harvest-original-imaff5rudz9pkyjj.jpeg?q=70",
// "https://rukminim1.flixcart.com/image/800/800/jtx9evk0/pulses/p/7/b/500-groundnut-peanut-safe-harvest-original-imaff5ruxhpmshch.jpeg?q=70",
// "https://rukminim1.flixcart.com/image/800/800/jtx9evk0/pulses/p/7/b/500-groundnut-peanut-safe-harvest-original-imaff5ru9g4mhzk4.jpeg?q=70",
// "https://rukminim1.flixcart.com/image/800/800/jfh54sw0/pulses/p/7/b/500-groundnuts-peanut-safe-harvest-original-imaf3xgtkcfnc8fg.jpeg?q=70"
// ],
// rating: 0,
// rating_count: 0
//
// });
//
// groundnut.save();

// const soya = new Soya({
// name: "Nutrela Soya Chunks",
// Actual_price: 45,
// discount: 0,
// final_price: 45,
// count: 10,
// quantity: ["200 g @19/100g"],
// Highlights: [""],
// description: "",
// Specifications: [
// ["Brand", "Nutrela"],
// ["Type", "Soya Chunks"],
// ["Quantity", "200 g"],
// ["Form", ""],
// ["Common Name", ""],
// ["Polished", ""],
// ["Organic", ""],
// ["Container Type", "Box"],
// ["Maximum Shelf Life", "12 Months"],
// ["Model Name", ""]
// ],
// images:["https://rukminim1.flixcart.com/image/800/800/ja73ki80/soya-chunk/s/c/f/200-soya-chunks-nutrela-original-imaeztwtzkfycwqk.jpeg?q=70",
// "https://rukminim1.flixcart.com/image/800/800/ja73ki80/soya-chunk/s/c/f/200-soya-chunks-nutrela-original-imaeztwtajgr9cnf.jpeg?q=70",
// "https://rukminim1.flixcart.com/image/800/800/ja73ki80/soya-chunk/s/c/f/200-soya-chunks-nutrela-original-imaeztwt9ad8havm.jpeg?q=70",
// "https://rukminim1.flixcart.com/image/800/800/ja73ki80/soya-chunk/s/c/f/200-soya-chunks-nutrela-original-imaeztwtmfhrfyzq.jpeg?q=70",
// "https://rukminim1.flixcart.com/image/800/800/ja73ki80/soya-chunk/s/c/f/200-soya-chunks-nutrela-original-imaeztwtxeytqumm.jpeg?q=70"
// ],
// rating: 0,
// rating_count: 0
//
// });



// const soya = new Soya({
// name: "Double Horse Nano Soya Chunk",
// Actual_price: 48,
// discount: 0,
// final_price: 48,
// count: 10,
// quantity: ["200 g @24/100g"],
// Highlights: [""],
// description: "",
// Specifications: [
// ["Brand", "Double Horse"],
// ["Type", "Nano Soya Chunk"],
// ["Quantity", "200 g"],
// ["Form", ""],
// ["Common Name", "No"],
// ["Polished", ""],
// ["Organic", ""],
// ["Container Type", "Pouch"],
// ["Maximum Shelf Life", "12 Months"],
// ["Model Name", ""]
// ],
// images:["https://rukminim1.flixcart.com/image/800/800/jialea80/soya-chunk/n/t/m/200-nano-soya-chunk-double-horse-original-imaf6489pyvymdza.jpeg?q=70",
// "https://rukminim1.flixcart.com/image/800/800/jialea80/soya-chunk/n/t/m/200-nano-soya-chunk-double-horse-original-imaf6489zfhfzzzg.jpeg?q=70",
// "https://rukminim1.flixcart.com/image/800/800/jialea80/soya-chunk/n/t/m/200-nano-soya-chunk-double-horse-original-imaf6489zygj3rak.jpeg?q=70",
// "https://rukminim1.flixcart.com/image/800/800/jialea80/soya-chunk/n/t/m/200-nano-soya-chunk-double-horse-original-imaf6489y49zgygj.jpeg?q=70",
// "https://rukminim1.flixcart.com/image/800/800/jialea80/soya-chunk/n/t/m/200-nano-soya-chunk-double-horse-original-imaf6489ynfzqu2s.jpeg?q=70"
// ],
// rating: 0,
// rating_count: 0
//
// });
//
// soya.save();

//
// const shampoo = new Shampoo({
//   name: "L'Oreal Total Repair 5 Shampoo Men & Women",
//
//   Actual_price:450 ,
//
//   discount:1 ,
//
//   final_price:445 ,
//
//   count: 1,
//
//   quantity: ["640ml @63/100ml"],
//
//   Highlights: [
//     "Damage Repair Shampoo",
//     "Ideal For: Men & Women",
//     "Suitable For: All Hair Types",
//     "Formulated For: Damaged Hair",
//     "Composition: Real Beer"
//
//   ],
//
//   description:  `5 Problems.1 Solution. L'Oreal Paris Total Repair 5 Repairing Shampoo helps fight against the five visible signs of damaged hair - Hair fall, dryness, roughness, dullness and split ends without weighing it down.� Damaged hair can lack the natural cement which keeps the hair strong and resilient. To ensure cohesion and strength, the L�Oreal Laboratories have created Ceramide-Cement technology to replicate the hair�s natural cement, targetting the 5 problems. Explore our best hair products to revive and repair damaged hair. With Protein + Ceramide. Shampoo For Damaged Hair. Fights The 5 Signs Of Damage.`,
//
//   Specifications: [
//   ["Brand","L'Oreal"],
//   ["Applied For","Damage Repair"],
//   ["Hair Type","All Hair Types"],
//   ["Composition","Real Beer"],
//   ["Container Type","Dispenser"],
//   ["Ideal For","Men & Women"],
//   ["pack_of","1"]
//
//   ],
//  images: ["https://rukminim1.flixcart.com/image/${a}/${b}/k2p1q4w0/shampoo/s/n/p/640-total-repair-5-shampoo-l-oreal-original-imafhzgtw7qmcfdm.jpeg?q=70",
//  "https://rukminim1.flixcart.com/image/${a}/${b}/k2p1q4w0/shampoo/s/n/p/640-total-repair-5-shampoo-l-oreal-original-imafjzakrgmpfpgt.jpeg?q=70",
//  "https://rukminim1.flixcart.com/image/${a}/${b}/k2p1q4w0/shampoo/s/n/p/640-total-repair-5-shampoo-l-oreal-original-imafe5bfgffq5msy.jpeg?q=70"],
// rating:4.6 ,
// rating_count: 500
//
// });
//
//
//
//
//
//
//
//
//
//
// const conditioner= new Conditioner({
//   name: "Dove Hair Fall Rescue Conditioner",
//
//   Actual_price:190 ,
//
//   discount:15 ,
//
//   final_price: 161,
//
//   count:1 ,
//
//   quantity: ["180ml @89/100ml"],
//
//   Highlights: [
//     "For Anti-hair Fall, Frizz Control",
//     "For Anti-hair Fall, Frizz Control",
//     "Men & Women Conditioner"
//
//   ],
//
//   description: `If you wish to get thick, shiny, and strong hair, then Dove Hair Fall Rescue Conditioner is there for you. It nourishes hair with Nutrilock and reduces hair fall as well as breakage to give you flowy long locks.
// Deep Nourishment
// This conditioner nourishes hair from roots to tips to give you lovely hair.
// Fortifies Strands
// By fortifying hair strands, it reduces hair fall.
// Formulated with Nutrilock Actives
// It strengthens hair and makes your hair healthy and strong.
// Visibly Fuller Hair
// Get fuller and shiny hair with this Dove conditioner.
// Gentle Formula
// The gentle formula makes it ideal for daily use.`,
//
//   Specifications: [
//     ["Brand","Dove"],
//     ["Ideal For","Men & Women"],
//     ["Hair Type","All Hair Types"],
//     ["Applied For","Anti-hair Fall, Frizz Control"],
//     ["Maximum Shelf Life","24 Months"]
//
//   ],
//  images: ["https://rukminim1.flixcart.com/image/${a}/${b}/jv5k2a80/conditioner/8/f/q/180-hair-fall-rescue-conditioner-dove-original-imafg486waurgs4z.jpeg?q=7",
//  "https://rukminim1.flixcart.com/image/${a}/${b}/jv5k2a80/conditioner/8/f/q/180-hair-fall-rescue-conditioner-dove-original-imafg486mg2qdr3p.jpeg?q=70",
//  "https://rukminim1.flixcart.com/image/${a}/${b}/jv5k2a80/conditioner/8/f/q/180-hair-fall-rescue-conditioner-dove-original-imafg486fgmhsgs8.jpeg?q=70"],
// rating: 4,
// rating_count:200
//
// });
//
//
//
//
//
// conditioner.save();
//
//
//
// const hairoil= new HairOil({
//   name: "Parachute Advansed Jasmine Coconut Hair Oil",
//
//   Actual_price:185 ,
//
//   discount: 10,
//
//   final_price: 166,
//
//   count: 1,
//
//   quantity: ["400ml @42/100ml"],
//
//   Highlights: [
//     "For Women",
//     "Suitable For All Hair Types",
//     "Applied For Lustre & Shine",
//     "Sulfate Free"
//
//   ],
//
//   description: 'Parachute Advansed Jasmine Coconut Hair Oil, 400 ml with Free 90 ml pack',
//
//   Specifications: [
//     ["Brand","Parachute Advansed"],
//     ["Model Name","Jasmine Coconut Hair Oil"],
//     ["Quantity","400 ml"],
//     ["Ideal For","Women"],
//     ["Applied For","Lustre & Shine"]
//
//   ],
//  images: ["https://rukminim1.flixcart.com/image/${a}/${b}/k65d18w0/hair-oil/7/c/h/490-jasmine-coconut-hair-oil-parachute-advansed-original-imafzz4d7hdpprar.jpeg?q=70",
//   "https://rukminim1.flixcart.com/image/${a}/${b}/k65d18w0/hair-oil/7/c/h/490-jasmine-coconut-hair-oil-parachute-advansed-original-imafzz4dj3yemuh6.jpeg?q=70",
//   "https://rukminim1.flixcart.com/image/${a}/${b}/k65d18w0/hair-oil/7/c/h/490-jasmine-coconut-hair-oil-parachute-advansed-original-imafzz4dgb8f3uk4.jpeg?q=70"],
// rating: 3.5,
// rating_count:190
//
// });
//
//
//
// hairoil.save();
//
//
// const haircolor = new HairColor({
//   name: "Garnier Color Naturals Creme , Shade 3, Darkest Brown",
//
//   Actual_price:180 ,
//
//   discount: 0,
//
//   final_price: 180,
//
//   count:1 ,
//
//   quantity: ["60g 70ml"],
//
//   Highlights: [
//     "Ideal For: Women",
//   "Quantity: 60 g, 70 ml",
// "Container Type: Box"
//
//   ],
//
//   description: 'Grey hair is a dampener when it comes to your confidence so get rid of these greys and live life on the edge with a smile that captures all hearts wherever you go. The Garnier Color Naturals Hair Color is perfect for men to cover their grey strands so that they can live through their busy schedule at work and home without worries. The advantage of a long-lasting hair color is that you do not have to find yourself standing in front of the mirror at work just before an important presentation wondering why you hadn’t colored your greys the previous night. This Garnier Color will coat your hair with a rich cream based color that will keep your hair soft and smooth. Also, this natural hair color is enriched with olive oil to keep your hair thoroughly nourished and free from damage. Additionally, this darkest brown - 3 shade leaves a beautiful shine on your hair and evenly covers your hair. Smile confidently without the fear of a grey strand peeking out because this color makes your hair look gorgeous.',
//
//   Specifications: [
//     ["Brand","Garnier"],
//     ["Quantity","60 g, 70 ml"],
//     ["Brand Color","Shade 3, Darkest Brown"]
//     ["Ammonia Free","Yes"],
//     ["Ideal For","Women"]
//
//   ],
//  images: ["https://rukminim1.flixcart.com/image/${a}/${b}/jwxuvm80/hair-color/x/6/f/color-naturals-creme-shade-3-garnier-original-imafhgmfjt68by8v.jpeg?q=70",
//  "https://rukminim1.flixcart.com/image/${a}/${b}/jl2m7ww0/hair-color/x/6/f/color-naturals-garnier-original-imaf5ryghgeygmwd.jpeg?q=70",
//  "https://rukminim1.flixcart.com/image/${a}/${b}/jwxuvm80/hair-color/f/u/g/color-naturals-creme-shade-5-32-garnier-original-imafhgmffyvhzmpk.jpeg?q=70"],
// rating:4.7 ,
// rating_count: 29
//
// });
//
// haircolor.save();
//
//
//
// const haircream = new HairCream({
//   name: "Set Wet Cool Hold Hair Gel ",
//
//   Actual_price:100 ,
//
//   discount: 25,
//
//   final_price: 75,
//
//   count: 1,
//
//   quantity: ["100ml @75/100ml"],
//
//   Highlights: [
//     "For Men",
// "For All Hair Types",
// "Type: Hair Gel",
// "Quantity: 100"
//
//   ],
//
//   description: `Push your limits and brace the thrill of any adventure while ensuring that your hair game is on point with this hair-styling gel from Set Wet. Enriched with the goodness of Pro-Vitamin B5, this hair gel ensures that your hair remains slick and healthy all day long.
//
// Strong Hair Game Throughout the Day
//
// Whether it’s a special date or an official business meeting, this hair gel ensures that your hair remains slick and strong the whole day.
//
// For Strong and Healthy Hair
//
// This hair gel comes with Pro-Vitamin B5 to make your hair strong and tough.
//
// Ideal for All Hair Types
//
// No matter what type of hair you might have, this hair gel gives your hair a natural shine and smoothens frizz and flyaways.`,
//
//   Specifications: [
//     ["Brand","Set Wet"],
//     ["Model Name","Cool Hold"],
//     ["Quantity","100 ml"],
//     ["Ideal For","Men"],
//     ["Container Type","Tube"]
//
//   ],
//  images: ["https://rukminim1.flixcart.com/image/${a}/${b}/juu4jgw0/hair-styling/u/h/d/hair-gel-100-cool-hold-set-wet-original-imaffvhwjhpagpbs.jpeg?q=70",
//  "https://rukminim1.flixcart.com/image/${a}/${b}/juu4jgw0/hair-styling/u/h/d/hair-gel-100-cool-hold-set-wet-original-imaffvhxreahrmqr.jpeg?q=70",
//  "https://rukminim1.flixcart.com/image/${a}/${b}/jvtujrk0/hair-styling/g/n/x/hair-gel-250-cool-hold-set-wet-original-imaffvhrtjskadnc.jpeg?q=70"],
// rating: 3,
// rating_count:290
//
// });
//
//
//
// haircream.save();
//
//
//
//
//
// const hairserum= new HairSerum({
//   name: "L'Oreal Paris Total Repair 5 Serum",
//
//   Actual_price:230 ,
//
//   discount: 0,
//
//   final_price: 0,
//
//   count: 10,
//
//   quantity: ["80ml @288/100ml"],
//
//   Highlights: [
//     "Ideal For: Men & Women",
// "Hair Type: All Hair Types",
// "For Damaged Hair",
// "Formulated For: Straightening & Smoothening, Nourishment"
//
//   ],
//
//   description: `Every woman wants to flaunt long and lustrous hair but with the surge of pollution only the number of heads with scarves increases. The Loreal Paris Total Repair 5 Smoothing & Nourishing Oil Serum has been formulated to give you those silky smooth locks to flaunt with no damage involved at all. The serum has an oily composition that smoothes over each strand of hair and keeps your mane feeling velvety smooth. Perfect for hair that is damaged due to styling products and chemicals, the serum will help in replenishing your hair to look gorgeous always. Rubbing small amounts of the serum will keep your hair free from tangles and you can enjoy soft lustrous hair always. The nutritious and smooth serum will protect your locks from hair breakage while towel drying your hair or after a long day out. Nourish your hair with this serum and you will notice how it protects your hair ends from splits and other damage`,
//
//   Specifications: [
//     ["Brand","L'Oreal"],
//     ["Ideal For","Men & Women"],
//     ["Applied For","Straightening & Smoothening, Nourishment"],
//     ["Hair Type","All Hair Types"],
//     ["Hair Condition","Damaged Hair"],
//     ["Organic Type","Natural"]
//   ],
//  images: ["https://rukminim1.flixcart.com/image/${a}/${b}/k0463rk0/hair-serum/z/z/a/80-total-repair-5-serum-l-oreal-paris-original-imafjzaabt9gwg7b.jpeg?q=70",
//  "https://rukminim1.flixcart.com/image/${a}/${b}/k0463rk0/hair-serum/z/z/a/80-total-repair-5-serum-l-oreal-paris-original-imafjzaaacn5h2qd.jpeg?q=70",
//  "https://rukminim1.flixcart.com/image/${a}/${b}/k2p1q4w0/shampoo/s/n/p/640-total-repair-5-shampoo-l-oreal-original-imafe5bfgffq5msy.jpeg?q=70",
//  "https://rukminim1.flixcart.com/image/${a}/${b}/k0463rk0/hair-serum/z/z/a/80-total-repair-5-serum-l-oreal-paris-original-imafjzaat27mtajd.jpeg?q=70"],
// rating:4 ,
// rating_count:450
//
// });




//
//
//
// const hairserum= new HairSerum({
//   name: "Beardo Hair Serum",
//
//   Actual_price:295 ,
//
//   discount: 10,
//
//   final_price: 265,
//
//   count: 1,
//
//   quantity: ["50ml @530/100ml"],
//
//   Highlights: [
//     "Ideal For: Men",
// "Sulfate Free",
// "Hair Type: Normal Hair",
// "For Permed Hair",
// "Formulated For: Shine & Gloss, Straightening & Smoothening"
//
//   ],
//
//   description: 'Hair Serum specially formulated to fights graying for hair and make your hair strong, smoother and shinier.',
//
//   Specifications: [
//     ["Brand","Beardo"],
//     ["Ideal For","Men"],
//     ["Serum Type","Oil"],
//     ["Applied For","Shine & Gloss, Straightening & Smoothening"],
//     ["Hair Type","Normal Hair"],
//     ["Hair Condition","Permed Hair"]
//
//   ],
//  images: ["https://rukminim1.flixcart.com/image/${a}/${b}/j2nlwnk0/hair-serum/m/a/p/50-hair-serum-fight-greying-beardo-original-imaetxgn2rqfzkfz.jpeg?q=70"],
// rating:4.6 ,
// rating_count: 267
//
// });
//
//
//
//
// hairserum.save();
//
//
//
// const shampoo = new Shampoo({
//   name: "TRESemme Smooth & Shine Shampoo Men & Women",
//
//   Actual_price:120 ,
//
//   discount: 0,
//
//   final_price: 120,
//
//   count: 1,
//
//   quantity: ["185ml @65/100ml"],
//
//   Highlights: [
//
// "Straightening & Smoothening Shampoo",
// "Ideal For: Men & Women",
// "Suitable For: Dry Hair",
// "Formulated For: Normal Hair",
// "Composition: Vitamin H, silk protein"
//
//   ],
//
//   description: `Make your tresses smoother, shinier, and your most complimented asset by using this shampoo from TRESemme. This smoothing system is enriched with vital ingredients such as Vitamin H, Silk Protein, and Moroccan Argan Oil that will leave your mane looking silky and bouncy.
//
// Flaunt Your Silky Smooth Hair
//
// This shampoo is enriched with Vitamin H and Silk Protein that moisturise your hair and make it look silky smooth.
//
// Unruly Hair, Bye-bye
//
// It cleanses and tames unruly hair to keep your mane smooth and effortlessly enviable.
//
// Light on Your Hair
//
// This shampoo is enriched with Moroccan Argan Oil and is quite light, thereby making it ideal for regular application`,
//
//   Specifications: [
//     ["Brand","TRESemme"],
//     ["Applied For","Straightening & Smoothening"],
//     ["Hair Type","Dry Hair"],
//     ["Composition","Vitamin H, silk protein"],
//     ["Container Type","Plastic Bottle"],
//     ["Ideal For","Men & Women"]
//   ],
//  images: ["https://rukminim1.flixcart.com/image/${a}/${b}/jesunbk0/shampoo/g/h/v/190-smooth-shine-shampoo-tresemme-original-imaffzcpnewpwfzf.jpeg?q=70",
//  "https://rukminim1.flixcart.com/image/${a}/${b}/jesunbk0/shampoo/g/h/v/190-smooth-shine-shampoo-tresemme-original-imaffzcpnryjhfa3.jpeg?q=70"],
// rating:3 ,
// rating_count:362
//
// });
//





//
//
// const shampoo = new Shampoo({
//   name: "L'Oreal Paris Excellence Creme",
//
//   Actual_price:590,
//
//   discount: 0,
//
//   final_price: 590,
//
//   count:1 ,
//
//   quantity: ["100gm 72ml"],
//
//   Highlights: [
//     "Ideal For: Women",
// "Quantity: 100 g, 72 ml",
// "Container Type: Sachet"
//
//   ],
//
//   description: `Nothing beats the naturally black and lustrous hair. Go the tried and tested way with the Loreal Paris Excellence Cream Hair Color in the shade Natural Black – 1 that gently gives your locks the most natural looking finish. Made especially to suit women, this Excellence Cream Hair Color has a unique non-drip creamy texture that easily coats each of your strands from root to tip. The Pro-Keratin content in this Loreal Paris Hair Color strengthens and revitalises your locks and ensures that your damage-free and smooth hair holds color for longer.
//
// Before coloring your hair, use the Pre-Colour Protective Treatment that is used for fragile hair for an even application. After washing, use the Color Protective Conditioner to seal in color and keep your hair soft and shiny. Go ahead, colour your hair the gentle way with the Loreal Paris Hair Color and keep your locks radiant and glossy wash after wash.
//
// Directions for Use
//
// Use the Pre-Color Protective Treatment before coloring.
// Apply hair color using a brush.
// Rinse off without using shampoo and apply the After-Color Protective Conditioner.
// Rinse well with cold water.`,
//
//   Specifications: [
//     ["Brand","L'Oreal Paris"],
//     ["Model Name","Excellence Creme"],
//     ["Quantity","100 g, 72 ml"],
//     ["Brand Color","Black 1"],
//     ["Ammonia Free","Yes"]
//
//
//   ],
//  images: ["https://rukminim1.flixcart.com/image/${a}/${b}/k2p1q4w0/hair-color/t/h/n/excellence-creme-l-oreal-paris-original-imafgxg78zzdpzfm.jpeg?q=70",
//  "https://rukminim1.flixcart.com/image/${a}/${b}/k2p1q4w0/hair-color/t/h/n/excellence-creme-l-oreal-paris-original-imaf78d6pjktu3fn.jpeg?q=70",
//  "https://rukminim1.flixcart.com/image/${a}/${b}/k2p1q4w0/hair-color/t/h/n/excellence-creme-l-oreal-paris-original-imafgxg66azukqn5.jpeg?q=70"],
// rating: 3,
// rating_count: 50
//
// });
//
//
//
//
// shampoo.save();
// //
//
//
//
// const shampoo = new Shampoo({
//   name: "Park Avenue Beer Shampoo Men & Women",
//
//   Actual_price: 310,
//
//   discount:0,
//
//   final_price: 310,
//
//   count:10 ,
//
//   quantity: ["360ml @86/100ml"],
//
//   Highlights: [
//     "Anti-dandruff Shampoo",
// "Ideal For: Men & Women",
// "Suitable For: All Hair Types"
//
//   ],
//
//   description: '',
//
//   Specifications: [
//     ["Brand","Park Avenue"],
//     ["Applied For","Anti-dandruff"],
//     ["Hair Type","All Hair Types"],
//     ["Ideal For","Men & Women"],
//     ["pack_of",2]
//   ],
//  images: ["https://rukminim1.flixcart.com/image/${a}/${b}/ka2tmkw0/shampoo/h/c/h/360-anti-dandruff-beer-shampoo-park-avenue-original-imafrqh9rjn4hxdg.jpeg?q=70",
//  "https://rukminim1.flixcart.com/image/${a}/${b}/ka2tmkw0/shampoo/h/c/h/360-anti-dandruff-beer-shampoo-park-avenue-original-imafrqh9a9mh4ycu.jpeg?q=70",
//  "https://rukminim1.flixcart.com/image/${a}/${b}/ka2tmkw0/shampoo/h/c/h/360-anti-dandruff-beer-shampoo-park-avenue-original-imafrqh98qz76jfr.jpeg?q=70"
//  ],
// rating:0,
// rating_count:0
//
// });
// shampoo.save();

// const Soaps = mongoose.model("Soaps", GrocerySchema);
//
// const soap = new Soaps({
//   name: "Santoor Sandal & Turmeric Soap ",
//
//   Actual_price: 100,
//
//   discount: 5,
//
//   final_price: 95,
//
//   count: 10,
//
//   quantity: ["4 x 100 g @24/100g"],
//
//   Highlights: [
//     "Pack of: 4",
//     "For Women",
//     "Organic Anti-septic Soap"
//
//   ],
//
//   description: "The Santoor Sandal and Almond Milk Soap will take your skin on a therapeutic rendezvous, as its concoction of sandalwood extracts and almond milk helps in treating minor skin-related problems, besides keeping your skin hydrated, moisturized, and fresh.\nGlow Like a Bride\nThis soap hydrates and moisturizes your skin to bring about a glow, that is as charming as a bride’s.\nSolution to All Skin Problems\nThis soap helps in treating many skin-related problems such as blackheads, acne, and skin allergies.\nAn Ideal Herbal Antiseptic\nThis soap is a reliable source to treat minor skin abrasions owing to its microbial properties.\nKeeps Your Skin Fresh\nBack from a week-long beach holiday? This soap helps in removing tan lines, curing itchy skin, and detoxifying it as well to make it just as fresh as before.\nKeeps Your Skin Fragrant\nIt leaves your skin with the refreshing aroma of sandalwood and almond milk, even long after you've taken a shower.",
//
//   Specifications: [
//     ["Brand", "Santoor"],
//     ["Model Name", "Sandal & Almond Milk Soap"],
//     ["Quantity", "540 g"]
//     ["Pack of", "4"],
//     ["Organic", "Yes"],
//     ["Ideal For", "Women"],
//     ["Fragrance Scent", "Almond, Sandalwood"],
//     ["Maximum Shelf Life", "36 Months"]
//   ],
//   images: ["https://rukminim1.flixcart.com/image/${a}/${b}/jkh6m4w0/soap/h/6/p/4-400-sandal-turmeric-soap-santoor-original-imaf7tgjxdcamvt8.jpeg?q=70", "https://rukminim1.flixcart.com/image/${a}/${b}/jn0msnk0/soap/h/6/p/4-400-sandal-turmeric-soap-santoor-original-imaf9sta7hryxmpm.jpeg?q=70", "https://rukminim1.flixcart.com/image/${a}/${b}/jn0msnk0/soap/z/z/c/4-600-sandal-and-turmeric-soap-santoor-original-imaf9stabdyesqnd.jpeg?q=70"],
//   rating: 0,
//   rating_count: 0
//
// });
//
// soap.save();



const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req, res) {
  Shampoo.find({name : {$regex : new RegExp("loreal", "i")}},function(err,values){
    // console.log(values);
  });

  res.render("home");
});


app.get("/logout", function(req, res) {
  req.logout();
  req.redirect("/");
});


app.post("/register", function(req, res) {

  User.register({
    username: req.body.username
  }, req.body.password, function(err, user) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function() {
        console.log("hello");
        res.redirect("/main");
      });
    }
  });



});

var array = ['Staples','Snacks & Beverages','Packaged Food','Personal & Baby Care','Household Care','Dairy & Eggs'];
var array_collections = [['Shampoo','HairCream']];
app.get("/main", function(req, res) {
  var grocery = []
  if (req.isAuthenticated()) {
  Shampoo.find(function(err, shampoos) {
      if (err) {

      } else {
        grocery.push(shampoos);
        res.render("main", {
          array: ['Staples', 'food'],
          grocery_array: grocery
        });
      }
    });
    myVar = setTimeout(function(){
        console.log(grocery);
    }, 3000);


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


app.post("/product",function(req,res){
  Shampoo.find(function(err,values){
    res.render("product",{grocery_array:values});
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

app.listen(3000, function() {
  console.log("connected");
});
