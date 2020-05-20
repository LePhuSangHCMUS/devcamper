const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt =require('bcryptjs');
const crypto =require('crypto')
const jsonWebToken=require('jsonwebtoken')
const UserSchema =new Schema({
    name:{
        type:String,
        trim:true,
        required:[true,"Please add a name"]
    },
    email:{
        type:String,
        required:[true,"Please add an email"],
        unique:true,
        match: [
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please add a valid email",
          ],
    },
     role:{
         type:String,
         enum:['user','publisher'],
         default:'user'
     },
     password:{
         type:String,
         required:[true,"Please add a password"],
         minlength:6,
         select:false
     },
     resetPasswordToken:{
         type:String,
     },
     resetPasswordExpire:Date,
     createAt:{
        type:Date,
        default:Date.now()
    }
});
//Encrypt password using bcrypt
UserSchema.pre('save',async function(next){

    //avoid error Illegal arguments: undefined, string with password
    if(!this.isModified('password')){
        next();
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
    next();
})
//Create Method

UserSchema.methods.getSignedJwtToken = function(){
    return  jsonWebToken.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE
    })
}
UserSchema.methods.matchPassword = async function(enterPassword){
    return  await bcrypt.compare(enterPassword,this.password)
}

UserSchema.methods.getResetPassword = async function(){
    const    resetToken= crypto.randomBytes(20).toString('hex');
    //Hash token and set to resetPasswordToken field
    this.resetPasswordToken=crypto.createHash('sha256').update(resetToken).digest('hex');

    //Set expire
    this.resetPasswordExpire=Date.now()+10*60*1000;//=== 10'
    return resetToken;
}



module.exports=mongoose.model("User",UserSchema)
