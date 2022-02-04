const mongoose = require("mongoose");
require('./27017')
//
let Schema = mongoose.Schema;
//最近访客表
let visitor = mongoose.model("visitor",new mongoose.Schema({
  user : {
    type : Schema.Types.ObjectId,
    required : true,
    ref : "user"
  },
  date : {
    type : Date,
    default : Date.now
  }
}));
module.exports = visitor;