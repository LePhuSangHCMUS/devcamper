//STATUS CODE
const statusCodes=require("../config/statusCodes")
//DEFINE MODEL
const Bootcamp=require("../models/Bootcamp")
//ERROR HANDLER
const ErrorResponse=require("../ultis/errorResponse");
const { json } = require("express");










//=======================================MAIN========================================
//@Desc    : Get all bootcamps
//@Route   : GET /api/v1/bootcamps
//@Access  : Public
exports.getBootcamps= async (req, res,next)=> {
 
  console.log("req.query : ");
  console.log(req.query);

  // Copy req.body
  let reqQuery ={ ...req.query};
  //Field to exclude
  const removeFields=['select','sort','page',"limit"];

  //Loop over  remove Fields and delete  them  from reqQuery;
  removeFields.map(param=>{
    delete reqQuery[param];
  })




  //=========================Create string select fields=====================
  const fieldsSelect=req.query.select?req.query.select.split(",").join(" "):"";


  //=========================Create sort ====================================
  const sortBy=req.query.sort?{[req.query.sort]:1}:{createAt:1}; //1 or a : asc , -1 or d : desc
  console.log("sortBy : ");
  console.log(sortBy);


  //==========================Create pagination==============================
  const page=req.query.page?parseInt(req.query.page):1;
  const limitPerPage =req.query.limit?parseInt(req.query.limit):10000;
  const skipBootcamp=limitPerPage*page - limitPerPage;


  console.log('Limit & Page : ' + "\n" + limitPerPage + " & " + page);
  




  // Create Query String
  let queryString=JSON.stringify(reqQuery);




  //1. Create  operator ($gt, $lt, $gte) in mongoose==> Because in mongoose query is {property:{$lt:value}} , req.body is {property:{lt:value}} 
  reqQuery=queryString.replace(/\b(gt|gte|lt|lte|in)\b/g,match=>{
    return `$${match}`;
  })
  //Creat queryFormat JSON
  let queryFormat=JSON.parse(queryString);

  console.log("queryFormat : ");
  console.log(queryFormat);

  //2. Select Filed req.body same  as api/select=name,description

 try{
  //Find Resource
  const bootcamps= await Bootcamp
  .find(queryFormat)
  .select(fieldsSelect)
  .sort(sortBy)
  .limit(limitPerPage)
  .skip(skipBootcamp)
  //Count total Resource
  const total=await Bootcamp.countDocuments();
  res.status(statusCodes.OK).json({
   success: true,
   total:total,
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