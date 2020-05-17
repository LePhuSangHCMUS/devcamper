var mongoose = require('mongoose');
const dotenv = require("dotenv");
//=========Load env Vars=======================
dotenv.config({ path:`${__dirname}/config.env` });
console.log(process.env.MONGO_URI);
const connectDB=async ()=>{
    const conn=await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useCreateIndex:true,
        useFindAndModify:false,
        useUnifiedTopology:true
    })
    console.log(`MongoDb connected ${conn.connection.host}`.cyan.underline.bold);
    
}
module.exports=connectDB;