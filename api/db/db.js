const mongoose = require("mongoose");

mongoose
    .connect("mongodb+srv://root:root@mongodb1.bwdc8.mongodb.net/blog?retryWrites=true&w=majority")
    .then(()=>{})
    .catch(()=>{})