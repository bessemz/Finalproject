const express=require('express')
const {addnewproject,getAllProjects,getoneproject,updateproject,deleteproject}=require('../controllers/projectcontroler')

const Router=express.Router()
Router.post('/newproject',addnewproject)
Router.get('/allprojects',getAllProjects)
Router.get('/project/:id', getoneproject)
Router.put('/editProject/:id', updateproject)
Router.delete('/deleteproject/:id', deleteproject)


module.exports=Router