import mongoose, { Schema, Types, model } from "mongoose";
const orderSchema = new Schema({
    userId:{
        type:Types.ObjectId,
        ref:'User',
        required:true,
    },
    products:[{
        productName:{ type:String,},
        productId:{type:Types.ObjectId,ref:'Product',required:true}, 
        quantity:{type:Number,default:1,required:true},
        unitPrice:{type:Number,required:true},
        finalPrice:{type:Number,required:true},
    }],
    
    finalPrice:{
        type:Number,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:String,
        required:true,
    },
    paymentType:{
        type:String,
        enum:['cash','cart'],
        default:'cash',
    },
    couponId:{
        type:Types.ObjectId,
        ref:'Coupon',
    },
    status:{
        type:String,
        default:'pending',
        enum:['pending','cancelled','confirmed','onway','delivered'],
    },
    notes:{
        type:String,
    },
    rejectedReason:{
        type:String,
    },
    updatedBy:{
        type:Types.ObjectId,
        ref:'User',
        required:true,
    }
    
},{
    timestamps:true,
});

const orderModel = model('Order',orderSchema);
export default orderModel;