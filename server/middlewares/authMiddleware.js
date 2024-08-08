import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const isAuthenticated = async (req,res,next) => {
    //descrtucture token from cookie
    const {token} = req.cookies;
    
    //validation
    if(!token) {
        return res.status(401).send({
            success: false,
            message: 'Unauthorized user access'
        })
    }

    const decodeData = JWT.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decodeData._id);
    next();
}