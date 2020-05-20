const jsonWebToken=require('jsonwebtoken');

//STATUS CODE
const statusCodes=require("../config/statusCodes")
//DEFINE MODEL
const User=require("../models/User")
//ERROR HANDLER

const ErrorResponse=require("../ultis/errorResponse");

exports.protect = async (req,res,next)=>{
    let token;
    //Check token use header
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token=req.headers.authorization.split(" ")[1];
    }
    //Check token use cookie
    else if(req.cookies.token){
        token=req.cookies.token;
    }
    if(!token){
        return next(new ErrorResponse(statusCodes.UNAUTHORIZED,`Not authorize to access this router`))

    }
    try{

        //Verify token 
        const decode=jsonWebToken.verify(token,process.env.JWT_SECRET);
        console.log(decode);
        const user=await User.findById(decode.id);
        if(!user){
            return next(new ErrorResponse(statusCodes.UNAUTHORIZED,`Not authorize to access this router`))
        }
        req.user=user;
        next()

    }catch(err){
        return next(new ErrorResponse(statusCodes.UNAUTHORIZED,err.message))
 
    }
}

//Grant access to specific roles

exports.authorize=(...roles)=>{
return (req,res,next)=>{
    if(!roles.includes(req.user.role)){
        return next(new ErrorResponse(statusCodes.UNAUTHORIZED,`User role ${req.user.role} is not authorized to access this router`))
    }
    next();
}
}
module.exports;