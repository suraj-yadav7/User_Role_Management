
export const authorization =(req, res, next)=>{
    try{
        if(req.user && req.user.role){
            return next()
        }
        return res.status(403).json({status:false, message:"You are not authorized to access this resources."})
    }catch(error){
        console.log("Error during authorization: ", error)
        return res.status(500).json({status:false, message:"Internal server error"})
    }
};