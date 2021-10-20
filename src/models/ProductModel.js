import mongoose  from "mongoose";
const ProductSchema = mongoose.Schema;

const ProductModel = new ProductSchema({
    
    name:{type:String, required:true},
    price:{type:Number, required:true},
    stock: {type:Number, required:true},
    category:{type:String, required:true},
    nameShop:{type:String, required:true}, 
    description:{type:String, required:true},
    active:{type:Boolean, required:true}, 
    
});
const Product = mongoose.model("product",ProductModel);
export default Product;