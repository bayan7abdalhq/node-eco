import cartModel from "../../../DB/model/cart.model.js"
import couponModel from "../../../DB/model/coupon.model.js";
import orderModel from "../../../DB/model/order.model.js";
import productModel from "../../../DB/model/product.model.js";
import userModel from "../../../DB/model/user.model.js";

export const create =async(req,res)=>{
    const {couponName} =req.body;
    const cart = await cartModel.findOne({userId:req.user._id});
    if(!cart || cart.products.length === 0){
        return res.status(400).json({message:"cart is empty"});
    }
    req.body.products = cart.products;
    if(couponName){
        const coupon = await couponModel.findOne({name:couponName});
        if(!coupon){
            return res.status(400).json({message:"coupon not found"});
        }
    
    if(coupon.expireDate <new Date()){
        return res.status(400).json({message:"coupon expired"});
    }
    if(coupon.usedBy.includes(req.user._id)){
        return res.status(400).json({message:"coupon already used"});
    }
    req.body.coupon =coupon;
    }
    let finalProductList =[];
    let subTotal = 0;
    for(let product of req.body.products){
        const checkProduct = await productModel.findOne({
        
            _id:product.productId,
            stock:{$gte:product.quantity}
        });
        if(!checkProduct){
            return res.status(400).json({message:"product quantity not available"});
        }
        product =product.toObject();
        product.name = checkProduct.name;
        product.unitPrice = checkProduct.price;
        product.discount = checkProduct.discount;
        product.finalPrice =product.quantity * checkProduct.finalPrice;
        subTotal+=product.finalPrice;

        finalProductList.push(product);
    }
    const user = await userModel.findById(req.user._id);
    if(!req.body.address){
        req.body.address = user.address;
    }
    if(!req.body.phone){
        req.body.phone = user.phone;
    }

    const order = await orderModel.create({
        userId:req.user._id,
        products:finalProductList,
        finalPrice:subTotal - (subTotal *( (req.body.coupon?.amount||0) )/100),
        address:req.body.address,
        phoneNumber:req.body.phone,
        updatedBy:req.user._id

    });
    if(order){
        for(const product of req.body.products){
            await productModel.findOneAndUpdate({_id:product.productId},
           {
            $inc:{
                stock:-product.quantity,
            }
           }
        )
        }
        if(req.body.coupon){
            await couponModel.updateOne({_id:req.body.coupon._id},{
                $addToSet:{
                    usedBy:req.user._id
                }
            })
        }
        await cartModel.updateOne({userId:req.user._id},{
            products:[],
        })

    }
   return res.json({message:"success",order});
}