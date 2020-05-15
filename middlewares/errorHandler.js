const statusCodes=require("../config/statusCodes")
const errorHandler=(err,req,res,next)=>{
    //log to console for dev
    console.log(err.stack.red);
    res.status(err.statusCodes||statusCodes.INTERNAL_SERVER_ERROR).json({
        success:false,
        err:err.message ||"Internal Server Error"
    })
}
module.exports=errorHandler;