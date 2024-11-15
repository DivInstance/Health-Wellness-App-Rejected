import mongoose from "mongoose";
import JWT from 'jsonwebtoken';

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
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: false,
    },
    password: {
        type: String,
        required: [true,'password is required'],
        minlength: [3,'password must be at least 3 characters'],
        //match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    },
    contactNo : {
        type: String,
        unique: false,
        match: /^[0-9]{10}$/,
    },
    bloodGroup: {
        type: String,
        enum: ['A +ve', 'A -ve', 'B +ve', 'B -ve', 'AB +ve', 'AB -ve', 'O +ve', 'O -ve'],
        required: false,
    },
    height: {
        type: Number, // Height in cm
        required: false,
    },
    weight: {
        type: Number, // Weight in kg
        required: false,
    },
    age: {
        type: Number,
        required: false,
    },
    profilePicture: {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
    },
    role:{
        type: String,
        default: 'user',
        //enum: ['user', 'admin'],
    }


},{ timestamps: { createdAt: 'createdDate',updatedAt: 'updatedDate' } }
);

//TimeStamps
//userSchema.set('timeStamps',{createdAt:"crdAt",updatedAt:"updAt"})

//Password validation compare function
userSchema.methods.passwordCompare = async function passwordCompare(plainPassword){
    return await plainPassword==this.password
};


//JWT token
userSchema.methods.generateToken = function(){
    return JWT.sign({ _id: this._id } , process.env.JWT_SECRET,{expiresIn:'7d'})
};


export const userModel =  mongoose.model('Users', userSchema);
export default userModel;