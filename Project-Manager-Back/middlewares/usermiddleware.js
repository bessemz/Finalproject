const jwt=require('jsonwebtoken')
const users=require('../models/userschema')

const userMiddleware=async(req,res,next)=>{
    try {
        const token=req.headers.auth
        if(!token){
            return res.status(401).json({message:"Token is not provided"})
        }else{
            var decoded = await jwt.verify(token,process.env.privatekey)
            const user=await users.findById(decoded.id)
            if(!user){
                return res.status(403).json("User doesnot exist")
            }else
            next()
        }
    } catch (error) {
        return res.status(403).json({error:error.message})
    }
}
module.exports=userMiddleware