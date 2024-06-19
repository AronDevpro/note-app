import express from 'express';
import {getAllUsers, loginUser, saveUser} from "../controllers/UserController.js";


//creating a router
const router = express.Router();

//api to get all the data
router.get('/', getAllUsers);

//api to register user
router.post('/register',saveUser);

//api to login user
router.post('/login',loginUser)

export default router;