import express from 'express';
import { loginController, logoutController, profileController, registerController, updatePasswordController, updateProfileController, updateProfilePictureController, downloadProfileController} from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/authMiddleware.js';
import { singleUpload } from '../middlewares/multer.js';

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

//profile update
router.put('/profile-update',isAuthenticated,updateProfileController)

//password update 
router.put('/update-password',isAuthenticated,updatePasswordController)

//update profile picture
router.put('/update-profile-picture', isAuthenticated, singleUpload, updateProfilePictureController)

// Download user profile
router.get('/download-profile', isAuthenticated, downloadProfileController)


export default router
