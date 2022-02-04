const mongoose = require("mongoose");
require('./27017')

let diary = mongoose.model("diary",new mongoose.Schema({
  txt : String,
  img : Array,
  date : {type:Date,default:Date.now},
  color:String,
}));


module.exports = diary;
