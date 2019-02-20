var mongoose = require("mongoose");
var Login = require("../models/login");
var createUser = {};
createUser.save = function (req, res) {
  var login = new Login(req.body);
  login.save(function (err) {
    if (err) {      
      if (err.name === 'MongoError' && err.code === 11000) {
        console.log("Duplicate user");
        res.send("Duplicate user");            
     } 
     }
    else {
      console.log("Successfully created an employee.");
      console.log(req.body.user+" is create");
      res.redirect("/");
    }
  });
};
module.exports = createUser;