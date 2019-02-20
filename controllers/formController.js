var mongoose = require("mongoose");

// var Employee = mongoose.model("Employee");
var Repair = require("../models/repair");
var Personnel = require("../models/personnel");
var HistoryMach = require("../models/HistoryMachine");
var History = require("../models/history");
var Machine = require("../models/Machine");
var moment = require('moment');
function setDate() {
  var date = new Date();
  date = date.getDate() + "-" +  (parseInt(date.getMonth())+1) + "-" + date.getFullYear();
  return date
}
function setTime() {
  var time = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")+ " น.";
  return time
}


var repairController = {};

repairController.save = function(req, res) {
  req.body.วันที่ชำรุด=moment(req.body.วันที่ชำรุด).format('DD-MM-YYYY');
  req.body.วันต้องการจะเสร็จ=moment(req.body.วันต้องการจะเสร็จ).format('DD-MM-YYYY');
    var repair = new Repair(req.body);  
    repair.save(function(err) {
      if(err) {
        console.log("Error:", err);
      } else {
        console.log("Successfully created an employee.");
        // alert("Successfully created an employee.");
        res.redirect("/");
      }
    });
  };
  repairController.startForm = function(req,res){
    Machine.find({}).exec(function(err,personnel){
      if(err){
        console.log("ERR in show form",err);
      }
      else{
        res.render("../views/form1",{person:personnel});
      }
    });
  };
  repairController.show = function(req, res) {
    Repair.find({}).exec(function (err, repair) {
      if (err) {
        console.log("Error:", err);
      }
      else {
        res.render("../views/UserView", {repairss: repair});
      }
    });
  };
  repairController.editformfull1 = function(req, res) {
    Repair.findByIdAndUpdate(req.params.id, { $set: {status: req.body.status , ประเภท: req.body.ประเภท, สถานะ1: setDate() , การดำเนินงาน: req.body.การดำเนินงาน , อัพเดทล่าสุด:setDate() ,เวลาอัพเดทสถานะ:setTime() , เวลาที่รับเอกสาร:setTime() ,วันที่รับเอกสาร:setDate() , }}, { new: true }, function (err, repair) {
      if (err) {
        console.log("Error:", err);
      }
      else {
        if(req.body.ประเภท == "PM"){
          Repair.count({ ประเภท: 'PM' }, function (err, count) {
            if (err){
              console.log("countERR");
            }
            else{
               Repair.findByIdAndUpdate(req.params.id, { $set: {นับประเภท:"PM"+count+"/"+new Date().getFullYear()}}, { new: true }, function (err, repair){
            if(err){
              console.log("ERR Defind ประเภท");
            }
            console.log( "PMMMMMMMMM");
        });
            
            }
          });         
        }
        else if(req.body.ประเภท == "UT"){
          Repair.count({ ประเภท: 'UT' }, function (err, count) {
            if (err){
              console.log("countERR");
            }
            else{
               Repair.findByIdAndUpdate(req.params.id, { $set: {นับประเภท:"UT"+count+"/"+new Date().getFullYear()}}, { new: true }, function (err, repair){
            if(err){
              console.log("ERR Defind ประเภท");
            }
            console.log( "UTTTTTTTTTTTT");
        });            
            }
          });
        }
        res.redirect("/adminmenu");
        console.log("in if");
      }
    });
  };
  repairController.editformfull2 = function(req, res) {
    Repair.findByIdAndUpdate(req.params.id, { $set: {status: req.body.status ,เวลาอัพเดทสถานะ:setTime(), สถานะ2: setDate(), อัพเดทล่าสุด:setDate() , เวลาอัพเดทสถานะ:setTime() ,วันที่รับเอกสาร:setDate() }}, { new: true }, function (err, repair) {
      
      if (err) {
        console.log("Error:", err);
      }
      else {
        console.log(req.params.id);
        res.redirect('/formfull2/'+req.params.id);
        
      }
    });
  };

  repairController.formfull2Again = function(req, res) {
    console.log(req.body);
    Repair.findByIdAndUpdate(req.params.id, { new: true }, function (err, repair) {
      
      if (err) {
        console.log("Error:", err);
      }
      else {
        console.log(req.params.id);
        res.redirect('/formfull2/'+req.params.id);
        
      }
    });
  };

  repairController.deleteform = function(req, res) {
    Repair.findOneAndDelete({ "_id" : req.params.id }, function (err, repair) {
      
      if (err) {
        console.log("Error:", err);
      }
      else {
        // console.log(req.params.id);
        res.redirect('/adminmenu');
        
      }
    });
  };
 
  repairController.editformfull4 = function(req, res) {
    Repair.findByIdAndUpdate(req.params.id, 
        { $set: {status: req.body.status , 
                สถานะ3: req.body.สถานะ3, 
                ชื่อผู้ดำเนินการ: req.body.ชื่อผู้ดำเนินการ , 
                ผู้มอบหมาย: req.body.ผู้มอบหมาย,
                ผู้สั่งงานผู้อนุมัติเปิดงาน: req.body.ผู้สั่งงานผู้อนุมัติเปิดงาน , 
                ฝ่ายผู้ใช้เครื่องจักรอนุญาต: req.body.ฝ่ายผู้ใช้เครื่องจักรอนุญาต , 
                ผจกฝ่ายฝ่ายผู้ใช้เครื่องจักรอนุญาต: req.body.ผจกฝ่ายฝ่ายผู้ใช้เครื่องจักรอนุญาต, 
                ผลกระทบต่อฝ่ายต่างๆ:req.body.ผลกระทบต่อฝ่ายต่างๆ,
                WorkPermit:req.body.WorkPermit,
                ประเมินเวลาที่ใช้ในการซ่อม:req.body.ประเมินเวลาที่ใช้ในการซ่อม,
                จำนวนเวลาที่ใช้:req.body.จำนวนเวลาที่ใช้,
                วันที่ประเมินวัสดุ:req.body.วันที่ประเมินวัสดุ,
                วันที่สั่งซื้อวัสดุ:req.body.วันที่สั่งซื้อวัสดุ,
                วันที่วัสดุครบพร้อมเริ่มงาน:req.body.วันที่วัสดุครบพร้อมเริ่มงาน,
                กำหนดเสร็จ:req.body.กำหนดเสร็จ,
                การตรวจซ่อมเครื่องจักร:req.body.การตรวจซ่อมเครื่องจักร,
                วิเคราะห์สาเหตุ:req.body.วิเคราะห์สาเหตุ,
                รายละเอียดการซ่อม:req.body.รายละเอียดการซ่อม,
                อะไหล่วัสดุอุปกรณ์ที่ต้องใช้:req.body.อะไหล่วัสดุอุปกรณ์ที่ต้องใช้,
                ผู้ปฏิบัติงานซ่อม:req.body.ผู้ปฏิบัติงานซ่อม,
                เริ่มดำเนินการซ่อมวันที่:req.body.เริ่มดำเนินการซ่อมวันที่,
                เริ่มดำเนินการซ่อมเวลา:req.body.เริ่มดำเนินการซ่อมเวลา,
                ซ่อมเสร็จวันที่:req.body.ซ่อมเสร็จวันที่,
                ซ่อมเสร็จเวลา:req.body.ซ่อมเสร็จเวลา,
                รวมเวลาซ่อม:req.body.รวมเวลาซ่อม,
                ข้อคิดเห็นเพิ่มเติม:req.body.ข้อคิดเห็นเพิ่มเติม,
                ผู้ส่งมอบงาน:req.body.ผู้ส่งมอบงาน,
                วันที่ผู้ส่งมอบงาน:req.body.วันที่ผู้ส่งมอบงาน,
                เวลาผู้ส่งมอบงาน:req.body.เวลาผู้ส่งมอบงาน,
                ผู้รับมอบงาน:req.body.ผู้รับมอบงาน,
                ผจกฝ่ายผู้รับมอบงาน:req.body.ผจกฝ่ายผู้รับมอบงาน,
                วันที่ผู้รับมอบงาน:req.body.วันที่ผู้รับมอบงาน,
                เวลาผู้รับมอบงาน:req.body.เวลาผู้รับมอบงาน,
                ผู้อนุมัติปิดงาน:req.body.ผู้อนุมัติปิดงาน,
                วันที่ผู้อนุมัติปิดงาน:req.body.วันที่ผู้อนุมัติปิดงาน,
                เวลาผู้อนุมัติปิดงาน:req.body.เวลาผู้อนุมัติปิดงาน ,
                เลื่อนไปลงชื่อ:req.body.เลื่อนไปลงชื่อ,
                อนุญาต:req.body.อนุญาต,
                วันที่อนุญาติเปิดงาน:req.body.วันที่อนุญาติเปิดงาน,
                เวลาอนุญาติเปิดงาน:req.body.เวลาอนุญาติเปิดงาน,
                วันที่อนุญาต:req.body.วันที่อนุญาต,
                เวลาที่อนุญาต:req.body.เวลาที่อนุญาต,
                วันที่เลื่อนไป:req.body.วันที่เลื่อนไป,
                เวลาเลื่อนไป:req.body.เวลาเลื่อนไป
              }}, 
        { new: true },
        function (err, repair) {
          if (err) {
            console.log("Error:", err);
          }
          else {
          res.redirect("/adminmenu");
          console.log("in if");
          }
        });
  };

  repairController.formfull1 = function(req, res) {
    Repair.findOne({ _id:req.params.id }).exec(function(err,repair){
      if (err) {
        console.log("Error:", err);
      }
      else {
        res.render("../views/formfull11", {repairss: repair});
      }
    });
  };
  repairController.formfull2 = function(req, res) {
    Repair.findOne({ _id:req.params.id }).exec(function(err,repair){
      if (err) {
        console.log("Error:", err);
      }
      else {
        res.render("../views/formfull2", {repairss: repair});
      }
    });
  };

  repairController.editform = function(req, res) {
    Repair.findOne({ _id:req.params.id }).exec(function(err,repair){
      if (err) {
        console.log("Error:", err);
      }
      else {
        repair.กำหนดเสร็จ = moment(repair.กำหนดเสร็จ,"DD-MM-YYYY").format('YYYY-MM-DD');
        repair.วันที่ประเมินวัสดุ = moment(repair.วันที่ประเมินวัสดุ,"DD-MM-YYYY").format('YYYY-MM-DD');
        repair.วันที่สั่งซื้อวัสดุ = moment(repair.วันที่สั่งซื้อวัสดุ,"DD-MM-YYYY").format('YYYY-MM-DD');
        repair.วันที่วัสดุครบพร้อมเริ่มงาน = moment(repair.วันที่วัสดุครบพร้อมเริ่มงาน,"DD-MM-YYYY").format('YYYY-MM-DD');
        repair.เริ่มดำเนินการซ่อมวันที่ = moment(repair.เริ่มดำเนินการซ่อมวันที่,"DD-MM-YYYY").format('YYYY-MM-DD');
        repair.ซ่อมเสร็จวันที่ = moment(repair.ซ่อมเสร็จวันที่,"DD-MM-YYYY").format('YYYY-MM-DD');
        repair.วันที่ผู้ส่งมอบงาน = moment(repair.วันที่ผู้ส่งมอบงาน,"DD-MM-YYYY").format('YYYY-MM-DD');
        repair.วันที่ผู้รับมอบงาน = moment(repair.วันที่ผู้รับมอบงาน,"DD-MM-YYYY").format('YYYY-MM-DD');
        repair.วันที่ผู้อนุมัติปิดงาน = moment(repair.วันที่ผู้อนุมัติปิดงาน,"DD-MM-YYYY").format('YYYY-MM-DD');
        repair.วันที่อนุญาติเปิดงาน = moment(repair.วันที่อนุญาติเปิดงาน,"DD-MM-YYYY").format('YYYY-MM-DD');
        repair.วันที่อนุญาต = moment(repair.วันที่อนุญาต,"DD-MM-YYYY").format('YYYY-MM-DD');
        repair.วันที่เลื่อนไป = moment(repair.วันที่เลื่อนไป,"DD-MM-YYYY").format('YYYY-MM-DD');

        
        // var mydate = new Date(repair.กำหนดเสร็จ);
        // console.log("aa",mydate);

        // console.log("b", repair.กำหนดเสร็จ);
        // var a = moment(repair.กำหนดเสร็จ).format('YYYY-MM-DD');
        // console.log("a", a );
        //req.body.กำหนดเสร็จ=moment(req.body.กำหนดเสร็จ).format('DD-MM-YYYY');
        res.render("../views/formfullEdit", {repairss: repair});
      }
    });
  };

  repairController.formfull22 = function(req, res) {
    Repair.findOne({ _id:req.params.id }).exec(function(err,repair){
      if (err) {
        console.log("Error:", err);
      }
      else {
        res.render("../views/formfull22", {repairss: repair});
      }
    });
  };
  // repairController.formfull3 = function(req, res) {
  //   Repair.findOne({ _id:req.params.id }).exec(function(err,repair){
  //     if (err) {
  //       console.log("Error:", err);
  //     }
  //     else {
  //       res.render("../views/formfull3", {repairss: repair});
  //     }
  //   });
  // };
  repairController.formfull33 = function(req, res) {
    Repair.findOne({ _id:req.params.id }).exec(function(err,repair){
      if (err) {
        console.log("Error:", err);
      }
      else {
        console.log("in if444444");
        res.render("../views/formfull33", {repairss: repair});
      }
    });
  };
  repairController.formfull44 = function(req, res) {
    Repair.findOne({ _id:req.params.id }).exec(function(err,repair){
      if (err) {
        console.log("Error:", err);
      }
      else {
        console.log("in if444444");
        console.log(repair);
        res.render("../views/formfull44", {repairss: repair});
      }
    });
  };

  repairController.printForm = function(req,res){    
      window.print();
      console.log("PrintForm");
  
  };

  repairController.saveeditformfull33 = function(req, res) {

    req.body.กำหนดเสร็จ=moment(req.body.กำหนดเสร็จ).format('DD-MM-YYYY');
    req.body.วันที่ประเมินวัสดุ=moment(req.body.วันที่ประเมินวัสดุ).format('DD-MM-YYYY');
    req.body.วันที่สั่งซื้อวัสดุ=moment(req.body.วันที่สั่งซื้อวัสดุ).format('DD-MM-YYYY');
    req.body.วันที่วัสดุครบพร้อมเริ่มงาน=moment(req.body.วันที่วัสดุครบพร้อมเริ่มงาน).format('DD-MM-YYYY');
    req.body.เริ่มดำเนินการซ่อมวันที่=moment(req.body.เริ่มดำเนินการซ่อมวันที่).format('DD-MM-YYYY');
    req.body.ซ่อมเสร็จวันที่=moment(req.body.ซ่อมเสร็จวันที่).format('DD-MM-YYYY');
    req.body.วันที่ผู้ส่งมอบงาน=moment(req.body.วันที่ผู้ส่งมอบงาน).format('DD-MM-YYYY');
    req.body.วันที่ผู้รับมอบงาน=moment(req.body.วันที่ผู้รับมอบงาน).format('DD-MM-YYYY');
    req.body.วันที่ผู้อนุมัติปิดงาน=moment(req.body.วันที่ผู้อนุมัติปิดงาน).format('DD-MM-YYYY');
    req.body.วันที่อนุญาติเปิดงาน=moment(req.body.วันที่อนุญาติเปิดงาน).format('DD-MM-YYYY');
    req.body.วันที่อนุญาต=moment(req.body.วันที่อนุญาต).format('DD-MM-YYYY');
    req.body.วันที่เลื่อนไป=moment(req.body.วันที่เลื่อนไป).format('DD-MM-YYYY');

    Repair.findByIdAndUpdate(req.params.id, 
      { $set: {status: req.body.status , 
        สถานะ3: setDate(), 
        ชื่อผู้ดำเนินการ: req.body.ชื่อผู้ดำเนินการ , 
        ผู้มอบหมาย: req.body.ผู้มอบหมาย,
        ผู้สั่งงานผู้อนุมัติเปิดงาน: req.body.ผู้สั่งงานผู้อนุมัติเปิดงาน , 
        ฝ่ายผู้ใช้เครื่องจักรอนุญาต: req.body.ฝ่ายผู้ใช้เครื่องจักรอนุญาต , 
        ผจกฝ่ายฝ่ายผู้ใช้เครื่องจักรอนุญาต: req.body.ผจกฝ่ายฝ่ายผู้ใช้เครื่องจักรอนุญาต, 
        ผลกระทบต่อฝ่ายต่างๆ:req.body.ผลกระทบต่อฝ่ายต่างๆ,
        WorkPermit:req.body.WorkPermit,
        ประเมินเวลาที่ใช้ในการซ่อม:req.body.ประเมินเวลาที่ใช้ในการซ่อม,
        จำนวนเวลาที่ใช้:req.body.จำนวนเวลาที่ใช้,
        วันที่ประเมินวัสดุ:req.body.วันที่ประเมินวัสดุ,
        วันที่สั่งซื้อวัสดุ:req.body.วันที่สั่งซื้อวัสดุ,
        วันที่วัสดุครบพร้อมเริ่มงาน:req.body.วันที่วัสดุครบพร้อมเริ่มงาน,
        กำหนดเสร็จ:req.body.กำหนดเสร็จ,
        การตรวจซ่อมเครื่องจักร:req.body.การตรวจซ่อมเครื่องจักร,
        วิเคราะห์สาเหตุ:req.body.วิเคราะห์สาเหตุ,
        รายละเอียดการซ่อม:req.body.รายละเอียดการซ่อม,
        อะไหล่วัสดุอุปกรณ์ที่ต้องใช้:req.body.อะไหล่วัสดุอุปกรณ์ที่ต้องใช้,
        ผู้ปฏิบัติงานซ่อม:req.body.ผู้ปฏิบัติงานซ่อม,
        เริ่มดำเนินการซ่อมวันที่:req.body.เริ่มดำเนินการซ่อมวันที่,
        เริ่มดำเนินการซ่อมเวลา:req.body.เริ่มดำเนินการซ่อมเวลา,
        ซ่อมเสร็จวันที่:req.body.ซ่อมเสร็จวันที่,
        ซ่อมเสร็จเวลา:req.body.ซ่อมเสร็จเวลา,
        รวมเวลาซ่อม:req.body.รวมเวลาซ่อม,
        ข้อคิดเห็นเพิ่มเติม:req.body.ข้อคิดเห็นเพิ่มเติม,
        ผู้ส่งมอบงาน:req.body.ผู้ส่งมอบงาน,
        วันที่ผู้ส่งมอบงาน:req.body.วันที่ผู้ส่งมอบงาน,
        เวลาผู้ส่งมอบงาน:req.body.เวลาผู้ส่งมอบงาน,
        ผู้รับมอบงาน:req.body.ผู้รับมอบงาน,
        ผจกฝ่ายผู้รับมอบงาน:req.body.ผจกฝ่ายผู้รับมอบงาน,
        วันที่ผู้รับมอบงาน:req.body.วันที่ผู้รับมอบงาน,
        เวลาผู้รับมอบงาน:req.body.เวลาผู้รับมอบงาน,
        ผู้อนุมัติปิดงาน:req.body.ผู้อนุมัติปิดงาน,
        วันที่ผู้อนุมัติปิดงาน:req.body.วันที่ผู้อนุมัติปิดงาน,
        เวลาผู้อนุมัติปิดงาน:req.body.เวลาผู้อนุมัติปิดงาน ,
        เลื่อนไปลงชื่อ:req.body.เลื่อนไปลงชื่อ,
        อนุญาต:req.body.อนุญาต,
        วันที่อนุญาติเปิดงาน:req.body.วันที่อนุญาติเปิดงาน,
        เวลาอนุญาติเปิดงาน:req.body.เวลาอนุญาติเปิดงาน,
        วันที่อนุญาต:req.body.วันที่อนุญาต,
        เวลาที่อนุญาต:req.body.เวลาที่อนุญาต,
        วันที่เลื่อนไป:req.body.วันที่เลื่อนไป,
        เวลาเลื่อนไป:req.body.เวลาเลื่อนไป
      }}, { new: true }, function (err, repair) {
      
      if (err) {
        console.log("Error:", err);
      }
      else {
        console.log(req.params.id);
        res.redirect("/Adminmenu");
        
      }
    });
  };

  repairController.savetohistory = function(req, res) {

    req.body.กำหนดเสร็จ=moment(req.body.กำหนดเสร็จ).format('DD-MM-YYYY');
    req.body.วันที่ประเมินวัสดุ=moment(req.body.วันที่ประเมินวัสดุ).format('DD-MM-YYYY');
    req.body.วันที่สั่งซื้อวัสดุ=moment(req.body.วันที่สั่งซื้อวัสดุ).format('DD-MM-YYYY');
    req.body.วันที่วัสดุครบพร้อมเริ่มงาน=moment(req.body.วันที่วัสดุครบพร้อมเริ่มงาน).format('DD-MM-YYYY');
    req.body.เริ่มดำเนินการซ่อมวันที่=moment(req.body.เริ่มดำเนินการซ่อมวันที่).format('DD-MM-YYYY');
    req.body.ซ่อมเสร็จวันที่=moment(req.body.ซ่อมเสร็จวันที่).format('DD-MM-YYYY');
    req.body.วันที่ผู้ส่งมอบงาน=moment(req.body.วันที่ผู้ส่งมอบงาน).format('DD-MM-YYYY');
    req.body.วันที่ผู้รับมอบงาน=moment(req.body.วันที่ผู้รับมอบงาน).format('DD-MM-YYYY');
    req.body.วันที่ผู้อนุมัติปิดงาน=moment(req.body.วันที่ผู้อนุมัติปิดงาน).format('DD-MM-YYYY');
    req.body.วันที่อนุญาติเปิดงาน=moment(req.body.วันที่อนุญาติเปิดงาน).format('DD-MM-YYYY');
    req.body.วันที่อนุญาต=moment(req.body.วันที่อนุญาต).format('DD-MM-YYYY');
    req.body.วันที่เลื่อนไป=moment(req.body.วันที่เลื่อนไป).format('DD-MM-YYYY');

    Repair.findByIdAndUpdate(req.params.id, 
      { $set: {status: req.body.status , 
        สถานะ3: setDate(), 
        ชื่อผู้ดำเนินการ: req.body.ชื่อผู้ดำเนินการ , 
        ผู้มอบหมาย: req.body.ผู้มอบหมาย,
        ผู้สั่งงานผู้อนุมัติเปิดงาน: req.body.ผู้สั่งงานผู้อนุมัติเปิดงาน , 
        ฝ่ายผู้ใช้เครื่องจักรอนุญาต: req.body.ฝ่ายผู้ใช้เครื่องจักรอนุญาต , 
        ผจกฝ่ายฝ่ายผู้ใช้เครื่องจักรอนุญาต: req.body.ผจกฝ่ายฝ่ายผู้ใช้เครื่องจักรอนุญาต, 
        ผลกระทบต่อฝ่ายต่างๆ:req.body.ผลกระทบต่อฝ่ายต่างๆ,
        WorkPermit:req.body.WorkPermit,
        ประเมินเวลาที่ใช้ในการซ่อม:req.body.ประเมินเวลาที่ใช้ในการซ่อม,
        จำนวนเวลาที่ใช้:req.body.จำนวนเวลาที่ใช้,
        วันที่ประเมินวัสดุ:req.body.วันที่ประเมินวัสดุ,
        วันที่สั่งซื้อวัสดุ:req.body.วันที่สั่งซื้อวัสดุ,
        วันที่วัสดุครบพร้อมเริ่มงาน:req.body.วันที่วัสดุครบพร้อมเริ่มงาน,
        กำหนดเสร็จ:req.body.กำหนดเสร็จ,
        การตรวจซ่อมเครื่องจักร:req.body.การตรวจซ่อมเครื่องจักร,
        วิเคราะห์สาเหตุ:req.body.วิเคราะห์สาเหตุ,
        รายละเอียดการซ่อม:req.body.รายละเอียดการซ่อม,
        อะไหล่วัสดุอุปกรณ์ที่ต้องใช้:req.body.อะไหล่วัสดุอุปกรณ์ที่ต้องใช้,
        ผู้ปฏิบัติงานซ่อม:req.body.ผู้ปฏิบัติงานซ่อม,
        เริ่มดำเนินการซ่อมวันที่:req.body.เริ่มดำเนินการซ่อมวันที่,
        เริ่มดำเนินการซ่อมเวลา:req.body.เริ่มดำเนินการซ่อมเวลา,
        ซ่อมเสร็จวันที่:req.body.ซ่อมเสร็จวันที่,
        ซ่อมเสร็จเวลา:req.body.ซ่อมเสร็จเวลา,
        รวมเวลาซ่อม:req.body.รวมเวลาซ่อม,
        ข้อคิดเห็นเพิ่มเติม:req.body.ข้อคิดเห็นเพิ่มเติม,
        ผู้ส่งมอบงาน:req.body.ผู้ส่งมอบงาน,
        วันที่ผู้ส่งมอบงาน:req.body.วันที่ผู้ส่งมอบงาน,
        เวลาผู้ส่งมอบงาน:req.body.เวลาผู้ส่งมอบงาน,
        ผู้รับมอบงาน:req.body.ผู้รับมอบงาน,
        ผจกฝ่ายผู้รับมอบงาน:req.body.ผจกฝ่ายผู้รับมอบงาน,
        วันที่ผู้รับมอบงาน:req.body.วันที่ผู้รับมอบงาน,
        เวลาผู้รับมอบงาน:req.body.เวลาผู้รับมอบงาน,
        ผู้อนุมัติปิดงาน:req.body.ผู้อนุมัติปิดงาน,
        วันที่ผู้อนุมัติปิดงาน:req.body.วันที่ผู้อนุมัติปิดงาน,
        เวลาผู้อนุมัติปิดงาน:req.body.เวลาผู้อนุมัติปิดงาน ,
        เลื่อนไปลงชื่อ:req.body.เลื่อนไปลงชื่อ,
        อนุญาต:req.body.อนุญาต,
        วันที่อนุญาติเปิดงาน:req.body.วันที่อนุญาติเปิดงาน,
        เวลาอนุญาติเปิดงาน:req.body.เวลาอนุญาติเปิดงาน,
        วันที่อนุญาต:req.body.วันที่อนุญาต,
        เวลาที่อนุญาต:req.body.เวลาที่อนุญาต,
        วันที่เลื่อนไป:req.body.วันที่เลื่อนไป,
        เวลาเลื่อนไป:req.body.เวลาเลื่อนไป
      }}, 
      { new: true },
      function (err, repair) {
        if (err) {
          console.log("Error:", err);
        }
        else {
          
        console.log("in if form 4 ",repair.รหัสเครื่องจักร);



      Machine.findOne({รหัสเครื่องจักร:repair.รหัสเครื่องจักร}).exec(function(err,machine){

      
        Repair.findOne({ _id:req.params.id }).exec(function(err,data){
        if(err){
          console.log("Error:", err);
        }else{
          console.log(data,"Thi===============");
          console.log(machine,"MACHINE");

    var historyMach = new History({
    Jobno:data.นับประเภท,
    ฝ่าย:data.ฝ่าย,แผนก:data.แผนก,
    อะไหล่ที่ใช้:req.body.อะไหล่วัสดุอุปกรณ์ที่ต้องใช้,
    อาการ:data.อาการที่ปรากฏ,
    Recorder:data.ชื่อผู้ประสานงาน,
    ผู้แจ้ง:data.ชื่อผู้แจ้งซ่อม,
    ผู้ดำเนินการ:data.ชื่อผู้ดำเนินการ,
    วันที่แจ้งซ่อม:data.วันที่แจ้งซ่อม,เวลาที่แจ้งซ่อม:data.เวลาที่แจ้งซ่อม,
    แจ้งเพื่อ:data.แจ้งเพื่อ,
    การดำเนินงาน:data.การดำเนินงาน,
    รายละเอียด:req.body.รายละเอียดการซ่อม,
    วันเสร็จ:req.body.ซ่อมเสร็จวันที่,ผู้บันทึก:req.body.ผู้อนุมัติปิดงาน,เริ่มดำเนินการซ่อมวันที่:req.body.เริ่มดำเนินการซ่อมวันที่,FromId:req.params.id
    });

    historyMach.sec = machine.id;
    Machine.findByIdAndUpdate(machine.id, { $addToSet: {his:historyMach},$set:{machineName:data.ชื่อเครื่องจักร,สถานที่ตั้ง:data.สถานที่ตั้ง}}, { new: true }, function (err){
      if(err){
        console.log("ERR in asdasdasdsdasadss");
      }
      else{
        console.log("Push success");
      }
  });

          historyMach.save(function(err) {
            if(err) {
              console.log(err);
            } else {
              console.log("Suceesese==");
              res.redirect("/Adminmenu");
            }
          });
        }
        });
      });
        }
      });
  };

  repairController.showhistory = function(req,res){   
    HistoryMach.find({}).exec(function (err, history) {
      if (err) {
        console.log("Error:", err);
      }
      else {
        res.render("../views/historyrepair", {historys: history});
      }
    });
}; 
 
module.exports = repairController;