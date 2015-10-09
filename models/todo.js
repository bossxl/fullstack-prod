var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodSchema = new Schema({
  name: String,
  uuid: {
    type: String,
    required: true
  },
  owner_id: {
    type: String,
    required: true
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

TodSchema.pre('validate', function(next) {
  if (!this.uuid) {
    this.uuid = uuid.v4();
  }
  if (!this.created) {
    this.created = Date.now();
  }
  this.updated = Date.now();
  next();
});

module.exports = mongoose.model('Todo', TodSchema);