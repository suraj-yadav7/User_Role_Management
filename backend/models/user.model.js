import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        requires:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    roles:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'role',
        required:true
    }]
})

const User = mongoose.model('user', UserSchema)

export default User;