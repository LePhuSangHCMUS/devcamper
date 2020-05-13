var express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
console.log(process.env.NODE_ENV);

var app = express();
app.get("/api/v1/bootcamps", function (req, res) {
  res.status(200).json({
    success: true,
    msg: "Get all bootcamp",
  });
});
app.get("/api/v1/bootcamps/:id", function (req, res) {
    res.status(200).json({
      success: true,
      msg:  `Get bootcamp ${req.params.id}`,
    });
});
app.post("/api/v1/bootcamps", function (req, res) {
    res.status(200).json({
      success: true,
      msg: "Create new bootcamp",
    });
});

app.put("/api/v1/bootcamps/:id", function (req, res) {
    res.status(200).json({
      success: true,
      msg: `Update bootcamp ${req.params.id}`,
    });
});

app.put("/api/v1/bootcamps/:id", function (req, res) {
    res.status(200).json({
      success: true,
      msg: `Delete bootcamp ${req.params.id}`,
    });
});
app.all('*', function (req, res) {
    res.status(404).json({
      success: true,
      msg: `Not Found API`,
    });
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server is running port ${PORT} `));
