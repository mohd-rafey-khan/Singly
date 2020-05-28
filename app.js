
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

// connect mongoose
mongoose.connect("mongodb://localhost/singlyDB",{ useNewUrlParser: true , useUnifiedTopology: true});
// set shema
const userschema = new mongoose.Schema({
  name:"String",
  email: "String",
  password: "String"
});

// create collection Model
const user =  mongoose.model("user",userschema);


// set all route.
var statusvar = "";

app.get("/register",function(req,res){
  res.render("create",{status:statusvar});
});
app.post("/register",function(req,res){
   user.find({ email: req.body.email}, function (err, data) {
    // console.log(data);
    if(data.length === 0){

      var newclient = user({
        name: req.body.name,
        email:req.body.email,
        password:req.body.pass
      });
      newclient.save();
      statusvar = " ";
      res.render("home");
    }else{
      console.log(data);
        statusvar = "Sorry we have already have an Account on this Email..";
        res.redirect("/register");
    }
  });

});

app.get("/",function(req,res){
  res.render("login",{status:statusvar});
});

app.post("/",function(req,res){

  // console.log(req.body);

  user.find({ email: req.body.email}, function (err, data) {
    // console.log(data[0].password);
     if(data[0].password === req.body.pass){
       res.render("home");
     }else{
       statusvar = "Sorry Please check your Email or Password..";
       res.redirect("/");
     }
  });
});
// ==============  //
app.get("/profile",function(req,res){
  res.render("profile");
});
app.get("/leaderboard",function(req,res){
  res.render("leaderboard");
});
app.get("/notification",function(req,res){
  res.render("notification");
});
app.get("/home",function(req,res){
  res.render("home");
});


// server listen at 3000 port.
app.listen(3000,function(req,res){
  console.log("Your server is started in port 3000...");
});
