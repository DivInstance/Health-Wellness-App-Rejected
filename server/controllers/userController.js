import userModel from '../models/userModel.js';

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
            return res.status(401).send({
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
        const token = await user.generateToken();

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

        res.status(200).send({
            success: true,
            message: 'User profile fetched successfully',

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
            secure: process.env.NODE_ENV === 'development' ? true : false,
            httpOnly: process.env.NODE_ENV === 'development' ? true : false,
            sameSite: process.env.NODE_ENV === 'development' ? true : false,
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) //Cookie expiration time - 3 days in milliseconds
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