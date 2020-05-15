const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const pointSchema = new Schema({
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true,
      index:"2dsphere"
    },
    formattedAddress:String,
    street:String,
    city:String,
    state:String,
    zipcode:String,
    country:String
  });
const bootcampSchema =new Schema({
     name:{
        type: String,
        required:[true,'Please add a name'],
        unique:true,
        trim:true,
        lowercase :true,
        maxLength:[50,"Name can not be more than 50 character"]
     },
     slug:String,
     description:{
         type:String,
         required:[true,"Please add a description"],
         trim:true,
         maxLength:[500,"Description can not be more than 50 character"]

     },
     website:{
         type:String,
         match:[/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
         "Please use a valid URL with HTTP or HTTPS"
        ]
     },
     email:{
         type:String,
         match:[/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please add a valid email"]
     },
     address:{
         type:String,
         required:[true,"Please add an address"]
     },
     location:{
        type:pointSchema,
        require:true,
     },
     careers:{
         //Array of strings
         type:[String],
         required:true,
         enum:[
             "Web Development",
             "Mobile Development",
             "UI/UX",
             "Data Science",
             "Business",
             "Other"
         ]
     },
     averageRating:{
         type:Number,
         min:[1,"Rating must be at least 1"],
         max:[10,"Rating must not be more than 10"]
     },
     averageCost:Number,
     photo:{
         type:String,
         default:"no-photo.jpg"
     },
     housing:{
         type:Boolean,
         default:false
     },
     jobAssistance:{
         type:Boolean,
         default:false
     },
     jobGuarantee:{
         type:Boolean,
         default:false
     },
     acceptGi:{
         type:Boolean,
         default:false
     },
     createAt:{
         type:Date,
         default:Date.now()
     }
    });
    module.exports=mongoose.model("Bootcamp",bootcampSchema)
