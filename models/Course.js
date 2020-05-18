const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const CourseSchema =new Schema({
    title:{
        type:String,
        trim:true,
        required:[true,"Please add a description"]
    },
    description:{
        type:String,
        required:[true,"Please add a description"]
    },
     weeks:{
         type:String,
         required:[true,"Please add number of weeks"]
     },
     tuition:{
         type:Number,
         required:[true,"Please add a tuition cost"]
     },
     minimumSkill:{
         type:String,
         required:[true,"Please add a minimum skill"],
         enum:["beginner","intermediate","advances"]
     },
     scholarshipAvailable:{
         type:Boolean,
         default:false
     },
     createAt:{
        type:Date,
        default:Date.now()
    },
    bootcampId:{
        type:mongoose.Types.ObjectId,
        ref:'Bootcamp',
        required:true
    }
});
CourseSchema.statics.getAverageCost=async function(bootcampId){
    console.log(`Calculating avg cost ...`.blue.inverse.bold);
    const obj=await this.aggregate([
        {
            $match:{bootcampId:bootcampId}
        },
        {
            $group:{
                _id:'$bootcampId',
                getAverageCost:{$avg:'$tuition'}
            }
        }
    ])

    try{
           await this.model('Bootcamp').findByIdAndUpdate(bootcampId,{
                averageCost:obj[0].getAverageCost
            })

    }catch(err){
        console.log(err);
        
    }

}
//Call getAverageCost after save
CourseSchema.post('save',async function(){
    this.constructor.getAverageCost(this.bootcampId);
})
//Call getAverageCost after save
CourseSchema.pre('remove',async function(next){
    this.constructor.getAverageCost(this.bootcampId);
    next();
})


module.exports=mongoose.model("Course",CourseSchema)
