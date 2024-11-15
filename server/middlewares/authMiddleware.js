import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//User Authentication
export const isAuthenticated = async (req,res,next) => {
    //descrtucture token from cookie
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

     // Extract token
  const token = authHeader.split(" ")[1]; // Get the token after 'Bearer'
  console.log("hi");
  // console.log(req)

  //validation
  if (!token) {
    return res.status(401).send({
      success: false,
      message: "Unauthorized user access",
    });
  }

    const decodeData = JWT.verify(token, process.env.JWT_SECRET);
     // console.log(decodeData)

     req.user = await userModel.findById(decodeData._id).select("-password");
     // console.log(req.user);
   next();
 };

//Admin Authentication
export const isAdmin = async (req, res, next) => {
    if (req.user.role != "admin") {
      return res.status(403).send({
        success: false,
        message: "Unauthorized admin access",
      });
    }
    next();
  };