const express=require('express')
const {AddNewUser,login,getuser,getallusers,deleteuser,updateuser}=require('../controllers/usercontroler')
const userMiddleware = require('../middlewares/usermiddleware')

const Router=express.Router()
Router.post('/newuser',AddNewUser)
Router.post('/login',login)
Router.get('/user/:id',getuser)
Router.get('/allusers', getallusers)
Router.delete('/:id', deleteuser)
Router.put('/update/:id',userMiddleware,updateuser)
module.exports=Router