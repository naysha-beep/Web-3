const Product = require("../models/Products");
//CREATE product
exports.createProduct=async(req,res)=>{
        try{
            const product=await Product.create(req.body);
            res.status(201).json(product);
        }catch(error){
            res.status(400).json({error:error.message});
        }
};
//GET ALL
exports.getProducts=async (req,res)=>{
        try{
            let queryObj={};
            if(req.query.category){
                queryObj.category=req.query.category;

            }
            
            let query=Product.find(queryObj);
            if(req.query.sort){
                query=query.sort(req.query.sort);
            }
            const page=Number(req.query.page) || 1;
            const limit=Number(req.query.limit) ||5;
            const skip=(page-1)*limit;
            query.skip(skip).limit(limit);
            const products=await query;
            res.json({
                page,count:page.length,products
            });
        }            catch(error){res.status(500).json({error:error.message});}

};
//GET BY ID
exports.getProductById=async (req,res)=>{
    try{
        const Product=await product.findById(req.params.id);
        if(!product){
            return res.status(404).json({message:"Product not found"});
        }res.json(product);
    }catch(error){
        res.status(500).json({error:error.message});
    }
};
//UPDATE
exports.updateProduct=async (req,res)=>{
    try{
        const product=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
        res.json(product);
        
    }catch(error){
        res.status(400).json({error:error.message});
    }
};
//DELETE
exports.deleteProduct=async (req,res)=>{
    try{
        const product=await Product.findByIdAndDelete(req.params.id);
        res.json({
            message:"Product deleted",
            id:req.params.id
        });
    }catch(error){
        res.status(500).json({error:error.message});
    }
};
//Stock adjustment
exports.adjustStock=async(req,res)=>{
    try{
        const {change}=req.body;
        const product=await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({
                message: "Product not found"
            });
        }
        product.quantity+=change;
        await product.save();
        res.json({message:"Stock updated",product});
    }catch(error){
        res.status(500).json({error:error.message});
    }
};
exports.lowStockProducts= async (req,res)=>{
    try{
        const products=await Product.find({
            $expr:{
                $lte:["$quantity","$reorderLevel"]
            }
        });
        res.json({
            count:product.length,lowStockItems:products
        });

    }catch{error}{
        res.status(500).json({error:error.message});
    }
};
//summary of category
exports.categorySummary= async (req,res)=>{
    try{
        const summary=await Product.aggregate([
            {
                $group: {
                    _id: "$category",
                    totalItems: { $sum: 1 },
                    totalQuantity: { $sum: "$quantity" },
                    totalStockValue: {
                        $sum: {
                            $multiply: ["$price", "$quantity"]
                        }
                    },
                    avgPrice: {
                        $avg: "$price"
                    }
                }
            }
        ]);
        res.json({
            categories:summary.length,summary
        });
    }catch(error){
        res.status(500).json({error:error.message});
    }
};
