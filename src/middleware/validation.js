export const validation= (schema)=>{

    return (req,res,next)=>{
        const errorsMessage=[];
        let filterData ={...req.body,...req.params,...req.query};
        if(req.file){
            filterData.image = req.file;
        }
        const {error} = schema.validate(filterData,{abortEarly:false});
        if(error){
            error.details.forEach(err => {
                const key = err.context.key;
            errorsMessage.push({[key]:err.message});
            });
           return res.status(400).json({message:"validation error",errors:errorsMessage});
        }
        next();
    }

   
}