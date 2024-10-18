import jwt from 'jsonwebtoken'

export const authentication =async(req, res, next)=>{
    try{
        let authToken=req.headers['authorization']
        if(authToken){
            const token = req.headers['authorization'].split(" ")[1]
            jwt.verify(token, process.env.JWT_SECRET, (err, decode)=>{
                if(err){
                    return res.status(401).json({status:false, message:"Not Authorized"})
                }
                req.user = decode.user;
                next()
            })
        }
        else{
            return res.status(401).json({status:false, message:"Authorization token is required."})
        }
    }catch(error){
        console.log("Error during Authentication: ", error);
        return res.status(400).json({status:false, message:"Error while authentication."})
    }
};