import express from 'express';
import { loginController, logoutController, profileController, registerController } from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';

//router object
const router = express.Router()


//routes
//register
router.post('/register',registerController)

//login
router.post('/login',loginController)

//profile
router.get('/profile',isAuthenticated,profileController)

//logout
router.get('/logout',logoutController)


//export 
export default router