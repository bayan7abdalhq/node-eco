import mongoose from "mongoose";    
const connectDB = async()=>{
    mongoose.connect(process.env.DB)
    .then(()=>{
        console.log("connect DB")
    }).catch((err)=>{
        console.log(`error to connect db ${err}`)
    });
}
export default connectDB;