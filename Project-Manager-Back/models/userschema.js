const mongoose=require('mongoose')
const {Schema}=mongoose
const userSchema=new Schema({
    name:String,
    email: String,
    password:String,
    role:{type:Number,default:0}, // 1 for admin ,
    projects:[{type:Schema.Types.ObjectId,ref:'projects'}]
})
module.exports=mongoose.model('users',userSchema)