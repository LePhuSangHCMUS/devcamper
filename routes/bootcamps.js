var express = require('express')
var router = express.Router()




router.get("bootcamps", function (req, res,next) {
    res.status(200).json({
      success: true,
      msg: "Get all bootcamp",
    });
  });
  router.get("/bootcamps/:id", function (req, res,next) {
      res.status(200).json({
        success: true,
        msg:  `Get bootcamp ${req.params.id}`,
      });
  });
  router.post("/bootcamps", function (req, res,next) {
      res.status(200).json({
        success: true,
        msg: "Create new bootcamp",
      });
  });
  
  router.put("/bootcamps/:id", function (req, res,next) {
      res.status(200).json({
        success: true,
        msg: `Update bootcamp ${req.params.id}`,
      });
  });
  
  router.put("/bootcamps/:id", function (req, res,next) {
      res.status(200).json({
        success: true,
        msg: `Delete bootcamp ${req.params.id}`,
      });
  });
  router.all('*', function (req, res,next) {
      res.status(404).json({
        success: true,
        msg: `Not Found API`,
      });
  })
  
  module.exports=router