var mongoose = require('mongoose')
var Schema = mongoose.Schema
var machineSchema = new Schema({
    machineName:{
        type: String
    },
    รหัสเครื่องจักร:{
      type:String
    },สถานที่ตั้ง:{
      type:String
    },
  ยี่ห้อ: {
    type: String
  },
  Model: {
    type: String
  },
  pole: {
    type: String
  },
  phase: {
    type: String
  },
  power: {
    type: String
  },
  voltage: {
    type: String
  },
  current: {
    type: String
  },
  rpm: {
    type: String
  },
  ip: {
    type: String
  },
  powerfactor: {
    type: String
  },
  frequency: {
    type: String
  },
  uf: {
    type: String
  },
  mechsealno: {
    type: String
  },
  head: {
    type: String
  },
  flowrate: {
    type: String
  },
  oilsealno: {
    type: String
  },
  วันที่ติดตั้ง: {
    type: String
  },
  รายการอะไหล่: {
    type: String
  },
  ect: {
    type: String
  },
  his: [{
    type: Schema.Types.ObjectId,
    ref: 'history'
  }]
});
module.exports = mongoose.model('machine', machineSchema);
// module.exports = mongoose.model('section', sectionSchema);
// module.exports = mongoose.model('personnel', personnelSchema);