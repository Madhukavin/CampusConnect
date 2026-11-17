import Event from "../models/Event.js";
import Registration from "../models/Registration.js";
export const stats=async(req,res)=>{try{const [totalEvents,totalRegistrations,upcomingEvents]=await Promise.all([Event.countDocuments(),Registration.countDocuments(),Event.countDocuments({date:{$gte:new Date(new Date().toDateString())}})]);res.json({totalEvents,totalRegistrations,upcomingEvents})}catch{res.status(500).json({message:"Stats unavailable"})}};
