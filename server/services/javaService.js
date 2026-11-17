import axios from "axios";
const java=axios.create({baseURL:process.env.JAVA_API_URL||"http://localhost:8080",timeout:5000});

export async function validateRegistration(payload){
  try{return (await java.post("/api/java/registrations/validate",payload)).data}
  catch(err){
    const error=new Error(err.response?.data?.message||"Java service is unavailable. Start the Spring Boot application on port 8080.");
    error.status=err.response?.status||503;
    throw error;
  }
}
