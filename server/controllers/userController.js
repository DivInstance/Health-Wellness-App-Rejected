import userModel from "../models/userModel.js";
import cloudinary from "cloudinary";
import { getDataUri } from "../utils/feature.js";
import PDFDocument from "pdfkit";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, contactNo } = req.body;
    //validation
    if (!name || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      });
    }
    //Check Existing User
    const existingUser = await userModel.findOne({ email });
    //validation
    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: "Email already exists",
      });
    }

    const user = await userModel.create(req.body);

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while registering API",
      error,
    });
  }
};

//Login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return res.status(500).send({
        message: "Please enter your email and password",
        success: false,
      });
    }
    //check user
    // const users = await userModel.find();
    // console.log(users);
    // await userModel.findByIdAndDelete('673656279b77b265a1a1cea3');
    const user = await userModel.findOne({ email });
    //user validation

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    //check password

    const isEqual = await user.passwordCompare(password);
    //validation

    if (!isEqual) {
      return res.status(500).send({
        success: false,
        message: "Incorrect credentials",
      });
    }
    //Token
    const token = user.generateToken();
    //Response with COOKIE settings
    res
      .status(200)
      .cookie("token", token, {
        secure: process.env.NODE_ENV === "development" ? true : false,
        httpOnly: process.env.NODE_ENV === "development" ? true : false,
        sameSite: process.env.NODE_ENV === "development" ? true : false,
        expires: new Date(Date.now() + 3 * 60 * 60 * 1000), //Cookie expiration time - 3 days in milliseconds
      })
      .send({
        success: true,
        message: "User logged in successfully",
        token,
        user,
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while logging in API",
      
      error,
    });
  }
};

//Get user Profile Information

export const profileController = async (req, res) => {
  try {
    const user = await userModel.find();

    res.status(200).send({
      success: true,
      message: "User profile fetched successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching user profile",
      error,
    });
  }
};

export const logoutController = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        secure: true, //process.env.NODE_ENV === 'development' ? true : false,
        httpOnly: process.env.NODE_ENV === "development" ? true : false,
        sameSite: false, //process.env.NODE_ENV === 'development' ? true : false,
        expires: new Date(Date.now()),
      })
      .send({
        success: true,
        message: "User logged out successfully",
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while logging out API",
      error,
    });
  }
};

export const updateProfileController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);

    const {
      name,
      email,
      password,
      contactNo,
      age,
      height,
      weight,
      bloodGroup,
    } = req.body;
    //validation + Update
    if (name) user.name = name;
    if (email) user.email = email;
    if (contactNo) user.contactNo = contactNo;
    if (age) user.age = age;
    if (height) user.height = height;
    if (weight) user.weight = weight;
    if (bloodGroup) user.bloodGroup = bloodGroup;

    //commit update
    await user.save();
    res.status(200).send({
      success: true,
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    console.log(req.user);
    res.status(500).send({
      success: false,
      message: "Error while updating profile",
      error,
    });
  }
};

export const updatePasswordController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    const { currentPassword, newPassword } = req.body;
    //validation
    //console.log(req.body);}

    if (!currentPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Please provide old or new password",
      });
    }

    //old password check
    const isEqual = await user.passwordCompare(currentPassword);
    //validation
    if (!isEqual) {
      return res.status(500).send({
        success: false,
        message: "Incorrect current password",
      });
    }

    user.password = newPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error while updating password",
      error,
    });
  }
};

export const updateProfilePictureController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    //get file from user
    const file = getDataUri(req.file);

    //delete already existing image

    //Debug Code
    //console.log(typeof user.profilePicture)
    //console.log(Object.values(user.profilePicture).length)
    //console.log(user.profilePicture.public_id==null)

    if (user.profilePicture.public_id != null) {
      await cloudinary.v2.uploader.destroy(user.profilePicture.public_id);
    }

    //update new image

    const cdb = await cloudinary.v2.uploader.upload(file.content);
    user.profilePicture = {
      public_id: cdb.public_id,
      url: cdb.secure_url,
    };
    //save fuction call
    await user.save();

    res.status(200).send({
      success: true,
      message: "Profile picture updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating profile picture",
      error,
    });
  }
};

export const downloadProfileController = async (req, res) => {
  try {
    // Fetch the user data from the database
    const user = req.user;

    if (!user) {
      return res.status(404).send("User not found");
    }
    
    // Create a new PDF document
    const doc = new PDFDocument();

    // Set the response headers to indicate a file attachment
    res.setHeader("Content-Disposition", "attachment; filename=user-info.pdf");
    res.setHeader("Content-Type", "application/pdf");

    // Pipe the PDF document to the response
    doc.pipe(res);

    // Add user information to the PDF
    doc.fontSize(20).text("User Information", {
      align: "center",
    });

    doc.moveDown();
    doc.fontSize(14).text(`Name: ${user.name}`);
    doc.moveDown();
    doc.text(`Email: ${user.email}`);
    doc.moveDown();
    doc.text(`Gender: ${user.gender || "NA"}`);
    doc.moveDown();
    doc.text(`Age: ${user.age || "NA"}`);
    doc.moveDown();
    doc.text(`Contact Number: ${user.contactNo || "NA"}`);
    doc.moveDown();
    doc.text(`Blood Group: ${user.bloodGroup || "NA"}`);
    doc.moveDown();
    doc.text(`Weight: ${user.weight || "NA"}`);
    doc.moveDown();
    doc.text(`Height: ${user.height || "NA"}`);

    // Finalize the PDF and end the stream
    doc.end();
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "An error occurred",
      error,
    });
  }
};
