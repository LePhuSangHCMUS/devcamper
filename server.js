var express = require("express");
const dotenv = require("dotenv");
//Connect DB
const connectDB=require("./config/db");
//Route files
const routerBootcamps= require("./routes/bootcamps")
const routerCourses= require("./routes/courses")
//=========Load env Vars=======================
dotenv.config({ path: "./config/config.env" });
//=========Middleware ==================
const errorHandler= require("./middlewares/errorHandler")
const morgan= require("morgan");

//Controller special (catch api invalid )
const {apiInvalid} =require("./controllers/apiInvalid")

//=========Color Console============
var colors = require('colors');

//Start connect to database 
connectDB();

//========================MAIN=================================
var app = express();
if(process.env.NODE_ENV === "development"){
  app.use(morgan('dev'));
  console.log("enter")

}


app.use(express.static('public'))

//1.Body Parse
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());
 
// Parse JSON bodies (as sent by API clients)
app.use(express.json({type:'application/json'}));

//2.Mount route

app.use('/api/v1/bootcamps',routerBootcamps);
app.use('/api/v1/courses',routerCourses);



//All Request if not API invalid
app.all("*",apiInvalid)

//3.Handle Error Middleware
app.use(errorHandler)




const PORT = process.env.PORT || 5000;


const server=app.listen(PORT, console.log(`server is running port ${PORT} `.green.inverse.bold));


//Handle unhandled promise rejections
process.on("unhandledRejection",(err,promise)=>{
  console.log(`Error Handle By Me:  ${err.message}`.red.inverse);
  //close server and exit process
  server.close(()=>{
     process.exit()
  });
})
