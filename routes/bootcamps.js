var express = require('express')
var router = express.Router()

//CONTROLLERS
const {getBootcamps,getBootcamp,createBootcamp,updateBootcamp,deleteBootcamp,uploadPhotoBootcamp}=require("../controllers/bootcamps");
//Include other resource routers
const { getCourses, createCourse } = require('../controllers/courses');

// router.get("bootcamps",getBootcamps);
// router.get("/bootcamps/:id",getBootcamp);
// router.post("/bootcamps",createBootcamp);
// router.put("/bootcamps/:id",updateBootcamp);
// router.delete("/bootcamps/:id",deleteBootcamp);

//OR 


//re-router into other resource routers
router.
route("/:bootcampId/courses")
.get(getCourses)
.post(createCourse)

//main
router.
route("/")
.get(getBootcamps)
.post(createBootcamp);
router.
route("/:id")
.get(getBootcamp)
.put(updateBootcamp)
.delete(deleteBootcamp);  

router.
route("/:id/photo")
.put(uploadPhotoBootcamp)
module.exports=router