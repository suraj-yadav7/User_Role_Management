import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
    role_name:{
        type:String,
        enum:["admin", "project_manager", "hr_Manager", "finance_manager", "employee"],
        required:true,
    },
    permissions:{
        type:String,
        enum:["projects", "tickets", "our_client", "employees", "accounts", "payroll", "app", "other_pages", "ui_components"],
        required:true
    }
},{timestamps:true})

const ROLE = mongoose.model("role", RoleSchema);
export default ROLE;