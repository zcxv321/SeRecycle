var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var LoginSchema = new mongoose.Schema({
  user: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
LoginSchema.pre('save', function (next) {
  var user = this;
  bcrypt.hash(user.password, 8, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});
module.exports = mongoose.model('Login', LoginSchema)