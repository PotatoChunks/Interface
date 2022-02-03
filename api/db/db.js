const mongoose = require('mongoose')

const uri = "mongodb+srv://admin:admin@mongodb1.bwdc8.mongodb.net/admin?retryWrites=true&w=majority";
mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true})