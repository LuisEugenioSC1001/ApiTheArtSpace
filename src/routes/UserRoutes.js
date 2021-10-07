import express from 'express';
import userController from '../controllers/UserController.js';
const userRoutes = express.Router();

userRoutes.post('/login',async (req, res)=>{
    let response = await userController.login(req.body);
    res.json(response);
})
userRoutes.post('/register',async (req, res)=>{
    let response = await userController.register(req.body);
    res.json(response);
})

export default userRoutes;