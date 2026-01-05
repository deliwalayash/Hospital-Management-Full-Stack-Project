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
    },
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
    },
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doctor",
        required:true
    
    }
},
{timestamps:true})

module.exports = mongoose.model("Patient",patientSchema)