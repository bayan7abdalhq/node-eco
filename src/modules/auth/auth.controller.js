import userModel from './../../../DB/model/user.model.js';
import bcrypt from 'bcryptjs';
import jwt  from 'jsonwebtoken';
import SendEmail from '../../utls/email.js';
import { customAlphabet, nanoid } from 'nanoid';

export const register =async(req,res)=>{

    const {userName,email,password} = req.body;

    const user = await userModel.findOne({email});
    if(user){
        return res.status(409).json({message:"email already exists"});
    }

   const hashedPassword =  bcrypt.hashSync(password, parseInt(process.env.SALTROUND));
   const createUser = await userModel.create({userName,email,password:hashedPassword});

   await SendEmail(email,`welcome`,`<h2> hello ya ${userName}</h2>`);
   return res.status(201).json({message:"success",user:createUser});
}

export const login =async(req,res)=>{
    const {email,password} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(400).json({message:"invalid data"});
    }
    if(!user.confirmEmail){
        return res.status(400).json({message:"please confirm your email"});
    }

    const match = await bcrypt.compare(password,user.password);
    if(user.status == "NotActive"){
        return res.status(400).json({message:"your account is blocked"});
    }
    if(!match){
        return res.status(400).json({message:"invalid data"});
    }
    const token = jwt.sign({id:user._id,role:user.role},process.env.LOGINSIG);
    return res.status(200).json({message:"success",token});

}
export const sendCode=async(req,res)=>{
    const {email} = req.body;
    const code = customAlphabet('1234567890abcdef', 4)();
    const user =await userModel.findOneAndUpdate({email},{sendCode:code},{new:true});
    if(!user){
        return res.status(404).json({message:"user not found"});
    }
    await SendEmail(email,`reset password`,`<h2>code is :${code}</h2>`);
    return res.status(200).json({message:"success"});
}

export const forgetPassword = async(req,res)=>{
    const {email,password,code}=req.body;
    const user =await userModel.findOne({email});
    if(!user){
        return res.status(404).json({message:"email not found"});
    }
    if(user.sendCode != code){
        return res.status(400).json({message:" invalid code"});
    }
    user.password =await bcrypt.hash(password,parseInt(process.env.SALTROUND));
    user.sendCode=null;
    await user.save();
    return res.status(200).json({message:"success"});

}