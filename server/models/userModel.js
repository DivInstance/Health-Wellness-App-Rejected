import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required: [true,'name is required'],
    },
    email : {
        type: String,
        required: [true,'email is required'],
        unique: [true,'email already exists'],
        //match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    password: {
        type: String,
        required: [true,'password is required'],
        minlength: [3,'password must be at least 3 characters'],
        //match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    },
    contactNo : {
        type: String,
        unique: true,
        //match: /^[0-9]{10}$/,
    },
    profilePic: {
        type: String,
    },
},{timeStamps:true}
);

export const userModel =  mongoose.model('Users', userSchema)
export default userModel