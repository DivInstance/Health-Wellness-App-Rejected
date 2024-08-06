import userModel from '../models/userModel.js';

export const registerController =  async (req,res) => {
    try{
        const {name,email,password} = req.body;
        //validation
        if(!name || !email || !password){
            return res.status(400).send({
                success: false,
                message: 'Please provide all fields'
            })
        }
        const user = await userModel.create({name,email,password});
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