import mongoose, { Schema, Types, model } from "mongoose";
const couponSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    userBy:[{
        userId:{
            type:Types.ObjectId,
            ref:'User',
            required:true
        }, 
    
    }],
    expireDate:{
        type:Date,
        required:true,
    },
    // createdBy:{
    //     type:Types.ObjectId,
    //     ref:'User',
    //     required:true,
    // }

},{
    timestamps:true,
});

const couponModel = model('Coupon',couponSchema);
export default couponModel;