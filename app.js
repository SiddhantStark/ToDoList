//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
var items=["Brush your teeth","Eat food","Watch Movie/Series/Anime"];
let workitems = [];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
var today= new Date();

var options = {
  weekday: "long",
  day: "numeric",
  month: "long",
}

var day = today.toLocaleDateString("en-US",options);

res.render("list", {listtitle: day , newListItems : items});

});

app.post("/" , function(req , res){
  item = req.body.newItem;

  if(req.body.list === "Work"){
     workitems.push(item);
     res.redirect("/work");
  }
  else {
    items.push(item);
    res.redirect("/");
  }

});

app.get("/work" , function(req,res){
  res.render("list", {listtitle: "Work List" , newListItems : workitems});
});

app.post("/work" , function(req,res){
   let item = req.body.newItem;
   workitems.push(item);
   res.redirect("/work");
})

app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
