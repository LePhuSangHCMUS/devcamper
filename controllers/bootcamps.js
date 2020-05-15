//STATUS CODE
const statusCodes=require("../config/statusCodes")
//DEFINE MODEL
const Bootcamp=require("../models/Bootcamp")

//@Desc    : Get all bootcamps
//@Route   : GET /api/v1/bootcamps
//@Access  : Public
exports.getBootcamps= async (req, res,next)=> {
 try{
  const bootcamps= await Bootcamp.find();
  res.status(statusCodes.OK).json({
   success: true,
   msg: "Get all  bootcamps success",
   count:bootcamps.length,
   data:bootcamps,

 });
 }catch(exception){
   res.status(statusCodes.BAD_REQUEST).json({
     success: false,
     msg: "Get all  bootcamps fail",
     err: exception,


   });
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
    res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      msg: "Get single  bootcamp fail",
    });
  }
  res.status(statusCodes.OK).json({
    success: true,
    msg: "Get single  bootcamp success",
    data:bootcamp
  });

 }catch(exception){
   res.status(statusCodes.BAD_REQUEST).json({
     success: false,
     msg: "Get single  bootcamp fail",
     err: exception,

   });
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
    msg: "Create new bootcamp success",
    data:bootcamp,

  });
  }catch(exception){
    res.status(statusCodes.BAD_REQUEST).json({
      success: false,
      msg: "Create new bootcamp fail",
      err: exception,


    });
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
      res.status(statusCodes.OK).json({
        success: false,
        msg: "Update bootcamp fail - Not Found Bootcamp",
      });
    }
    res.status(statusCodes.OK).json({
     success: true,
     msg: "Update bootcamp success",
     data:bootcamp,
   });
   }catch(exception){
     res.status(statusCodes.BAD_REQUEST).json({
       success: false,
       msg: "Update bootcamp fail",
       err: exception,
 
     });
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