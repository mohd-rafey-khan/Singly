
// include all package here..
const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');

// create an app
const app = express();
// linked body parser to take data from cliet side..
app.use(bodyparser.urlencoded({
  extended:true
}));
// set views folder to make html page more offensive.
app.set("view engine",'ejs');
// set public folder to interact user more interactive for Singly.
app.use(express.static('public'));

// set all route.
app.get("/home",function(req,res){
  res.send("its home page..");
});
app.get("/register",function(req,res){
  res.render("create");
});
app.get("/",function(req,res){
  res.render("login");
});

// server listen at 3000 port.
app.listen(3000,function(req,res){
  console.log("Your server is started in port 3000...");
});
