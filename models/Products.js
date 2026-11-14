const mongoose=require("mongoose");
const productSchema=new mongoose.Schema(
    {
        name:{type:String,required:true,trim:true},
        sku:{type:String    ,required:true,unique:true},
        category:{type:String,required:true,},
        price:{type:Number,required:true,min:0},
        quantity:{type:Number,required:true,default:0},
        reorderLevel:{type:String,required:true,default:5},
        supplier:{type:String}
    },{
        timestamp:true
    }
);
productSchema.virtual("stockValue").get(function () {
    return this.price * this.quantity;
});

productSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Product", productSchema);