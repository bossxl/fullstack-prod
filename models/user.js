var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  admin: Boolean,
  location: String,
  meta: {
    name: String,
    age: Number,
    website: String
  },
  created: {
    type: Date,
    required: true
  },
  updated: {
    type: Date,
    required: true
  }
});

userSchema.pre('validate', function(next) {
  if (!this.uuid) {
    this.uuid = uuid.v4();
  }
  if (!this.created) {
    this.created = Date.now();
  }
  this.updated = Date.now();
  next();
});



var User = mongoose.model('User', userSchema);

module.exports = User;
