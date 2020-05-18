//STATUS CODE
const statusCodes=require("../config/statusCodes")
//DEFINE MODEL
const Course=require("../models/Course");
const Bootcamp = require("../models/Bootcamp");

//ERROR HANDLER
const ErrorResponse=require("../ultis/errorResponse");
const { json } = require("express");










//=======================================MAIN========================================

//=======================================API #1======================================
//@Desc    : Get all courses (include : select fields , sort , filter, pagination)
//@Route   : GET /api/v1/courses
//@Route   : GET /api/v1/bootcamps/:bootcampIs/courses   ==> conflict router beside bootcamps ==> use mergeParams:true
//@Access  : Public
exports.getCourses= async (req, res,next)=> {
    console.log("req.query : ");
    console.log(req.query);
    const queryFormat={};
    const bootcampId=req.params.bootcampId;
    if(bootcampId){
        queryFormat.bootcampId=bootcampId;
    }
 try{
  //Find Resource
  const courses= await Course
  .find(queryFormat)
  .populate({path:"bootcampId",select:"name description"}).exec();;
//   .select(fieldsSelect)
//   .sort(sortBy)
//   .limit(limitPerPage)
//   .skip(skipBootcamp)
  //Count total Resource
//   const total=await Bootcamp.countDocuments();
  res.status(statusCodes.OK).json({
   success: true,
   count:courses.length,
   data:courses,

 });
 }catch(err){
    next(new ErrorResponse(statusCodes.NOT_FOUND,err.message))
 }
}


//=======================================API #2======================================

//@Desc    : Get single course
//@Route   : GET /api/v1/course/:id
//@Access  : Private
exports.getCourse= async function (req, res,next) {
const id=req.params.id
 try{
  const course= await Course.
  findById(id) 
  .populate({path:"bootcampId",select:"name description"})
  .exec();
  if(!course){
    return next(new ErrorResponse(statusCodes.NOT_FOUND,`Course not found with id of ${id}`))
  }
  res.status(statusCodes.OK).json({
    success: true,
    data:course
  });

 }catch(err){

  next(new ErrorResponse(statusCodes.NOT_FOUND,`Vourse not found with id of ${id}`))
}
}
//=======================================API #3======================================

//@Desc    : Create new course
//@Route   : POST /api/v1/bootcamps/:bootcampId/courses
//@Access  : Private
exports.createCourse=    async (req, res,next)=> {
  const bootcampId=req.params.bootcampId;

  try{
   const bootcamp= await Bootcamp.findById(bootcampId);
   if(!bootcamp){
    return next(new ErrorResponse(statusCodes.BAD_REQUEST,`Bootcamp not found with id of ${bootcampId}`)) 
   };


   //Create body (data) 
   req.body.bootcampId=bootcampId;
   const course= await Course.create(req.body);

   res.status(statusCodes.CREATED).json({
    success: true,
    data:course,
  });
  }catch(err){
    next(new ErrorResponse(statusCodes.BAD_REQUEST,err.message))
  }
}

//=======================================API #4======================================

//@Desc    : Update  course
//@Route   : PUT /api/v1/courses/:id
//@Access  : Private
exports.updateCourse= async (req, res,next)=> {
  const id=req.params.id;
  const bodyPrams=req.body;
  try{
    const newCourse= await Course.findOneAndUpdate({ _id: id },bodyPrams,{
      new:true,
      runValidators:true
    })
    if(!newCourse){
     return  next(new ErrorResponse(statusCodes.BAD_REQUEST,`Course not found with id of ${id}`))

    }
    res.status(statusCodes.OK).json({
     success: true,
     data:newCourse,
   });
   }catch(err){
    next(new ErrorResponse(statusCodes.BAD_REQUEST,err.message))
   }
}


//=======================================API #5======================================

//@Desc    : Delete course
//@Route   : DELETE /api/v1/course/:id
//@Access  : Private
exports.deleteCourse= async  (req, res,next)=> {
  const id=req.params.id;
  try{
    const course= await Course.findById(id);
    if(!course){
      return next(new ErrorResponse(statusCodes.BAD_REQUEST,`Course not found with id of ${id}`))

    }
    course.remove();//use cascade delete ref if use remove() method 
      res.status(statusCodes.OK).json({
        success: true,
        data:course,
      });

   }catch(err){
    return next(new ErrorResponse(statusCodes.BAD_REQUEST,err.message))

   }
}
exports.errorCourse= (req, res,next) =>{
  res.status(404).json({
    success: true,
    msg: `Not Found API`,
  });
}
module.exports;