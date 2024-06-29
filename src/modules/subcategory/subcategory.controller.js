import categoryModel from "../../../DB/model/category.model.js";
import subcategoryModel from "../../../DB/model/subcategory.model.js";
import cloudinary from "../../utls/cloudinary.js";
import slugify from 'slugify';

export const create =async(req,res)=>{
    const {categoryId} = req.body;

    const category = await categoryModel.findById(categoryId);
    if(!category){
        return res.status(404).json({message:"Category not found"});
    }
    req.body.name = req.body.name.toLowerCase();
    
    if(await categoryModel.findOne({name:req.body.name})){
        return res.status(409).json({message:"category already exists"});
    }
    req.body.slug =slugify(req.body.name);
    
        const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{
            folder:`${process.env.APPNAME}/subcategories`,
        });
        req.body.image ={secure_url,public_id};
        req.body.createdBy =req.user._id;
        req.body.updatedBy =req.user._id;

    const subcategory = await subcategoryModel.create(req.body);

    return res.json({message:"success",subcategory});
};

export const getAll =async(req,res)=>{
    const {id} =req.params;
  
    const subcategories = await subcategoryModel.find({categoryId:id});
    return res.status(200).json({message:"success",subcategories});
};

export const getActive =async(req,res)=>{
    const categories = await categoryModel.find({status:'Active'}).select("name");
    return res.status(200).json({message:"success",categories});
};

export const getDetails =async(req,res)=>{
    const category = await categoryModel.findById(req.params.id);
    return res.status(200).json({message:"success",category})
};
export const update = async(req,res)=>{

    const category = await categoryModel.findById(req.params.id);
    if(!category){
        return res.status(404).json({message:"category not found"});
    }

    category.name = req.body.name.toLowerCase();
    if(await categoryModel.findOne({name:req.body.name,_id:{$ne:req.params.id}})){
        return res.status(409).json({message:"name already exists"});
    }
    category.slug =slugify(req.body.name);
    if(req.file){
         const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{
            folder:`${process.env.APPNAME}/subcategories`,
        });
        cloudinary.uploader.destroy(category.image.public_id);
        category.image ={secure_url,public_id};
        }

        category.status =req.body.status;

        category.updatedBy = req.user._id;
        await category.save();
    return res.json({message:"success",category});
};
export const destroy = async(req,res)=>{
    const category = await categoryModel.findByIdAndDelete(req.params.id);
    if(!category){
        return res.status(404).json({message:"category not found"});
    }
     await cloudinary.uploader.destroy(category.image.public_id);
    return res.status(200).json({message:"success",category});
}