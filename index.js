

const express = require('express');

const app = express();

app.get("/",function(req,res){
  console.log("bye");
});

app.listen(3000,function(){
  console.log("server started");
});

//
// $(document).ready(function(){
//         $('.thumb').mouseover(function(e){
//             e.preventDefault();
//         $('.imgBox img').attr("src", $(this).attr("href"));
//         })
//     })
