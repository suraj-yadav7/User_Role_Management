import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
    role_name:{
        type:String,
        required:true,
    },
    permissions:{
        type:[String],
        enum:["projects", "tickets", "our_client", "employees", "accounts", "payroll", "app", "other_pages", "ui_components"],
        required:true
    }
},{timestamps:true})

const Role = mongoose.model("role", RoleSchema);
export default Role;