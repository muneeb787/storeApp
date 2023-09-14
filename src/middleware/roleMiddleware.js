
import env from "dotenv";
env.config();

const roleMiddleware=(req,res,next)=>{
    try {
        console.log("role middleware working!")
        next();
    } catch (error) {
        console.log(error);
        
    }
}

export default roleMiddleware;