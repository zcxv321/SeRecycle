var mongoose = require('mongoose')
var Schema = mongoose.Schema
// var personnelSchema = new Schema({
//   firstname: {
//     type: String
//   },
//   lastname: {
//     type: String
//   },
//   date: {
//     type: Date,
//     default: Date.now
//   }
// });
// var sectionSchema = new Schema({
//   SectionName: {
//     type: String,
//     unique: false
//   },
//   personnels: [personnelSchema]
// });
var departmentSchema = new Schema({
  departmentName: {
    type: String,
    unique: true
  },
  personnel: [{
    type:Schema.Types.ObjectId,
    ref:'personnel'
  }]
});
module.exports = mongoose.model('department', departmentSchema);
// module.exports = mongoose.model('section', sectionSchema);
// module.exports = mongoose.model('personnel', personnelSchema);