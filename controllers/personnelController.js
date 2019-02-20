var mongoose = require("mongoose");
// var Employee = mongoose.model("Employee");
var Department = require("../models/department");
var Section = require("../models/personnel");
var Personnel = require("../models/personnel");
var personnelController = {};
personnelController.showPersonnel = function(req,res){
  Section.find({}).populate('sec').exec(function(err,personnel){
    if(err){
      console.log(err,"ERR find personnel");
    }
    else{
      console.log("-*-*-*-*-*-*-*-*-*--*-*-");
      console.log(personnel);
      res.render("../views/personnel/personnel",{data:personnel});
    }
  });
};
  personnelController.showDepartmentAndSection = function(req, res,err) {
    Department.find({}).exec(function(err,department){
      if(err){
        console.log("Err Show personnel",err);
      }
      else{
        Section.find({}).exec(function(err,section){
          if(err){
            console.log(err,"Err Show personnel 2");
          }
          else{
            console.log(department);
            console.log("=============================");
            console.log(section.sec);
           
            res.render("../views/personnel/addPersonnel",{departmentNamee:department,sectionNamee:section});
          }
        })
      }
    });
  };
  
        

  personnelController.showDepartment = function(req, res,err) {
    Department.find({}).exec(function (err,department ) {
      if (err) {
        console.log("Error:", err);
      }
      else {
        res.render("../views/personnel/addSection", {departmentNamee: department});
      }
    });
  };

  personnelController.showEditPersonnel = function(req,res){
    Personnel.findOne({ _id:req.params.id }).exec(function(err,dataToEdit){
      if (err) {
        console.log("Error:", err);
      }
      else {
        console.log(dataToEdit);
        console.log("==============");
        res.render("../views/personnel/editPersonnel", {data: dataToEdit});
      }
    });
  };

  personnelController.editPersonnel = function(req,res){
    Personnel.findByIdAndUpdate(req.params.id, { $set: {personnelName:req.body.personnelName,personnelLastName:req.body.personnelLastName,ตำแหน่ง:req.body.ตำแหน่ง}}, { new: true }, function (err,data){
      if(err){
        console.log(req.params.id);
        console.log("ERR in asdasdasdsdasadss");
      }
      else{
        console.log("success");
        console.log(data);
        res.redirect("/personnelform");
      }
  });
  };


  personnelController.saveDepartment = function (req, res) {
    var department = new Department(req.body);
    department.save(function (err) {
      if (err) {      
        console.log(err);
        if (err.name === 'MongoError' && err.code === 11000) {          
          console.log("Duplicate departmentName");
          res.send("Duplicate departmentName");            
       } 
       }
      else {
        console.log("Successfully created an departmentName.");
        res.redirect("personnelform");
      }
    });
  };

  personnelController.savePersonnel = function (req, res) {
    Department.findOne({ departmentName:req.body.departmentname }).exec(function(err,edit){
      if (err) {
        console.log("Error:", err);
      }
      else {
        console.log("Found Depart");
        console.log(req.body.departmentname);
        console.log("Found Depart");
        var personnell = new Personnel(req.body);
        personnell.sec = edit.id;
        Department.findByIdAndUpdate(edit.id, { $addToSet: {personnel:personnell}}, { new: true }, function (err){
          if(err){
            console.log("ERR in asdasdasdsdasadss");
          }
          else{
            console.log("Push success");
          }
      });
      personnell.save(function(){
        if(err){
          console.log(err+"Err in save Depart");
        }
        else{
          console.log("save section success");
          res.redirect("personnelform");
        }
      });
      }
    });
  };

  personnelController.commit = function(req, res) {
    Personnel.findOne({ _id:req.params.id }).exec(function(err,data){
      if (err) {
        console.log("Error:", err);
      }
      else {
        console.log(data);
        console.log("==============");
        res.render("../views/personnel/deleteCommit", {datas: data});
      }
    });
  };
  // personnelController.deletePerson = function(req,res){
  //   console.log(req.params.id+"======ASDSADASDSADASDASDASDASDA");
  //   // find( { artistname: { $in: [ "The Kooks", "Gang of Four", "Bastille" ] } } )
  //   Personnel.findByIdAndRemove({_id :req.params.id}).exec(function(err,data){
  //     if(err){
  //       console.log("ERR DELETE PERSONNEL",err);
  //     }
  //     else{    
  //       console.log("DELETE SUCCESS"+data);
        
  //       Department.remove({ personnel: { $in: req.params.id } }, function (err) {
  //         if(err){
  //           console.log("ERR DELETE department",err);
  //         }
  //         else{
  //           res.redirect("/personnelform");
  //         }
  //       });
  //     }
  //   });

  // };
  personnelController.deletePerson = function(req,res){
    console.log(req.params.id+"======ASDSADASDSADASDASDASDASDA");
    // find( { artistname: { $in: [ "The Kooks", "Gang of Four", "Bastille" ] } } )
    Personnel.findByIdAndRemove({_id :req.params.id}).exec(function(err,data){
      if(err){
        console.log("ERR DELETE PERSONNEL",err);
      }
      else{
        console.log("-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-");
        console.log(data);
        console.log("-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-");
        Department.update({ "personnel": req.params.id },{ "$pull": { "personnel": req.params.id } },function (){
              if (err) {
                console.log(err,"ERR delete");
              }
              else{
                res.redirect("/personnelform");
              }
          });

        //Department.update({})
      }
    });

  };
 
module.exports = personnelController;