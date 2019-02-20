var mongoose = require('mongoose')
var Schema = mongoose.Schema
var personnelSchema = new Schema({
  personnelName: {
    type: String,
    required:true
  },
  personnelLastName:{
    type: String,
    required:true
  },
  ตำแหน่ง:{
    type: String,
    required:true
  },
  sec:{
      type: Schema.Types.ObjectId,
      ref:'department'
  } 
});

module.exports = mongoose.model('personnel', personnelSchema);