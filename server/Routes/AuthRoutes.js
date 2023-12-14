import express from 'express';
import { loginUserController, registerUserController } from '../Controller/AuthController.js';


const AuthRoutes = express.Router();

AuthRoutes.post('/register', registerUserController)
AuthRoutes.post('/login', loginUserController)



export default AuthRoutes;