var express = require("express");
const dotenv = require("dotenv");
//Route files
const routerBootcamps= require("./routes/bootcamps")
//Load env Vars
dotenv.config({ path: "./config/config.env" });
//Middleware 
const logger= require("./middlewares/logger")
var app = express();

app.use(logger)
//Mount route
app.use('/api/v1/',routerBootcamps)

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server is running port ${PORT} `));
