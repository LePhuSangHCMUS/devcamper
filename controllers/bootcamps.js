//STATUS CODE
const statusCodes=require("../config/statusCodes")
//DEFINE MODEL
const Bootcamp=require("../models/Bootcamp")
//ERROR HANDLER
const ErrorResponse=require("../ultis/errorResponse");
const { json } = require("express");

const path =require('path')








//=======================================MAIN========================================

//=======================================API #1======================================
//@Desc    : Get all bootcamps (include : select fields , sort , filter, pagination)
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
  .populate('courses')
  .exec()
  //Count total Resource
  const total=await Bootcamp.countDocuments();
  res.status(statusCodes.OK).json({
   success: true,
   total:total,
   count:bootcamps.length,
   data:bootcamps,

 });
 }catch(err){
    return next(new ErrorResponse(statusCodes.NOT_FOUND,err.message))
 }
}






//=======================================API #2======================================
//@Desc    : Get single bootcamp
//@Route   : GET /api/v1/bootcamps/:id
//@Access  : Private
exports.getBootcamp= async function (req, res,next) {
const id=req.params.id;
 console.log(id); 
 try{
  const bootcamp= await Bootcamp.findById(id);
  if(!bootcamp){
    return next(new ErrorResponse(statusCodes.NOT_FOUND,`Bootcamp not found with id of ${id}`))
  }
    res.status(statusCodes.OK).json({
      success: true,
      data:bootcamp
    });


 }catch(err){

  return next(new ErrorResponse(statusCodes.NOT_FOUND,`Bootcamp not found with id of ${id}`))
}
}

//=======================================API #3======================================

//@Desc    : Create new bootcamp
//@Route   : POST /api/v1/bootcamps
//@Access  : Private
exports.createBootcamp=    async (req, res,next)=> {
  // console.log(req.body);

  //add userId to req.body 
  req.body.userId=req.user._id;
  //Check for publisher bootcamp 
  const publishedBootcamp=await Bootcamp.findOne({userId:req.user._id});
  
  //If the user is not an admin , they can only add one bootcamp
  if(publishedBootcamp && req.user.role != 'admin'){
    return next(new ErrorResponse(statusCodes.BAD_REQUEST,`The user with ID ${req.user._id} has already published a bootcamp`))
 
  }
  try{
   const bootcamp= await Bootcamp.create(req.body);
   res.status(statusCodes.CREATED).json({
    success: true,
    data:bootcamp,
  });
  }catch(err){
    return next(new ErrorResponse(statusCodes.BAD_REQUEST,err.message))
  }

}

//=======================================API #4======================================

//@Desc    : Update  bootcamp
//@Route   : PUT /api/v1/bootcamps/:id
//@Access  : Private
exports.updateBootcamp= async (req, res,next)=> {
  const id=req.params.id;
  const bodyPrams=req.body;
  try{
    const newBootcamp= await Bootcamp.findOneAndUpdate({ _id: id },bodyPrams,{
      new:true,
      runValidators:true
    })
    if(!newBootcamp){
      return next(new ErrorResponse(statusCodes.BAD_REQUEST,`Bootcamp not found with id of ${id}`))

    }
      res.status(statusCodes.OK).json({
        success: true,
        data:newBootcamp,
      });

   }catch(err){
    return next(new ErrorResponse(statusCodes.BAD_REQUEST,err.message))
   }
}


//=======================================API #5======================================

//@Desc    : Upload photo for  bootcamp
//@Route   : PUT /api/v1/bootcamps/:id/photo
//@Access  : Private
exports.uploadPhotoBootcamp= async (req, res,next)=> {
  const id=req.params.id;
  try{
    const bootcamp= await Bootcamp.findById(id);

    if(!bootcamp){
      return next(new ErrorResponse(statusCodes.BAD_REQUEST,`Bootcamp not found with id of ${id}`))

    }

    //==========================VALIDATION FILE===============================
    if(!req.files || Object.keys(req.files).length === 0){
      return next(new ErrorResponse(statusCodes.BAD_REQUEST,`Please upload a file`))

    }

    const file=req.files.file

    console.log(file);
  //Make sure the image is a photo
    if(!file.mimetype.startsWith('image')){
      return next(new ErrorResponse(statusCodes.BAD_REQUEST,`Please upload an image file`));

    }
  //Check filesize
  if(file.size > process.env.MAX_FILE_UPLOAD){
    return next(new ErrorResponse(statusCodes.BAD_REQUEST,`Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`));

  }

  //make file name
  const fileName=`photo_${id}${path.parse(file.name).ext}`;  
  // Use the mv() method to place the file somewhere on your server
      file.mv(`${process.env.FILE_UPLOAD_PATH}/${fileName}`,async  function(err) {
        if (err){
          return next(new ErrorResponse(statusCodes.INTERNAL_SERVER_ERROR,`Problem with file upload`));
        }
        try{
          const newBootcamp= await Bootcamp.findByIdAndUpdate(id,{photo:fileName},{
            new:true,
            runValidators:true
          });
          if(!newBootcamp){
            return next(new ErrorResponse(statusCodes.BAD_REQUEST,`Bootcamp not found with id of ${id}`))
      
          }
            res.status(statusCodes.OK).json({
              success: true,
              data:newBootcamp,
            });

        }catch(err){
          return next(new ErrorResponse(statusCodes.BAD_REQUEST,err.message));

        }

      });

   }catch(err){
    return next(new ErrorResponse(statusCodes.BAD_REQUEST,err.message))
   }
}
//=======================================API #6======================================

//@Desc    : Delete bootcamp
//@Route   : DELETE /api/v1/bootcamps/:id
//@Access  : Private
exports.deleteBootcamp= async  (req, res,next)=> {
  const id=req.params.id;
  try{
    const bootcamp= await Bootcamp.findById(id);
    if(!bootcamp){
      return next(new ErrorResponse(statusCodes.BAD_REQUEST,`Bootcamp not found with id of ${id}`))

    }
    bootcamp.remove();//use cascade delete ref if use remove() method 
      res.status(statusCodes.OK).json({
        success: true,
        data:bootcamp,
      });

   }catch(err){
    return next(new ErrorResponse(statusCodes.BAD_REQUEST,err.message))

   }
}

module.exports;