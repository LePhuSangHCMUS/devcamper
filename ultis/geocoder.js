const NodeGeocoder = require('node-geocoder');
const options = {
  provider:process.env.GEOCODER_PROVIDER,

  // Optional depending on the providers
  apiKey: process.env.GEOCODER_API_KEY, // for Mapquest, OpenCage, Google Premier
  // formatter: null, // 'gpx', 'string', ...
  httpAdapter:"https"
};
// console.log(process.env.GEOCODER_PROVIDER,process.env.GEOCODER_API_KEY,process.env.PORT);

const geocoder = NodeGeocoder(options);
//  geocoder.geocode('29 champs elysée paris').then(data=>{
//   console.log(data);

//  }).catch(err=>{
//   console.log(err);
  
//  });

module.exports=geocoder;
