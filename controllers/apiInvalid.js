
//STATUS CODE
const statusCodes=require("../config/statusCodes")
//ERROR HANDLER
const ErrorResponse=require("../ultis/errorResponse");
exports.apiInvalid= (req, res,next) =>{
    next(new ErrorResponse(statusCodes.BAD_REQUEST,'Api invalid'))
  }
  module.exports;