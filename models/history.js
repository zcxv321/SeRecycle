var mongoose = require('mongoose')
var Schema = mongoose.Schema
var historySchema = new Schema({  
  Jobno:{//-
    type: String
  },
  อาการ:{//-
      type:String
  },
  รายละเอียด:{//-
      type:String
  },
  อะไหล่ที่ใช้:{//-
      type:String
  },
  ผู้ดำเนินการ:{//-
    type:String
  },
  ผู้แจ้ง:{//-
    type:String
  },
ฝ่าย:{//-
    type:String
},แผนก:{
    type:String
},
แจ้งเพื่อ:{//-
    type:String
},
การดำเนินงาน:{//-
    type:String
},
วันที่แจ้งซ่อม:{//-
    type:String
},เวลาที่แจ้งซ่อม:{
    type:String
},
วันเสร็จ:{//
    type:String
},ผู้บันทึก:{
    type:String
},เริ่มดำเนินการซ่อมวันที่:{
    type:String
},FromId:{
    type:String
},

  sec:{
      type: Schema.Types.ObjectId,
      ref:'machine'
  }
});

module.exports = mongoose.model('history', historySchema);