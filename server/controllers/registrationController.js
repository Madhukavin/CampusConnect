import Event from "../models/Event.js";
import Registration from "../models/Registration.js";
import {validateRegistration} from "../services/javaService.js";

const required=["studentName","registerNumber","department","email","eventId"];

export const create=async(req,res)=>{
  let reservedEvent;
  try{
    const {studentName,registerNumber,department,email,eventId}=req.body;
    if(required.some(field=>!req.body[field]||!String(req.body[field]).trim()))return res.status(400).json({message:"All registration fields are required"});
    const event=await Event.findById(eventId);
    if(!event)return res.status(404).json({message:"Event not found"});
    const duplicate=await Registration.exists({eventId,registerNumber:registerNumber.trim().toUpperCase()});
    const decision=await validateRegistration({studentName,registerNumber,department,email,event:{id:String(event._id),title:event.title,category:event.category,date:event.date,capacity:event.capacity},currentRegistrations:event.registeredCount||0,alreadyRegistered:Boolean(duplicate)});
    if(!decision.allowed)return res.status(400).json({message:decision.message});

    // Reserve one seat before saving. $expr keeps the count below capacity atomically.
    reservedEvent=await Event.findOneAndUpdate({_id:eventId,$expr:{$lt:[{$ifNull:["$registeredCount",0]},"$capacity"]}},{$inc:{registeredCount:1}},{new:true});
    if(!reservedEvent)return res.status(409).json({message:"This event is full"});
    const row=await Registration.create({studentName,registerNumber,department,email,eventId});
    res.status(201).json({message:decision.message,registration:row});
  }catch(e){
    // Undo the reservation if MongoDB rejects the registration (including a duplicate race).
    if(reservedEvent)await Event.findByIdAndUpdate(reservedEvent._id,{$inc:{registeredCount:-1}}).catch(()=>{});
    if(e.code===11000)return res.status(409).json({message:"Already registered for this event"});
    res.status(e.status||400).json({message:e.message||"Registration failed"});
  }
};

export const all=async(req,res)=>{try{res.json(await Registration.find().populate("eventId","title date").sort({createdAt:-1}))}catch{res.status(500).json({message:"Could not fetch registrations"})}};
