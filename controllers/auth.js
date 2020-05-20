//STATUS CODE
const statusCodes=require("../config/statusCodes")
//DEFINE MODEL
const User=require("../models/User")
//ERROR HANDLER
const ErrorResponse=require("../ultis/errorResponse");

var sanitize = require('mongo-sanitize');


//=======================================MAIN========================================

//=======================================API #1======================================
//@Desc    : Register user
//@Route   : POST /api/v1/auth/register
//@Access  : Public
exports.registerUser= async (req, res,next)=> {

    const {name,email,password,role}=req.body;
    
   try{
    //Find Resource
    
    const user=await User.create({
        name:name,
        email:email,
        password:password,
        role:role
    })

    const token=user.getSignedJwtToken();
    res.status(statusCodes.OK).json({
     success: true,
     token:token
   });
   }catch(err){
      return next(new ErrorResponse(statusCodes.NOT_FOUND,err.message))
   }
  }
  
  //=======================================API #2======================================
//@Desc    : Login user
//@Route   : POST /api/v1/auth/login
//@Access  : Public
exports.loginUser= async (req, res,next)=> {

    let {email,password}=req.body;
    //Injection noSql remove symbol reverser or rewrite no sql 
    // email = sanitize(email);
    
   try{

    //Validation email (example basic- not empty);
    if(!email||!password){
        return next(new ErrorResponse(statusCodes.NOT_FOUND,`Please provide an email and password`))

    }
    //Check for user
    const user=await User.findOne({
        email :{
            "$eq":email,
        }
    }).select('+password').exec();
    if(!user){
        return next(new ErrorResponse(statusCodes.UNAUTHORIZED,`Invalid credentials`))
    }
    //Check if password matches
    const isMatch=await user.matchPassword(password);    
    if(!isMatch){
        return next(new ErrorResponse(statusCodes.UNAUTHORIZED,`Invalid credentials`))

    }
    sendTokenResponse(user,statusCodes.OK,res);
   }catch(err){
      return next(new ErrorResponse(statusCodes.NOT_FOUND,err.message))
   }
  }
  


 //=======================================API #3======================================
//@Desc    : Forgot Password 
//@Route   : POST /api/v1/auth/forgotpassword
//@Access  : Public
exports.forgotPassword= async (req, res,next)=> {

    const {email}=req.body;
   try{
    //Validation email (example basic- not empty);
    if(!email){
        return next(new ErrorResponse(statusCodes.NOT_FOUND,`Please provide an email`))

    }
        //Check for user
    const user=await User.findOne({
        email:email,
    })
    if(!user){
        return next(new ErrorResponse(statusCodes.NOT_FOUND,`There is no user with that email `))
    }
    console.log(user);

    //Get reset token
    const resetToken= await  user.getResetPassword();

    //save to database or set in methods 

    await user.save({validateBeforeSave:false})

    res.status(statusCodes.OK).json({
        success: true,
        token:resetToken
      });
   }catch(err){
      return next(new ErrorResponse(statusCodes.NOT_FOUND,err.message))
   }
  }


 //=======================================API #4======================================
//@Desc    : Logout User
//@Route   : POST /api/v1/auth/logout
//@Access  : Public
exports.logout= async (req, res,next)=> {
    const options={
        expires:new Date(Date.now()+10*1000),//delete cookie after 10s
        httpOnly:true
    }
    res
    .status(statusCodes.OK)
    .cookie('token','none',options)
    .json({
        success: true,
        token:{}
      });
  }

  //Function util
  const sendTokenResponse = (user,statusCode,res)=>{
    //Create token  
    const token=user.getSignedJwtToken();
    //Options cookie
    const options={
        expires:new Date(Date.now()+ process.env.JWT_COOKIE_EXPIRE*24*60*60*1000),
        httpOnly:true,
    }
    if(process.env.NODE_ENV==='production'){
        options.secure=true;
    }


    res
    .status(statusCode)
    .cookie('token',token,options)
    .json({
        success: true,
        token:token
      });

  }
  