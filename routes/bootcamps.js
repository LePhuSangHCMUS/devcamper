var express = require('express')
var router = express.Router()

//CONTROLLERS
const {getBootcamps,getBootcamp,createBootcamp,updateBootcamp,deleteBootcamp,errorBootcamps,}=require("../controllers/bootcamps")

// router.get("bootcamps",getBootcamps);
// router.get("/bootcamps/:id",getBootcamp);
// router.post("/bootcamps",createBootcamp);
// router.put("/bootcamps/:id",updateBootcamp);
// router.delete("/bootcamps/:id",deleteBootcamp);
// router.all('*',errorBootcamps)

//OR 
router.
route("/bootcamps")
.get(getBootcamps)
.post(createBootcamp);
router.
route("/bootcamps/:id")
.get(getBootcamp)
.put(updateBootcamp)
.delete(deleteBootcamp);
router.all('*',errorBootcamps)
  
  module.exports=router