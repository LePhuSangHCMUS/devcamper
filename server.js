var express = require("express");
const dotenv = require("dotenv");
//Connect DB
const connectDB=require("./config/db");
//Route files
const routerBootcamps= require("./routes/bootcamps")
//=========Load env Vars=======================
dotenv.config({ path: "./config/config.env" });
//=========Middleware ==================
// const logger= require("./middlewares/logger")
const morgan= require("morgan")

//=========Color============
var colors = require('colors');

//Start connect to database 
connectDB();

//========================MAIN=================================
var app = express();
if(process.env.NODE_ENV === "development"){
  app.use(morgan('dev'));
  console.log("enter")

}
//1.Body Parse
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());
 
// Parse JSON bodies (as sent by API clients)
app.use(express.json({type:'application/json'}));

//2.Mount route
app.use('/api/v1/',routerBootcamps)






const PORT = process.env.PORT || 5000;

const server=app.listen(PORT, console.log(`server is running port ${PORT} `.green.bold));


//Handle unhandled promise rejections
process.on("unhandledRejection",(err,promise)=>{
  console.log(`Error Handle :  ${err.message}`.red);
  //close server and exit process
  server.close(()=>{
     process.exit()
  });
})