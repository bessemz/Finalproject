const mongoose=require('mongoose')
const {Schema}=mongoose
const projectSchema=new Schema({
    projectname:String,
   description:String,
   datedebut: Date, // Champ pour la date de début
   datefin: Date,
    userId:{type:Schema.Types.ObjectId,ref:'users'}
})
module.exports=mongoose.model('projects',projectSchema)