//STATUS CODE
const statusCodes=require("../config/statusCodes")
//DEFINE MODEL
const Bootcamp=require("../models/Bootcamp")
//ERROR HANDLER
const ErrorResponse=require("../ultis/errorResponse")










//=======================================MAIN========================================
//@Desc    : Get all bootcamps
//@Route   : GET /api/v1/bootcamps
//@Access  : Public
exports.getBootcamps= async (req, res,next)=> {
 try{
  const bootcamps= await Bootcamp.find();
  res.status(statusCodes.OK).json({
   success: true,
   count:bootcamps.length,
   data:bootcamps,

 });
 }catch(err){
    next(new ErrorResponse(statusCodes.NOT_FOUND,err.message))
 }
}
//@Desc    : Get single bootcamp
//@Route   : GET /api/v1/bootcamps/:id
//@Access  : Private
exports.getBootcamp= async function (req, res,next) {
const id=req.params.id
 try{
  const bootcamp= await Bootcamp.findById(id);
  if(!bootcamp){
    next(new ErrorResponse(statusCodes.NOT_FOUND,`Bootcamp not found with id of ${id}`))
  }
  res.status(statusCodes.OK).json({
    success: true,
    data:bootcamp
  });

 }catch(err){

  next(new ErrorResponse(statusCodes.NOT_FOUND,`Bootcamp not found with id of ${id}`))
}
}
//@Desc    : Create new bootcamp
//@Route   : POST /api/v1/bootcamps/:id
//@Access  : Private
exports.createBootcamp=    async (req, res,next)=> {
  // console.log(req.body);
  try{
   const bootcamp= await Bootcamp.create(req.body);
   res.status(statusCodes.CREATED).json({
    success: true,
    data:bootcamp,
  });
  }catch(err){
    next(new ErrorResponse(statusCodes.BAD_REQUEST,err.message))
  }

}
//@Desc    : Update  bootcamp
//@Route   : PUT /api/v1/bootcamps/:id
//@Access  : Private
exports.updateBootcamp= async (req, res,next)=> {
  const id=req.params.id;
  const bodyPrams=req.body;
  try{
    const bootcamp= await Bootcamp.findOneAndUpdate({ _id: id },bodyPrams,{
      new:true,
      runValidators:true
    })
    if(!bootcamp){
      next(new ErrorResponse(statusCodes.BAD_REQUEST,`Bootcamp not found with id of ${id}`))

    }
    res.status(statusCodes.OK).json({
     success: true,
     data:bootcamp,
   });
   }catch(err){
    next(new ErrorResponse(statusCodes.BAD_REQUEST,err.message))
   }
}
//@Desc    : Delete bootcamp
//@Route   : DELETE /api/v1/bootcamps/:id
//@Access  : Private
exports.deleteBootcamp= async  (req, res,next)=> {
  const id=req.params.id;
  const bodyPrams=req.body;
  try{
    const bootcamp= await Bootcamp.findByIdAndDelete({ _id: id })
    if(!bootcamp){
      res.status(statusCodes.OK).json({
        success: false,
        msg: "Delete bootcamp fail - Not Found Bootcamp",
      });
    }
    res.status(statusCodes.OK).json({
     success: true,
     msg: "Delete bootcamp success",
     data:bootcamp,
   });
   }catch(exception){
     res.status(statusCodes.BAD_REQUEST).json({
       success: false,
       msg: "Delete bootcamp fail",
       err: exception,
 
     });
   }
}
exports.errorBootcamps= (req, res,next) =>{
  res.status(404).json({
    success: true,
    msg: `Not Found API`,
  });
}
module.exports;