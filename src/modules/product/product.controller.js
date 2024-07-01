import slugify from "slugify";
import categoryModel from "../../../DB/model/category.model.js";
import productModel from "../../../DB/model/product.model.js"
import subcategoryModel from "../../../DB/model/subcategory.model.js";
import cloudinary from "../../utls/cloudinary.js";


export const create = async(req,res)=>{
   const {name,price,discount,categoryId,subcategoryId} =req.body;
   const checkCategory = await categoryModel.findById(categoryId);
   if(!checkCategory){
     return res.status(404).json({message:"Category not found"});
   } 
   const checkSubCategory = await subcategoryModel.findOne({_id:subcategoryId,categoryId:categoryId});
   if(!checkSubCategory){
     return res.status(404).json({message:" Sub Category not found"});
   } 

   req.body.slug =slugify(name);
   req.body.finalPrice = price -((price * (discount || 0)) /100);

   const {secure_url,public_id} =await cloudinary.uploader.upload(req.files.mainImage[0].path,
    {folder:`${process.env.APPNAME}/product/${name}`});
    req.body.mainImage = {secure_url,public_id};
    req.body.subImages =[];
    for (const file  of req.files.subImages){
        const {secure_url,public_id} =await cloudinary.uploader.upload(file.path,
            {folder:`${process.env.APPNAME}/product/${name}/subImages`});
            req.body.subImages.push({secure_url,public_id});
    }

    const product = await productModel.create(req.body);
   return res.status(201).json({message:"success",product});
}

export const getProducts = async (req, res) => {
    const products = await productModel.find({}).populate({
      path: 'reviews',
      populate:{
        path:'userId',
        select:'userName -_id',
      },
    });

    return res.status(200).json({message:"success",products});
};

