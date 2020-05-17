const fs =require("fs");

var colors = require('colors');

const connectDB=require("../config/db");
//Start connect to database 
connectDB();
//Require Model
//1.
const Bootcamp= require("../models/Bootcamp");


//Read JSON Files
const bootcamps=JSON.parse(fs.readFileSync("../mockData/bootcamps.json","utf-8"));
console.log(bootcamps);
//Import into DB;
const importData=async()=>{
    try{
        await Bootcamp.create(bootcamps);
        console.log('Data Imported ...'.green.inverse);
        process.exit();
    }catch(err){
        console.log(err);
    }
} 
//Delete data
const deleteData=async ()=>{
    try{
        await Bootcamp.deleteMany();
        console.log('Data Deleted ...'.red.inverse);
        process.exit();
    }catch(err){
         console.log(err);
         
    }
}

importData();
// deleteData()
