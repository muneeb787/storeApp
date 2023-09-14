import EHttpStatusCode from "../enums/HttpStatusCode.js";

const authController=()=>{

    // Registering User Api
    register:(req,res)=>{
        try {
            
        } catch (error) {
            console.log(error)
            return res
            .status(EHttpStatusCode.INTERNAL_SERVER)
            .json({ message: "Internal Server Error!" });
        }
    }
}

export default  authController;