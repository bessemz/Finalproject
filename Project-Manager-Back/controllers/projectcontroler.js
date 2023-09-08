const project = require('../models/projectschema')
const users = require('../models/userschema')


// add project
const addnewproject=async(req,res)=>{
    try {
        const newproject=new project(req.body)
        console.log("req.body:",req.body)
        await newproject.save()
        await users.findByIdAndUpdate(req.body.id,{$push:{projects:newproject}})
        return res.status(200).json({message:'Project added',newproject})
    } catch (error) {
        return res.status(400).json({error:error.message})
        
    }
    
}

// get all projects
const getAllProjects=async(req,res)=>{
    try {
        const allprojects=await project.find()
        return res.status(200).json(allprojects)
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
}

//get one project
const getoneproject=async(req,res)=>{
    try {
        const oneproject=await project.findById(req.params.id)
        return res.status(200).json(oneproject)
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
}

//update project
const updateproject= async(req,res)=>{
    try {
        const upproj=await project.findByIdAndUpdate(req.params.id,{$set:{...req.body}},{new:true})
        return res.status(200).json({message:'project updated',upproj})
    } catch (error) {
        return res.status(400).json({error:error.message})
    }
}

//delete project
const deleteproject=async(req,res)=>{
    try {
      const delproj=await project.findByIdAndDelete(req.params.id)  
      return res.status(200).json({message:'deleted'})
    } catch (error) {
        return res.status(400).json({error:error.message})
        
    }
}


module.exports={addnewproject,getAllProjects,getoneproject,updateproject,deleteproject}