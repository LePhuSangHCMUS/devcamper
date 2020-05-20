const mongoose = require("mongoose");
//Generator slug to name

const slugify = require("slugify");
//Geocoder
const geocoder = require("../ultis/geocoder");

var Schema = mongoose.Schema;
const PointSchema = new Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
    index: "2dsphere",
  },
  formattedAddress: String,
  street: String,
  city: String,
  state: String,
  zipcode: String,
  country: String,
});

const opts = { toJSON: { virtuals: true }, toObject: { virtuals: true } };

const BootcampSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      unique: true,
      trim: true,
      lowercase: true,
      maxLength: [50, "Name can not be more than 50 character"],
    },
    slug: String,
    description: {
      type: String,
      required: [true, "Please add a description"],
      trim: true,
      maxLength: [500, "Description can not be more than 50 character"],
    },
    website: {
      type: String,
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        "Please use a valid URL with HTTP or HTTPS",
      ],
    },
    email: {
      type: String,
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please add a valid email",
      ],
    },
    address: {
      type: String,
      required: [true, "Please add an address"],
    },
    location: {
      type: PointSchema,
      require: true,
    },
    careers: {
      //Array of strings
      type: [String],
      required: true,
      enum: [
        "Web Development",
        "Mobile Development",
        "UI/UX",
        "Data Science",
        "Business",
        "Other",
      ],
    },
    averageRating: {
      type: Number,
      min: [1, "Rating must be at least 1"],
      max: [10, "Rating must not be more than 10"],
    },
    averageCost: Number,
    photo: {
      type: String,
      default: "no-photo.jpg",
    },
    housing: {
      type: Boolean,
      default: false,
    },
    jobAssistance: {
      type: Boolean,
      default: false,
    },
    jobGuarantee: {
      type: Boolean,
      default: false,
    },
    acceptGi: {
      type: Boolean,
      default: false,
    },
    createAt: {
      type: Date,
      default: Date.now(),
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    }
  },
  opts
);
//create  slug field
BootcampSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
//Geocoder & create  location field
BootcampSchema.pre("save", async function (next) {
  const location = await geocoder.geocode(this.address);
  this.location = {
    type: "Point",
    coordinates: [location[0].longitude, location[0].latitude],
    formattedAddress: location[0].streetName,
    city: location[0].city,
    state: location[0].stateCode,
    zipcode: location[0].zipcode,
    country: location[0].countryCode,
  };
  //Do not save address in DB
  this.address = undefined; //====location =null
  next();
});

BootcampSchema.pre("remove", async function (next) {
    console.log(`Coures being removed from bootcamp ${this._id}`);
    
   await this.model('Course').deleteMany({bootcampId:this._id});
   next();
  });
  
// Create a virtual property `courses`
BootcampSchema.virtual("courses", {
  ref: "Course",
  localField: "_id",
  foreignField: "bootcampId",
  jusOne:false
});

module.exports = mongoose.model("Bootcamp", BootcampSchema);
