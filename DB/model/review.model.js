import { Schema, Types, model } from "mongoose";
const reviewSchema = new Schema({
    comment:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
        min:1,
        max:5,
    },
    productId:{
        type:Types.ObjectId,
        ref:'Product',
        required:true,
    },
    userId:{
        type:Types.ObjectId,
        ref:'User',
        required:true,
    },
    image:{
        type:Object,
    },
},);

const reviewModel = model('Review',reviewSchema);
export default reviewModel;