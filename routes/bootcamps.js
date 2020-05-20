var express = require('express')
var router = express.Router()
//MIDDLEWARE
const {protect,authorize} =require("../middlewares/auth")
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
.post(protect,createCourse)

//main
router.
route("/")
.get(getBootcamps)
.post(protect,authorize('publisher','admin'),createBootcamp);
router.
route("/:id")
.get(protect,getBootcamp)
.put(protect,authorize('publisher','admin'),updateBootcamp)
.delete(protect,authorize('publisher','admin'),deleteBootcamp);  

router.
route("/:id/photo")
.put(protect,authorize('publisher','admin'),uploadPhotoBootcamp)
module.exports=router