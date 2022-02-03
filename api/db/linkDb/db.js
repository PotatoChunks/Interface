const mongoose = require("mongoose");

mongoose
    .connect("mongodb+srv://root:root@mongodb1.bwdc8.mongodb.net/link_db?retryWrites=true&w=majority")
    .then(()=>{})
    .catch(()=>{})