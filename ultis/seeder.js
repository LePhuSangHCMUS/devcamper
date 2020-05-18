const fs =require("fs");

var colors = require('colors');

const connectDB=require("../config/db");
//Start connect to database 
connectDB();
//Require Model
const Bootcamp= require("../models/Bootcamp");
const Course= require("../models/Course");


//Read JSON Files
const bootcamps=JSON.parse(fs.readFileSync("../mockData/bootcamps.json","utf-8"));
const courses=JSON.parse(fs.readFileSync("../mockData/courses.json","utf-8"));
// console.log(bootcamps);
console.log(courses);
//Import into DB;
const importData=async(type)=>{
    try{
        switch(type){
             case "-bootcamps" :{
                await Bootcamp.create(bootcamps);
                break;          
             }
             case "-courses" :{
                await Course.create(courses);
                break;          
             }
        }
        console.log(`Data ${type} Imported ...`.green.inverse);
        process.exit();
    }catch(err){
        console.log(err);
    }
} 
//Delete data
const deleteData=async (type)=>{
    try{

        switch(type){
            case "-bootcamps" :{
                await Bootcamp.deleteMany();
                break;          
            }
            case "-courses" :{
                await Course.deleteMany();
                break;          
            }
       }
        console.log(`Data ${type} Deleted ...`.red.inverse);
        process.exit();
    }catch(err){
         console.log(err);
         
    }
}

// deleteData()
if(process.argv[3]==='-d'){
    deleteData(process.argv[2]);
}
else if(process.argv[3]==='-i'){
    importData(process.argv[2]);  
}

//===========NOTE==============
//cmd : node sedder -dataName -typeSeeder