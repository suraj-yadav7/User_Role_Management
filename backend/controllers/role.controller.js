import Role from "../models/role.model.js";

/** Create new role */
export const roleCreation = async(req, res)=>{
    try {
        const {role_name, permissions} = req.body
        if(!role_name && permissions.length === 0){
            return res.status(400).json({status:false, message:"All fields are required"})
        }

        /** Creating new role */
        const newRole   = new Role({
            role_name   : role_name,
            permissions : permissions
        })

        const roleCreated = await newRole.save()
        return res.status(200).json({status:true, message:"Role is created", data:roleCreated})

    } catch (error) {
        console.log("Error during roleCreation", error)
        return res.status(500).json({status:false, message:"Internal Server Error"})
    }
};

/** Fetch all roles */
export const rolesFetch = async (req, res) => {
    try {
        /** Fetch all roles of collection */
        const roles = await Role.find();
        return res.status(200).json({ status: true,message:"Roles fetched successfully", data: roles });

    } catch (error) {
        console.log("Error during rolesFetch", error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

/** Fetch only single role */
export const roleFetchById = async (req, res) => {
    try {
        const roleId = req.params.roleID;
        /** Single role fetch by role id */
        const role = await Role.findById(roleId);
        if (!role) {
            return res.status(404).json({ status: false, message: "Role not found" });
        }

        return res.status(200).json({ status: true, message:"Role fetched successfully", data: role });

    } catch (error) {
        console.log("Error during roleFetchById", error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

/** Update role */
export const roleUpdate = async (req, res) => {
    try {
        const roleId = req.params.roleID;
        const { role_name, permissions } = req.body;

        if (!role_name && (!permissions || permissions.length === 0)) {
            return res.status(400).json({ status: false, message: "All fields are required" });
        }

        /** Updating existing role */
        const updatedRole = await Role.findByIdAndUpdate(
            roleId,
            { role_name, permissions },
            { new: true, runValidators: true }
        );

        if (!updatedRole) {
            return res.status(404).json({ status: false, message: "Role not found" });
        }
        return res.status(200).json({ status: true, message: "Role updated successfully", data: updatedRole });

    } catch (error) {
        console.log("Error during roleUpdate", error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

/** Delete role */
export const roleDelete = async (req, res) => {
    try {
        const roleId = req.params.roleID;

        /** Deleting role by role id */
        const deletedRole = await Role.findByIdAndDelete(roleId);
        if (!deletedRole) {
            return res.status(404).json({ status: false, message: "Role not found" });
        }

        return res.status(200).json({ status: true, message: "Role deleted successfully", data:deletedRole });

    } catch (error) {
        console.log("Error during roleDelete", error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
};

