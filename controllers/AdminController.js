var mongoose = require("mongoose");
// var Employee = mongoose.model("Employee");
var Repair = require("../models/repair");
var adminController = {};
adminController.show = function(req, res) {
    Repair.find({}).exec(function (err, repair) {
      if (err) {
        console.log("Error:", err);
      }
      else {
        res.render("../views/AdminMenu", {repairss: repair});
      }
    });
  };
module.exports = adminController;