import userModel from '../models/userModel.js';
import cloudinary from 'cloudinary'
import {getDataUri} from '../utils/feature.js';

export const registerController =  async (req,res) => {
    try{
        const {name,email,password, contactNo} = req.body;
        //validation
        if(!name || !email || !password){
            return res.status(400).send({
                success: false,
                message: 'Please provide all fields'
            })
        }
        //Check Existing User
        const existingUser = await userModel.findOne({email})
        //validation
        if(existingUser){
            return res.status(500).send({
                success: false,
                message: 'Email already exists'                
            })
        }
        const user = await userModel.create({name,email,password,contactNo});
        res.status(201).send({
            success: true,
            message: 'User registered successfully',
            user,
        });
    } catch (error){
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'Error while registering API',
            error }
        );
    }
};


//Login 
export const loginController = async (req, res) => {
    try {
        const {email,password} = req.body;

        //validation
        if(!email || !password){
            return res.status(500).send({
                message: "Please enter your email and password",
                success: false,
            })
        }
        //check user
        const user = await userModel.findOne({email});
        //user validation

        if(!user){
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }
        //check password
        
        const isEqual = await user.passwordCompare(password);
        //validation

        if (!isEqual){
            return res.status(500).send({
                success: false,
                message: 'Incorrect credentials'
            })
        }
        //Token
        const token = user.generateToken();

        //Response with COOKIE settings
        res.status(200).cookie("token",token,{
            secure: process.env.NODE_ENV === 'development' ? true : false,
            httpOnly: process.env.NODE_ENV === 'development' ? true : false,
            sameSite: process.env.NODE_ENV === 'development' ? true : false,
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) //Cookie expiration time - 3 days in milliseconds
        }).send({

            success: true,
            message: 'User logged in successfully',
            token,
            user,
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while logging in API',
            error
        });
    }

}



//Get user Profile Information

export const profileController = async (req,res) => {
    try{

        const user = await userModel.findById(req.user._id);

        res.status(200).send({
            success: true,
            message: 'User profile fetched successfully',
            user

        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while fetching user profile',
            error
        });
    }

}


export const logoutController = async (req, res) => {
    try{
        res.status(200).cookie("token","",{
            secure: true, //process.env.NODE_ENV === 'development' ? true : false,
            httpOnly: process.env.NODE_ENV === 'development' ? true : false,
            sameSite: false, //process.env.NODE_ENV === 'development' ? true : false,
            expires: new Date(Date.now()) 
        }).send({
            success: true,
            message: 'User logged out successfully'
        })

    }catch(error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while logging out API',
            error
        });
    }


}


export const updateProfileController = async (req,res) => {
    try{
        const user = await userModel.findById(req.user._id);
        
        const {name,email,password,contactNo} = req.body
        //validation + Update
        if(name) user.name = name;
        if(email) user.email = email;
        if(contactNo) user.contactNo = contactNo;
        
        //commit update
        await user.save();
        res.status(200).send({
            success: true,
            message: 'User updated successfully',
            user
        })
    }catch (error){
        console.log(error);
        console.log(req.user)
        res.status(500).send({
            success: false,
            message: 'Error while logging out API',
            error
    });
}
}

export const updatePasswordController = async (req, res) => {
    try{
        const user = await userModel.findById(req.user._id);
        const {currentPassword, newPassword} = req.body;
        //validation
        console.log(req.body)
        if(!currentPassword || !newPassword){ 
            return res.status(500).send({
                success: false,
                message: 'Please provide old or new password'
            })}

            //old password check
            const isEqual = await user.passwordCompare(currentPassword)
            //validation
            if(!isEqual){
                return res.status(500).send({
                    success: false,
                    message: 'Incorrect current password'
                })
            }

            user.password = newPassword
            await user.save();
            res.status(200).send({
                success: true,
                message: 'Password updated successfully'
            })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while updating password',
            error
        });

    }

}


export const updateProfilePictureController = async (req, res) => {
    try{
        const user = await userModel.findById(req.user._id);
        //get file from user 
        const file = getDataUri(req.file)
        
        //delete already existing image
        
        //Debug Code
        //console.log(typeof user.profilePicture) 
        //console.log(Object.values(user.profilePicture).length)
        //console.log(user.profilePicture.public_id==null)
        
        if(user.profilePicture.public_id!=null) {await cloudinary.v2.uploader.destroy(user.profilePicture.public_id)}

        //update new image 
        
        const cdb = await cloudinary.v2.uploader.upload(file.content)
        user.profilePicture = {
            public_id: cdb.public_id,
            url: cdb.secure_url
        }
        //save fuction call
        await user.save();

        res.status(200).send({
            success: true,
            message: 'Profile picture updated successfully',
        })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while updating profile picture',
            error
        });

    }
}