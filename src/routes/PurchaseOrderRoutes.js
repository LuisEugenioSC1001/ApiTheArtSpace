import express from "express";
import PurchaseOrderController from '../controllers/PurchaseOrderController.js'
const productOrderRoutes = express.Router();

productOrderRoutes.post('/neworder',async (req, res)=>{
    let response = await PurchaseOrderController.newOrder(req.body);
    res.json(response);
})

productOrderRoutes.post('/updateorder',async (req, res)=>{
    let response = await PurchaseOrderController.updateOrder(req.body);
    res.json(response);
})
productOrderRoutes.post('/neworder',async (req, res)=>{
    let response = await PurchaseOrderController.cancelledOrder(req.body);
    res.json(response);
})

export default productOrderRoutes;
