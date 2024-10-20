import bcrypt from "bcrypt";
import jwt    from "jsonwebtoken";
import User   from "../models/user.model.js";
import Role   from "../models/role.model.js";

/* #################################################################################################################### */
/* #################################################################################################################### */

/** User Creation */
export const userCreation = async(req, res)=>{
    try {
        const {firstName, lastName, email, mobile, roles, password} = req.body;
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({statu:false, message:"User already exist with this mail"})
        }

        /** Checking provided roles are exist. */
        const foundRoles = await Role.find({ _id: { $in: roles } });
        if (foundRoles.length !== roles.length) {
            return res.status(400).json({status: false, message:"One or more roles are invalid" });
        }

        /* Salting and Hashing the Password */
        const salt       = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        /* Create a new user */
        const newUser  =  new User({
            first_name : firstName,
            last_name  : lastName,
            email      : email,
            password   : hashedPass,
            mobile     : mobile,
            roles      : roles
            });

        /* Save User and Return */
        const userCreated = await newUser.save();
        return res.status(200).json({status:true, message:"User created successfully", userdata:userCreated});

    }catch (error) {
        console.log("Error while creating user :: ", error)
        return res.status(400).json({status:false, message:"Failed to create user"})
    }
};

/* #################################################################################################################### */
/* #################################################################################################################### */

/** User Login */
export const userLogin = async(req, res)=>{
    const jwtSecretStr    = process.env.JWT_SECRET
    let {email, password} = req.body;
    try{
        let userData = await User.findOne({email})
        if(!userData){
            return res.status(400).json({status:false, message:"User Not Found"})
        }

        /** Validating Credential */
        const comparePassword = await bcrypt.compare(password, userData.password)
        if(!comparePassword){
            return res.status(400).json({status:false, message:"Invalid Credential"})
        }

        /** Token sign and creation */
        const data={
            user:{
                id:userData.id,
                }}
        const JWTToken=  jwt.sign(data,jwtSecretStr)
        return res.status(200).json({status:true, message:"User found", jwtToken:JWTToken, data:{id:userData._id, name:userData.first_name, roles:userData.roles}})

    }
    catch(err){
        console.log("error while login user :: ", err);
    }
};

/* #################################################################################################################### */
/* #################################################################################################################### */

/** User Details fetch */
export const userFetch = async(req, res)=>{
    try {
        const userId   = req.params.userID
        const user     = await User.findById(userId).populate('roles')
        if(!user){
            return res.status(404).json({status:false, message:"User Not Found"})
        }
        return res.status(200).json({status:true, message:"User found successfully", data:user})

    }catch (error) {
        console.log("Error during userfetch :: ", error)
        return res.status(500).json({status:false, message:"Internal Server Error"})
    }
};

/* #################################################################################################################### */
/* #################################################################################################################### */

/** User Details Update */
export const userUpdate = async(req, res)=>{
    const userId = req.params.userID;
    console.log("update: ", userId)
    try {
        const {firstName, lastName, email, mobile, roles} = req.body
        const user = await User.findById(userId)
        if(!user){
            return res.status(404).json({status:true, message:"User Not Found"})
        }

        /** Roles validating and updating */
        console.log("roles: ", roles)
        if(roles && roles.length>0){
            const foundRoles = await Role.find({_id : {$in:roles}})
            if(foundRoles.length !== roles.length){
                return res.status(400).json({status:false, message:"One or more roles are not valid"})
            }
            user.roles = roles
        }
        /** Updating user information */
        if(firstName) user.first_name = firstName
        if(lastName)  user.last_name  = lastName
        if(email)     user.email      = email
        if(mobile)    user.mobile     = mobile

        /** Save the user information */
        const updatedUser = await user.save()
        return res.status(200).json({status:true, message: "User Details Updated Successfully", data:updatedUser})

    }catch (error) {
        console.log("Error during userUpdation :: ", error)
        return res.status(500).json({status:false, message:"Internal Server Error"})
    }
};

/* #################################################################################################################### */
/* #################################################################################################################### */

/** User deletion */
export const userDelete = async(req, res)=>{
    const userId = req.params.userID
    try{
        const user = await User.findByIdAndDelete(userId)
        if(!user){
            return res.status(404).json({status:true, message:"User Not Found"})
        }

        return res.status(200).json({status:true, message: "User Deleted Successfully", data:user})

    }catch(error){
        console.log("Error during userdeletion :: ", error)
        return res.status(500).json({status:false, message:"Internal Server Error"})
    }
};