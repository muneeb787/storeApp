import EHttpStatusCode from "../enums/HttpStatusCode.js";
import roles from "../enums/Roles.js";
import env from "dotenv";
env.config();

const roleMiddleware=(req,res,next)=>{
    try {
        const { role } = req.user;
        console.log(`logged User Role: ${role}`);
        if(role != roles.Admin){
            res
            .status(EHttpStatusCode.FORBIDDEN)
            .json({ message: "Access Forbidden!" });
        }
        else{
            res
            .status(EHttpStatusCode.SUCCESS)
            .json({ message: "Access Successful!" });
        }
        next();
    } catch (error) {
        console.log(error); 
        res
        .status(EHttpStatusCode.INTERNAL_SERVER)
        .json({ message: "Internal Server Error!" });
    }
}

export default roleMiddleware;