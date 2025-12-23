const mongoose=require('mongoose')

const patientSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    age:{
        type:Number,
        required:true,
    },
    doctorname:{
        type:String,
        required:true,
        trim:true
    },
    gender:{
        type:String,
        enum:["male","female"],
        required:true
    },
    mobileNumber:{
        type:String,
        unique:true,
        required:true
    },
    appointmentDate:{
        type:Date,
        required:true
    }
},
{timestamps:true})

module.exports = mongoose.model("Patient",patientSchema)