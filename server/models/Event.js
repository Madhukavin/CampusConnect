import mongoose from "mongoose";

const schema=new mongoose.Schema({
  title:{type:String,required:true,trim:true,minlength:3,maxlength:100},
  category:{type:String,required:true,trim:true,enum:["Technical","Cultural","Sports","Workshop","Other"]},
  description:{type:String,required:true,trim:true,maxlength:1000},
  date:{type:Date,required:true},
  time:{type:String,required:true,trim:true},
  venue:{type:String,required:true,trim:true,maxlength:100},
  capacity:{type:Number,required:true,min:1,max:10000},
  // This counter is changed atomically when a registration is approved.
  // It prevents two simultaneous requests from taking the last seat.
  registeredCount:{type:Number,default:0,min:0}
},{timestamps:true});

export default mongoose.model("Event",schema);
