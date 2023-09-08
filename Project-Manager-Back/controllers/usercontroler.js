const users=require('../models/userschema')
const bcrypt=require('bcrypt')
const saltRounds=10
const jwt=require('jsonwebtoken')


const AddNewUser=async(req,res)=>{
    try {
        const email=req.body.email
        const password=req.body.password
        const name=req.body.name
        const user=await users.findOne({email})
        if (user){
           return res.status(400).json({message:"user already exist"})
        }else{
            const hashed=await bcrypt.hash(password,saltRounds)
            const newuser=new users({...req.body,password:hashed})
            await newuser.save()
            return res.status(200).json({message:"user added",newuser})
        }
        
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
}
// login
const login=async(req,res)=>{
    console.log(req.body.email)
    console.log(req.body.password)
    try {
     const email=req.body.email
     const password=req.body.password
     const user=await users.findOne({email})  
     if (!user) {
        return  res.status(400).json({message:"Invalid Email or Password"})
     }else{
        const Match = await bcrypt.compare(password, user.password)
        if (!Match){
            return   res.status(403).json({ message:'Incorrect credentials' })
        }else{
            var token=jwt.sign({id:user._id},process.env.privatekey)
            return res.json({message:'user cloggedin',token,user})
        }
     }
    } catch (error) {
        
    }
}
//getallusers
const getallusers=async(req,res)=>{
    try {
      const  alluser=await users.find()
      return res.status(200).json(alluser)
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
}

// getuser
const getuser=async(req,res)=>{
    try {
        const user=await users.findById(req.params.id).populate('projects').select("-password")
        return res.json(user)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

// deleteuser
const deleteuser=async(req,res)=>{
    try {
        await users.findByIdAndDelete(req.params.id) 
        return res.status(200).json({message:'user deleted'})
    } catch (error) {
        res.status(400).json({error:error.message})  
    }
}

// updateuser
const updateuser=async(req,res)=>{
    try {
       const updateUser=await users.findByIdAndUpdate(req.params.id,{$set:{...req.body}},{new:true}) 
       return res.status(200).json({message:'user updated',updateUser})
    } catch (error) {
        res.status(400).json({error:error.message})  
    }
}

module.exports={AddNewUser,login,getallusers,getuser,deleteuser,updateuser}
