var express = require('express')
var router = express.Router({mergeParams:true})

//CONTROLLERS
const {getCourses,getCourse,createCourse,updateCourse,deleteCourse}=require("../controllers/courses")

//===================MAIN================================
router.
route("/")
.get(getCourses)
.post(createCourse);
router.
route("/:id")
.get(getCourse)
.put(updateCourse)
.delete(deleteCourse);
  
 module.exports=router