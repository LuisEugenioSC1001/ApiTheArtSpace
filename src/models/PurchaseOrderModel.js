import mongoose  from "mongoose";
const PurchaseOrderSchema = mongoose.Schema;

const PurchaseOrderModel = new PurchaseOrderSchema({
    
    date:{type:String, required:true},
    products:{type:Array, required:true},
    user:{type:String, required:true},
    active:{type:Boolean, required:true}
    
});
const PurchaseOrder = mongoose.model("purchaseOrder",PurchaseOrderModel);
export default PurchaseOrder;