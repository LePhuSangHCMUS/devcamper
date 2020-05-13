var express = require("express");
const dotenv = require("dotenv");
//ROUTER
const routerBootcamps= require("./routes/bootcamps")

dotenv.config({ path: "./config/config.env" });

var app = express();
app.use('/api/v1/', routerBootcamps)

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server is running port ${PORT} `));
