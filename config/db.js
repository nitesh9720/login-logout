const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/login"
).then(con=>{
    console.log("connected db");
}).catch(error=>{
    console.log("error",error);
})

module.exports=mongoose