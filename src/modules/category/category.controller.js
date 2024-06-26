import categoryModel from "../../../DB/model/category.model.js";
import cloudinary from "../../ults/cloudinary.js";
import slugify from 'slugify';

export const create =async(req,res)=>{
    req.body.name = req.body.name.toLowerCase();
    
   
    if(await categoryModel.findOne({name:req.body.name})){
        return res.status(409).json({message:"category already exists"});
    }
    req.body.slug =slugify(req.body.name);
        const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{
            folder:'final_eco/categories',
        });
       
        req.body.image ={secure_url,public_id}
    const category = await categoryModel.create(req.body);

    return res.json({message:category});
};
export const getAll = (req, res)=>{
    return res.json({message:"success"});
}

