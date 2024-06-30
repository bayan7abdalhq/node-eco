import cartModel from "../../../DB/model/cart.model.js";

export const create =async(req,res)=>{

    const {productId} =req.body;

    const cart = await cartModel.findOne({userId:req.user._id});
    if(!cart){
        const newCart =await cartModel.create({
            userId:req.user._id,
            products:{productId}
        });
        return res.json({message:"success",cart:newCart})
    }

    for(let i=0;i<cart.products.length;i++){
        if(cart.products[i].productId == productId){
            return res.json({message:"product already exists"});
        }
    }
    cart.products.push({productId:productId});
    await cart.save();

    return res.json({message:"success",cart});
}