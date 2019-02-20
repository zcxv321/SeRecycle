var mongoose = require("mongoose");
var HistoryMach = require("../models/HistoryMachine");
var Machine = require("../models/Machine");
var History = require("../models/history");
var historyMachineController = {};


  historyMachineController.create = function(req, res) {
    Machine.find({}).populate('his').exec(function(err,datas){
      if(err){
        console.log("err find machine ",err);
      }
      else{
        res.render("../views/formTableMachine",{data:datas});
      }      
    });    
  };
  historyMachineController.addMachineform = function(req,res){
    res.render("../views/addMachineForm");
  };
  historyMachineController.addMachine = function(req,res){
    machine = new Machine(req.body);
    machine.save(function (err){
      if(err){
        console.log(err,"ERR Save Machine");
      }
      else{
        res.redirect("/form");
      }
    });
  };


  historyMachineController.saveHistory = function (req, res) {
   Machine.findOne({ รหัสเครื่องจักร:req.body.รหัสเครื่องจักร}).exec(function(err,edit){
      if (err) {
        console.log("Error:", err);
      }
      else {
        console.log("Found Machine");
        console.log(req.body.รหัสเครื่องจักร);
        var historys = new History(req.body);
        historys.sec = edit.id;
        Machine.findByIdAndUpdate(edit.id, { $addToSet: {history:historys}}, { new: true }, function (err){
          if(err){
            console.log("ERR in asdasdasdsdasadss");
          }
          else{
            console.log("Push success");
          }
      });
      historys.save(function(err){
        if(err){
          console.log(err+"Err in save History");
        }
        else{
          console.log("save history success");
          res.redirect("addMachineForm");
        }
      });
      }
    });
  };

  historyMachineController.testAddHistoryForm = function(req,res){
    Machine.find({}).exec(function(err,datas){
      if(err){
        console.log("find",err);
      }
      else{
        res.render("../views/testAddHistory",{data:datas});
      }
    })
  }


  historyMachineController.showhistory = function(req,res){   
    History.find({}).exec(function (err, history) {
      if (err) {
        console.log("Error:", err);
      }
      else {
        res.render("../views/historyrepair", {historys: history});
      }
    });
}; 
  historyMachineController.showAHistory = function(req,res){
    Machine.find({_id:req.params.id}).populate('his').exec(function(err,amachine){
      if (err) {
        console.log("Error:", err);
      }
      else {
        console.log(amachine);
        res.render("../views/aHistoryRepair",{data:amachine});
      }
    });


  };

  historyMachineController.showEditAHistory = function(req,res){
    Machine.findById({_id:req.params.id}).exec(function(err,details){
      if(err){
        console.log("err show edit machine",err);
      }
      else{
        console.log(details,"Detail");
        res.render("../views/editMachine",{detail:details});
      }
    });
    
  };
  historyMachineController.saveEditMachine = function(req,res){
    console.log("body",req.params.id,"body");
    Machine.findByIdAndUpdate(req.params.id, { $set: {machineName:req.body.machineName,รหัสเครื่องจักร:req.body.รหัสเครื่องจักร
    ,สถานที่ตั้ง:req.body.สถานที่ตั้ง,ยี่ห้อ:req.body.ยี่ห้อ,Model:req.body.Model,pole:req.body.pole,phase:req.body.phase,
  power:req.body.power,voltage:req.body.voltage,current:req.body.current,rpm:req.body.rpm,ip:req.body.ip,powerfactor:req.body.powerfactor
,frequency:req.body.frequency,uf:req.body.uf,mechsealno:req.body.mechsealno,head:req.body.head,flowrate:req.body.flowrate,
oilsealno:req.body.oilsealno,วันที่ติดตั้ง:req.body.วันที่ติดตั้ง,รายการอะไหล่:req.body.รายการอะไหล่,
ect:req.body.ect}}, { new: true }, function (err, data) {
      if (err) {
        console.log(err);
      }
      console.log(data,"ASDASDASDASDSADA");
      res.redirect("/historymachine");
    });
  }


  module.exports = historyMachineController;
