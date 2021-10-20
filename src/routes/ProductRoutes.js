import express from 'express';
import productController from '../controllers/ProductController.js'
const productRoutes = express.Router();

productRoutes.post('/productRegister',async (req, res)=>{
    let response = await productController.registerProduct(req.body);
    res.json(response);
})

productRoutes.get('/products',async (req, res)=>{
    let response = await productController.findProducts(req.body);
    res.json(response);
})

productRoutes.get('/getNameshopProducts',async (req, res)=>{
    let response = await productController.findSelectProducts(req.body);
    res.json(response);
})

productRoutes.patch('/updateProduct', async (req,res)=>{

  let response= await productController.update(req.body);
  res.json(response); 

})

productRoutes.patch('/deleteProduct', async (req,res)=>{

    let response= await productController.deleteProduct(req.body);
    res.json(response); 
  
  })


export default productRoutes;