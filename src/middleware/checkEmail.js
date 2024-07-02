import userModel from "../../DB/model/user.model.js";

export const checkEmail = async(req,res,next)=>{
    const {email} = req.body;
    const user = await userModel.findOne({email});
    if(user){
        return res.status(409).json({message:"email already exists"});
    }
    next();
}