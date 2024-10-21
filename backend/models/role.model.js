import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
    role_name:{
        type:String,
        required:true,
    },
    permissions:{
        type:[String],
        enum:["dashboard","projects", "tickets", "our clients", "employees", "accounts", "payroll", "app", "user management", "other pages", "ui components"],
        required:true
    }
},{timestamps:true})

const Role = mongoose.model("role", RoleSchema);
export default Role;