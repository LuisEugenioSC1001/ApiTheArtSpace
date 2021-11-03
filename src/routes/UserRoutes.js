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
userRoutes.get('/users',async (req, res)=>{
    let response = await userController.getUsers();
    res.json(response);
})
userRoutes.post('/edituser',async (req, res)=>{
    let response = await userController.editUser(req.body);
    res.json(response);
})
userRoutes.post('/deleteuser',async (req, res)=>{
    let response = await userController.deleteUser(req.body);
    res.json(response);
})

export default userRoutes;
