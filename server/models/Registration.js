import mongoose from "mongoose";

const schema=new mongoose.Schema({
  studentName:{type:String,required:true,trim:true,maxlength:100},
  registerNumber:{type:String,required:true,trim:true,uppercase:true,maxlength:50},
  department:{type:String,required:true,trim:true,maxlength:100},
  email:{type:String,required:true,trim:true,lowercase:true,match:/.+@.+\..+/},
  eventId:{type:mongoose.Schema.Types.ObjectId,ref:"Event",required:true}
},{timestamps:true});

schema.index({eventId:1,registerNumber:1},{unique:true});
export default mongoose.model("Registration",schema);
