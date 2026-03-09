const mongoose = require("mongoose");

const packageSchema = mongoose.Schema(
{
title:{
type:String,
required:true
},

destination:{
type:String,
required:true
},

description:{
type:String
},

price:{
type:Number,
required:true
},

availableSeats:{
type:Number,
default:10
},

image:{
type:String
},

category:{
type:String,
enum:["Beach","Hill","Adventure","City"],
default:"Beach"
},

rating:{
type:Number,
default:4,
min:1,
max:5
},

duration:{
type:String
},

startDate:{
type:Date
},

endDate:{
type:Date
},

itinerary:[
{
day:Number,
title:String,
description:String
}
],

createdBy:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
}



},
{timestamps:true}
);

module.exports = mongoose.model("Package",packageSchema);