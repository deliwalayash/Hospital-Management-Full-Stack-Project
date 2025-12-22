const mongoose=require('mongoose')

const patientSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    doctorname:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    mobileNumber:{
        type:String,
        unique:true,
        required:true
    },
    appointmentDate:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("Patient",patientSchema)