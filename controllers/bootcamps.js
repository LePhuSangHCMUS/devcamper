//@Desc    : Get all bootcamps
//@Route   : GET /api/v1/bootcamps
//@Access  : Public
exports.getBootcamps=  (req, res,next)=> {
    res.status(200).json({
      success: true,
      msg: "Get all bootcamp",
    });
}
//@Desc    : Get single bootcamp
//@Route   : GET /api/v1/bootcamps/:id
//@Access  : Private
exports.getBootcamp=  function (req, res,next) {
    res.status(200).json({
      success: true,
      msg:  `Get bootcamp ${req.params.id}`,
    });
}
//@Desc    : Create new bootcamp
//@Route   : POST /api/v1/bootcamps/:id
//@Access  : Private
exports.createBootcamp=    (req, res,next)=> {
  res.status(200).json({
    success: true,
    msg: "Create new bootcamp",
  });
}
//@Desc    : Update  bootcamp
//@Route   : PUT /api/v1/bootcamps/:id
//@Access  : Private
exports.updateBootcamp=  (req, res,next)=> {
  res.status(200).json({
    success: true,
    msg: `Update bootcamp ${req.params.id}`,
  });
}
//@Desc    : Delete bootcamp
//@Route   : DELETE /api/v1/bootcamps/:id
//@Access  : Private
exports.deleteBootcamp=  (req, res,next)=> {
  res.status(200).json({
    success: true,
    msg: `Delete bootcamp ${req.params.id}`,
  });
}
exports.errorBootcamps= (req, res,next) =>{
  res.status(404).json({
    success: true,
    msg: `Not Found API`,
  });
}
module.exports;