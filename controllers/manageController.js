var mongoose = require("mongoose");
var repair = require("../models/repair");

var manageController = {};

manageController.show = function(req,res){
    repair.find({}).exec(function (err, data) { //call back funt
        if (err) {
          console.log("Error:", err);
        }
        else {
          res.render("../views/manage", {datas: data});
        }
      });
};

module.exports = manageController;