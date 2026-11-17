import Event from "../models/Event.js";
import Registration from "../models/Registration.js";

export const list=async(req,res)=>{try{res.json(await Event.find().sort({date:1}))}catch{res.status(500).json({message:"Could not fetch events"})}};
export const one=async(req,res)=>{try{const e=await Event.findById(req.params.id);if(!e)return res.status(404).json({message:"Event not found"});res.json(e)}catch{res.status(400).json({message:"Invalid event ID"})}};
export const create=async(req,res)=>{try{res.status(201).json(await Event.create(req.body))}catch(e){res.status(400).json({message:e.message})}};
export const update=async(req,res)=>{try{
  const current=await Event.findById(req.params.id);
  if(!current)return res.status(404).json({message:"Event not found"});
  if(req.body.capacity!==undefined&&Number(req.body.capacity)<current.registeredCount)return res.status(400).json({message:`Capacity cannot be lower than the ${current.registeredCount} existing registrations`});
  const e=await Event.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
  res.json(e);
}catch(e){res.status(400).json({message:e.message})}};
export const remove=async(req,res)=>{try{const e=await Event.findByIdAndDelete(req.params.id);if(!e)return res.status(404).json({message:"Event not found"});await Registration.deleteMany({eventId:e._id});res.json({message:"Event deleted"})}catch{res.status(400).json({message:"Delete failed"})}};
