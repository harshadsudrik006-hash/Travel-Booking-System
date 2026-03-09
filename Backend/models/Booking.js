const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({

  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },

  package:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Package",
    required:true
  },

  persons:{
    type:Number,
    default:1
  },

  travelDate:{
    type:Date,
    required:true
  },

  totalPrice:{
    type:Number
  },

  status:{
    type:String,
    enum:["Pending","Approved","Rejected"],
    default:"Pending"
  }

},{timestamps:true});

module.exports = mongoose.model("Booking",bookingSchema);