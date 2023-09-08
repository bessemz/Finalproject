const mongoose=require('mongoose')
const connectDB=async()=>{
    try {
       mongoose.connect(process.env.URI) 
       console.log('DB connected mrigla')
    } catch (error) {
        console.log(error)
    }
}
module.exports=connectDB